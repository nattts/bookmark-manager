const app = require("./express-config");
const http = require("http");

const port = process.env.PORT || "5000";

module.exports = async () => {
	try {
		http
			.createServer(app)
			.listen(port, () => console.log(`running on http://127.0.0.1:${ port }/`));
	} catch(err) {
		throw new Error(err);
	}
};



