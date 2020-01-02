const path = require('path');

module.exports = {
  entry: './build/js/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'docs/js'),
  },
  mode: 'production'
};
