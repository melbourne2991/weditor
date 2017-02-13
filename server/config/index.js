const config = {
	development: {
		API_PORT: 3020
	},
	production: {
		API_PORT: 80
	}
};

module.exports = config[process.env.NODE_ENV] || production;