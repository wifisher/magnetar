import {
  Magnetar,
  MagnetarInstance,
  CollectionInstance,
  DocInstance,
  GlobalConfig,
} from '../../src'
import {
  pokedex,
  PokedexEntry,
  generateRandomId,
  PluginMockLocal,
  PluginMockRemote,
} from '@magnetarjs/test-utils'
import { O } from 'ts-toolbelt'

const CreatePluginLocal = PluginMockLocal.CreatePlugin
const CreatePluginRemote = PluginMockRemote.CreatePlugin

const getInitialDataCollection = () => [
  // doc entries
  ['1', pokedex(1)],
]
const getInitialDataDocument = () => ({ name: 'Luca', age: 10 })

export type PokedexModuleData = O.Patch<
  PokedexEntry,
  {
    seen?: boolean
    shouldFail?: string
  }
>

export type TrainerModuleData = {
  name: string
  age?: number
  nickName?: string
  dream?: string
  shouldFail?: string
  colour?: string
}

export function createMagnetarInstance(
  magnetarGlobalConfig: Partial<GlobalConfig> = {},
  startEmpty = false
): {
  pokedexModule: CollectionInstance<PokedexModuleData>
  trainerModule: DocInstance<TrainerModuleData>
  magnetar: MagnetarInstance
} {
  const local = CreatePluginLocal({ storeName: 'local', generateRandomId })
  const remote = CreatePluginRemote({ storeName: 'remote' })
  const magnetar = Magnetar({
    localStoreName: 'local',
    stores: { local, remote },
    executionOrder: {
      read: ['local', 'remote'],
      write: ['local', 'remote'],
      delete: ['local', 'remote'],
    },
    ...magnetarGlobalConfig,
  })
  const pokedexModule = startEmpty
    ? magnetar.collection<PokedexModuleData>('pokedex')
    : magnetar.collection<PokedexModuleData>('pokedex', {
        configPerStore: {
          local: { initialData: getInitialDataCollection() }, // path for the plugin
          remote: {}, // path for the plugin
        },
      })
  const trainerModule = startEmpty
    ? magnetar.doc<TrainerModuleData>('app-data/trainer')
    : magnetar.doc<TrainerModuleData>('app-data/trainer', {
        configPerStore: {
          local: { initialData: getInitialDataDocument() }, // path for the plugin
          remote: {}, // path for the plugin
        },
      })
  return { pokedexModule, trainerModule, magnetar }
}
