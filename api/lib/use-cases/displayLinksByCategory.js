
module.exports =  async (user_id, category, repository) => {
	try {
		if (!user_id || !category || !repository) throw new Error('some args missing');
		const data = await repository.getBy(user_id, category);
		if (data.length === 0) {
			return { status: 404, message:'not found' };
		}
		return { status: 200, message: data };
	}
	catch(err) { 
		throw new Error(err);
	}
};

