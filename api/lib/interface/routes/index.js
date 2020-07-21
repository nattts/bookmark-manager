const express = require('express');
const { linksRouter } = require('./links.route');
const { categoriesRouter } = require('./categories.route');


const apiRouter = (dependencies) => {
	const routes = express.Router();
	routes.use('/links', linksRouter(dependencies));
	routes.use('/categories', categoriesRouter(dependencies));
	return routes;
};


module.exports = { apiRouter };
