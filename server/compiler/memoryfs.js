const memoryFS = require('memory-fs');
const path = require('path');
const fs = require('fs');

fsin = new memoryFS();
fsout = new memoryFS();

const packageJson = fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8');

fsin.writeFileSync('/package.json', packageJson, 'utf8');
// fsin.mkdirpSync('/vendor');
// fsin.mkdirpSync('/buildin');
fsin.mkdirpSync('/src');

// const clientjs = fs.readFileSync(path.resolve(__dirname, '..', 'node_modules', 'webpack-hot-middleware', 'client.js'), 'utf8');

// fsin.writeFileSync('/vendor/client.js', clientjs, 'utf8');

fsin.writeFileSync('/src/component.js', 'console.log(\'I am a component\')', 'utf8');
fsin.writeFileSync('/src/index.js', 'require(\'./component\'); if(module.hot) { module.hot.accept(\'./component\', () => { require(\'./component\')(); }) }', 'utf8');

// const builtInDirPath = path.resolve(__dirname, '..', 'node_modules/webpack/buildin');
// const builtInDir = fs.readdirSync(builtInDirPath);

// builtInDir.forEach((filename) => {
// 	if(filename.split('.')[1] === 'js') {
// 		const str = fs.readFileSync(path.resolve(builtInDirPath, filename), 'utf8');
// 		fsin.writeFileSync(`/buildin/${filename}`, str, 'utf8');
// 	}
// });

module.exports = {
	fsin,
	fsout
};