const memoryFS = require('memory-fs');
const path = require('path');
const fs = require('fs');

fsin = new memoryFS();
fsout = new memoryFS();

const packageJson = fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8');

fsin.writeFileSync('/package.json', packageJson, 'utf8');
fsin.mkdirpSync('/src');
fsin.writeFileSync('/src/component.js', 'console.log(\'I am a component\')', 'utf8');
fsin.writeFileSync('/src/index.js', 'require(\'./component\'); if(module.hot) { module.hot.accept(\'./component\', () => { require(\'./component\')(); }) }', 'utf8');

module.exports = {
	fsin,
	fsout
};