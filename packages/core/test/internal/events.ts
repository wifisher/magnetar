import test from 'ava'
import { createMagnetarInstance } from '../helpers/createMagnetarInstance'
import { pokedex } from '@magnetarjs/test-utils'

test('delete: emits before & success events', async (t) => {
  const { pokedexModule } = createMagnetarInstance()
  const insertPayload = pokedex(7)
  await pokedexModule.insert(insertPayload)
  const ranAllEvents: any[] = []
  await pokedexModule.doc('7').delete(undefined, {
    on: {
      before: ({ payload, storeName }) => {
        ranAllEvents.push(1)
      },
      success: ({ payload, storeName }) => {
        ranAllEvents.push(1)
      },
    },
  })
  t.is(ranAllEvents.length, 4)
})

test('insert: emits before & success events', async (t) => {
  const { pokedexModule } = createMagnetarInstance()
  const insertPayload = pokedex(7)
  const ranAllEvents: any[] = []
  await pokedexModule.insert(insertPayload, {
    on: {
      before: ({ payload, storeName }) => {
        if (storeName === 'local') {
          t.deepEqual(payload, insertPayload)
          ranAllEvents.push(1)
        }
        if (storeName === 'remote') {
          t.deepEqual(payload, insertPayload)
          ranAllEvents.push(1)
        }
      },
      success: ({ payload, storeName }) => {
        if (storeName === 'local') {
          t.deepEqual(payload, insertPayload)
          ranAllEvents.push(1)
        }
        if (storeName === 'remote') {
          t.deepEqual(payload, insertPayload)
          ranAllEvents.push(1)
        }
      },
    },
  })
  t.is(ranAllEvents.length, 4)
})

test('insert: can abort in before events', async (t) => {
  const { pokedexModule } = createMagnetarInstance()
  const insertPayload = pokedex(7)
  try {
    const result = await pokedexModule.insert(insertPayload, {
      on: {
        before: ({ payload, abort, storeName }) => {
          if (storeName === 'local') {
            abort()
          }
          if (storeName === 'remote') t.fail()
        },
        success: ({ storeName, result }) => t.fail(),
        error: ({ storeName }) => {
          if (storeName === 'local') t.fail()
        },
      },
    })
    t.deepEqual(result.data, pokedexModule.data.get('7'))
  } catch (error) {
    t.fail(JSON.stringify(error))
  }
})

test('insert: can abort in success events', async (t) => {
  const { pokedexModule } = createMagnetarInstance()
  const insertPayload = pokedex(7)
  const ranAllEvents: any[] = []
  try {
    const result = await pokedexModule.insert(insertPayload, {
      on: {
        before: ({ payload, storeName }) => {
          if (storeName === 'local') {
            ranAllEvents.push(1)
          }
          if (storeName === 'remote') t.fail()
        },
        success: ({ payload, abort, storeName }) => {
          if (storeName === 'local') {
            ranAllEvents.push(1)
            abort()
          }
        },
      },
    })
    t.deepEqual(result.data, insertPayload)
  } catch (error) {
    t.fail(JSON.stringify(error))
  }
  t.is(ranAllEvents.length, 2)
})
