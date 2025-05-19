import { runCommand } from '@oclif/test'
import { expect } from 'chai'

describe('pair', () => {
  it('runs pair cmd', async () => {
    const { stdout } = await runCommand('pair')
    expect(stdout).to.contain('hello world')
  })

  it('runs pair --name oclif', async () => {
    const { stdout } = await runCommand('pair --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
