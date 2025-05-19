import { None, Option, Some } from '@hazae41/option'
import type { Result } from '@hazae41/result'
import { buildPayload, buildUrlSearchParams, fetchResult } from './http.js'
import type {
  ApiKey,
  BaseUrl,
  Config,
  Format,
  Limit,
  Networks,
  OrderId,
  Page,
  PairId,
  TransactionId,
  Version,
} from './types.js'

const XO_URL = 'https://exchange.exodus.io'
const LAST_VERSION = 3

export class Xo {
  private apiKey: ApiKey
  private url: `${BaseUrl}/v${Version}/`

  constructor({ apiKey, baseUrl, version }: Config) {
    this.apiKey = apiKey
    this.url = `${baseUrl ?? XO_URL}/v${version ?? LAST_VERSION}/`
  }

  private async fetch<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PATCH',
    body: Option<Bun.BodyInit>,
  ): Promise<Result<T, Error>> {
    const options: RequestInit = {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
    }

    return fetchResult(
      `${this.url}${endpoint}`,
      method,
      Option.from(body.mapOrSync(options, (body) => ({ ...options, body }))),
    )
  }

  async getAsset(assetId: string) {
    return this.fetch<unknown>(`assets/${assetId}`, 'GET', new None())
  }

  async getAssets(
    ops: Option<{
      format: Option<Format>
      limit: Option<Limit>
      page: Option<Page>
      networks: Option<Networks>
      query: Option<string>
    }>,
  ) {
    return this.fetch<unknown>(
      `assets${buildUrlSearchParams(ops)}`,
      'GET',
      new None(),
    )
  }

  async createOrder(ops: {
    fromAmount: string
    fromAddress: string
    fromAddressTag: Option<string>
    toAmount: string
    toAddress: string
    toAddressTag: Option<string>
    pairId: string
    slippage: Option<string>
  }) {
    return this.fetch<unknown>(
      'orders',
      'POST',
      Some.create(buildPayload(ops)),
    )
  }
  async getOrder(orderId: OrderId) {
    return this.fetch<unknown>(`orders/${orderId}`, 'GET', new None())
  }

  async updateOrder({
    orderId,
    transactionId,
  }: {
    orderId: OrderId
    transactionId: TransactionId
  }) {
    return this.fetch<unknown>(
      `orders/${orderId}`,
      'PATCH',
      Some.create(JSON.stringify({ transactionId })),
    )
  }

  async getPairs() {
    return this.fetch<unknown>('pairs', 'GET', new None())
  }

  async getPair(pairId: PairId) {
    return this.fetch<unknown>(`pairs/${pairId}`, 'GET', new None())
  }

  async getRates(pairId: PairId) {
    return this.fetch<unknown>(`rates/${pairId}`, 'GET', new None())
  }
}
