const express = require('express');
const { LinksController } = require('../controllers/links.controller');
const { checkUserRecord } = require('../../frameworks/common/middleware/checkUserRecord');
const { validUrlRules, validCategoryRules } = require('../../frameworks/common/middleware/validationRules');
const { checkInput } = require('../../frameworks/common/middleware/checkUserInput');

// load dependencies
exports.linksRouter = (dependencies) => {
	const router = express.Router();

	// load controller with dependencies
	const controller = new LinksController(dependencies);

	router.route('/:category')
		.get(controller.displayLinks);
	
	router.route('/')
		.post (
			checkUserRecord, 
			validUrlRules(), 
			validCategoryRules(), 
			checkInput, 
			controller.saveLink
		);
	
	router.route('/')
		.delete (	
			validUrlRules(), 
			validCategoryRules(), 
			checkInput, 
			controller.deleteLink
		);

	return router;
};
