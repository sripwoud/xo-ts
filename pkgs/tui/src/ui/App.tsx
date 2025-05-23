import { COLORS, SwapStep } from 'domain.js'
import { Box, Text } from 'ink'
import { useAtomValue } from 'jotai'
import { currentStepAtom, errorAtom, isLoadingAtom } from 'state/swapAtoms.js'

import { ReceiveAddressInput } from 'ui/inputs/ReceiveAddressInput'
import { ReceiveAssetSelect } from 'ui/inputs/ReceiveAssetSelect'
import { SellAmountInput } from 'ui/inputs/SellAmountInput'
import { SellAssetSelect } from 'ui/inputs/SellAssetSelect'

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
      return <SellAmountInput />

    case SwapStep.SELECT_SELL_ASSET:
      return <SellAssetSelect />

    case SwapStep.SELECT_RECEIVE_ASSET:
      return <ReceiveAssetSelect />

    case SwapStep.INPUT_ADDRESS:
      return <ReceiveAddressInput />

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
