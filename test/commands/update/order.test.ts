import { runCommand } from '@oclif/test'
import { expect } from 'chai'

describe('update:order', () => {
  it('runs update:order cmd', async () => {
    const { stdout } = await runCommand('update:order')
    expect(stdout).to.contain('hello world')
  })

  it('runs update:order --name oclif', async () => {
    const { stdout } = await runCommand('update:order --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
