"use strict"

const Mongoose = require('mongoose');

const product_schema = new Mongoose.Schema({
	product_name: { type: String, required: true },
	quantity: { type: Number, required: true },
	price: { type: Number, required: true },
	active: { type: Boolean, required: true },
	date_created: { type: Date, default: Date.now(), required: true }
})

module.exports = Mongoose.model('Product', product_schema);