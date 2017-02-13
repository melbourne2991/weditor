const webpack = require('webpack');
const path = require('path');
const LookupPlugin = require('./LookupPlugin');
const { fsin, fsout } = require('./memoryfs');
const packageLoader = require('./packageLoader');


// Create directory for src files.
fsin.mkdirpSync('/src');

// Load in dependencies
packageLoader(fsin, '/node_modules', [
  'webpack',
  'webpack-hot-middleware'
], { verbose: true });

const compiler = webpack({
  // context: '/',
	entry: ['webpack-hot-middleware/client', '/src/index.js'],
  output: {
    path: '/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },
  // watchOptions: {
  //   aggregateTimeout: 500,
  //   poll: 1000
  // },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new LookupPlugin()
  ]
  // resolve: {
  //   modules: ['/node_modules']
  // },
  // resolveLoader: {
  //   modules: [path.resolve(__dirname, '../node_modules')]
  // }
});

compiler.inputFileSystem = fsin;
compiler.outputFileSystem = fsout;

compiler.resolvers.normal.fileSystem = compiler.inputFileSystem;
compiler.resolvers.context.fileSystem = compiler.inputFileSystem;

module.exports = compiler;