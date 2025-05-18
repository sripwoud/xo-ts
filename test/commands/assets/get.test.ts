import { runCommand } from '@oclif/test'
import { expect } from 'chai'

describe('assets:get', () => {
  it('runs assets:get cmd', async () => {
    const { stdout } = await runCommand('assets:get')
    expect(stdout).to.contain('hello world')
  })

  it('runs assets:get --name oclif', async () => {
    const { stdout } = await runCommand('assets:get --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
