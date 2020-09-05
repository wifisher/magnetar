import { PlainObject, PluginInsertAction, PluginInsertActionPayload } from '@vue-sync/core'
import { ReactiveStoreModuleConfig, ReactiveStoreOptions, MakeRestoreBackup } from '../CreatePlugin'
import { isFullString, isNumber } from 'is-what'
import Vue from 'vue'

export function insertActionFactory (
  data: { [collectionPath: string]: Map<string, PlainObject> },
  reactiveStoreOptions: ReactiveStoreOptions,
  makeBackup?: MakeRestoreBackup
): PluginInsertAction {
  return function ({
    payload,
    collectionPath,
    docId,
    pluginModuleConfig,
  }: PluginInsertActionPayload<ReactiveStoreModuleConfig>): string {
    if (!docId) {
      const newDocId =
        isFullString(payload.id) || isNumber(payload.id)
          ? String(payload.id)
          : reactiveStoreOptions.generateRandomId()

      if (makeBackup) makeBackup(collectionPath, newDocId)

      data[collectionPath].set(newDocId, payload)
      return newDocId
    }
    // else it's a doc
    const collectionMap = data[collectionPath]

    if (makeBackup) makeBackup(collectionPath, docId)

    const docDataToMutate = collectionMap.get(docId)
    // reset the doc to be able to overwrite
    Object.keys(docDataToMutate).forEach(key => {
      if (key in payload) return
      // delete docDataToMutate[key]
      Vue.delete(docDataToMutate, key)
    })
    Object.entries(payload).forEach(([key, value]) => {
      // docDataToMutate[key] = value
      Vue.set(docDataToMutate, key, value)
    })
    // console.log(`docDataToMutate.name → `, docDataToMutate.name)
    return docId
  }
}
