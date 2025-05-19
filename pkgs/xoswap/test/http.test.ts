import { None } from '@hazae41/option'
import { afterAll, beforeEach, describe, expect, it, spyOn } from 'bun:test'
import { fetchResult } from 'src/http.js'

const URL = 'https://example.com'

describe('fetchResult', () => {
  const spyFetch = spyOn(globalThis, 'fetch')

  beforeEach(() => {
    spyFetch.mockReset()
  })
  afterAll(() => {
    spyFetch.mockRestore()
  })

  it('is Ok for ok response', async () => {
    const method = 'GET'
    const url = `${URL}/foo`
    const data = { ok: true, id: 1, value: 'val' }
    spyFetch.mockImplementation(
      (async () => new Response(JSON.stringify(data))) as unknown as typeof fetch,
    )

    const result = await fetchResult(url, method, new None())

    expect(result.isOk())
    expect(result.getOrThrow()).toEqual(data)
    expect(spyFetch).toHaveBeenCalledTimes(1)
    expect(spyFetch.mock.calls[0]).toEqual([url, { method }])
  })

  it('is Err for non ok response', async () => {
    const method = 'GET'
    const url = `${URL}/foo`
    const status = 400
    const err = {
      code: 'unauthorized',
      details: 'missing auth',
      status,
    }
    spyFetch.mockImplementation(
      (async () =>
        new Response(JSON.stringify(err), {
          status,
        })) as unknown as typeof fetch,
    )

    const result = await fetchResult(url, method, new None())

    expect(result.isErr()).toBeTrue()
    expect(result.getErrOrThrow()).toEqual(err)
    expect(spyFetch).toHaveBeenCalledTimes(1)
    expect(spyFetch.mock.calls[0]).toEqual([url, { method }])
  })
})
