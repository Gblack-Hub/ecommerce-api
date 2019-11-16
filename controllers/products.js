"use strict"
const Product = require('../models/product')

const g_response = {
	error: null,
	message: null,
	data: null
}

let products = {
	addProduct: async (req, res) => {
		let response = g_response;
		try {
			let { product_name, quantity, price, active } = req.body;
			let productData = new Product({
				product_name: product_name,
				quantity: quantity,
				price: price,
				active: active
			});
			const result = await productData.save();
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
	readProducts: async (req, res) => {
		let response = g_response;
		try {
			const result = await Product.find().exec();
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
	readOneProduct: async (req, res) => {
		let response = g_response;
		try {
			const result = await Product.findById(req.params.id).exec()
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
	updateProduct: async (req, res) => {
		let response = g_response;
		try {
			const result = await Product.findById(req.params.id).exec();
			response = {
				error: false,
				data: res.status(200).send(result),
			}
		} catch(err) {
			response.error = true;
			res.status(500).send(err);
		}
	},
	deleteProduct: async (req, res) => {
		let response = g_response;
		try {
			let { product_id } = req.params;
			// const result = await User.findById(req.params.id).exec();
			await Product.deleteOne({ _id: ObjectId(product_id) })
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

module.exports = products;