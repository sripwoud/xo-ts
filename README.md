# xo

xo CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/xo.svg)](https://npmjs.org/package/xo)
[![Downloads/week](https://img.shields.io/npm/dw/xo.svg)](https://npmjs.org/package/xo)

<!-- toc -->

- [Usage](#usage)
- [Commands](#commands)

<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g xo
$ xo COMMAND
running command...
$ xo (--version)
xo/0.0.0 linux-x64 node-v23.11.1
$ xo --help [COMMAND]
USAGE
  $ xo COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`xo hello PERSON`](#xo-hello-person)
- [`xo hello world`](#xo-hello-world)
- [`xo help [COMMAND]`](#xo-help-command)
- [`xo plugins`](#xo-plugins)
- [`xo plugins add PLUGIN`](#xo-plugins-add-plugin)
- [`xo plugins:inspect PLUGIN...`](#xo-pluginsinspect-plugin)
- [`xo plugins install PLUGIN`](#xo-plugins-install-plugin)
- [`xo plugins link PATH`](#xo-plugins-link-path)
- [`xo plugins remove [PLUGIN]`](#xo-plugins-remove-plugin)
- [`xo plugins reset`](#xo-plugins-reset)
- [`xo plugins uninstall [PLUGIN]`](#xo-plugins-uninstall-plugin)
- [`xo plugins unlink [PLUGIN]`](#xo-plugins-unlink-plugin)
- [`xo plugins update`](#xo-plugins-update)

## `xo hello PERSON`

Say hello

```
USAGE
  $ xo hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ xo hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/sripwoud/xo-cli/blob/v0.0.0/src/commands/hello/index.ts)_

## `xo hello world`

Say hello world

```
USAGE
  $ xo hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ xo hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/sripwoud/xo-cli/blob/v0.0.0/src/commands/hello/world.ts)_

## `xo help [COMMAND]`

Display help for xo.

```
USAGE
  $ xo help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for xo.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.28/src/commands/help.ts)_

## `xo plugins`

List installed plugins.

```
USAGE
  $ xo plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ xo plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.38/src/commands/plugins/index.ts)_

## `xo plugins add PLUGIN`

Installs a plugin into xo.

```
USAGE
  $ xo plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into xo.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the XO_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the XO_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ xo plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ xo plugins add myplugin

  Install a plugin from a github url.

    $ xo plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ xo plugins add someuser/someplugin
```

## `xo plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ xo plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ xo plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.38/src/commands/plugins/inspect.ts)_

## `xo plugins install PLUGIN`

Installs a plugin into xo.

```
USAGE
  $ xo plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into xo.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the XO_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the XO_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ xo plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ xo plugins install myplugin

  Install a plugin from a github url.

    $ xo plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ xo plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.38/src/commands/plugins/install.ts)_

## `xo plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ xo plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ xo plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.38/src/commands/plugins/link.ts)_

## `xo plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ xo plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ xo plugins unlink
  $ xo plugins remove

EXAMPLES
  $ xo plugins remove myplugin
```

## `xo plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ xo plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.38/src/commands/plugins/reset.ts)_

## `xo plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ xo plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ xo plugins unlink
  $ xo plugins remove

EXAMPLES
  $ xo plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.38/src/commands/plugins/uninstall.ts)_

## `xo plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ xo plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ xo plugins unlink
  $ xo plugins remove

EXAMPLES
  $ xo plugins unlink myplugin
```

## `xo plugins update`

Update installed plugins.

```
USAGE
  $ xo plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.38/src/commands/plugins/update.ts)_

<!-- commandsstop -->
