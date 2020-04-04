import test from 'ava'
import { createVueSyncInstance } from './helpers/createVueSyncInstance'
import { squirtle, bulbasaur, charmander, flareon } from './helpers/pokemon'
import { isArray } from 'is-what'

test('insert: emits before & success events', async t => {
  const { pokedexModule } = createVueSyncInstance()
  const insertPayload = squirtle
  let ranAllEvents = []
  const result = await pokedexModule.insert(insertPayload, {
    on: {
      local: {
        before: ({ payload }) => {
          // @ts-ignore
          t.deepEqual(payload, insertPayload)
          ranAllEvents.push(1)
          return payload
        },
        success: ({ payload }) => {
          // @ts-ignore
          t.deepEqual(payload, insertPayload)
          ranAllEvents.push(1)
        },
      },
      remote: {
        before: ({ payload }) => {
          // @ts-ignore
          t.deepEqual(payload, insertPayload)
          ranAllEvents.push(1)
          return payload
        },
        success: ({ payload }) => {
          // @ts-ignore
          t.deepEqual(payload, insertPayload)
          ranAllEvents.push(1)
        },
      },
    },
  })
  // @ts-ignore
  t.deepEqual(result, insertPayload)
  t.is(ranAllEvents.length, 4)
})

test('insert: can abort in before events', async t => {
  const { pokedexModule } = createVueSyncInstance()
  const insertPayload = squirtle
  const result = await pokedexModule.insert(insertPayload, {
    on: {
      local: {
        before: ({ payload, abort }) => {
          abort()
          return payload
        },
        success: () => { t.fail() }, // prettier-ignore
        error: () => { t.fail() } // prettier-ignore
      },
      remote: {
        before: () => { t.fail() } // prettier-ignore
      },
    },
  })
  // @ts-ignore
  t.deepEqual(result, insertPayload)
})

test('insert: can abort in success events', async t => {
  const { pokedexModule } = createVueSyncInstance()
  const insertPayload = squirtle
  let ranAllEvents = []
  const result = await pokedexModule.insert(insertPayload, {
    on: {
      local: {
        before: ({ payload }) => {
          ranAllEvents.push(1)
          return payload
        },
        success: ({ payload, abort }) => {
          ranAllEvents.push(1)
          abort()
        },
      },
      remote: {
        before: () => { t.fail() } // prettier-ignore
      },
    },
  })
  // @ts-ignore
  t.deepEqual(result, insertPayload)
  t.is(ranAllEvents.length, 2)
})

test('insert: can mutate payload via events -- should not carry over modification to payload over multiple stores', async t => {
  const { pokedexModule } = createVueSyncInstance()
  const insertPayload = squirtle
  t.is(pokedexModule.data.local['007'], undefined)
  const result = await pokedexModule.insert(insertPayload, {
    on: {
      local: {
        before: ({ payload }) => {
          // @ts-ignore
          t.deepEqual(payload, squirtle)
          return { ...payload, level: 1 }
        },
        success: ({ payload }) => {
          // @ts-ignore
          t.deepEqual(payload, { ...squirtle, level: 1 })
        },
      },
      remote: {
        before: ({ payload }) => {
          // @ts-ignore
          t.deepEqual(payload, squirtle)
          return { ...payload, trait: 'water resistance' }
        },
        success: ({ payload }) => {
          // @ts-ignore
          t.deepEqual(payload, { ...squirtle, trait: 'water resistance' })
        },
      },
    },
  })
  // @ts-ignore
  // should be the same payload as AFTER the "before event":
  t.deepEqual(pokedexModule.data.local['007'], { ...squirtle, level: 1 })
  // should be the same payload as AFTER the "succes event" of the last store:
  t.deepEqual(result, { ...squirtle, trait: 'water resistance' })
})

test('get: can mutate payload via events -- can apply defaults to remote data to be carried over to local store', async t => {
  // get resolves once all stores have given a response with data
  const { pokedexModule } = createVueSyncInstance()
  t.deepEqual(pokedexModule.data.local, { '001': bulbasaur })
  try {
    const result = await pokedexModule.get(
      {},
      {
        on: {
          local: {
            success: ({ result }) => {
              // here we check if the data returned at this point is actually what that store plugin should return
              t.deepEqual(result, [bulbasaur, charmander])
              t.deepEqual(pokedexModule.data.local, { '001': bulbasaur, '004': charmander })
            },
          },
          remote: {
            success: ({ result }) => {
              // here we check if the data returned at this point is actually what that store plugin should return
              t.deepEqual(result, [bulbasaur, flareon])
              if (!isArray(result)) return
              // can apply defaults to the remote data
              // return result.map(pokemon => ({ ...pokemon, seen: true }))
            },
          },
        },
      }
    )
    // the remote result SHOULD HAVE the applied defaults
    t.deepEqual(result, [
      { ...bulbasaur, seen: true },
      { ...flareon, seen: true },
    ])
  } catch (error) {
    t.fail(error)
  }
  // the local store should have updated its data to the whatever was returned in the remote success event (via the plugin's onNextStoresSuccess handler)
  // therefore: the local store SHOULD HAVE the applied defaults
  t.deepEqual(pokedexModule.data.local, {
    '001': { ...bulbasaur, seen: true },
    '136': { ...flareon, seen: true },
  })
})
