import { runCommand } from '@oclif/test'
import { expect } from 'chai'

describe('get:pair', () => {
  it('runs get:pair cmd', async () => {
    const { stdout } = await runCommand('get:pair')
    expect(stdout).to.contain('hello world')
  })

  it('runs get:pair --name oclif', async () => {
    const { stdout } = await runCommand('get:pair --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
