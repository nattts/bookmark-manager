
module.exports = async (user_id, repository) => {
	try {
		
		if (!user_id || !repository) throw new Error('some args missing');
		const data = await repository.get(user_id);
		
		if (data.length === 0) {
			return {
				status: 404,
				message:'not found' 
			};
		}
		return { status: 200, message: Object.keys(data) };
	}
	catch(err) { 
		throw new Error(err);
	}
};
