
module.exports = async (user_id, category, url, repository) => {
	try {
		if (!user_id || !category || category === null || !repository || !url) throw new Error('some args missing');
		
		const deleted = await repository.delete(user_id, category, url);
		
		if (deleted) {
			return { 
				status: 201, message: 'bookmark deleted' 
			};
		}
		return { 
			status: 500, message: 'request can not be fulfilled at the moment' 
		};
	}
	catch(err) { 
		throw new Error(err);
	}
};