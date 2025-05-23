import { Select } from '@inkjs/ui'
import { COLORS } from 'domain.js'
import type { Asset } from 'domain.js'
import { Box, Text } from 'ink'

interface AssetsTableProps {
  assets: Asset[]
  selectedSellAsset: Asset | null
  selectedReceiveAsset: Asset | null
  onSelectAsset: (asset: Asset, type: 'sell' | 'receive') => void
  isActive?: boolean
  selectionType: 'sell' | 'receive'
}

export function AssetsTable({
  assets,
  selectedSellAsset,
  selectedReceiveAsset,
  onSelectAsset,
  isActive = true,
  selectionType,
}: AssetsTableProps) {
  if (assets.length === 0) {
    return (
      <Box flexDirection='column'>
        <Text color={COLORS.MUTED}>No assets available</Text>
      </Box>
    )
  }

  const options = assets.map(asset => ({
    label: `${asset.symbol} - ${asset.name} (${asset.network})`,
    value: asset.id,
  }))

  const handleSelect = (selectedValue: string) => {
    const selectedAsset = assets.find(asset => asset.id === selectedValue)
    if (selectedAsset)
      onSelectAsset(selectedAsset, selectionType)
  }

  return (
    <Box flexDirection='column'>
      <Box marginBottom={1}>
        <Text color={COLORS.PRIMARY} bold>
          {selectionType === 'sell' ? '📤 Select asset to sell:' : '📥 Select asset to receive:'}
        </Text>
      </Box>

      <Select
        options={options}
        onChange={handleSelect}
      />

      {/* Legend */}
      <Box marginTop={2} flexDirection='column'>
        <Text color={COLORS.MUTED}>Current Selection:</Text>
        <Box>
          {selectedSellAsset && (
            <Text color={COLORS.ERROR}>
              Sell: {selectedSellAsset.symbol} ({selectedSellAsset.name})
            </Text>
          )}
          {selectedSellAsset && selectedReceiveAsset && <Text color={COLORS.MUTED}>→</Text>}
          {selectedReceiveAsset && (
            <Text color={COLORS.SUCCESS}>
              Receive: {selectedReceiveAsset.symbol} ({selectedReceiveAsset.name})
            </Text>
          )}
        </Box>
      </Box>
    </Box>
  )
}
