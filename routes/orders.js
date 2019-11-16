"use strict"

const express = require('express');
const router = express.Router();
const orders = require('../controllers/orders');

//middlewares
// const user_checker = require('../middlewares/user_checker');
// const product_checker = require('../middlewares/product_checker');

router.route('/new').post(orders.addOrder);
router.route('/orders').get(orders.readOrders);
// // router.route('/:id').get(product_checker, orders.readOneProduct);
// router.route('/update/:id').put(orders.updateProduct);
// router.route('/delete/:id').delete(orders.deleteProduct);

module.exports = router;