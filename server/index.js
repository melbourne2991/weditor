const express = require('express');
const path = require('path');
const wdm = require('webpack-dev-middleware');
const whm = require('webpack-hot-middleware');
const compiler = require('./compiler');

const app = express();

const wdmInstance = wdm(compiler, {
  index: 'index.html',
  publicPath: '/assets/'
});

const whmInstance = whm(compiler, {
  path: '/assets/__hmr__'
});

app.use(wdmInstance);
app.use(whmInstance);

// console.log(whmInstance);

let count = 0;
setInterval(() => {
  // compiler.inputFileSystem.writeFileSync('/src/index.js', 'const woohoo = '+ num++ +'; console.log(woohoo)', 'utf8');
  count++;
  fsin.writeFileSync('/src/component.js', `module.exports = function() { console.log(\'I am a component count=${count}\') }`, 'utf8');

  wdmInstance.invalidate();
  // console.log(fsout.data);
}, 2000)


app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(3020, (err) => {
	if(err) return console.log(err);
	return console.log('Server listening....');
});