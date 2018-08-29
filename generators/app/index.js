const Generator = require('yeoman-generator');
const pkg = require('../../package.json');

const fs = require('fs');
const mkdirp = require('mkdirp');
const pascalCase = require('pascal-case');
const slugify = require('@sindresorhus/slugify');
const spdxLicenseList = require('spdx-license-list/full');
const terminalLink = require('terminal-link');
const updateNotifier = require('update-notifier');

// Is there a newer version of this generator?
const spdxCodes = Object.getOwnPropertyNames(spdxLicenseList).sort();
const licenseChoices = spdxCodes.map(obj =>{
   const licenses = {};
   licenses['name'] = terminalLink(obj, `https://spdx.org/licenses/${obj}.html`);
   licenses['value'] = obj;

   return licenses;
})

// Is there a newer version of this generator?
updateNotifier({ pkg: pkg }).notify();

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // Use long flags to discourage usage
    this.option('allow-atom-prefix', { desc: `Allows naming the package with "atom-" prefix`, default: false });
    this.option('allow-empty-description', { desc: `Allows empty packag description`, default: false });

    this.allowAtomPrefix = (this.options.allowAtomPrefix ? true : false);
    this.allowEmptyDescription = (this.options.allowEmptyDescription ? true : false);
  }

  inquirer() {
    return this.prompt([
      {
        name: 'name',
        message: 'What do you want to name your package?',
        default: slugify(this.appname),
        store: true,
        validate: (str) => {
          return (str.startsWith('atom-') && this.allowAtomPrefix === false) ? 'Your package name shouldn\'t be prefixed with "atom-"' : true;
        }
      },
      {
        name: 'description',
        message: 'What is your package description?',
        default: '',
        store: true,
        validate: (str) => {
          return (str.length === 0 && this.allowEmptyDescription === false) ? 'Please provide a short description for your package' : true;
        }
      },
      {
        name: 'author',
        message: 'What\'s your GitHub username?',
        store: true,
        validate: x => x.length > 0 ? true : 'You have to provide a username',
        when: () => !this.options.org
      },
      {
        type: 'list',
        name: 'license',
        message: 'Choose license',
        default: 'MIT',
        choices: licenseChoices,
        store: true
      },
      {
        type: 'checkbox',
        name: 'features',
        message: 'Package Features',
        store: true,
        choices: [
          {
            name: 'Grammars',
            value: 'grammars',
            checked: false
          },
          {
            name: 'Keymaps',
            value: 'keymaps',
            checked: false
          },
          {
            name: 'Menus',
            value: 'menus',
            checked: false
          },
          {
            name: 'Snippets',
            value: 'snippets',
            checked: false
          },
          {
            name: 'Styles',
            value: 'styles',
            checked: false
          }
        ]
      },
      {
        type: 'confirm',
        name: 'activationCmd',
        message: 'Add activation command?',
        default: true,
        store: true,
      },
      {
        type: 'list',
        name: 'buildScript',
        message: 'Build Script',
        default: 'prepublishOnly',
        store: true,
        choices: [
          {
            name: 'postinstall',
            value: 'postinstall',
          },
          {
            name: 'prepublishOnly',
            value: 'prepublishOnly',
          }
        ]
      },
      {
        type: 'list',
        name: 'linterHook',
        message: 'Linter Hook',
        default: 'precommit',
        store: true,
        choices: [
          {
            name: 'precommit',
            value: 'precommit',
          },
          {
            name: 'prepush',
            value: 'prepush',
          },
          {
            name: 'prepublishOnly',
            value: 'prepublishOnly',
          }
        ]
      },
      {
        type: 'checkbox',
        name: 'addConfig',
        message: 'Add configuration',
        store: true,
        choices: [
          {
            name: terminalLink('Circle CI', 'https://circleci.com/'),
            value: 'circleCI',
            checked: false
          },
          {
            name: terminalLink('Travis CI', 'https://travis-ci.org/'),
            value: 'travisCI',
            checked: false
          }
        ]
      },
      {
        type: 'list',
        name: 'compiler',
        message: 'CoffeeScript compiler',
        default: 'coffeescript@2',
        store: true,
        choices: [
          {
            name: terminalLink('CoffeeScript v1', 'https://www.npmjs.com/package/coffee-script'),
            value: 'coffeescript@1',
          },
          {
            name: terminalLink('CoffeeScript v2', 'https://www.npmjs.com/package/coffeescript'),
            value: 'coffeescript@2',
          },
          {
            name: terminalLink('Decaffeinate', 'https://www.npmjs.com/package/decaffeinate'),
            value: 'decaffeinate',
            disabled: true
          }
        ]
      },
      {
        type: 'confirm',
        name: 'initGit',
        message: 'Initialize Git repository?',
        default: fs.existsSync('.git/') ? false : true,
      }
    ]).then(props => {

      props.className = pascalCase(props.name.replace('-', ' '));
      props.licenseURL = spdxLicenseList[props.license].url;
      props.licenseName = spdxLicenseList[props.license].name;
      props.licenseText = spdxLicenseList[props.license].licenseText.replace(/\n{3,}/g, '\n\n');
      props.repositoryName = (props.name.startsWith('atom-')) ? props.name : `atom-${props.name}`;

      // Copying files
      props.features.forEach( feature => {
        mkdirp(feature);
      });

      if (props.features.indexOf('keymaps') !== -1) {
        this.fs.copyTpl(
          this.templatePath('keymaps/keymap.cson.ejs'),
          this.destinationPath(`keymaps/${props.name}.cson`),
          {
            pkg: props
          }
        );
      }

      if (props.features.indexOf('menus') !== -1) {
        this.fs.copyTpl(
          this.templatePath('menus/menu.cson.ejs'),
          this.destinationPath(`menus/${props.name}.cson`),
          {
            pkg: props
          }
        );
      }

      if (props.features.indexOf('styles') !== -1) {
        this.fs.copyTpl(
          this.templatePath('styles/style.less.ejs'),
          this.destinationPath(`styles/${props.name}.less`),
          {
            pkg: props
          }
        );
      }

      mkdirp('src');
      this.fs.copyTpl(
        this.templatePath('src/index.coffee.ejs'),
        this.destinationPath(`src/${props.name}.coffee`),
        {
          pkg: props
        }
      );

      this.fs.copyTpl(
        this.templatePath('README.md.ejs'),
        this.destinationPath('README.md'),
        {
          pkg: props
        }
      );

      this.fs.copyTpl(
        this.templatePath('LICENSE.ejs'),
        this.destinationPath('LICENSE'),
        {
          licenseText: props.licenseText
        }
      );

      if (props.buildScript === props.linterHook) {
        props.scripts = [
          '"prepublishOnly": "npm run lint && npm run build"'
        ];
      } else {
        props.scripts = [
          `"${props.buildScript}": "npm run build"`,
          `"${props.linterHook}": "npm run lint"`
        ];
      }

      this.fs.copyTpl(
        this.templatePath('package.json.ejs'),
        this.destinationPath('package.json'),
        {
          pkg: props
        }
      );

      if (props.addConfig.indexOf('circleCI') !== -1) {
        mkdirp('.circleci');
        this.fs.copyTpl(
          this.templatePath('_circleci/config.yml'),
          this.destinationPath('.circleci/config.yml')
        );
      }

      if (props.addConfig.indexOf('travisCI') !== -1) {
        this.fs.copyTpl(
          this.templatePath('_travis.yml'),
          this.destinationPath('.travis.yml')
        );
      }

      this.fs.copyTpl(
        this.templatePath('_editorconfig'),
        this.destinationPath('.editorconfig')
      );

      this.fs.copyTpl(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore')
      );

      this.fs.copyTpl(
        this.templatePath('_coffeelintignore'),
        this.destinationPath(`.coffeelintignore`)
      );

      this.fs.copyTpl(
        this.templatePath('coffeelint.json'),
        this.destinationPath(`coffeelint.json`)
      );

      // Install latest versions of dependencies
      let isDevDeps = true;
      const coffeelint = (props.compiler === 'coffeescript@1') ? 'coffeelint@1' : 'coffeelint@2'
      const dependencies = [props.compiler, coffeelint, 'husky'];

      if (props.buildScript === 'prepublishOnly') {
       isDevDeps = false;
      }
      this.yarnInstall(dependencies, { 'dev': isDevDeps });

      // Initialize git repository
      if (props.initGit) {
        this.spawnCommandSync('git', ['init']);
      }
    });
  }
};
