import { afterAll, beforeEach, describe, expect, it, spyOn } from "bun:test";
import { None } from "@hazae41/option";

import { Xo } from "src/xo.js";

const APP_NAME = "xoswap-sdk-test";
const BASE_URL = "https://test.exodus.io";
const VERSION = 3;

describe("Xo", () => {
  let xo: Xo;

  const spyFetch = spyOn(globalThis, "fetch");

  // biome-ignore lint/suspicious/noExplicitAny:
  const mockRes = (res: any) => {
    spyFetch.mockResolvedValue(new Response(JSON.stringify(res)));
  };

  beforeEach(() => {
    xo = new Xo({ appName: APP_NAME, baseUrl: BASE_URL, version: VERSION });
    spyFetch.mockReset();
  });

  afterAll(() => {
    spyFetch.mockRestore();
  });

  it("get assets", async () => {
    const expectedAssets = [
      {
        id: "ETH",
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18,
        network: "ethereum",
      },
      {
        id: "USDT",
        name: "Tether",
        symbol: "USDT",
        decimals: 6,
        network: "ethereum",
      },
    ];

    mockRes(expectedAssets);

    const assets = await xo.getAssets(new None());

    expect(assets.isOk()).toBeTrue();
    expect(assets.getOrThrow()).toEqual(expectedAssets);
    expect(spyFetch).toHaveBeenCalledTimes(1);
    expect(spyFetch.mock.calls[0]).toEqual([
      `${BASE_URL}/v${VERSION}/assets`,
      { method: "GET" },
    ]);
  });

  it.todo("get asset", async () => {});

  it("get pair", async () => {
    const pairId = "BTC_ETH";
    const expectedPair = {
      id: "BTC_ETH",
      from: "BTC",
      to: "ETH",
    };
    mockRes(expectedPair);

    const pair = await xo.getPair(pairId);
    expect(pair.isOk()).toBeTrue();
    expect(pair.getOrThrow()).toEqual(expectedPair);
    expect(spyFetch).toHaveBeenCalledTimes(1);
    expect(spyFetch.mock.calls[0]).toEqual([
      `${BASE_URL}/v${VERSION}/pairs/${pairId}`,
      { method: "GET" },
    ]);
  });

  it("gets pairs", async () => {
    mockRes([
      {
        id: "BTC_ETH",
        from: "BTC",
        to: "ETH",
      },
      {
        id: "ETH_USDT",
        from: "ETH",
        to: "USDT",
      },
    ]);

    const pairs = await xo.getPairs();
    expect(
      pairs.isOkAndSync((pairs) =>
        [
          pairs.length === 2,
          pairs[0]?.id === "BTC_ETH",
          pairs[1]?.to === "USDT",
        ].every(Boolean),
      ),
    ).toBeTrue();
    expect(spyFetch).toHaveBeenCalledTimes(1);
    expect(spyFetch.mock.calls[0]).toEqual([
      `${BASE_URL}/v${VERSION}/pairs`,
      { method: "GET" },
    ]);
  });

  it.todo("get rates");

  it.todo("get order");

  it.todo("create order");

  it.todo("update order");
});
