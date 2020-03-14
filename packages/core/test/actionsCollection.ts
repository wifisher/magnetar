import test from 'ava'
import { VueSync } from '../src/index'
import { VueSyncGenericPlugin } from './helpers/pluginMock'
import { VueSyncModuleInstance } from '../src/CreateModule'
import { OnRetrieveHandler } from '../src/types/base'

const local = VueSyncGenericPlugin({ storeName: 'local' })
const remote = VueSyncGenericPlugin({ storeName: 'remote' })
const vueSync = VueSync({
  stores: { local, remote },
  executionOrder: {
    read: ['remote', 'local'],
    write: ['local', 'remote'],
  },
})
const usersModule: VueSyncModuleInstance = vueSync.createModule({
  type: 'collection',
  configPerStore: {
    local: { path: 'users' }, // path for vuex
    remote: { path: 'users' }, // path for vuex
  },
})

test('write actions', async t => {
  const insertPayload = { name: 'luca' }
  const result = await usersModule.insert(insertPayload)
  t.deepEqual(result, insertPayload)
})

// test('read action - stream', async t => {
//   const streamInfo = usersModule.stream()
//   const { onRetrieve, opened, closed, close } = streamInfo

//   // this promise gets triggered once
//   //   resolves when the stream was correctly opened;
//   //   rejected when the stream couldn't be opened
//   opened // prettier-ignore
//     .then(storeName => {})
//     .catch(error => {})

//   // this promise gets triggered once
//   //   resolves when the stream was (a) correctly closed or (b) the store provided doesn't have stream functionality;
//   //   rejected when the stream was closed because of an error
//   closed // prettier-ignore
//     .then(storeName => {})
//     .catch(error => {})

//   // You can pass a function to `onRetrieve` which gets triggered every time data comes in
//   onRetrieve((storeName, dataArray) => {})

//   setTimeout(() => {
//     // use `close()` to close the stream
//     // the promise returned from this is the same promise as the one returned in `closed`
//     close() // prettier-ignore
//       .then(() => {})
//       .catch(error => {})
//   }, 1000)
// })

test('read action - get', async t => {
  // get resolves once all stores have given a response with data
  const { retrieved, onRetrieve } = usersModule.get()
  let ranAllEvents = []
  //   // You can pass a function to `onRetrieve` which gets triggered every time data comes in
  const myHandler: OnRetrieveHandler = (storeName, data) => {
    t.true(['remote', 'local'].includes(storeName))
    t.deepEqual(data, { name: 'Luca' })
    ranAllEvents.push(1)
  }
  onRetrieve(myHandler)

  try {
    const data = await retrieved // prettier-ignore
    t.deepEqual(data, { name: 'Luca' })
  } catch (error) {
    t.fail(error)
  }
  t.is(ranAllEvents.length, 2)
})
