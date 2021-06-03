"use strict"
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const g_response = {
	error: null,
	message: null,
	data: null
}

let users = {
	signUp: async (req, res) => {
		let response = g_response;
		try {
			let { first_name, last_name, email, password, phone_number, rank } = req.body;
			let userData = new User({
				first_name: first_name,
				last_name: last_name,
				email: email,
				password: password,
				phone_number: phone_number,
				rank: rank
			});
			const result = await userData.save();
			response = {
				error: false,
				message: 'success',
				data: res.status(200).send(result)
			}
		} catch(err) {
			response.error = true;
			res.status(500).send(err);
		}
	},

	login: async (req, res) => {
		let response = g_response;
		try {
			let { email, password } = req.body;
			const user = await User.findByDetails(email, password)
			if(!user){
				res.status(401).send({ error: "Failed to login, please check your login details" })
			}
			const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: '1h' })
			response = {
				error: false,
				message: "success",
				data: { user: user, token: token }
			}
			res.status(200).send(response);
		} catch(err) {
			res.status(500).send(err);
		}
	},
	readUsers: async (req, res) => {
		let response = g_response;
		try {
			const result = await User.find().exec();
			response = {
				error: false,
				message: 'success',
				data: res.status(200).send(result)
			}
			res.send(result);
		} catch(err) {
			response.error = true;
			res.status(500).send(err);
		}
	},
	readOneUser: async (req, res) => {
		let response = g_response;
		try {
			console.log(req.params.id)
			// if(typeof req.header('Authorization') !== undefined){  //check if bearer is undefined
			// 	const token = req.header('Authorization').replace('Bearer ', '')
			// 	const user = jwt.verify(token, process.env.JWT_KEY)
				// const result = await User.findById(user._id).exec()
				// response = {
				// 	error: false,
				// 	message: 'success',
				// 	data: res.status(200).send(result)
				// }
			// } else {
				// response.sendStatus(403); //forbidden
			// }
		} catch(err) {
			response.error = true;
			res.status(500).send(err);
		}
	},
	updateUser: async (req, res) => {
		let response = g_response;
		try {
			const result = await User.findById(req.params.id).exec();
			response = {
				error: false,
				data: res.status(200).send(result),
			}
		} catch(err) {
			response.error = true;
			res.status(500).send(err);
		}
	},
	deleteUser: async (req, res) => {
		let response = g_response;
		try {
			let { user_id } = req.params;
			// const result = await User.findById(req.params.id).exec();
			await Users.deleteOne({ _id: ObjectId(user_id) })
			// res.redirect('/?m=deleted')
			response = {
				error: false,
				data: res.status(200).send('deleted')
			}
		} catch(err) {
			response.error = true;
			res.status(500).send(err);
		}
	}
}

module.exports = users;