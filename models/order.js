"use strict"

const Mongoose = require('mongoose');
// const Product = require('./product')
var nu = Math.floor(Math.random()*10)
const order_schema = new Mongoose.Schema({
	order_number: { type: String, default: nu, required: true },
	order_quantity: { type: Number, required: true },
	total_amount: { type: Number, required: true },
	product: { type: Mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
	order_status: { type: String, required: false },
	date_created: { type: Date, default: Date.now(), required: true }
})

order_schema.pre('save', async function (next) {
    // Hash the password before saving the user model
    // const user = this
    // if (user.isModified('password')) {
    //     user.password = await bcrypt.hash(user.password, 8)
    // }

    // next()
})

order_schema.statics.checkQuantity = async (quantity)  => {
   const quantityValue = await Order.findOne({ quantity })
	console.log(quantityValue)

	return quantityValue
}

const Order = Mongoose.model('Order', order_schema);
module.exports = Order