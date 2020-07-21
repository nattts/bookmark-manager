const express = require('express');
const { CategoriesController } = require('../controllers/categories.controller');
const { checkUserRecord } = require('../../frameworks/common/middleware/checkUserRecord');
const { validCategoryRules } = require('../../frameworks/common/middleware/validationRules');
const {
	validRenameCategoryParamRules, 
	validDeleteCategoryParamRules } = require('../../frameworks/common/middleware/validationRules');
const { checkInput } = require('../../frameworks/common/middleware/checkUserInput');


// load dependencies
exports.categoriesRouter = (dependencies) => {
	const router = express.Router();

	const controller = new CategoriesController(dependencies);
	router.route('/')
		.get(checkUserRecord, controller.get)
		.post (
			checkUserRecord,
			validCategoryRules(),
			checkInput, 
			controller.create
		);
	
	router.route('/:current/:new_category')
		.put (
			validRenameCategoryParamRules(),
			checkInput,
			controller.rename
		);
	
	router.route('/:category')
		.delete	(
			validDeleteCategoryParamRules(),
			checkInput,
			controller.delete
		);


	return router;
};