// FIXME this is not mirrored in ExodusOSS and isn't a public package
// import type { AbstractAsset } from '@exodus/asset-types'
// TODO: resuse types defined in ExodusMovement/exchange-server

interface AbstractAsset {
  baseAssetName: string
  name: string
  ticker: string
}

export type AppName = string
export type BaseUrl = `https://${string}.${string}`
export type Version = 1 | 2 | 3
export interface Config {
  appName: AppName
  baseUrl?: BaseUrl
  version?: Version
}

export type AssetId = AbstractAsset['ticker']
export type PairId = `${AbstractAsset['ticker']}_${AbstractAsset['ticker']}`
export type Pair = { id: PairId; from: string; to: string }
export type OrderId = string
export type TransactionId = string
export type Networks = Array<AbstractAsset['baseAssetName']>
export type Format = 'csv' | 'json'
export type Limit = number
export type Page = number

export type ErrResponse = {
  code: string
  details: string
  status: number
}

export interface Rate {
  amount: { assetId: AssetId; value: number }
  expiry: number
  id: string
  max: { assetId: AssetId; value: number }
  min: { assetId: AssetId; value: number }
  minerFee: { assetId: AssetId; value: number }
  pairId: PairId
}

export interface Asset {
  id: string
  name: AbstractAsset['name']
  network: AbstractAsset['baseAssetName'] // or displayNetworkName
  decimals: number
  symbol: AbstractAsset['ticker'] // displayTicker ?
  meta?: Record<string, unknown>
  [key: string]: unknown
}

// https://github.com/ExodusMovement/exchange-server/blob/2c0f26815629d2c0533e55ee70f05a1a3bad064e/src/types/index.ts#L101
export enum OrderStatus {
  Awaiting = 'awaiting',
  Complete = 'complete',
  Delayed = 'delayed',
  Expired = 'expired',
  Inprogress = 'inProgress',
  Failed = 'failed',
  Refunded = 'refunded',
  Swapped = 'swapped',
}

// TODO incomplete,inaccurate, reuse https://github.com/ExodusMovement/exchange-server/blob/master/src/frontend/schemas/order.ts?
export interface Order {
  amount: { assetId: AssetId; value: string }
  toAmount: {
    assetId: AssetId
    value: string
  }
  createdAt: string
  fromAddress: string
  fromTransactionId: string
  id: OrderId
  message: string
  pairId: PairId
  payInAddress: string
  payInAddressTag?: string
  providerOrderId: string
  rateId: string
  toAddress: string
  toTransactionId: string
  toTransactionHash: string
  updatedAt: string
  status: OrderStatus
  extraFeatures: {
    pid?: string
    stringAmounts: string
  }
}
