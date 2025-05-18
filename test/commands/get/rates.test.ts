import { runCommand } from '@oclif/test'
import { expect } from 'chai'

describe('get:rates', () => {
  it('runs get:rates cmd', async () => {
    const { stdout } = await runCommand('get:rates')
    expect(stdout).to.contain('hello world')
  })

  it('runs get:rates --name oclif', async () => {
    const { stdout } = await runCommand('get:rates --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
