# generator-atom-package-coffeescript

[![npm](https://img.shields.io/npm/l/generator-atom-package-coffeescript.svg?style=flat-square)](https://www.npmjs.org/package/generator-atom-package-coffeescript)
[![npm](https://img.shields.io/npm/v/generator-atom-package-coffeescript.svg?style=flat-square)](https://www.npmjs.org/package/generator-atom-package-coffeescript)
[![David](https://img.shields.io/david/idleberg/generator-atom-package-coffeescript.svg?style=flat-square)](https://david-dm.org/idleberg/generator-atom-package-coffeescript)

## Description

A [Yeoman](http://yeoman.io/authoring/user-interactions.html) generator for Atom packages written in any version CoffeeScript.

Atom currently transpiled packages written in CoffeeScript, but sooner or later CoffeeScript support will likely be dropped from Atom. Also, this does not work for packages written in CoffeeScript v2. However, some people will still want to use the language they've come to love. This generator templates a package that compiles your CoffeeScript on install time.

**Features**

- supports CoffeeScript v1 and v2
- adds any [SPDX](https://spdx.org/licenses/) license
- adds [CircleCI](https://circleci.com) configuration
- adds [Travis CI](https://travis-ci.org) configuration

## Installation

Use your preferred [Node](https://nodejs.org/) package manager to install the CLI tool

```sh
yarn global add generator-atom-package-coffeescript || npm i generator-atom-package-coffeescript -g
```

## Usage

Run the generator and follow its instructions

```sh
yo atom-package-coffeescript
```

*“That's all Folks!”*

## Related

- [generator-atom-package-typescript](https://www.npmjs.org/package/generator-atom-package-typescript)
- [generator-atom-package-webpack](https://www.npmjs.org/package/generator-atom-package-webpack)

## License

This work is licensed under the [MIT License](https://opensource.org/licenses/MIT)
