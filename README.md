# generator-atom-package-coffeescript

[![npm](https://flat.badgen.net/npm/license/generator-atom-package-coffeescript)](https://www.npmjs.org/package/generator-atom-package-coffeescript)
[![npm](https://flat.badgen.net/npm/v/generator-atom-package-coffeescript)](https://www.npmjs.org/package/generator-atom-package-coffeescript)
[![CircleCI](https://flat.badgen.net/circleci/github/idleberg/generator-atom-package-coffeescript)](https://circleci.com/gh/idleberg/generator-atom-package-coffeescript)
[![David](https://flat.badgen.net/david/dep/idleberg/generator-atom-package-coffeescript)](https://david-dm.org/idleberg/generator-atom-package-coffeescript)

## Description

A [Yeoman](http://yeoman.io/authoring/user-interactions.html) generator for Atom packages written in any version CoffeeScript.

Atom already transpiles packages written in CoffeeScript automatically, but there are many indications that the Atom team will move away from CoffeeScript in the near future. Also, transpiling packages is (and will remain) limited to CoffeeScript v1. Since there will always be people who want to continue using CoffeeScript, this generator offers a solution.

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
