
require('dotenv').config();

module.exports = {
	development: {
		"db": process.env.MONGO_URI_DEVELOPMENT,
		"collection": "bookmarks"
	},
	
	test: {
		"db": process.env.MONGO_URI_TEST,
		"collection": "tests"
	}
};
