import type { AbstractAsset } from '@exodus/asset-types'

export type ApiKey = string
export type BaseUrl = `https://${string}.${string}`
export type Version = 1 | 2 | 3
export interface Config {
  apiKey: ApiKey
  baseUrl?: BaseUrl
  version?: Version
}

export type PairId = `${AbstractAsset['ticker']}_${AbstractAsset['ticker']}`
export type OrderId = string
export type TransactionId = string
export type Networks = Array<AbstractAsset['baseAssetName']>
export type Format = 'csv' | 'json'
export type Limit = number
export type Page = number
