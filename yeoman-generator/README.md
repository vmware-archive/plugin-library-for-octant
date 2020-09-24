# generator-octant-plugin

A [Yeoman](http://yeoman.io) generator for generating a Octant plugin using TypeScript and Webpack. Writing plugins in JavaScript is supported in Octant starting with version [0.14](https://github.com/vmware-tanzu/octant/releases/)

## Features

1. Scaffold an Octant plugin written in TypeScript
2. Builds with Webpack
   - TypeScript linting
   - Minification
   - Inlining of import/require
   - Transpiles to ES5 to ensure compatability with the Octant JavaScript runtime.
3. Controlled with simple NPM commands
   - plugin:watch, plugin:dev, plugin:prod, plugin:install

## Installation

### Prerequisites

1. Install [Node.js](http://nodejs.org)
 - on OSX use [homebrew](http://brew.sh) `brew install node`
 - on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

2. Install Yeoman `npm install -g yo`

### Installing the Generator

```bash
npm install -g generator-octant-plugin
```

## Using the Generator

Start the Octant plugin generator.

```bash
mkdir your-plugin && cd your-plugin
yo octant-plugin
```

You will be prompted for the following information
   - Project name
   - Project description
   - If plugin is a module? (Yes/No)
   - Octant plugin path (used by plugin:watch, plugin:install)

## Working with the Generated Files

Tryout the demo plugin using the install command

```bash
npm run plugin:install
```

You can have your changes get compiled and installed in real-time using the watch command. After you start the watch you can open the plugin TypeScript file in your editor and as you save changes you'll see them reflected in Octant.

```bash
npm run plugin:watch
```

### Generated File Structure

```
    .
    |-- node_modules
    |-- package.json
    |-- src
        |-- <plugin-name>.ts
        |-- octant
            |-- plugin.d.ts
            |-- components.ts
    |-- tsconfig.json
    |-- webpack.config.js

```

### Generated Files

#### `node_modules`
The folder contains all of the required dependencies for the project. You should
not edit this file directly.

#### `package.json`
The NPM package file for the project containing the project's name, version,
and dependencies. Update this file to add or change dependencies.

#### `src`
The directory that will contain all of the TypeScript source files for your plugin.
Any new code meant to be distributed with the plugin should be placed in here.

#### `src/<plugin-name>.ts`
An example TypeScript class that implements the plugin interface. This example plugin
adds a config entry to the Pod summary.

#### `src/octant/plugin.d.ts`
A TypeScript module that defines the interfaces that must be implement by your plugin.

#### `src/octant/components.ts`
A TypeScript module that defines helper classes and functions for creating components.

#### `tsconfig.json`
The configuration for the TypeScript compiler. The settings should not be changed.

#### `webpack.config.js`
The configuration for the webpack build. The settings should not be changed.

## NPM Scripts

### `npm run plugin:dev`
Transpiles the plugin and generates a single unminified JavaScript file in `dist/`.

### `npm run plugin:prod`
Transpiles the plugin and generates a single minified JavaScript file in `dist/`.

### `npm run plugin:watch`
Transpiles the plugin and generates a single unminified JavaScript file and copies it to `<octant plugin path>`. After which it will watch for
file changes and re-run the transpile and webpack process automatically.

### `npm run plugin:install`
Transpiles the plugin and generates a single minified JavaScript file in `<octant plugin path>`.

## Development Workflow

### Setting Up The Project

1. Initialize a new, empty Git repository on Github.
2. Clone the new repository to your development environment.
3. Use "```yo octant-plugin```" to generate the project.

### Making Changes

I would recommend having a terminal open running "```npm run plugin:watch```"

You are now free to do whatever you want with the code base. Install some additional NPM libraries or types. Edit the `<plugin-name>.ts` file with something meaningful.
