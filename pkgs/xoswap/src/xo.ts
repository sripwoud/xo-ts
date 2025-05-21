import { None, Option, Some } from '@hazae41/option'
import type { Result } from '@hazae41/result'
import { buildPayload, buildUrlSearchParams, fetchResult } from './http.js'
import type {
  AppName,
  Asset,
  BaseUrl,
  Config,
  ErrResponse,
  Format,
  Limit,
  Networks,
  OrderId,
  Page,
  Pair,
  PairId,
  Rate,
  TransactionId,
  Version,
} from './types.js'

const XO_URL = 'https://exchange.exodus.io'
const LAST_VERSION = 3

export class Xo {
  private appName: AppName
  private url: `${BaseUrl}/v${Version}/`

  constructor({ appName, baseUrl, version }: Config) {
    this.appName = appName
    this.url = `${baseUrl ?? XO_URL}/v${version ?? LAST_VERSION}/`
  }

  private async fetch<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PATCH',
    body: Option<Bun.BodyInit>,
  ): Promise<Result<T, ErrResponse>> {
    const options: RequestInit = {
      headers: {
        'App-Name': `${this.appName}`,
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
    return this.fetch<Asset>(`assets/${assetId}`, 'GET', new None())
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
    return this.fetch<Asset[]>(
      `assets?${buildUrlSearchParams(ops)}`,
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
    return this.fetch<Pair[]>('pairs', 'GET', new None())
  }

  async getPair(pairId: PairId) {
    return this.fetch<Pair>(`pairs/${pairId}`, 'GET', new None())
  }

  async getRates(pairId: PairId) {
    return this.fetch<Rate[]>(`pairs/${pairId}/rates`, 'GET', new None())
  }
}
