import { Args, Command, Flags } from '@oclif/core'

export default class OrderUpdate extends Command {
  static override description = 'update an order'
  static override examples = [
    '<%= config.bin %> <%= command.id %> --orderId 123 --transactionId 0x923b34da903f4c4933b03431b6285cd8bc96d890afe77b21f432c774e34d0a88',
  ]
  static override flags = {
    orderId: Flags.string({
      description: 'order ID from a previous order creation',
      name: 'order ID',
      required: true,
    }),
    transactionId: Flags.string({
      description: 'on chain transaction ID (hash)',
      name: 'transaction id',
      required: true,
    }),
  }

  public async run(): Promise<void> {}
}
