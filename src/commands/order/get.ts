import { Args, Command, Flags } from '@oclif/core'

export default class OrderGet extends Command {
  static override args = {
    orderId: Args.string({
      description: 'Order ID from a previous order creation',
      name: 'order ID',
    }),
  }
  static override description = 'get an order'
  static override examples = ['<%= config.bin %> <%= command.id %> 123']

  public async run(): Promise<void> {}
}
