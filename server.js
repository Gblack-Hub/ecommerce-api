"use strict"

require('dotenv').config();

const express = require('express');
const app = express();
const BodyParser = require('body-parser');
const usersRoute = require('./routes/users');
const productRoute = require('./routes/products');
const orderRoute = require('./routes/orders');
const port = process.env.PORT;

//database connection
require('./db/db')


app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
	res.status(200).send({ message: "Loan App"});
});

//public route
app.use('/user', usersRoute);

//private route
app.use('/product', productRoute);
app.use('/order', orderRoute);

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
// app.use(function(req, res, next) {
//  let err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });
//handle errors
// app.use(function(err, req, res, next) {
//  console.log(err);
//   if(err.status === 404)
//    res.status(404).json({message: "Not found"});
//   else
//     res.status(500).json({message: "Something looks wrong :( !!!"});
// });


app.listen(port, (err) => {
	if(err) console.log(err);
	else console.log("Server listening on port:", port);
})