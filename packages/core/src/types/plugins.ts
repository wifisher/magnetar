import { ActionName } from './actions'
import { PlainObject, Modified } from './base'
import { EventFnSuccess } from './events'

// stores / plugins

// these are the interfaces that plugins need to use and implement

// a plugin is a function that returns a `PluginInstance`
export type Plugin = (any: any) => PluginInstance

// the `PluginInstance` is what's used by Vue Sync internally
export interface PluginInstance {
  actions: {
    get?: PluginGetAction
    stream?: PluginStreamAction
    insert?: PluginWriteAction
    merge?: PluginWriteAction
    assign?: PluginWriteAction
    replace?: PluginWriteAction
    delete?: PluginWriteAction
  }
  revert: PluginRevertAction // the action that reverts other actions on error
  setModuleDataReference: <T extends any>(
    moduleConfig: PluginModuleConfig,
    previousStoreData: T
  ) => Modified<T>
  config: { [key: string]: any } // any other config the plugin needs which is passed by the dev
}

// the `PluginModuleConfig` is the extra config of a plugin when a module is instanciated
export type PluginModuleConfig = PlainObject

export type OnNextStoresStream = {
  inserted: ((payload: object) => void)[]
  merged: ((payload: object) => void)[]
  assigned: ((payload: object) => void)[]
  replaced: ((payload: object) => void)[]
  deleted: ((payload: object | string) => void)[]
}

export type PluginStreamAction = <T extends object>(
                                    payload: T,
                                    pluginModuleConfig: PluginModuleConfig,
                                    onNextStoresStream: OnNextStoresStream
                                  ) => Promise<void> // prettier-ignore

export type PluginGetAction = <T extends object>(
                                payload: T | undefined,
                                pluginModuleConfig: PluginModuleConfig,
                                onNextStoresSuccess: EventFnSuccess[]
                                ) => Promise<PlainObject[] | PlainObject> // prettier-ignore

export type PluginWriteAction = <T extends object>(
                                  payload: T,
                                  pluginModuleConfig: PluginModuleConfig,
                                  onNextStoresSuccess: EventFnSuccess[]
                                ) => Promise<Modified<T>> // prettier-ignore

// the revert action is a bit different, receives the ActionName
export type PluginRevertAction = <T extends object>(
                                    actionName: ActionName,
                                    payload: T,
                                    pluginModuleConfig: PluginModuleConfig
                                  ) => Promise<T> // prettier-ignore

export type PluginActionTernary<TActionName extends ActionName> = TActionName extends 'stream'
  ? PluginStreamAction
  : TActionName extends 'get'
  ? PluginGetAction
  : PluginWriteAction
