const { initDB } = require('./lib/infrastructure/config/bootstrap');
const startServer = require('./lib/infrastructure/webserver/server');

// run db first. then the server.

const start = async () => {
	try {
		await initDB();
		await startServer();
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

start();
