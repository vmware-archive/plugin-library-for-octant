'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var changeCase = require('change-case');
var os = require('os');

module.exports = class extends Generator {
    prompting() {
        this.log(
            yosay(
                'Welcome to the ' +
                chalk.red('Octant Plugin') +
                ' generator!'
            )
        );

        const prompts = [
            {
                type: 'input',
                name: 'name',
                message: 'Your plugin name: '
            },
            {
                type: 'input',
                name: 'description',
                message: 'Your plugin description: '
            },
            {
                type: 'input',
                name: 'pluginPath',
                message: 'Octant plugin path: ',
                default: os.homedir() + '/.config/octant/plugins'
            }
        ];

        return this.prompt(prompts).then(props => {
            this.props = props;
            this.props.filename = changeCase.paramCase(props.name);
            this.props.isModule = true;
        });
    }

    writing() {
        var generator = this;

        copyTemplate('src/plugin.ts.tpl', 'src/' + this.props.filename + '.ts');
        copyTemplate('src/routes.ts.tpl', 'src/routes.ts');
        copyTemplate('src/content.ts.tpl', 'src/content.ts');
        copyTemplate('package.json.tpl', 'package.json');
        copyTemplate('webpack.config.js.tpl', 'webpack.config.js');
        copyTemplate('tsconfig.json.tpl', 'tsconfig.json');

        function copyTemplate(template, destination) {
            generator.fs.copyTpl(
                generator.templatePath(template),
                generator.destinationPath(destination),
                generator.props
            );
        }
    }

	install() {
		this.installDependencies({ bower: false });
	}
};
