import { None } from '@hazae41/option'
import { atom } from 'jotai'
import type { SwapState } from '../domain.js'
import { SwapStep } from '../domain.js'

// Initial state for the swap application
const initialSwapState: SwapState = {
  sellAmount: new None(),
  sellAsset: new None(),
  receiveAsset: new None(),
  receiveAddress: new None(),
  assets: [],
  availablePairs: [],
  currentQuote: new None(),
  currentStep: SwapStep.INPUT_AMOUNT,
  isLoading: false,
  error: new None(),
  demoDepositAddress: new None(),
  demoQrCode: new None(),
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
export const canProceedToSelectSellAssetAtom = atom((get) =>
  get(sellAmountAtom).isSomeAnd(amount => amount.length > 0 && !Number.isNaN(Number(amount)) && Number(amount) > 0)
)

export const canProceedToSelectReceiveAssetAtom = atom((get) => get(sellAssetAtom).isSome())

export const canProceedToInputAddressAtom = atom((get) =>
  get(receiveAssetAtom).zip(get(sellAssetAtom)).isSomeAnd(([receiveAssetValue, sellAssetValue]) =>
    receiveAssetValue.id !== sellAssetValue.id
  )
)

export const canProceedToReviewAtom = atom((get) => get(receiveAddressAtom).isSomeAnd(address => address.length > 0))

export const canGenerateQuoteAtom = atom((get) => {
  get(sellAssetAtom).zip(get(receiveAssetAtom)).zip(get(sellAmountAtom)).isSomeAnd(amount =>
    amount.length > 0 && !Number.isNaN(Number(amount)) && Number(amount) > 0
  )
})

// Available assets filtered by current selection
export const availableSellAssetsAtom = atom((get) => {
  const assets = get(assetsAtom)
  const receiveAsset = get(receiveAssetAtom)

  return receiveAsset.mapOr(assets, selectedAsset => assets.filter(asset => asset.id !== selectedAsset.id))
})

export const availableReceiveAssetsAtom = atom((get) => {
  const assets = get(assetsAtom)
  const sellAsset = get(sellAssetAtom)

  return sellAsset.mapOr(assets, selectedAsset => assets.filter(asset => asset.id !== selectedAsset.id))
})

// Reset action atom
export const resetSwapAtom = atom(null, (_get, set) => {
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
