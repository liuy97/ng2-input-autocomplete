'use strict';
var pkg = require('./package.json');

module.exports = {
  title: pkg.description,
  baseUrl: '/',
  src: 'app',
  dist: 'app-build',
  htmlIndexes: ['index.html'],
  spec: './spec-bundle.js',
  entry: {
    polyfills: './app/polyfills.ts',
    vendor: './app/vendor.ts',
    main: './app/main.ts'
  },
  commonChunks: {
    name: ['polyfills', 'vendor'].reverse()
  },
  alias: {},
  copy: []
};
