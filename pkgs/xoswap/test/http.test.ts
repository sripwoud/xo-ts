import { None, Option } from '@hazae41/option'
import { afterAll, beforeEach, describe, expect, it, spyOn } from 'bun:test'
import { buildUrlSearchParams, fetchResult } from 'src/http.js'

const URL = 'https://example.com'

describe('fetchResult', () => {
  const spyFetch = spyOn(globalThis, 'fetch')

  beforeEach(() => {
    spyFetch.mockReset()
  })
  afterAll(() => {
    spyFetch.mockRestore()
  })

  it('should be Ok for ok response', async () => {
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

  it('should be Err for non ok response', async () => {
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

describe('buildUrlSearchParams', () => {
  it('should return an empty string for a None Option', () => {
    const ops = new None()
    expect(buildUrlSearchParams(ops)).toBe('')
  })

  it('should return an empty string for an Option containing an empty record', () => {
    const ops = Option.wrap({})
    expect(buildUrlSearchParams(ops)).toBe('')
  })

  it('should build correct params for a single string parameter', () => {
    const ops = Option.wrap({
      query: Option.wrap('it'),
    })
    expect(buildUrlSearchParams(ops)).toBe('query=it')
  })

  it('should build correct params for a single number parameter', () => {
    const ops = Option.wrap({
      limit: Option.wrap(10),
    })
    expect(buildUrlSearchParams(ops)).toBe('limit=10')
  })

  it('should build correct params for an array of strings parameter', () => {
    const ops = Option.wrap({
      networks: Option.wrap(['eth', 'sol']),
    })
    expect(buildUrlSearchParams(ops)).toBe('networks=eth%2Csol') // Note: comma is URL-encoded
  })

  it('should build correct params for multiple mixed parameters', () => {
    const ops = Option.wrap({
      query: Option.wrap('search term'),
      limit: Option.wrap(50),
      networks: Option.wrap(['btc', 'eth']),
    })
    const result = buildUrlSearchParams(ops)

    expect(result).toContain('query=search+term') // Space is encoded as '+' by URLSearchParams
    expect(result).toContain('limit=50')
    expect(result).toContain('networks=btc%2Ceth')
    expect(result.split('&').length).toBe(3) // Ensure all three are present
  })

  it('should ignore parameters with inner None values', () => {
    const ops = Option.wrap({
      query: Option.wrap('active'),
      format: new None(),
      page: Option.wrap(1),
    })
    const result = buildUrlSearchParams(ops)

    expect(result).toContain('query=active')
    expect(result).toContain('page=1')
    expect(result).not.toContain('format')
    expect(result.split('&').length).toBe(2)
  })

  it('should handle empty array parameter', () => {
    const ops = Option.wrap({
      tags: Option.wrap([]),
    })
    expect(buildUrlSearchParams(ops)).toBe('tags=')
  })

  it('should handle number 0 parameter', () => {
    const ops = Option.wrap({
      count: Option.wrap(0),
    })
    expect(buildUrlSearchParams(ops)).toBe('count=0')
  })
})
