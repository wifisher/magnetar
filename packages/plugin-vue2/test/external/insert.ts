import test from 'ava'
import { createMagnetarInstance } from '../helpers/createMagnetarInstance'
import { pokedex, PokedexEntry } from '@magnetarjs/test-utils'
import { DocInstance } from '../../../core/src'

test('insert (document)', async (t) => {
  const { pokedexModule } = createMagnetarInstance()
  const payload = pokedex(7)
  t.deepEqual(pokedexModule.doc('7').data, undefined)

  try {
    await pokedexModule.doc('7').insert(payload)
  } catch (error) {
    t.fail(JSON.stringify(error))
  }

  t.deepEqual(pokedexModule.doc('7').data, payload)
})

test('insert (collection) → random ID', async (t) => {
  const { pokedexModule } = createMagnetarInstance()
  const payload = pokedex(7)

  let moduleFromResult: DocInstance<PokedexEntry>
  try {
    moduleFromResult = await pokedexModule.insert(payload)
  } catch (error) {
    return t.fail(JSON.stringify(error))
  }
  const newId = moduleFromResult.id
  t.deepEqual(pokedexModule.doc(newId).data, payload)
})

test('revert: insert (document)', async (t) => {
  const { pokedexModule } = createMagnetarInstance()
  const payload = { ...pokedex(7), shouldFail: 'remote' }
  t.deepEqual(pokedexModule.doc('7').data, undefined)

  try {
    await pokedexModule.doc('7').insert(payload, { onError: 'revert' })
  } catch (error) {
    t.truthy(error)
  }

  t.deepEqual(pokedexModule.doc('7').data, undefined)
})

test('revert: insert (collection) → random ID', async (t) => {
  const { pokedexModule } = createMagnetarInstance()
  const payload = { ...pokedex(7), shouldFail: 'remote' }

  try {
    await pokedexModule.insert(payload, { onError: 'revert' })
    t.fail()
  } catch (error) {
    t.truthy(error)
  }
  t.deepEqual(pokedexModule.doc('7').data, undefined)
})
