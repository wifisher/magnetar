import { isArray, isPlainObject } from 'is-what'

export function throwIfEmulatedError(
  payload: Record<string, any> | Record<string, any>[] | string | string[] | void,
  storePluginOptions: { storeName: string } & { [key in string]: any }
): void {
  const { storeName } = storePluginOptions
  if (!payload) return
  if (isArray(payload) && !payload.length) return
  const payloadArray = !isArray(payload) ? [payload] : payload
  const shouldFail = payloadArray.some(
    (p) => p === storeName || (isPlainObject(p) && p.shouldFail === storeName)
  )
  if (!shouldFail) return
  const errorToThrow = {
    payload,
    message: 'failed',
  }
  throw errorToThrow
}
