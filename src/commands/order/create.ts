import { Args, Command, Flags } from '@oclif/core'

export default class OrderCreate extends Command {
  static override description = 'create an order'
  static override examples = [
    '<%= config.bin %> <%= command.id %> --fromAmount 0.47 --fromAddress EJVsaNYRzo1GVhzrmYM5WnxU9FUnBtibjKNAkkq9YaP2 --toAmount 0.0001 --toAddress 0x531a9aA0f2cF0F0B193d6Ca6aA9d990a54A2657a --pairId BTC_ETH',
  ]
  static override flags = {
    fromAmount: Flags.string({ required: true }),
    fromAddress: Flags.string({ required: true }),
    toAmount: Flags.string({ required: true }),
    toAdderss: Flags.string({ required: true }),
    toAddressTag: Flags.string({ required: false }),
    pairId: Flags.string({ required: true }),
    slippage: Flags.string({ required: false, default: '0.02' }),
  }

  public async run(): Promise<void> {}
}
