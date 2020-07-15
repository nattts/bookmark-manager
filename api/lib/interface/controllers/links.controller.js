const DisplayLinksByCategory = require('../../use-cases/displayLinksByCategory');
const { ControllerBase } = require('../../frameworks/common/base/ControllerBase');
const DeleteLink = require('../../use-cases/DeleteLink');
const SaveLink = require('../../use-cases/saveLink');

class LinksController extends ControllerBase {
	constructor({ LinksRepository }) {
		super();
		this.LinksRepository = LinksRepository;
		this.displayLinks = this.displayLinks.bind(this);
		this.saveLink = this.saveLink.bind(this);
		this.deleteLink = this.deleteLink.bind(this);
	}

	async	displayLinks(req, res) {
		const user_id = req.user.sub;
		const { category } = req.params;
		this.validate(user_id, category);
		const result = await DisplayLinksByCategory(user_id, category, this.LinksRepository);
		return res.status(result.status).json(result.message);
	}

	async saveLink(req, res) {
		const user_id = req.user.sub;
		const { category, url } = req.body;
		this.validate(user_id, category, url);
		const result = await SaveLink(user_id, category, url, this.LinksRepository);
		return res.status(result.status).json(result.message);
	}

	async deleteLink(req, res) {
		const user_id = req.user.sub;
		const { category, url } = req.body;
		this.validate(user_id, category, url);
		const result = await DeleteLink(user_id, category, url, this.LinksRepository);
		return res.status(result.status).json(result.message);
	}
}

module.exports = { LinksController };