/* eslint-disable no-inner-declarations */
import { O } from 'ts-toolbelt'
import { isFullArray, isFullString, isPromise } from 'is-what'
import { handleAction } from './handleAction'
import { getEventNameFnsMap } from '../types/events'
import {
  ActionConfig,
  MagnetarFetchAction,
  MagnetarWriteAction,
  MagnetarDeleteAction,
  MagnetarDeletePropAction,
  MagnetarInsertAction,
  ActionName,
  FetchPromises,
} from '../types/actions'
import { ActionType, ActionTernary } from '../types/actionsInternal'
import { FetchResponse, isDoOnFetch, isFetchResponse, DoOnFetch, SyncBatch } from '../types/plugins'
import { getModifyPayloadFnsMap } from '../types/modifyPayload'
import { OnAddedFn, getModifyReadResponseFnsMap } from '../types/modifyReadResponse'
import { executeOnFns } from '../helpers/executeOnFns'
import { throwIfNoFnsToExecute } from '../helpers/throwFns'
import { ModuleConfig, GlobalConfig } from '../types/config'
import { CollectionFn, DocFn, WriteLock } from '../Magnetar'
import { getPluginModuleConfig } from '../helpers/moduleHelpers'
import { getCollectionWriteLocks } from '../helpers/pathHelpers'

export type HandleActionSharedParams = {
  collectionPath: string
  _docId: string | undefined
  moduleConfig: ModuleConfig
  globalConfig: O.Compulsory<GlobalConfig>
  fetchPromises: FetchPromises
  writeLockMap: Map<string, WriteLock>
  docFn: DocFn // actions executed on a "doc" will always return `doc()`
  collectionFn?: CollectionFn // actions executed on a "collection" will return `collection()` or `doc()`
}

export function handleActionPerStore<TActionName extends Exclude<ActionName, 'stream'>>(
  sharedParams: HandleActionSharedParams,
  actionName: TActionName,
  actionType: ActionType
): ActionTernary<TActionName>
export function handleActionPerStore(
  sharedParams: HandleActionSharedParams,
  actionName: Exclude<ActionName, 'stream'>,
  actionType: ActionType
):
  | MagnetarFetchAction<any>
  | MagnetarWriteAction<any>
  | MagnetarInsertAction<any>
  | MagnetarDeleteAction
  | MagnetarDeletePropAction<any> {
  const { collectionPath, _docId, moduleConfig, globalConfig, fetchPromises, writeLockMap, docFn, collectionFn } = sharedParams // prettier-ignore

  // returns the action the dev can call with myModule.insert() etc.
  return function (payload?: any, actionConfig: ActionConfig = {}): Promise<any> {
    // first of all, check if the same fetch call was just made or not, if so return the same fetch promise early
    const fetchPromiseKey = JSON.stringify(payload)
    const foundFetchPromise = fetchPromises.get(fetchPromiseKey)
    // return the same fetch promise early if it's not yet resolved
    if (actionName === 'fetch' && isPromise(foundFetchPromise)) return foundFetchPromise

    // set up and/or reset te writeLock for write actions
    const writeLock = _docId ? writeLockMap.get(`${collectionPath}/${_docId}`)! : writeLockMap.get(collectionPath)!
    if (actionName !== 'fetch') {
      // we need to create a promise we'll resolve later to prevent any incoming docs from being written to the local state during this time
      if (writeLock.promise === null) {
        writeLock.promise = new Promise((resolve) => {
          writeLock.resolve = () => {
            resolve()
            writeLock.resolve = () => {}
            writeLock.promise = null
            if (writeLock.countdown !== null) {
              clearTimeout(writeLock.countdown)
              writeLock.countdown = null
            }
          }
        })
      }
      if (writeLock.promise !== null && writeLock.countdown !== null) {
        // there already is a promise, let's just stop the countdown, we'll start it again at the end of all the store actions
        clearTimeout(writeLock.countdown)
      }
    }
    
    // eslint-disable-next-line no-async-promise-executor
    const actionPromise = new Promise<any>(async (resolve, reject) => {
      // we need to await any writeLock _before_ fetching, to prevent grabbing outdated data
      if (actionName === 'fetch') {
        await writeLock.promise
        if (!_docId) {
          // we need to await all promises of all docs in this collection...
          const collectionWriteMaps = getCollectionWriteLocks(collectionPath, writeLockMap)
          await Promise.allSettled(collectionWriteMaps.map(w => w.promise))
        }
      }

      try {
        let docId = _docId
        let modulePath = [collectionPath, docId].filter(Boolean).join('/')
        // get all the config needed to perform this action
        const onError = actionConfig.onError || moduleConfig.onError || globalConfig.onError
        const modifyPayloadFnsMap = getModifyPayloadFnsMap(
          globalConfig.modifyPayloadOn,
          moduleConfig.modifyPayloadOn,
          actionConfig.modifyPayloadOn
        )
        const modifyReadResponseMap = getModifyReadResponseFnsMap(
          globalConfig.modifyReadResponseOn,
          moduleConfig.modifyReadResponseOn,
          actionConfig.modifyReadResponseOn
        )
        const eventNameFnsMap = getEventNameFnsMap(
          globalConfig.on,
          moduleConfig.on,
          actionConfig.on
        )
        const storesToExecute: string[] =
          actionConfig.executionOrder ||
          (moduleConfig.executionOrder || {})[actionName] ||
          (moduleConfig.executionOrder || {})[actionType] ||
          (globalConfig.executionOrder || {})[actionName] ||
          (globalConfig.executionOrder || {})[actionType] ||
          []
        throwIfNoFnsToExecute(storesToExecute)
        // update the payload
        for (const modifyFn of modifyPayloadFnsMap[actionName]) {
          payload = modifyFn(payload, docId)
        }

        // create the abort mechanism
        type StopExecution = boolean | 'revert'
        let stopExecution = false as StopExecution
        /**
         * The abort mechanism for the entire store chain. When executed in handleAction() it won't go to the next store in executionOrder.
         */
        function stopExecutionAfterAction(trueOrRevert: StopExecution = true): void {
          stopExecution = trueOrRevert
        }

        /**
         * each each time a store returns a `FetchResponse` then all `doOnFetchFns` need to be executed
         */
        const doOnFetchFns: DoOnFetch[] = modifyReadResponseMap.added

        /**
         * All possible results from the plugins.
         * `unknown` in case an error was thrown
         */
        let resultFromPlugin:
          | void
          | string
          | unknown
          | FetchResponse
          | OnAddedFn
          | SyncBatch
          | [string, SyncBatch]
        // handle and await each action in sequence
        for (const [i, storeName] of storesToExecute.entries()) {
          // a previous iteration stopped the execution:
          if (stopExecution === true) break
          // find the action on the plugin
          const pluginAction = globalConfig.stores[storeName].actions[actionName]
          const pluginModuleConfig = getPluginModuleConfig(moduleConfig, storeName)
          // the plugin action
          resultFromPlugin = !pluginAction
            ? resultFromPlugin
            : await handleAction({
                collectionPath,
                docId,
                modulePath,
                pluginModuleConfig,
                pluginAction,
                payload, // should always use the payload as passed originally for clarity
                actionConfig,
                eventNameFnsMap,
                onError,
                actionName,
                stopExecutionAfterAction,
                storeName,
              })
          
          // handle reverting. stopExecution might have been modified by `handleAction`
          if (stopExecution === 'revert') {
            const storesToRevert = storesToExecute.slice(0, i)
            storesToRevert.reverse()
            for (const storeToRevert of storesToRevert) {
              const pluginRevertAction = globalConfig.stores[storeToRevert].revert
              const pluginModuleConfig = getPluginModuleConfig(moduleConfig, storeToRevert)
              await pluginRevertAction({
                payload,
                actionConfig,
                collectionPath,
                docId,
                pluginModuleConfig,
                actionName,
                error: resultFromPlugin, // in this case the result is the error
              })
              // revert eventFns, handle and await each eventFn in sequence
              for (const fn of eventNameFnsMap.revert) {
                await fn({ payload, result: resultFromPlugin, actionName, storeName, collectionPath, docId, path: modulePath, pluginModuleConfig }) // prettier-ignore
              }
            }
            // now we must throw the error
            throw resultFromPlugin
          }

          // special handling for 'insert' (resultFromPlugin will always be `string | [string, SyncBatch]`)
          if (actionName === 'insert') {
            // update the modulePath if a doc with random ID was inserted in a collection
            // if this is the case the result will be a string - the randomly genererated ID
            if (!docId) {
              if (isFullString(resultFromPlugin)) {
                docId = resultFromPlugin
              }
              if (isFullArray(resultFromPlugin) && isFullString(resultFromPlugin[0])) {
                docId = resultFromPlugin[0]
              }
              modulePath = [collectionPath, docId].filter(Boolean).join('/')
            }
          }

          // special handling for 'fetch' (resultFromPlugin will always be `FetchResponse | OnAddedFn`)
          if (actionName === 'fetch') {
            const optimisticFetch =
              !payload ||
              !Object.hasOwnProperty.call(payload || {}, 'force') ||
              payload?.force === false
            if (optimisticFetch) {
              // the local store successfully returned a fetch response based on already fetched data
              if (storeName === globalConfig.localStoreName && isFetchResponse(resultFromPlugin)) {
                stopExecutionAfterAction(true)
              }
            }
            if (isDoOnFetch(resultFromPlugin)) {
              doOnFetchFns.push(resultFromPlugin)
            }
            if (isFetchResponse(resultFromPlugin)) {
              for (const docRetrieved of resultFromPlugin.docs) {
                executeOnFns(doOnFetchFns, docRetrieved.data, [docRetrieved])
              }
            }
          }
        }
        // all the stores resolved their actions

        // start the writeLock countdown
        if (actionName !== 'fetch') {
          writeLock.countdown = setTimeout(writeLock.resolve, 5000)
        }

        // anything that's executed from a "collection" module:
        // 'insert' always returns a DocInstance, unless the "abort" action was called, then the modulePath might still be a collection:
        if (actionName === 'insert' && docId) {
          resolve(docFn(modulePath, moduleConfig))
          return
        }

        // anything that's executed from a "doc" module:
        if (docId || !collectionFn) {
          resolve(docFn(modulePath, moduleConfig).data)
          if (actionName === 'fetch') fetchPromises.delete(fetchPromiseKey)
          return
        }

        // all other actions triggered on collections ('fetch' is the only possibility left)
        // 'fetch' should return `Map<string, DocDataType>` or `DocDataType`
        resolve(collectionFn(modulePath, moduleConfig).data)
        if (actionName === 'fetch') fetchPromises.delete(fetchPromiseKey)
      } catch (error) {
        reject(error)
        if (actionName === 'fetch') fetchPromises.delete(fetchPromiseKey)
      }
    })

    if (actionName === 'fetch') {
      fetchPromises.set(fetchPromiseKey, actionPromise)
    }

    return actionPromise
  }
}
