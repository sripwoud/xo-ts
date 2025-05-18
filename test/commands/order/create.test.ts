import { runCommand } from '@oclif/test'
import { expect } from 'chai'

describe('order:create', () => {
  it('runs order:create cmd', async () => {
    const { stdout } = await runCommand('order:create')
    expect(stdout).to.contain('hello world')
  })

  it('runs order:create --name oclif', async () => {
    const { stdout } = await runCommand('order:create --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
