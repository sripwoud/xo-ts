import { runCommand } from '@oclif/test'
import { expect } from 'chai'

describe('pairs', () => {
  it('runs pairs cmd', async () => {
    const { stdout } = await runCommand('pairs')
    expect(stdout).to.contain('hello world')
  })

  it('runs pairs --name oclif', async () => {
    const { stdout } = await runCommand('pairs --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
