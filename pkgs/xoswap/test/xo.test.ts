import { None, Option } from '@hazae41/option'
import { afterAll, beforeEach, describe, expect, it, spyOn } from 'bun:test'
import type { Asset, Pair, Rate } from 'types.js'
import { Xo } from 'xo.js'

const APP_NAME = 'xoswap-sdk-test'
const BASE_URL = 'https://test.exodus.io'
const VERSION = 3

describe('Xo', () => {
  let xo: Xo

  const spyFetch = spyOn(globalThis, 'fetch')

  // biome-ignore lint/suspicious/noExplicitAny:
  const mockRes = (res: any) => {
    spyFetch.mockResolvedValue(new Response(JSON.stringify(res)))
  }

  beforeEach(() => {
    xo = new Xo({ appName: APP_NAME, baseUrl: BASE_URL, version: VERSION })
    spyFetch.mockReset()
  })

  afterAll(() => {
    spyFetch.mockRestore()
  })

  describe('getAssets', async () => {
    it('should return assets matching query parameters', async () => {
      const query = 'WXMR'
      const expectedAssets: Asset[] = [
        {
          id: 'WXMRethereum532ACF8B',
          name: 'Wrapped Monero',
          network: 'ethereum',
          decimals: 18,
          symbol: query,
          meta: {
            contractAddress: '0x465e07d6028830124be2e4aa551fbe12805db0f5',
          },
          ethereum: {
            contractAddress: '0x465e07d6028830124be2e4aa551fbe12805db0f5',
          },
        },
      ]
      mockRes(expectedAssets)

      const ops = Option.wrap({
        query: Option.wrap(query),
        limit: new None(),
        page: new None(),
        networks: new None(),
        format: new None(),
      })
      const assets = await xo.getAssets(ops)

      expect(assets.isOk()).toBeTrue()
      expect(assets.getOrThrow()).toEqual(expectedAssets)
      expect(spyFetch).toHaveBeenCalledTimes(1)
      expect(spyFetch).toHaveBeenNthCalledWith(
        1,
        `${BASE_URL}/v${VERSION}/assets?query=${query}`,
        { method: 'GET' },
      )
    })
  })

  describe('getAsset', async () => {
    it('should return a single asset', async () => {
      const expectedAsset: Asset = {
        id: 'ETH',
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
        network: 'ethereum',
      }
      mockRes(expectedAsset)

      const assets = await xo.getAsset('ETH')

      expect(assets.isOk()).toBeTrue()
      expect(assets.getOrThrow()).toEqual(expectedAsset)
      expect(spyFetch).toHaveBeenCalledTimes(1)
      expect(spyFetch).toHaveBeenNthCalledWith(
        1,
        `${BASE_URL}/v${VERSION}/assets/ETH`,
        { method: 'GET' },
      )
    })
  })

  describe('getPair', async () => {
    it('should return a single pair', async () => {
      const pairId = 'BTC_ETH'
      const expectedPair: Pair = {
        id: 'BTC_ETH',
        from: 'BTC',
        to: 'ETH',
      }
      mockRes(expectedPair)

      const pair = await xo.getPair(pairId)
      expect(pair.isOk()).toBeTrue()
      expect(pair.getOrThrow()).toEqual(expectedPair)
      expect(spyFetch).toHaveBeenCalledTimes(1)
      expect(spyFetch).toHaveBeenNthCalledWith(
        1,
        `${BASE_URL}/v${VERSION}/pairs/${pairId}`,
        { method: 'GET' },
      )
    })
  })

  describe('getPairs', async () => {
    it('should return all pairs', async () => {
      const expectedPairs: Pair[] = [
        {
          id: 'BTC_ETH',
          from: 'BTC',
          to: 'ETH',
        },
        {
          id: 'ETH_USDT',
          from: 'ETH',
          to: 'USDT',
        },
      ]
      mockRes(expectedPairs)

      const pairs = await xo.getPairs()

      expect(
        pairs.isOkAndSync((pairs) =>
          [
            pairs.length === 2,
            pairs[0]?.id === 'BTC_ETH',
            pairs[1]?.to === 'USDT',
          ]
            .every(Boolean)
        ),
      )
        .toBeTrue()
      expect(spyFetch).toHaveBeenCalledTimes(1)
      expect(spyFetch).toHaveBeenNthCalledWith(
        1,
        `${BASE_URL}/v${VERSION}/pairs`,
        { method: 'GET' },
      )
    })
  })

  describe('getRates', async () => {
    it('should return rates', async () => {
      const pairId = 'BTC_ETH'
      const expectedRates: [Rate] = [
        {
          amount: {
            assetId: 'ETH',
            value: 41.20061960723526,
          },
          expiry: 1747820930000,
          id: 'FotH4ox7AEbuOI9n&1QFK*@p8*UMxR',
          max: {
            assetId: 'BTC',
            value: 3.65452229,
          },
          min: {
            assetId: 'BTC',
            value: 0.00048508,
          },
          minerFee: {
            assetId: 'ETH',
            value: 0.00033445,
          },
          pairId,
        },
      ]
      mockRes(expectedRates)

      const rates = await xo.getRates(pairId)

      expect(rates.isOk()).toBeTrue()
      expect(rates.getOrThrow()[0]).toEqual(expectedRates[0])
      expect(spyFetch).toHaveBeenCalledTimes(1)
      expect(spyFetch).toHaveBeenNthCalledWith(
        1,
        `${BASE_URL}/v${VERSION}/pairs/${pairId}/rates`,
        { method: 'GET' },
      )
    })
  })

  describe('getOrder', async () => {
    it('should return a single order', async () => {
      const orderId = 'AROzE5pqalJ1nVY'
      const expectedOrder = {
        amount: {
          assetId: 'ADA',
          value: '80.399425',
        },
        toAmount: {
          assetId: 'ONG',
          value: '128.29640407',
        },
        createdAt: '2022-02-03T19:47:13.552Z',
        fromAddress:
          'addr1qx6m996k6sh8qut785u80jkljfvsegd7zn38457xs22zkx94k2t4d4pwwpchu0fcwl9dlyjepjsmu98z0tfudq559vvqnu2xhu',
        fromTransactionId: '',
        id: 'AROzE5pqalJ1nVY',
        message: '',
        pairId: 'ADA_ONG',
        payInAddress:
          'DdzFFzCqrhsyrKUEMiGPHQJVgzq7dkihDd1ZmGY9C2jDBJjyL8RwQGrshPy2gZ89JWQj99WurfJnwucwgF7t3gqe8DhpGT9BFgqraAuR',
        providerOrderId: '',
        rateId: '',
        toAddress: 'APS2zJaFxJCKe53FSTeNrhrtCZFt68XEtF',
        toTransactionId: '',
        updatedAt: '2022-02-03T19:47:13.552Z',
        status: 'inProgress',
        extraFeatures: {
          stringAmounts: 'true',
        },
      }
      mockRes(expectedOrder)

      const order = await xo.getOrder(orderId)

      expect(order.isOk()).toBe(true)
      expect(order.getOrThrow()).toEqual(expectedOrder)
      expect(spyFetch).toHaveBeenCalledTimes(1)
      expect(spyFetch).toHaveBeenNthCalledWith(
        1,
        `${BASE_URL}/v${VERSION}/orders/${orderId}`,
        { method: 'GET' },
      )
    })
  })

  describe('createOrder', async () => {
    it.todo('should create order')
  })

  describe('updateOrder', async () => {
    it.todo('should update order')
  })
})
