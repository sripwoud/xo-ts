import { Command, Flags } from '@oclif/core'

export default class Assets extends Command {
  static override description = 'get multiple assets'
  static override examples = [
    '<%= config.bin %> <%= command.id %> --network ethereum solana --limit 10',
    '<%= config.bin %> <%= command.id %> --network ethereum --network solana --page 2',
  ]
  static override flags = {
    format: Flags.option({
      description: 'response type',
      name: 'format',
      options: ['csv', 'json'] as const,
    })(),
    limit: Flags.integer({ description: 'for pagination', name: 'limit' }),
    networks: Flags.string({
      description: 'list of networks to filter',
      multiple: true,
    }),
    page: Flags.integer({ description: 'for pagination' }),
    query: Flags.string({
      description: 'search by contract address or ticker',
    }),
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(Assets)

    const name = flags.name ?? 'world'
    this.log(
      `hello ${name} from /home/sripwoud/code/exodus/oss/xo-cli/src/commands/assets.ts`,
    )
  }
}
