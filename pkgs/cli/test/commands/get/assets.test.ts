import { runCommand } from '@oclif/test'
import { expect } from 'chai'

describe('get:assets', () => {
  it('runs get:assets cmd', async () => {
    const { stdout } = await runCommand('get:assets')
    expect(stdout).to.contain('hello world')
  })

  it('runs get:assets --name oclif', async () => {
    const { stdout } = await runCommand('get:assets --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
