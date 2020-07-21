const { ControllerBase } = require('../../frameworks/common/base/ControllerBase');
const GetCategoryNames = require('../../use-cases/getCategoryNames');
const CreateCategory = require('../../use-cases/createCategory');
const RenameCategory = require('../../use-cases/renameCategory');
const DeleteCategory = require('../../use-cases/deleteCategory');

class CategoriesController extends ControllerBase {
	constructor({ CategoriesRepository }) {
		super();
		this.CategoriesRepository = CategoriesRepository;
		this.get = this.get.bind(this);
		this.create = this.create.bind(this);
		this.rename = this.rename.bind(this);
		this.delete = this.delete.bind(this);
	}

	async	get(req, res) {
		const user_id = req.user.sub;
		this.validate(user_id);
		const result = await GetCategoryNames(user_id, this.CategoriesRepository);
		return res.status(result.status).json(result.message);
	}

	async create(req, res) {
		const user_id = req.user.sub;
		const { category } = req.body;
		this.validate(user_id, category);
		const result = await CreateCategory(user_id, category, this.CategoriesRepository);
		return res.status(result.status).json(result.message);
	}

	async rename(req, res) {
		const user_id = req.user.sub;
		const { current, new_category } = req.params;
		this.validate(user_id, current, new_category);
		const result = await RenameCategory(user_id, current, new_category, this.CategoriesRepository);
		return res.status(result.status).json(result.message);
	}

	async delete(req, res) {
		const user_id = req.user.sub;
		const { category } = req.params;
		this.validate(user_id, category);
		const result = await DeleteCategory(user_id, category, this.CategoriesRepository);
		return res.status(result.status).json(result.message);
	}
}

module.exports = { CategoriesController };