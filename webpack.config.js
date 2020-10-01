const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './build/js/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'docs/js'),
  },
  plugins: [
    new CopyWebpackPlugin({
        patterns: [
          { from: 'build/js/static', to: '../../docs' }
        ]
    })
  ],
  mode: 'production'
};

// https://webpack.js.org/plugins/copy-webpack-plugin/
// https://developer.mozilla.org/de/docs/Web/API/Service_Worker_API/Using_Service_Workers