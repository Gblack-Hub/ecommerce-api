"use strict"

const express = require('express');
const router = express.Router();
const products = require('../controllers/products');

//middlewares
// const user_checker = require('../middlewares/user_checker');
const product_checker = require('../middlewares/product_checker');

router.route('/add').post(products.addProduct);
router.route('/products').get(products.readProducts);
router.route('/:id').get(product_checker, products.readOneProduct);
router.route('/update/:id').put(products.updateProduct);
router.route('/delete/:id').delete(products.deleteProduct);

module.exports = router;