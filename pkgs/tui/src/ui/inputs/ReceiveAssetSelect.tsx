import { Some } from '@hazae41/option'
import { SwapStep } from 'domain.js'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { availableReceiveAssetsAtom, currentStepAtom, receiveAssetAtom, sellAssetAtom } from 'state/swapAtoms'
import type { Asset } from 'types'
import { AssetsTable } from 'ui/AssetsTable'

export function ReceiveAssetSelect() {
  const assets = useAtomValue(availableReceiveAssetsAtom)
  const sellAsset = useAtomValue(sellAssetAtom)
  const [receiveAsset, setReceiveAsset] = useAtom(receiveAssetAtom)
  const setCurrentStep = useSetAtom(currentStepAtom)

  const handleSelectAsset = (asset: Asset) => {
    setReceiveAsset(new Some(asset))
    setCurrentStep(SwapStep.INPUT_ADDRESS)
  }

  return (
    <AssetsTable
      assets={assets}
      selectedSellAsset={sellAsset.isSome() ? sellAsset.inner : null}
      selectedReceiveAsset={receiveAsset.isSome() ? receiveAsset.inner : null}
      onSelectAsset={handleSelectAsset}
      selectionType='receive'
    />
  )
}
