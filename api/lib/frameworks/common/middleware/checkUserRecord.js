const UserRepository = require('../../../infrastructure/repositories/UserRepository');
const { schema } = require('../../../infrastructure/db/schema');
const { InvalidInputError } = require('../error');

//checking if user has their data in the db.
//if not => map schema to db

async function checkUserRecord (req, res, next) {
	try {
		const user_id = req.user.sub;
		if (!user_id) throw new InvalidInputError('userId is not provided');
		let res = await UserRepository.getUserData(user_id);
		if (res.length === 0) {
			await makeRecord(user_id, schema, UserRepository);
		} 
		next(); 
	} catch(err) {
		next(err);
	}
}

async function makeRecord(userID, userSchema, repository) {
	try {
		if (!userID || !userSchema || !repository) throw new InvalidInputError('userId is not provided');
		let user = userSchema(userID); 
		await repository.insertDocument(user);
		await repository.createIndex('user_id');
		return await repository.createIndex('categories');
	} catch(err) {
		throw new Error(err);
	}
}

module.exports = { checkUserRecord, makeRecord };





