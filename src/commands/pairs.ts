import { Args, Command, Flags } from '@oclif/core'

export default class Pairs extends Command {
  static override description = 'Get pairs'
  static override examples = [
    '<%= config.bin %> <%= command.id %> --from 10 --to 20',
  ]
  static override flags = {
    format: Flags.option({ default: 'json', options: ['csv', 'json'] })(),
    from: Flags.integer(),
    to: Flags.integer(),
  }

  public async run(): Promise<void> {}
}
