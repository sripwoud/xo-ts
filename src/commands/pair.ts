import { Args, Command, Flags } from '@oclif/core'
import { ArgInput } from '@oclif/core/interfaces'

export default class Pair extends Command {
  static override args = {
    pairId: Args.string({ name: 'pair ID', required: true }),
  }
  static override description = 'Get one pair'
  static override examples = ['<%= config.bin %> <%= command.id %> BTC_ETH']

  public async run(): Promise<void> {}
}
