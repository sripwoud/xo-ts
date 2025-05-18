import { runCommand } from '@oclif/test'
import { expect } from 'chai'

describe('order:get', () => {
  it('runs order:get cmd', async () => {
    const { stdout } = await runCommand('order:get')
    expect(stdout).to.contain('hello world')
  })

  it('runs order:get --name oclif', async () => {
    const { stdout } = await runCommand('order:get --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
