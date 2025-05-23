import type { Option } from '@hazae41/option'
import type { Asset, Pair, Rate } from 'xoswap'

// Re-export types from xoswap for convenience
export type { Asset, AssetId, Pair, PairId, Rate } from 'xoswap'

// TUI-specific domain types
export interface SwapQuote {
  fromAsset: Asset
  toAsset: Asset
  fromAmount: string
  toAmount: string
  rate: Rate
  expiresAt: number
}

export interface SwapState {
  // Input state
  sellAmount: Option<string>
  sellAsset: Option<Asset>
  receiveAsset: Option<Asset>
  receiveAddress: Option<string>

  // Data state
  assets: Asset[]
  availablePairs: Pair[]
  currentQuote: Option<SwapQuote>

  // UI state
  currentStep: SwapStep
  isLoading: boolean
  error: Option<string>

  // Demo state (for mocked payment flow)
  demoDepositAddress: Option<string>
  demoQrCode: Option<string>
}

export enum SwapStep {
  INPUT_AMOUNT = 'input_amount',
  SELECT_SELL_ASSET = 'select_sell_asset',
  SELECT_RECEIVE_ASSET = 'select_receive_asset',
  INPUT_ADDRESS = 'input_address',
  REVIEW_QUOTE = 'review_quote',
  DEMO_PAYMENT = 'demo_payment',
}

export interface DemoPaymentData {
  depositAddress: string
  amount: string
  asset: Asset
  qrCode: string
  orderId: string
}

// Error types
export interface ApiError {
  code: string
  message: string
  details?: string
}

export interface ValidationError {
  field: string
  message: string
}

// Action types for state management
export type SwapAction =
  | { type: 'SET_SELL_AMOUNT'; payload: string }
  | { type: 'SET_SELL_ASSET'; payload: Asset }
  | { type: 'SET_RECEIVE_ASSET'; payload: Asset }
  | { type: 'SET_RECEIVE_ADDRESS'; payload: string }
  | { type: 'SET_ASSETS'; payload: Asset[] }
  | { type: 'SET_PAIRS'; payload: Pair[] }
  | { type: 'SET_QUOTE'; payload: SwapQuote | null }
  | { type: 'SET_STEP'; payload: SwapStep }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_DEMO_PAYMENT'; payload: DemoPaymentData }
  | { type: 'RESET_SWAP' }

// UI Component props interfaces
export interface InputComponentProps {
  label: string
  value: string
  placeholder?: string
  onChange: (value: string) => void
  onSubmit?: () => void
  isActive?: boolean
  error?: string
}

export interface SelectComponentProps<T> {
  items: T[]
  selectedItem: T | null
  onSelect: (item: T) => void
  renderItem: (item: T, isSelected: boolean) => string
  isActive?: boolean
}

export interface AssetsTableProps {
  assets: Asset[]
  selectedSellAsset: Asset | null
  selectedReceiveAsset: Asset | null
  onSelectAsset: (asset: Asset, type: 'sell' | 'receive') => void
  isActive?: boolean
}

export interface QRDisplayProps {
  qrCode: string
  depositAddress: string
  amount: string
  asset: Asset
  orderId: string
}

// Company branding colors
export const COLORS = {
  PRIMARY: '#8044FF',
  SECONDARY: '#084679',
  ACCENT: '#BBFBE0',
  ERROR: '#FF4444',
  SUCCESS: '#44FF44',
  WARNING: '#FFAA44',
  MUTED: '#888888',
} as const
