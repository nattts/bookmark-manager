const { InvalidInputError, DBServiceError } = require('../../frameworks/common/error');
const { Connection } = require('../db/connection'); 

module.exports = {
// gets all existing categories with links in them
	async getAll(userID) {
		const collection = await Connection.getCollection();
		return new Promise((resolve, reject) => {
			if (!collection || !userID) return reject (new InvalidInputError('arg error'));
			collection.aggregate([{ $match:{user_id:`${userID}` }},{ $project:{_id:0, categories:1 }}])
				.toArray((err, data) => {
					if (err) return reject(new DBServiceError(err));
					return resolve(data);
				});	
		});
	},

	async getBy(userID, category) {
		const collection = await Connection.getCollection();
		return new Promise((resolve, reject) => {
			if (!collection || !userID || !category) return reject (new InvalidInputError('arg error'));
			let path = '$' + 'categories' + '.' + category;
			collection
				.aggregate([{$match:{user_id:`${userID}`}},{ $project:{_id:0, [category]: path }}])
				.toArray((err, data) => {
					if (err) return reject(new DBServiceError(err));
					return resolve(data);
				});	
		});
	},

	async save(userID, url, category) {
		const collection = await Connection.getCollection();
		return new Promise((resolve, reject) => {
			if (!collection || !userID || !url || !category) return reject (new InvalidInputError('arg error'));	
			let path = typeof category === 'string' && category.length === 0 ? 'categories.uncategorized': 'categories' + '.' + category;
			collection.updateOne({"user_id": `${userID}`},{ $push:{[path]: url }}, (err,result) =>{
				if (err) return reject(new DBServiceError(err));
				if (result && result.result && result.result.nModified === 0) return resolve(false);
				return resolve(true);
			});
		});
	},

	async delete(userID, category, url) {
		const collection = await Connection.getCollection();
		return new Promise((resolve, reject) => {
			if (!collection || !userID || !url || !category) return reject (new InvalidInputError('arg error'));	
			let path = 'categories' + '.' + category;
			collection.updateOne({user_id:`${userID}`},{$pull:{[path]:{$in:[url]}}}, (err,result) => {
				if (err) return reject(new DBServiceError(err));
				if (result && result.result && result.result.nModified === 0) return resolve(false);
				return resolve(true);
			});
		});
	}

};





