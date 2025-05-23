import { Some } from '@hazae41/option'
import { SwapStep } from 'domain.js'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { canProceedToReviewAtom, currentStepAtom, receiveAddressAtom } from 'state/swapAtoms'
import { InputComponent } from 'ui/inputs/InputComponent'

export function ReceiveAddressInput() {
  const [receiveAddress, setReceiveAddress] = useAtom(receiveAddressAtom)
  const setCurrentStep = useSetAtom(currentStepAtom)
  const canProceed = useAtomValue(canProceedToReviewAtom)

  const handleSubmit = () => {
    if (canProceed)
      setCurrentStep(SwapStep.REVIEW_QUOTE)
  }

  return (
    <InputComponent
      label='🏠 Enter your receive address:'
      value={receiveAddress.isSome() ? receiveAddress.inner : ''}
      placeholder='Enter wallet address where you want to receive assets'
      onChange={(value) => setReceiveAddress(new Some(value))}
      onSubmit={handleSubmit}
      error={!canProceed && receiveAddress.isSome() ? 'Please enter a valid address' : undefined}
    />
  )
}
