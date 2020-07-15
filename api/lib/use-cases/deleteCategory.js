
module.exports = async(user_id, category, repository) => {
	try {
		if (!user_id || !category || !repository) throw new Error('some args missing');
		const deleted = await repository.delete(user_id, category);
		if (deleted) {
			return { status: 201, message: "category now deleted" };
		}
		return { status: 202, message:'could not delete a category' };
	}
	catch(err) {  
		throw new Error(err);
	}
}; 
