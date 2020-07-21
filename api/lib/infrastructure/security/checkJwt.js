
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

require('dotenv').config();

const authDomain  = process.env.AUTH_DOMAIN;
const audience = process.env.AUTH_AUDIENCE;

const tokenChecker = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `https://${authDomain}/.well-known/jwks.json`
	}),

	// Validate the audience and the issuer.
	aud: `${audience}`,
	issuer: `https://${authDomain}/`,
	algorithms: ['RS256']
});


module.exports = { tokenChecker };
