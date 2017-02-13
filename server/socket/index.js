const socketio = require('socket.io');

module.exports = function initializeSockets(server) {
	const io = socketio(server);

	io.on('connection', (socket) => {
		socket.emit('connected.');
	});
};