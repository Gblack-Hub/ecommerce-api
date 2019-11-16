"use strict"

const Mongoose = require('mongoose')
const db_con = process.env.DATABASE_URL

Mongoose.connect(db_con, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const db = Mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));