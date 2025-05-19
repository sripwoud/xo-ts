import { runCommand } from '@oclif/test'
import { expect } from 'chai'

describe('get:asset', () => {
  it('runs get:asset cmd', async () => {
    const { stdout } = await runCommand('get:asset')
    expect(stdout).to.contain('hello world')
  })

  it('runs get:asset --name oclif', async () => {
    const { stdout } = await runCommand('get:asset --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
