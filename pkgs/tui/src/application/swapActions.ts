import { None, Some } from '@hazae41/option'
import { Err, Ok, Result } from '@hazae41/result'
import { type Asset, type DemoPaymentData, type Pair, type Rate, type SwapQuote, SwapStep } from 'domain.js'
import type { Getter, Setter } from 'jotai'
import { Xo } from 'xoswap'

import { ASCIIQRCodeService, generateMockOrderId, getMockDepositAddress } from 'i/qrCodeService.js'
import {
  assetsAtom,
  availablePairsAtom,
  currentQuoteAtom,
  currentStepAtom,
  demoDepositAddressAtom,
  demoQrCodeAtom,
  errorAtom,
  isLoadingAtom,
  receiveAddressAtom,
  receiveAssetAtom,
  sellAmountAtom,
  sellAssetAtom,
} from './swapAtoms.js'

// Initialize services
const xoClient = new Xo({ appName: 'xoswap-tui' })
const qrService = new ASCIIQRCodeService()

// Action creators that return atoms for async operations
export const loadAssetsAction = (_get: Getter, set: Setter) => {
  return async () => {
    set(isLoadingAtom, true)
    set(errorAtom, new None())

    const result = await Result.runAndWrap(async () => {
      const apiResult = await xoClient.getAssets(new None())

      return apiResult
        .map((assets: Asset[]) => {
          set(assetsAtom, assets)
          return assets
        })
        // biome-ignore lint/suspicious/noExplicitAny: FIXME
        .mapErr((error: any) => {
          const errorMessage = `Failed to load assets: ${error.details || error.code}`
          set(errorAtom, new Some(errorMessage))
          return { code: 'API_ERROR', message: errorMessage }
        })
        .get()
    })

    set(isLoadingAtom, false)

    return result
      // biome-ignore lint/suspicious/noExplicitAny: FIXME
      .mapErr((error: any) => {
        const errorMessage = `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
        set(errorAtom, new Some(errorMessage))
        return { code: 'NETWORK_ERROR', message: errorMessage }
      })
  }
}

export const loadPairsAction = (_get: Getter, set: Setter) => {
  return async () => {
    set(isLoadingAtom, true)
    set(errorAtom, new None())

    const result = await Result.runAndWrap(async () => {
      const apiResult = await xoClient.getPairs()

      return apiResult
        .map((pairs: Pair[]) => {
          set(availablePairsAtom, pairs)
          return pairs
        })
        // biome-ignore lint/suspicious/noExplicitAny: FIXME
        .mapErr((error: any) => {
          const errorMessage = `Failed to load pairs: ${error.details || error.code}`
          set(errorAtom, new Some(errorMessage))
          return { code: 'API_ERROR', message: errorMessage }
        })
        .get()
    })

    set(isLoadingAtom, false)

    return result
      // biome-ignore lint/suspicious/noExplicitAny: FIXME
      .mapErr((error: any) => {
        const errorMessage = `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
        set(errorAtom, new Some(errorMessage))
        return { code: 'NETWORK_ERROR', message: errorMessage }
      })
  }
}

export const generateQuoteAction = (get: Getter, set: Setter) => {
  return async () => {
    const sellAsset = get(sellAssetAtom)
    const receiveAsset = get(receiveAssetAtom)
    const sellAmount = get(sellAmountAtom)

    // Check if all required data is available using functional approach
    if (sellAsset.isNone() || receiveAsset.isNone() || sellAmount.isNone()) {
      const errorMessage = 'Missing required data for quote generation'
      set(errorAtom, new Some(errorMessage))
      return new Err({ code: 'VALIDATION_ERROR', message: errorMessage })
    }

    // Extract values using get() since we've verified they exist
    const sellAssetValue = sellAsset.get()
    const receiveAssetValue = receiveAsset.get()
    const sellAmountValue = sellAmount.get()

    set(isLoadingAtom, true)
    set(errorAtom, new None())

    const result = await Result.runAndWrap(async () => {
      const pairId = `${sellAssetValue.symbol}_${receiveAssetValue.symbol}` as const
      const apiResult = await xoClient.getRates(pairId)

      return apiResult
        .andThen((rates: Rate[]) => {
          const ratesArray = rates
          if (ratesArray.length === 0) {
            const errorMessage = `No rates available for ${sellAssetValue.symbol} to ${receiveAssetValue.symbol}`
            set(errorAtom, new Some(errorMessage))
            return new Err({ code: 'NO_RATES', message: errorMessage })
          }

          // biome-ignore lint/style/noNonNullAssertion: safe since we checked length
          const rate = ratesArray[0]!
          const sellAmountNum = Number(sellAmountValue)
          const receiveAmountNum = sellAmountNum * rate.amount.value

          const quote: SwapQuote = {
            fromAsset: sellAssetValue,
            toAsset: receiveAssetValue,
            fromAmount: sellAmountValue,
            toAmount: receiveAmountNum.toString(),
            rate: rate,
            expiresAt: rate.expiry,
          }

          set(currentQuoteAtom, new Some(quote))
          return new Ok(quote)
        })
        // biome-ignore lint/suspicious/noExplicitAny: FIXME
        .mapErr((error: any) => {
          const errorMessage = `Failed to get rates: ${error.details || error.code}`
          set(errorAtom, new Some(errorMessage))
          return { code: 'API_ERROR', message: errorMessage }
        })
        .get()
    })

    set(isLoadingAtom, false)

    return result
      // biome-ignore lint/suspicious/noExplicitAny: FIXME
      .mapErr((error: any) => {
        const errorMessage = `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
        set(errorAtom, new Some(errorMessage))
        return { code: 'NETWORK_ERROR', message: errorMessage }
      })
  }
}

export const generateDemoPaymentAction = (get: Getter, set: Setter) => {
  return async () => {
    const sellAsset = get(sellAssetAtom)
    const sellAmount = get(sellAmountAtom)

    // Check if all required data is available using functional approach
    if (sellAsset.isNone() || sellAmount.isNone()) {
      const errorMessage = 'Missing required data for demo payment generation'
      set(errorAtom, new Some(errorMessage))
      return new Err({ code: 'VALIDATION_ERROR', message: errorMessage })
    }

    // Extract values using get() since we've verified they exist
    const sellAssetValue = sellAsset.get()
    const sellAmountValue = sellAmount.get()

    set(isLoadingAtom, true)
    set(errorAtom, new None())

    const result = await Result.runAndWrap(async () => {
      // Generate mock deposit address and QR code
      const depositAddress = getMockDepositAddress(sellAssetValue.symbol)
      const orderId = generateMockOrderId()

      // Use the helper method that handles the Result and returns a string directly
      const qrCode = await qrService.generateQRCodeWithFallback(depositAddress)

      const demoPayment: DemoPaymentData = {
        depositAddress,
        amount: sellAmountValue,
        asset: sellAssetValue,
        qrCode,
        orderId,
      }

      set(demoDepositAddressAtom, new Some(depositAddress))
      set(demoQrCodeAtom, new Some(qrCode))
      set(currentStepAtom, SwapStep.DEMO_PAYMENT)

      return demoPayment
    })

    set(isLoadingAtom, false)

    return result
      // biome-ignore lint/suspicious/noExplicitAny: FIXME
      .mapErr((error: any) => {
        const errorMessage = `Failed to generate demo payment: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
        set(errorAtom, new Some(errorMessage))
        return { code: 'DEMO_ERROR', message: errorMessage }
      })
  }
}

// Simple action creators for state updates
export const setSellAmountAction = (_get: Getter, set: Setter) => {
  return (amount: string) => {
    set(sellAmountAtom, new Some(amount))
    set(errorAtom, new None()) // Clear any previous errors
  }
}

export const setSellAssetAction = (_get: Getter, set: Setter) => {
  return (asset: Asset) => {
    set(sellAssetAtom, new Some(asset))
    set(currentQuoteAtom, new None()) // Clear quote when asset changes
    set(errorAtom, new None())
  }
}

export const setReceiveAssetAction = (_get: Getter, set: Setter) => {
  return (asset: Asset) => {
    set(receiveAssetAtom, new Some(asset))
    set(currentQuoteAtom, new None()) // Clear quote when asset changes
    set(errorAtom, new None())
  }
}

export const setReceiveAddressAction = (_get: Getter, set: Setter) => {
  return (address: string) => {
    set(receiveAddressAtom, new Some(address))
    set(errorAtom, new None())
  }
}

export const setCurrentStepAction = (_get: Getter, set: Setter) => {
  return (step: SwapStep) => {
    set(currentStepAtom, step)
    set(errorAtom, new None())
  }
}

export const clearErrorAction = (_get: Getter, set: Setter) => {
  return () => {
    set(errorAtom, new None())
  }
}
