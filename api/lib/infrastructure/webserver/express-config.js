const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../../../api-doc/swaggerDoc.json');
const { OperationalError } = require('../../frameworks/common/error');
const { apiRouter } = require('../../interface/routes/index');
const dependencies = require('../config/projectDeps');
const { handleError } = require('../../frameworks/common/error');
const { tokenChecker } = require('../security/checkJwt');


//try-catching errors inside controllers behind the scene
require('express-async-errors');

const app = express();

app.use(cors({
	origin: 'http://localhost:3000', 
	methods: "GET, POST, DELETE, PUT",
	optionsSuccessStatus: 200,
	credentials: true
}));

process.on('uncaughtException', (err) => {
	console.log(new OperationalError(500, 'Unhandled Exception', err));
	process.exit(1);
});

process.on('uncaughtRejection', (err) => {
	console.log(new OperationalError(500, 'Uncaught Rejection', err));
	process.exit(1);
});

process.on('unhandledRejection', (err) => {
	console.log(new OperationalError(500, 'Unhandled Rejection', err));
	process.exit(1);
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(tokenChecker);
app.use(apiRouter(dependencies));

app.use(handleError);

module.exports = app;
