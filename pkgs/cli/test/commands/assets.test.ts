import { runCommand } from '@oclif/test'
import { expect } from 'chai'

describe('assets', () => {
  it('runs assets cmd', async () => {
    const { stdout } = await runCommand('assets')
    expect(stdout).to.contain('hello world')
  })

  it('runs assets --name oclif', async () => {
    const { stdout } = await runCommand('assets --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
