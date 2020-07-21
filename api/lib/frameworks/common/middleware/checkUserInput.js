
const { validationResult } = require("express-validator");


exports.checkInput = async(req, res, next) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(403).json("input not valid");
		}
		return next();
	} catch (err) {
		next(err);
	}
};






