
module.exports = async(user_id, currentCategory, newCategory, repository) => {
	try {
		
		if (!user_id || !currentCategory || !newCategory || !repository) throw new Error('some args missing');
		
		if (newCategory === currentCategory) 
			return { 
				status: 201, 
				message: "new category should be different" 
			};
		
		const renamed = await repository.rename(user_id, currentCategory, newCategory);
		if (renamed) {
			return {
				//TODO change stauts on the client
				status: 200, 
				message: "successfully renamed category"
			};
		}
		return {
			status: 202,
			message: "could not rename a category"
		};
	}
	catch(err) { 
		throw new Error(err);
	}
};
