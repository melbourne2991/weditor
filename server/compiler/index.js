const webpack = require('webpack');
const path = require('path');
const { fsin, fsout } = require('./memoryfs');
const packageLoader = require('./packageLoader');


// Create directory for src files.
fsin.mkdirpSync('/src');

// Load in dependencies
packageLoader(fsin, '/', [
  'webpack',
  'webpack-hot-middleware'
], { verbose: true });

const compiler = webpack({
	entry: ['webpack-hot-middleware/client?path=/assets/__hmr__', '/src/index.js'],
  output: {
    path: '/dist',
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },
  devServer: {
    publicPath: '/assets'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});

compiler.inputFileSystem = fsin;
compiler.outputFileSystem = fsout;

compiler.resolvers.normal.fileSystem = compiler.inputFileSystem;
compiler.resolvers.context.fileSystem = compiler.inputFileSystem;

module.exports = compiler;