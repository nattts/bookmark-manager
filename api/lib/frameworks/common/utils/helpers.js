
module.exports = {
	
	async exist(user_id, url, repository) {
		if (!user_id || !url || !repository) throw new Error('some arguments missing');
		const categories = await this.getCategories(user_id, repository);
		return Object.values(categories).reduce((acc, b) => {
			return acc.concat(b);
		},[]).some(e => e === url);
	},

	async getCategories(user_id, repository) {
		if (!user_id || !repository) throw new Error('some arguments missing');
		const userData = await repository.getAll(user_id);
		if (userData && userData[0] && userData[0].categories) {
			return userData[0].categories;
		}
	}

};




