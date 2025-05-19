import { Args, Command, Flags } from '@oclif/core'

export default class Rates extends Command {
  static override args = {
    pairId: Args.string({ description: 'Pair ID' }),
  }
  static override description = 'Get the latest rates for a pair ID'
  static override examples = ['<%= config.bin %> <%= command.id %> BTC_ETH']

  public async run(): Promise<void> {}
}
