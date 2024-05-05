const bcrypt = require('bcrypt');
const createError = require("http-errors");

const User = require('../Models/user.model');

const { userValidate } = require('../helpers/validation');
const { signAccessToken } = require('../helpers/jwt_services');

const userController = {
	//REGISTER USER
	registerUser: async (req, res, next) => {
		try {
			const { email, password } = req.body
			const { error } = userValidate(req.body)
			if (error) {
				throw createError(error.details[0].message)
			}

			const isExist = await User.findOne({ email: email })
			if (isExist) {
				throw createError.Conflict(`${email} is ready been registered`)
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

				res.status(200).json({ status: "isOkay", elements: user });
			}
		} catch (error) {
			next(error)
		}
	},

	//LOGIN
	loginUser: async (req, res, next) => {
		try {
			const { email, password } = req.body;
			if (!email || !password) {
				throw createError.BadRequest();
			}
			const user = await User.findOne({ email: req.body.email });
			if (!user) {
				res.status(404).json("Wrong username!");
			}
			const validationPassword = await bcrypt.compare(req.body.password, user.password)
			if (!validationPassword) {
				res.status(404).json("Wrong password!");
			}
			if (user && validationPassword) {
				const accessToken = await signAccessToken(user)
				//Don't res password in object user
				const { password, ...others } = user._doc;
				res.status(200).json({ status: "isOkay", elements: others, accessToken })
			}
		} catch (error) {
			next(error)
		}
	},

	//GET ALL USER
	getAllUser: async (req, res, next) => {
		try {
			const user = await User.find();
			res.status(200).json({ status: "isOkay", elements: user });
		}
		catch (error) {
			next(error)
		}
	},

	//DELETE USER
	deleteUser: async (req, res, next) => {
		try {
			const user = await User.findById(req.params.id)
			res.status(200).json({ status: "isOkay", message: "Delete successfully", elements: user });
		}
		catch (error) {
			next(error)
		}
	}
};

module.exports = userController;
