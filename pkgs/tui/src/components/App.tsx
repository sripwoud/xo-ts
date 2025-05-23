import { Some } from '@hazae41/option'
import { loadAssetsAction } from 'a/swapActions.js'
import {
  assetsAtom,
  availableReceiveAssetsAtom,
  availableSellAssetsAtom,
  canProceedToInputAddressAtom,
  canProceedToReviewAtom,
  canProceedToSelectReceiveAssetAtom,
  canProceedToSelectSellAssetAtom,
  currentStepAtom,
  errorAtom,
  isLoadingAtom,
  receiveAddressAtom,
  receiveAssetAtom,
  sellAmountAtom,
  sellAssetAtom,
} from 'a/swapAtoms.js'
import { COLORS, SwapStep } from 'domain.js'
import type { Asset } from 'domain.js'
import { Box, Text, useInput } from 'ink'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { AssetsTable } from './AssetsTable.js'
import { InputComponent } from './InputComponent.js'

export function App() {
  const currentStep = useAtomValue(currentStepAtom)
  const isLoading = useAtomValue(isLoadingAtom)
  const error = useAtomValue(errorAtom)

  return (
    <Box flexDirection='column' padding={1}>
      {/* Header */}
      <Box marginBottom={1}>
        <Text color={COLORS.PRIMARY} bold>
          🔄 XOSwap TUI - Cryptocurrency Exchange Terminal
        </Text>
      </Box>

      {/* Loading indicator */}
      {isLoading && (
        <Box marginBottom={1}>
          <Text color={COLORS.WARNING}>⏳ Loading...</Text>
        </Box>
      )}

      {/* Error display */}
      {error.isSome() && (
        <Box marginBottom={1} borderStyle='round' borderColor={COLORS.ERROR} padding={1}>
          <Text color={COLORS.ERROR}>❌ Error: {error.get()}</Text>
        </Box>
      )}

      {/* Current step indicator */}
      <Box marginBottom={1}>
        <Text color={COLORS.MUTED}>Current Step:</Text>
        <Text color={COLORS.ACCENT} bold>
          {getStepDisplayName(currentStep)}
        </Text>
      </Box>

      {/* Main content area */}
      <Box flexDirection='column'>
        {renderStepContent(currentStep)}
      </Box>

      {/* Footer */}
      <Box marginTop={2} borderStyle='single' borderColor={COLORS.MUTED} padding={1}>
        <Text color={COLORS.MUTED}>
          Use Tab to navigate • Enter to confirm • Ctrl+C to exit
        </Text>
      </Box>
    </Box>
  )
}

function getStepDisplayName(step: SwapStep): string {
  switch (step) {
    case SwapStep.INPUT_AMOUNT:
      return 'Enter Amount to Sell'
    case SwapStep.SELECT_SELL_ASSET:
      return 'Select Asset to Sell'
    case SwapStep.SELECT_RECEIVE_ASSET:
      return 'Select Asset to Receive'
    case SwapStep.INPUT_ADDRESS:
      return 'Enter Receive Address'
    case SwapStep.REVIEW_QUOTE:
      return 'Review Quote'
    case SwapStep.DEMO_PAYMENT:
      return 'Demo Payment Instructions'
    default:
      return 'Unknown Step'
  }
}

function renderStepContent(step: SwapStep) {
  switch (step) {
    case SwapStep.INPUT_AMOUNT:
      return <AmountInputStep />

    case SwapStep.SELECT_SELL_ASSET:
      return <SellAssetSelectionStep />

    case SwapStep.SELECT_RECEIVE_ASSET:
      return <ReceiveAssetSelectionStep />

    case SwapStep.INPUT_ADDRESS:
      return <AddressInputStep />

    case SwapStep.REVIEW_QUOTE:
      return (
        <Box flexDirection='column'>
          <Text color={COLORS.PRIMARY}>📊 Review your swap quote:</Text>
          <Box marginTop={1}>
            <Text color={COLORS.SECONDARY}>
              [Quote review component will be implemented next]
            </Text>
          </Box>
        </Box>
      )

    case SwapStep.DEMO_PAYMENT:
      return (
        <Box flexDirection='column'>
          <Text color={COLORS.PRIMARY}>💳 Demo Payment Instructions:</Text>
          <Box marginTop={1}>
            <Text color={COLORS.SECONDARY}>
              [QR code and payment instructions will be implemented next]
            </Text>
          </Box>
        </Box>
      )

    default:
      return (
        <Box>
          <Text color={COLORS.ERROR}>Unknown step: {step}</Text>
        </Box>
      )
  }
}

function AmountInputStep() {
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

function SellAssetSelectionStep() {
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

function ReceiveAssetSelectionStep() {
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

function AddressInputStep() {
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
