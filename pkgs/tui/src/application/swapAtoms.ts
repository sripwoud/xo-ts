import { atom } from 'jotai'
import type { Asset, DemoPaymentData, Pair, SwapQuote, SwapState } from '../domain.js'
import { SwapStep } from '../domain.js'

// Initial state
const initialSwapState: SwapState = {
  // Input state
  sellAmount: '',
  sellAsset: null,
  receiveAsset: null,
  receiveAddress: '',

  // Data state
  assets: [],
  availablePairs: [],
  currentQuote: null,

  // UI state
  currentStep: SwapStep.INPUT_AMOUNT,
  isLoading: false,
  error: null,

  // Demo state
  demoDepositAddress: null,
  demoQrCode: null,
}

// Base atoms for individual pieces of state
export const sellAmountAtom = atom(initialSwapState.sellAmount)
export const sellAssetAtom = atom(initialSwapState.sellAsset)
export const receiveAssetAtom = atom(initialSwapState.receiveAsset)
export const receiveAddressAtom = atom(initialSwapState.receiveAddress)

export const assetsAtom = atom(initialSwapState.assets)
export const availablePairsAtom = atom(initialSwapState.availablePairs)
export const currentQuoteAtom = atom(initialSwapState.currentQuote)

export const currentStepAtom = atom(initialSwapState.currentStep)
export const isLoadingAtom = atom(initialSwapState.isLoading)
export const errorAtom = atom(initialSwapState.error)

export const demoDepositAddressAtom = atom(initialSwapState.demoDepositAddress)
export const demoQrCodeAtom = atom(initialSwapState.demoQrCode)

// Computed atoms
export const swapStateAtom = atom<SwapState>((get) => ({
  sellAmount: get(sellAmountAtom),
  sellAsset: get(sellAssetAtom),
  receiveAsset: get(receiveAssetAtom),
  receiveAddress: get(receiveAddressAtom),
  assets: get(assetsAtom),
  availablePairs: get(availablePairsAtom),
  currentQuote: get(currentQuoteAtom),
  currentStep: get(currentStepAtom),
  isLoading: get(isLoadingAtom),
  error: get(errorAtom),
  demoDepositAddress: get(demoDepositAddressAtom),
  demoQrCode: get(demoQrCodeAtom),
}))

// Derived atoms for validation and UI logic
export const canProceedToSelectSellAssetAtom = atom((get) => {
  const sellAmount = get(sellAmountAtom)
  return sellAmount.length > 0 && !Number.isNaN(Number(sellAmount)) && Number(sellAmount) > 0
})

export const canProceedToSelectReceiveAssetAtom = atom((get) => {
  const sellAsset = get(sellAssetAtom)
  return sellAsset !== null
})

export const canProceedToInputAddressAtom = atom((get) => {
  const receiveAsset = get(receiveAssetAtom)
  const sellAsset = get(sellAssetAtom)
  return receiveAsset !== null && sellAsset !== null && receiveAsset.id !== sellAsset.id
})

export const canProceedToReviewAtom = atom((get) => {
  const receiveAddress = get(receiveAddressAtom)
  return receiveAddress.length > 0
})

export const canGenerateQuoteAtom = atom((get) => {
  const sellAsset = get(sellAssetAtom)
  const receiveAsset = get(receiveAssetAtom)
  const sellAmount = get(sellAmountAtom)

  return sellAsset !== null
    && receiveAsset !== null
    && sellAmount.length > 0
    && !Number.isNaN(Number(sellAmount))
    && Number(sellAmount) > 0
})

// Available assets filtered by current selection
export const availableSellAssetsAtom = atom((get) => {
  const assets = get(assetsAtom)
  const receiveAsset = get(receiveAssetAtom)

  if (!receiveAsset) return assets

  // Filter out the currently selected receive asset
  return assets.filter(asset => asset.id !== receiveAsset.id)
})

export const availableReceiveAssetsAtom = atom((get) => {
  const assets = get(assetsAtom)
  const sellAsset = get(sellAssetAtom)

  if (!sellAsset) return assets

  // Filter out the currently selected sell asset
  return assets.filter(asset => asset.id !== sellAsset.id)
})

// Reset action atom
export const resetSwapAtom = atom(null, (get, set) => {
  set(sellAmountAtom, initialSwapState.sellAmount)
  set(sellAssetAtom, initialSwapState.sellAsset)
  set(receiveAssetAtom, initialSwapState.receiveAsset)
  set(receiveAddressAtom, initialSwapState.receiveAddress)
  set(currentQuoteAtom, initialSwapState.currentQuote)
  set(currentStepAtom, initialSwapState.currentStep)
  set(isLoadingAtom, initialSwapState.isLoading)
  set(errorAtom, initialSwapState.error)
  set(demoDepositAddressAtom, initialSwapState.demoDepositAddress)
  set(demoQrCodeAtom, initialSwapState.demoQrCode)
})
