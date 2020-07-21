
const utils = require('../frameworks/common/utils/helpers');

module.exports = async (user_id, category, url, repository) => {
	try {
		if (!user_id || !category || category === null || !repository || !url) throw new Error('some args missing');
		const linkExist = await utils.exist(user_id, url, repository);
		
		if (linkExist) {
			return { 
				status: 202, message: 'bookmark already exist' 
			};
		}
		const saved = await repository.save(user_id, url, category);
		
		if (saved) 
			return { 
				status: 201, message: 'bookmark saved' 
			};
		return { 
			status: 500, message: 'request can not be fulfilled at the moment' 
		};
	}
	catch(err) { 
		throw new Error(err);
	}
};

