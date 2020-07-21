const { InvalidInputError, DBServiceError } = require('../../frameworks/common/error');
const { Connection } = require('../db/connection'); 

module.exports = {
	
	async getUserData(userID) {
		const collection = await Connection.getCollection();
		return new Promise((resolve, reject) => {
			if (!collection || !userID) return reject (new InvalidInputError('arg error'));
			collection.find({"user_id": `${userID}`}).toArray((err, result) => {
				if (err) return reject(new DBServiceError(err));
				return resolve(result);
			});
		});
	},

	async insertDocument(data) {
		const collection = await Connection.getCollection();
		return new Promise((resolve, reject) => {
			if (!collection || !data) return reject (new InvalidInputError('data missing'));
			collection.insertOne(data, (err, result) => {
				if (err) return reject(new DBServiceError(err));
				return resolve(result);
			});
		});
	},

	async createIndex(field) {
		const collection = await Connection.getCollection();
		return new Promise((resolve, reject) => {
			if (!collection || !field) return reject (new InvalidInputError('args missing'));
			collection.createIndex({[`${field}`]: 1}, (err, res) => {
				if (err) reject(new DBServiceError(err));
				resolve(); 
			});
		});

	}
};