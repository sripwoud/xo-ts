import { runCommand } from '@oclif/test'
import { expect } from 'chai'

describe('order:update', () => {
  it('runs order:update cmd', async () => {
    const { stdout } = await runCommand('order:update')
    expect(stdout).to.contain('hello world')
  })

  it('runs order:update --name oclif', async () => {
    const { stdout } = await runCommand('order:update --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
