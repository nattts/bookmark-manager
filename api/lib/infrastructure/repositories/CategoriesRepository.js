const { InvalidInputError, DBServiceError } = require('../../frameworks/common/error');
const { Connection } = require('../db/connection.js'); 

module.exports = { 

	async get(userID) {
		const collection = await Connection.getCollection();
		return new Promise((resolve, reject) => {
			if (!collection || !userID) return reject (new InvalidInputError('arg error'));
			collection.aggregate([{ $match: {user_id : `${userID}`}},{ $project: {_id:0, categories: 1}}])
				.toArray((err, data) => {
					if (err) return reject(new DBServiceError(err));
					if (data.length && data[0] && data[0].categories) return resolve(data[0].categories);
					return resolve([]);
				});	
		});
	},

	async create(userID, category) {
		const collection = await Connection.getCollection();
		return new Promise((resolve, reject) => {
			if (!collection || !userID || !category) return reject(new InvalidInputError('arg error'));
			let path = 'categories'+'.'+ category;
			collection.updateOne({"user_id": `${userID}`}, {$set: {[path]: []}}, (err, result) => {
				if (err) return reject(new DBServiceError(err));
				if (result && result.result && result.result.nModified === 0) return resolve(false);
				return resolve(true);
			});
		});
	},

	async rename(userID, currentCategory, newCategory) {
		const collection = await Connection.getCollection();
		return new Promise((resolve, reject) => {
			if (!collection || !userID || !currentCategory || !newCategory) return reject(new InvalidInputError('arg error'));
			let oldPath = 'categories' + '.' + currentCategory;
			let newPath = 'categories' + '.' + newCategory;
			collection.updateOne({user_id:`${userID}`}, {$rename: {[oldPath]: newPath}}, (err, result) => {
				if (err) return reject(new DBServiceError(err));
				if (result && result.result && result.result.nModified === 0) return resolve(false);
				return resolve(true);
			});	
		});
	},

	async delete(userID, category) {
		const collection = await Connection.getCollection();
		return new Promise((resolve, reject) => {
			if (!collection || !userID || !category) return reject(new InvalidInputError('arg error'));
			let path = 'categories' + '.' + category;
			collection.updateOne({user_id:`${userID}`},{$unset:{[path]:1}}, (err, result) => {
				if (err) return reject(new DBServiceError(err));
				if (result && result.result && result.result.nModified === 0) return resolve(false);
				return resolve(true);
			});
		});
	}

};