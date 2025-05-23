import { Result } from '@hazae41/result'
import QRCode from 'qrcode'

export interface QRCodeService {
  generateQRCode(address: string): Promise<Result<string, Error>>
}

export class ASCIIQRCodeService implements QRCodeService {
  async generateQRCode(address: string): Promise<Result<string, Error>> {
    const result = await Result.runAndWrap(async () => {
      // Generate ASCII QR code for terminal display
      const qrString = await QRCode.toString(address, {
        type: 'terminal',
        small: true,
        margin: 1,
      })
      return qrString
    })

    return result.mapErr(error => {
      console.error('Failed to generate QR code:', error)
      return error instanceof Error ? error : new Error(String(error))
    })
  }

  async generateQRCodeWithFallback(address: string): Promise<string> {
    const result = await this.generateQRCode(address)
    return result.mapOr(
      `QR Code for: ${address}\n(QR generation failed)`,
      (qrCode: string) => qrCode,
    )
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
  ADA: 'addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwef74vcwvy22gdx6a',
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
