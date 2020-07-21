
module.exports = async(user_id, category, repository) => {
	try {
		if (!user_id || !repository) throw new Error('some args missing');
		const created = await repository.create(user_id, category);
		if (created) {
			return { status: 201, message: "new category created" };
		}
		return { status: 202, message: "category already exist" };
	}
	catch(err) { 
		throw new Error(err);
	}
};
