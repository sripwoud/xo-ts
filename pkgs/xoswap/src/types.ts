import type { AbstractAsset } from "@exodus/asset-types";
// TODO: resuse types defined in ExodusMovement/exchange-server

export type AppName = string;
export type BaseUrl = `https://${string}.${string}`;
export type Version = 1 | 2 | 3;
export interface Config {
  appName: AppName;
  baseUrl?: BaseUrl;
  version?: Version;
}

export type PairId = `${AbstractAsset["ticker"]}_${AbstractAsset["ticker"]}`;
export type Pair = { id: PairId; from: string; to: string };
export type OrderId = string;
export type TransactionId = string;
export type Networks = Array<AbstractAsset["baseAssetName"]>;
export type Format = "csv" | "json";
export type Limit = number;
export type Page = number;

export type ErrResponse = {
  code: string;
  details: string;
  status: number;
};
