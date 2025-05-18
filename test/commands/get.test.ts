import { runCommand } from '@oclif/test'
import { expect } from 'chai'

describe('get', () => {
  it('runs get cmd', async () => {
    const { stdout } = await runCommand('get')
    expect(stdout).to.contain('hello world')
  })

  it('runs get --name oclif', async () => {
    const { stdout } = await runCommand('get --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
