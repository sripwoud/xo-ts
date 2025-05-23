import { None, Some } from '@hazae41/option'
import { Err, Ok } from '@hazae41/result'
import type { Getter, Setter } from 'jotai'
import { Xo } from '../../../../pkgs/xoswap/src/index.js'
import type { ApiError, Asset, DemoPaymentData, SwapQuote } from '../domain.js'
import { SwapStep } from '../domain.js'
import { ASCIIQRCodeService, generateMockOrderId, getMockDepositAddress } from '../infrastructure/qrCodeService.js'
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
export const loadAssetsAction = (get: Getter, set: Setter) => {
  return async () => {
    set(isLoadingAtom, true)
    set(errorAtom, null)

    try {
      const result = await xoClient.getAssets(new None())

      if (result.isOk()) {
        const assets = result.inner()
        set(assetsAtom, assets)
        return new Ok(assets)
      }
      const error = result.inner()
      const errorMessage = `Failed to load assets: ${error.details || error.code}`
      set(errorAtom, errorMessage)
      return new Err({ code: error.code, message: errorMessage })
    } catch (error) {
      const errorMessage = `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
      set(errorAtom, errorMessage)
      return new Err({ code: 'NETWORK_ERROR', message: errorMessage })
    } finally {
      set(isLoadingAtom, false)
    }
  }
}

export const loadPairsAction = (get: Getter, set: Setter) => {
  return async () => {
    set(isLoadingAtom, true)
    set(errorAtom, null)

    try {
      const result = await xoClient.getPairs()

      if (result.isOk()) {
        const pairs = result.inner()
        set(availablePairsAtom, pairs)
        return new Ok(pairs)
      }
      const error = result.inner()
      const errorMessage = `Failed to load pairs: ${error.details || error.code}`
      set(errorAtom, errorMessage)
      return new Err({ code: error.code, message: errorMessage })
    } catch (error) {
      const errorMessage = `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
      set(errorAtom, errorMessage)
      return new Err({ code: 'NETWORK_ERROR', message: errorMessage })
    } finally {
      set(isLoadingAtom, false)
    }
  }
}

export const generateQuoteAction = (get: Getter, set: Setter) => {
  return async () => {
    const sellAsset = get(sellAssetAtom)
    const receiveAsset = get(receiveAssetAtom)
    const sellAmount = get(sellAmountAtom)

    if (!sellAsset || !receiveAsset || !sellAmount) {
      const errorMessage = 'Missing required data for quote generation'
      set(errorAtom, errorMessage)
      return new Err({ code: 'VALIDATION_ERROR', message: errorMessage })
    }

    set(isLoadingAtom, true)
    set(errorAtom, null)

    try {
      const pairId = `${sellAsset.symbol}_${receiveAsset.symbol}` as const
      const result = await xoClient.getRates(pairId)

      if (result.isOk()) {
        const rates = result.inner()

        if (rates.length === 0) {
          const errorMessage = `No rates available for ${sellAsset.symbol} to ${receiveAsset.symbol}`
          set(errorAtom, errorMessage)
          return new Err({ code: 'NO_RATES', message: errorMessage })
        }

        // Use the first available rate
        const rate = rates[0]
        const sellAmountNum = Number(sellAmount)
        const receiveAmountNum = sellAmountNum * rate.amount.value

        const quote: SwapQuote = {
          fromAsset: sellAsset,
          toAsset: receiveAsset,
          fromAmount: sellAmount,
          toAmount: receiveAmountNum.toString(),
          rate: rate,
          expiresAt: rate.expiry,
        }

        set(currentQuoteAtom, quote)
        return new Ok(quote)
      }
      const error = result.inner()
      const errorMessage = `Failed to get rates: ${error.details || error.code}`
      set(errorAtom, errorMessage)
      return new Err({ code: error.code, message: errorMessage })
    } catch (error) {
      const errorMessage = `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
      set(errorAtom, errorMessage)
      return new Err({ code: 'NETWORK_ERROR', message: errorMessage })
    } finally {
      set(isLoadingAtom, false)
    }
  }
}

export const generateDemoPaymentAction = (get: Getter, set: Setter) => {
  return async () => {
    const sellAsset = get(sellAssetAtom)
    const sellAmount = get(sellAmountAtom)

    if (!sellAsset || !sellAmount) {
      const errorMessage = 'Missing required data for demo payment generation'
      set(errorAtom, errorMessage)
      return new Err({ code: 'VALIDATION_ERROR', message: errorMessage })
    }

    set(isLoadingAtom, true)
    set(errorAtom, null)

    try {
      // Generate mock deposit address and QR code
      const depositAddress = getMockDepositAddress(sellAsset.symbol)
      const orderId = generateMockOrderId()
      const qrCode = await qrService.generateQRCode(depositAddress)

      const demoPayment: DemoPaymentData = {
        depositAddress,
        amount: sellAmount,
        asset: sellAsset,
        qrCode,
        orderId,
      }

      set(demoDepositAddressAtom, depositAddress)
      set(demoQrCodeAtom, qrCode)
      set(currentStepAtom, SwapStep.DEMO_PAYMENT)

      return new Ok(demoPayment)
    } catch (error) {
      const errorMessage = `Failed to generate demo payment: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
      set(errorAtom, errorMessage)
      return new Err({ code: 'DEMO_ERROR', message: errorMessage })
    } finally {
      set(isLoadingAtom, false)
    }
  }
}

// Simple action creators for state updates
export const setSellAmountAction = (get: Getter, set: Setter) => {
  return (amount: string) => {
    set(sellAmountAtom, amount)
    set(errorAtom, null) // Clear any previous errors
  }
}

export const setSellAssetAction = (get: Getter, set: Setter) => {
  return (asset: Asset) => {
    set(sellAssetAtom, asset)
    set(currentQuoteAtom, null) // Clear quote when asset changes
    set(errorAtom, null)
  }
}

export const setReceiveAssetAction = (get: Getter, set: Setter) => {
  return (asset: Asset) => {
    set(receiveAssetAtom, asset)
    set(currentQuoteAtom, null) // Clear quote when asset changes
    set(errorAtom, null)
  }
}

export const setReceiveAddressAction = (get: Getter, set: Setter) => {
  return (address: string) => {
    set(receiveAddressAtom, address)
    set(errorAtom, null)
  }
}

export const setCurrentStepAction = (get: Getter, set: Setter) => {
  return (step: SwapStep) => {
    set(currentStepAtom, step)
    set(errorAtom, null)
  }
}

export const clearErrorAction = (get: Getter, set: Setter) => {
  return () => {
    set(errorAtom, null)
  }
}
