import { runCommand } from '@oclif/test'
import { expect } from 'chai'

describe('get:order', () => {
  it('runs get:order cmd', async () => {
    const { stdout } = await runCommand('get:order')
    expect(stdout).to.contain('hello world')
  })

  it('runs get:order --name oclif', async () => {
    const { stdout } = await runCommand('get:order --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
