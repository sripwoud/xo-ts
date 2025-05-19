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

  it('returns a Result', async () => {
    const method = 'GET'
    const url = `${URL}/foo`
    const data = { id: 1, value: 'val' }
    spyFetch.mockImplementation((async () => new Response(JSON.stringify(data))) as unknown as typeof fetch)

    const result = await fetchResult(url, method, new None())

    expect(result.isOkAnd((inner) => inner === data))
    expect(spyFetch).toHaveBeenCalledTimes(1)
    expect(spyFetch.mock.calls[0]).toEqual([url, { method: 'GET' }])
  })
})
