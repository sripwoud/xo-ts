import { Args, Command, Flags } from '@oclif/core'

export default class Asset extends Command {
  static override args = {
    assetId: Args.string({ name: 'asset ID', required: true }),
  }
  static override description = 'get one asset'
  static override examples = [
    '<%= config.bin %> <%= command.id %> 0xdAC17F958D2ee523a2206206994597C13D831ec7',
  ]

  public async run(): Promise<void> {}
}
