import { O } from 'ts-toolbelt'
import { StoreName } from './atoms'
import { DocInstance } from '../Doc'
import { EventNameFnMap } from './events'
import { ModifyPayloadFnMap } from './modifyPayload'
import { ModifyReadResponseFnMap } from './modifyReadResponse'

/**
 * these are all the actions that Magnetar streamlines, whichever plugin is used
 * these actions are executable from a `MagnetarModule` and handled by each plugin individually
 */
export type ActionName = 'fetch' | 'stream' | 'insert' | 'merge' | 'assign' | 'replace' | 'deleteProp' | 'delete' // prettier-ignore

/**
 * You can pass options to this action specifically;
 * This is what the dev can provide as second param when executing any action in addition to the payload.
 * @example
 * // first update the server and await that before updating the local store:
 * { executionOrder: ['remote', 'local'] }
 * @example
 * // don't throw errors for this action, wherever it might fail
 * { onError: 'continue' }
 */
export type ActionConfig = {
  executionOrder?: StoreName[]
  onError?: 'revert' | 'continue' | 'stop'
  modifyPayloadOn?: ModifyPayloadFnMap
  modifyReadResponseOn?: ModifyReadResponseFnMap
  on?: EventNameFnMap
  /**
   * An option for remote stores like Firestore to delay a sync to the server and batch any additional actions made during the `syncDebounceMs`.
   */
  syncDebounceMs?: number
}

// these are the action types exposed to the dev via a MagnetarModule, it's what the dev will end up calling.

/**
 * Opens a continuous stream to a document or collection.
 * @returns the open stream promise. This will never resolve as long as the stream is open.
 */
export type MagnetarStreamAction = (
  payload?: any | void,
  actionConfig?: ActionConfig
) => Promise<void>

/**
 * Fetches document(s) and adds the data to your local store's state.
 * Fetch is optimistic by default — if it can find the doc's data in your local state, it will return that and prevent any remote fetches.
 * You can force a re-fetch by passing `{ force: true }`
 * @returns the document(s) data that was fetched. If you need to access other metadata that was retrieved during fetching, you can use `modifyReadResponse.added`.
 * @example
 * const bulbasaur = magnetar.collection('pokedex').doc('001')
 * bulbasaur.fetch() // does nothing if already fetched once
 * @example
 * const bulbasaur = magnetar.collection('pokedex').doc('001')
 * bulbasaur.fetch({ force: true }) // makes API call to remote store
 * @example
 * const pokedex = magnetar.collection('pokedex')
 * pokedex.fetch() // does nothing if already fetched once
 * @example
 * const pokedex = magnetar.collection('pokedex')
 * pokedex.fetch({ force: true }) // makes API call to remote store
 */
export type MagnetarFetchAction<
  DocDataType extends Record<string, any> = Record<string, any>,
  calledFrom extends 'collection' | 'doc' = 'collection' | 'doc'
> = (
  payload?: { force?: boolean } | Record<string, any> | void,
  actionConfig?: ActionConfig
) => Promise<calledFrom extends 'collection' ? Map<string, DocDataType> : DocDataType>

/**
 * @returns The new `doc()` instance after inserting. You can access the inserted `id` by checking this returned instance.
 * @example
 * const newDoc = collection('myDocs').insert({ some: 'payload' })
 * newDoc.id // the generated id
 * newDoc.data // { some: 'payload' }
 */
export type MagnetarInsertAction<DocDataType extends Record<string, any> = Record<string, any>> = (
  payload: DocDataType,
  actionConfig?: ActionConfig
) => Promise<DocInstance<DocDataType>>

/**
 * @returns the new document data after applying the changes to the local document (including any modifications from modifyPayloadOn)
 */
export type MagnetarWriteAction<DocDataType extends Record<string, any> = Record<string, any>> = (
  payload: O.Optional<DocDataType, keyof DocDataType, 'deep'>,
  actionConfig?: ActionConfig
) => Promise<DocDataType>

/**
 * @returns the new document data after applying the changes to the local document (including any modifications from modifyPayloadOn)
 */
export type MagnetarDeletePropAction<
  DocDataType extends Record<string, any> = Record<string, any>
> = (
  payload: keyof DocDataType | string | (keyof DocDataType | string)[],
  actionConfig?: ActionConfig
) => Promise<Partial<DocDataType>>

/**
 * @param {*} [payload] When executing on a doc: no payload needed. When executing on a collection: you need to pass the document ID you want to delete.
 * @param {ActionConfig} [actionConfig]
 * @example collection('pokedex').delete('001')
 * @example doc('pokedex/001').delete()
 */
export type MagnetarDeleteAction = (payload?: any, actionConfig?: ActionConfig) => Promise<void>

/**
 * All fetch promises with the payload passed to `fetch(payload)` as key (JSON.stringify) and the "fetch promise" as value. In case `fetch()` had no payload, use `undefined`
 */
export type FetchPromises = Map<string, Promise<any>>
