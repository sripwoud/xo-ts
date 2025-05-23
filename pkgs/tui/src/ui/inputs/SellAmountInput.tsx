import { Some } from '@hazae41/option'
import { SwapStep } from 'domain.js'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { canProceedToSelectSellAssetAtom, currentStepAtom, sellAmountAtom } from 'state/swapAtoms'
import { InputComponent } from 'ui/inputs/InputComponent'

export function SellAmountInput() {
  const [sellAmount, setSellAmount] = useAtom(sellAmountAtom)
  const setCurrentStep = useSetAtom(currentStepAtom)
  const canProceed = useAtomValue(canProceedToSelectSellAssetAtom)

  const handleSubmit = () => {
    if (canProceed)
      setCurrentStep(SwapStep.SELECT_SELL_ASSET)
  }

  return (
    <InputComponent
      label='💰 Enter the amount you want to sell:'
      value={sellAmount.isSome() ? sellAmount.inner : ''}
      placeholder='0.1, 100, 1000'
      onChange={(value) => setSellAmount(new Some(value))}
      onSubmit={handleSubmit}
      type='number'
      error={!canProceed && sellAmount.isSome() ? 'Please enter a valid amount greater than 0' : undefined}
    />
  )
}
