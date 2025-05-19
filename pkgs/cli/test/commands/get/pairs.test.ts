import { runCommand } from '@oclif/test'
import { expect } from 'chai'

describe('get:pairs', () => {
  it('runs get:pairs cmd', async () => {
    const { stdout } = await runCommand('get:pairs')
    expect(stdout).to.contain('hello world')
  })

  it('runs get:pairs --name oclif', async () => {
    const { stdout } = await runCommand('get:pairs --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
