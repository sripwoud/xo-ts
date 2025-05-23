import QRCode from 'qrcode'
import type { Asset } from '../domain.js'

export interface QRCodeService {
  generateQRCode(address: string): Promise<string>
}

export class ASCIIQRCodeService implements QRCodeService {
  async generateQRCode(address: string): Promise<string> {
    try {
      // Generate ASCII QR code for terminal display
      const qrString = await QRCode.toString(address, {
        type: 'terminal',
        small: true,
        margin: 1,
      })
      return qrString
    } catch (error) {
      console.error('Failed to generate QR code:', error)
      // Fallback to simple text representation
      return `QR Code for: ${address}\n(QR generation failed)`
    }
  }
}

// Mock data for demo purposes
export const MOCK_DEPOSIT_ADDRESSES = {
  BTC: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
  ETH: '0x742d35Cc6634C0532925a3b8D4C9db96590c4C5d',
  USDC: '0x742d35Cc6634C0532925a3b8D4C9db96590c4C5d',
  USDT: '0x742d35Cc6634C0532925a3b8D4C9db96590c4C5d',
  LTC: 'LTC1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4',
  BCH: 'bitcoincash:qpm2qsznhks23z7629mms6s4cwef74vcwvy22gdx6a',
  XRP: 'rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH',
  ADA: 'addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3jcu5d8ps7zex2k2xt3uqxgjqnnj83ws8lhrn648jjxtwq2ytjqp',
  DOT: '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg',
  SOL: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
} as const

export function getMockDepositAddress(assetSymbol: string): string {
  return MOCK_DEPOSIT_ADDRESSES[assetSymbol as keyof typeof MOCK_DEPOSIT_ADDRESSES]
    || MOCK_DEPOSIT_ADDRESSES.BTC // fallback
}

export function generateMockOrderId(): string {
  return `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
