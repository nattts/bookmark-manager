const {  DBServiceError }  = require('../../frameworks/common/error');
const MongoClient  = require('mongodb').MongoClient;

let _db;
let _collName;
let _client;

class Connection {

	static async getCollection() {
		return _db.collection(_collName);
	}

	static async getClient() {
		return _client;
	}

	async dbConnect(uri, collection) {
		MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
			if (err) throw new DBServiceError('Error while connecting to db', err);
			
			_db = client.db();
			_client = client;
			_collName = collection;
			
			console.log('connected to MongoDB');
			// Make sure connection closes when Node exits
			process.on('exit', () => _client.close());
		});
	}
}

module.exports =  { Connection };

