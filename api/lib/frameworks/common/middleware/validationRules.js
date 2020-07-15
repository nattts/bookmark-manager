const { body, param  } = require("express-validator");

const url_reg = new RegExp(
	"^(http|https|ftp)://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|localhost|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");

//const userInput_reg = new RegExp(/^[a-z]{3,}$/, 'gi');
const userInput_reg = /^[a-z]{3,}$/;

const validUrlRules = () => [body("url").matches(url_reg)];

const validCategoryRules = () => [body("category").matches(userInput_reg, 'gi')];

const validDeleteCategoryParamRules = () => [
	param("category").matches(userInput_reg, 'gi')
];

const validRenameCategoryParamRules = () => [
	param("current").matches(userInput_reg, 'gi'), 
	param("new_category").matches(userInput_reg, 'gi'),
];

module.exports = {
	validUrlRules,
	validCategoryRules,
	validDeleteCategoryParamRules,
	validRenameCategoryParamRules
};
