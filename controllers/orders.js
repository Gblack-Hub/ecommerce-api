"use strict"
const Order = require('../models/order')
// const jwt = require('jsonwebtoken')

const g_response = {
	error: null,
	message: null,
	data: null
}

let users = {
	addOrder: async (req, res) => {
		let response = g_response;
		try {
			let { order_quantity, total_amount, product, order_status } = req.body;
			let orderData = new Order({
				// order_number: order_number,
				order_quantity: order_quantity,
				total_amount: total_amount,
				product: product,
				order_status: order_status,
			});
			const quantityCheck = await Order.checkQuantity(order_quantity)
			console.log(quantityCheck)
			res.send(quantityCheck)
			// const result = await orderData.save();
			// response = {
			// 	error: false,
			// 	message: 'success',
			// 	data: res.status(200).send(result)
			// }
		} catch(err) {
			response.error = true;
			res.status(500).send(err);
		}
	},

	readOrders: async (req, res) => {
		let response = g_response;
		try {
			// const result = await Order.find().select('order_number product').populate('product').exec()
			const result = await Order.find().select('order_number product').exec()
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
	readOneOrder: async (req, res) => {
		// let response = g_response;
		// try {
		// 	if(typeof req.header('Authorization') !== undefined){  //check if bearer is undefined
		// 		const token = req.header('Authorization').replace('Bearer ', '')
		// 		const user = jwt.verify(token, process.env.JWT_KEY)
		// 		const result = await User.findById(user._id).exec()
		// 		response = {
		// 			error: false,
		// 			message: 'success',
		// 			data: res.status(200).send(result)
		// 		}
		// 	} else {
		// 		response.sendStatus(403); //forbidden
		// 	}
		// } catch(err) {
		// 	response.error = true;
		// 	res.status(500).send(err);
		// }
		res.send('read one order works')
	},
	updateOrder: async (req, res) => {
		// let response = g_response;
		// try {
		// 	const result = await User.findById(req.params.id).exec();
		// 	response = {
		// 		error: false,
		// 		data: res.status(200).send(result),
		// 	}
		// } catch(err) {
		// 	response.error = true;
		// 	res.status(500).send(err);
		// }
		res.send('update order works')
	},
	deleteOrder: async (req, res) => {
		// let response = g_response;
		// try {
		// 	let { user_id } = req.params;
		// 	// const result = await User.findById(req.params.id).exec();
		// 	await Users.deleteOne({ _id: ObjectId(user_id) })
		// 	// res.redirect('/?m=deleted')
		// 	response = {
		// 		error: false,
		// 		data: res.status(200).send('deleted')
		// 	}
		// } catch(err) {
		// 	response.error = true;
		// 	res.status(500).send(err);
		// }
		res.send('delete order works')
	}
}

module.exports = users;