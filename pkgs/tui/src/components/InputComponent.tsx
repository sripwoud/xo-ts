import { TextInput } from '@inkjs/ui'
import { COLORS } from 'domain.js'
import { Box, Text } from 'ink'

interface InputComponentProps {
  label: string
  value: string
  placeholder?: string
  onChange: (value: string) => void
  onSubmit?: () => void
  isActive?: boolean
  error?: string | undefined
  type?: 'text' | 'number'
}

export function InputComponent({
  label,
  value,
  placeholder = '',
  onChange,
  onSubmit,
  isActive = true,
  error,
  type = 'text',
}: InputComponentProps) {
  return (
    <Box flexDirection='column'>
      <Box marginBottom={1}>
        <Text color={COLORS.PRIMARY} bold>
          {label}
        </Text>
      </Box>

      <Box marginBottom={1}>
        <TextInput
          defaultValue={value}
          placeholder={placeholder}
          onSubmit={(inputValue) => {
            onChange(inputValue)
            onSubmit?.()
          }}
        />
      </Box>

      {error && (
        <Box marginTop={1}>
          <Text color={COLORS.ERROR}>⚠ {error}</Text>
        </Box>
      )}

      {isActive && (
        <Box marginTop={1}>
          <Text color={COLORS.MUTED}>
            Type to enter • Enter to continue • Ctrl+C to exit
          </Text>
        </Box>
      )}
    </Box>
  )
}
