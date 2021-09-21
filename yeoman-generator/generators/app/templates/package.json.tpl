{
  "name": "<%= filename %>",
  "files": [
    "src/"
  ],
  "types": "src/octant.d.ts",
  "version": "0.1.0",
  "description": "<%= description %>",
  "scripts": {
    "plugin:check": "tsc --noEmit",
    "plugin:watch": "npx tsc-watch --noEmit --onSuccess \"npm run plugin:dev-no-check\"",
    "plugin:dev-no-check": "webpack --output <%= pluginPath.replace(/\\/g, '\\\\') %>/<%= filename %>.js",
    "plugin:dev": "tsc --noEmit && webpack --output <%= pluginPath.replace(/\\/g, '\\\\') %>/<%= filename %>.js",
    "plugin:prod": "tsc --noEmit && webpack --env=production --output dist/<%= filename %>.js",
    "plugin:install": "tsc --noEmit && webpack --env=production --output <%= pluginPath.replace(/\\/g, '\\\\') %>/<%= filename %>.js"
  },
  "keywords": [
    "octant",
    "octant-plugin"
  ],
  "author": "",
  "license": "Apache-2.0",
  "devDependencies": {
    "@babel/cli": "^7.8.3",
    "@babel/core": "^7.8.3",
    "@babel/plugin-proposal-class-properties": "^7.8.3",
    "@babel/plugin-syntax-dynamic-import": "^7.8.3",
    "@babel/plugin-transform-modules-commonjs": "^7.10.1",
    "@babel/plugin-transform-object-set-prototype-of-to-assign": "^7.10.4",
    "@babel/preset-env": "^7.8.3",
    "@babel/preset-typescript": "^7.8.3",
    "@babel/types": "^7.10.3",
    "@types/core-js": "^2.5.3",
    "@types/node": "^14.0.14",
    "babel-loader": "^8.1.0",
    "core-js": "^3.6.5",
    "es-check": "^5.1.0",
    "ts-loader": "^7.0.5",
    "tsc-watch": "^4.2.9",
    "typescript": "^3.9.7",
    "webpack": "^4.43.0",
    "webpack-cli": "^3.3.12"
  },
  "dependencies": {
    "@project-octant/plugin": "^0.22.0",
    "@kubernetes/client-node": "^0.12.0",
    "regenerator-runtime": "^0.13.5",
    "route-recognizer": "^0.3.4",
    "rxjs": "^6.6.0"
  }
}
