const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const authController = {
	//REGISTER USER
	registerUser: async (req, res) => {
		try {
			//Check user existed
			const userExists = await User.findOne({ email: req.body.email })
			if (userExists) {
				res.status(403).json("User already existed!")
			} else {
				const salt = await bcrypt.genSalt(10);
				const hashedPassword = await bcrypt.hash(req.body.password, salt);

				// Create new user
				const newUser = new User({
					username: req.body.username,
					email: req.body.email,
					password: hashedPassword,
					avatar: req.body.avatar,
					admin: req.body.admin,
				});

				//Save user to database
				const user = await newUser.save();

				res.status(200).json(user);
			}
		} catch (error) {
			res.status(500).json(error);
		}
	},

	//LOGIN
	loginUser: async (req, res) => {
		try {
			const user = await User.findOne({ email: req.body.email });
			if (!user) {
				res.status(404).json("Wrong username!");
			}
			const validationPassword = await bcrypt.compare(req.body.password, user.password)
			if (!validationPassword) {
				res.status(404).json("Wrong password!");
			}
			if (user && validationPassword) {
				//Don't res password in object user
				const { password, ...others } = user._doc;
				res.status(200).json(others)
			}
		} catch (error) {
			res.status(500).json(error)
		}
	}
};

module.exports = authController;
