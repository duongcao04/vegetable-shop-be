const jwt = require('jsonwebtoken');

// const verifyRefreshToken = (refreshToken) => {

// }

// const verifyAccessToken = (refreshToken) => {

// }

const signAccessToken = (user) => {
	return jwt.sign(
		{
			id: user.id,
			admin: user.admin
		},
		process.env.JWT_ACCESS_KEY,
		{ expiresIn: "1m" }
	)
}
// const signRefreshToken = (userId) => {

// }

module.exports = {  signAccessToken }