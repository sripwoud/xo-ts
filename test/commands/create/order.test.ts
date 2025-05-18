import { runCommand } from '@oclif/test'
import { expect } from 'chai'

describe('create:order', () => {
  it('runs create:order cmd', async () => {
    const { stdout } = await runCommand('create:order')
    expect(stdout).to.contain('hello world')
  })

  it('runs create:order --name oclif', async () => {
    const { stdout } = await runCommand('create:order --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
