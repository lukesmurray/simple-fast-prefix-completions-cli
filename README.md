# simple-fast-prefix-completions-cli

CLI interface for simple-fast-prefix-completions

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/simple-fast-prefix-completions-cli.svg)](https://npmjs.org/package/simple-fast-prefix-completions-cli)
[![Downloads/week](https://img.shields.io/npm/dw/simple-fast-prefix-completions-cli.svg)](https://npmjs.org/package/simple-fast-prefix-completions-cli)
[![License](https://img.shields.io/npm/l/simple-fast-prefix-completions-cli.svg)](https://github.com/lukesmurray/simple-fast-prefix-completions-cli/blob/master/package.json)

## Usage

```sh-session
$ npm install -g simple-fast-prefix-completions-cli

$ echo '["foo", "bar"]' | sfpc --words
{"string":"\u0001bar\u0001foo\u0001","array":[0,4],"SEPARATOR":"\u0001"}

$ sfpc (-v|--version|version)

$ sfpc --help [COMMAND]
```

## Troubleshooting

If `sfpc` freezes you probably have not passed input via stdin.
