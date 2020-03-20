import { isPromise } from 'is-what'
import { isVueSyncError, ActionName, ActionResultTernary } from '../types/actions'
import { SharedConfig, Modified, PlainObject } from '../types/base'
import { EventNameFnsMap, EventFnSuccess } from '../types/events'
import { O } from 'ts-toolbelt'
import { PluginModuleConfig, PluginActionTernary, OnNextStoresStream } from '../types/plugins'

function isUndefined (payload: any): payload is undefined | void {
  return payload === undefined
}

export async function handleAction<
  Payload extends PlainObject,
  TActionName extends ActionName
> (args: {
  pluginAction: PluginActionTernary<TActionName>
  pluginModuleConfig: PluginModuleConfig
  payload: Payload
  eventNameFnsMap: O.Compulsory<EventNameFnsMap>
  onError: SharedConfig['onError']
  actionName: TActionName
  stopExecutionAfterAction: (arg?: boolean | 'revert') => void
  onNextStoresSuccess?: EventFnSuccess[]
  onNextStoresStream?: OnNextStoresStream
}): Promise<ActionResultTernary<TActionName, Payload>> {
  const {
    pluginAction,
    pluginModuleConfig,
    payload,
    eventNameFnsMap: on,
    onError,
    actionName,
    stopExecutionAfterAction,
    onNextStoresSuccess = [],
    onNextStoresStream = {
      inserted: [],
      merged: [],
      assigned: [],
      replaced: [],
      deleted: [],
    },
  } = args
  const successEventsToExecute = [...onNextStoresSuccess]

  // create abort mechanism for current scope
  let abortExecution = false
  function abort (): void {
    abortExecution = true
  }
  let payloadAfterBeforeEvent: Modified<Payload> = payload // the payload throughout the stages
  // handle and await each eventFn in sequence
  for (const fn of on.before) {
    const eventResult = fn({ payload: payloadAfterBeforeEvent, actionName, abort })
    const eventResultResolved = isPromise(eventResult) ? await eventResult : eventResult
    // overwrite the result with whatever the dev returns in the event function, as long as it's not undefined
    if (!isUndefined(eventResultResolved)) payloadAfterBeforeEvent = eventResultResolved
  }
  // abort?
  if (abortExecution) {
    stopExecutionAfterAction()
    // return the proper return type based on the ActionName
    const returnEarlyValue =
      actionName === 'stream'
        ? undefined
        : actionName === 'get'
        ? ({} as PlainObject)
        : payloadAfterBeforeEvent
    return (returnEarlyValue as unknown) as ActionResultTernary<TActionName, Payload>
  }
  let result: Modified<Payload> | PlainObject | PlainObject[] | void = payloadAfterBeforeEvent
  try {
    const thirdParam = actionName === 'stream' ? onNextStoresStream : onNextStoresSuccess
    // @ts-ignore
    result = await pluginAction(result as Modified<Payload>, pluginModuleConfig, thirdParam)
  } catch (error) {
    if (!isVueSyncError(error)) throw new Error(error)
    // handle and await each eventFn in sequence
    for (const fn of on.error) {
      const eventResult = fn({ payload: payloadAfterBeforeEvent, actionName, abort, error })
      const eventResultResolved = isPromise(eventResult) ? await eventResult : eventResult
      // overwrite the result with whatever the dev returns in the event function, as long as it's not undefined
      if (!isUndefined(eventResultResolved)) result = eventResultResolved
    }
    // abort?
    if (abortExecution || onError === 'stop') {
      stopExecutionAfterAction()
      throw error
    }
    if (onError === 'revert') {
      stopExecutionAfterAction('revert')
      return (result as unknown) as ActionResultTernary<TActionName, Payload>
    }
  }
  // handle and await each eventFn in sequence
  for (const fn of on.success) {
    const eventResult = fn({ payload: payloadAfterBeforeEvent, result, actionName, abort })
    const eventResultResolved = isPromise(eventResult) ? await eventResult : eventResult
    // overwrite the result with whatever the dev returns in the event function, as long as it's not undefined
    if (!isUndefined(eventResultResolved)) result = eventResultResolved
  }
  // handle and await each "onNextStoresSuccess" eventFn in sequence (besides the ones just added of course)
  for (const fn of successEventsToExecute) {
    await fn({ payload: payloadAfterBeforeEvent, result, actionName, abort })
  }
  // abort?
  if (abortExecution) {
    stopExecutionAfterAction()
    return (result as unknown) as ActionResultTernary<TActionName, Payload>
  }
  return (result as unknown) as ActionResultTernary<TActionName, Payload>
}
