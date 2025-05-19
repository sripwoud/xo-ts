import { runCommand } from '@oclif/test'
import { expect } from 'chai'

describe('rates', () => {
  it('runs rates cmd', async () => {
    const { stdout } = await runCommand('rates')
    expect(stdout).to.contain('hello world')
  })

  it('runs rates --name oclif', async () => {
    const { stdout } = await runCommand('rates --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
