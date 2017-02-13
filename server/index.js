const express = require('express');
const path = require('path');
const wdm = require('webpack-dev-middleware');
const whm = require('webpack-hot-middleware');
const compiler = require('./compiler');
const { API_PORT } = require('./config');
const app = express();
const initializeSockets = require('./socket');

const server = require('http').Server(app);
initializeSockets(server);

const wdmInstance = wdm(compiler, {
  index: 'index.html',
  publicPath: '/assets/'
});

const whmInstance = whm(compiler, {
  path: '/assets/__hmr__'
});

app.use(wdmInstance);
app.use(whmInstance);
app.use(express.static(path.join(__dirname, 'static')));

server.listen(API_PORT, (err) => {
	if(err) return console.log(err);
	return console.log('Server listening....');
});