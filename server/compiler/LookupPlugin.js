const path = require('path');
const { fsin } = require('./memoryfs');

function LookupPlugin(options) {
	this.options = options;
}

LookupPlugin.prototype.apply = function(compiler) {
	compiler.plugin('normal-module-factory', (nmf, callback) => {
		nmf.plugin('before-resolve', (data, callback) => {
			callback(null, parseData(data));
		});
	});
};

const webpackPathMatcher = /.*\/node_modules\/webpack\/(.*)$/;
const vfsWebpackPath = '/node_modules/webpack'


// In webpack 2.2.1 webpack built ins resolve relative to __dirname
// as opposed to the provided context etc, this overrides and resolves
// to correct virtual file system path.
function parseData(data) {
	const matches = webpackPathMatcher.exec(data.request)

	if(matches != null) {
		return Object.assign({}, data, {
			request: path.join(vfsWebpackPath, matches[1])
		});
	}

	return data;
}

module.exports = LookupPlugin;