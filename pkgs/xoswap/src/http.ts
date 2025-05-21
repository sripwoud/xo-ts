import { Option, type Some } from '@hazae41/option'
import { Err, Ok, type Result } from '@hazae41/result'
import type { ErrResponse } from './types'

/**
 * @param url
 * @param method
 * @param options
 * @returns
 */
export async function fetchResult<T>(
  url: string,
  method: 'GET' | 'POST' | 'PATCH',
  options: Option<RequestInit>,
): Promise<Result<T, ErrResponse>> {
  const response = await fetch(url, {
    method,
    ...options.getOr({}),
  })

  // TODO catch
  // TODO not necessarily json
  const data = await response.json()
  if (!response.ok) return Err.create(data as ErrResponse)

  return Ok.new(data as T)
}

export function buildUrlSearchParams(
  ops: Option<Record<string, Option<string | string[] | number>>>,
) {
  const params = new URLSearchParams()

  for (const [k, o] of Object.entries(ops.getOr({})).filter(([, o]) => o.isSome())) {
    const value = (o as Some<string | string[] | number>).get()

    if (Array.isArray(value)) params.set(k, value.join(','))
    else if (typeof value === 'number') params.set(k, String(value))
    else if (typeof value === 'string') params.set(k, value)
  }

  return params.toString()
}

export function buildPayload<
  T extends Record<string, Option<unknown> | unknown>,
>(ops: T) {
  const payload: Record<string, unknown> = {}
  for (const [k, o] of Object.entries(ops).filter(([, o]) => Option.wrap(o).isSome()))
    payload[k] = (o as Some<unknown>).get()
  return JSON.stringify(payload)
}
