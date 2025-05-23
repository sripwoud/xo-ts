import { Some } from '@hazae41/option'
import { SwapStep } from 'domain.js'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { availableSellAssetsAtom, currentStepAtom, receiveAssetAtom, sellAssetAtom } from 'state/swapAtoms'
import type { Asset } from 'types'
import { AssetsTable } from 'ui/AssetsTable'

export function SellAssetSelect() {
  const assets = useAtomValue(availableSellAssetsAtom)
  const [sellAsset, setSellAsset] = useAtom(sellAssetAtom)
  const receiveAsset = useAtomValue(receiveAssetAtom)
  const setCurrentStep = useSetAtom(currentStepAtom)

  // Load assets on mount
  useEffect(() => {
    // TODO: Load assets from API
    // For now, we'll use mock data
  }, [])

  const handleSelectAsset = (asset: Asset) => {
    setSellAsset(new Some(asset))
    setCurrentStep(SwapStep.SELECT_RECEIVE_ASSET)
  }

  return (
    <AssetsTable
      assets={assets}
      selectedSellAsset={sellAsset.isSome() ? sellAsset.inner : null}
      selectedReceiveAsset={receiveAsset.isSome() ? receiveAsset.inner : null}
      onSelectAsset={handleSelectAsset}
      selectionType='sell'
    />
  )
}
