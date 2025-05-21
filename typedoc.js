const fs = require('node:fs')
const path = require('node:path')

const EXCLUDE_PKGS = ['cli']
const packagesDir = path.join(__dirname, 'pkgs')
const entryPoints = fs
  .readdirSync(packagesDir, { withFileTypes: true })
  .filter(
    (dirent) => dirent.isDirectory() && !EXCLUDE_PKGS.includes(dirent.name),
  )
  .map((dirent) => path.join('pkgs', dirent.name, 'src'))

/** @type {import('typedoc').typedocoptions} */
module.exports = {
  entryPoints,
  name: 'xo-ts',
  // FIXME
  tsconfig: path.join(__dirname, 'pkgs', 'xoswap', 'tsconfig.json'),
}
