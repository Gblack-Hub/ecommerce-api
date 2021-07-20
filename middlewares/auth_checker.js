"use strict";
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, err) => {
  try {
    if (typeof req.header("Authorization") !== undefined) {
      //check if bearer is undefined
      const token = req.header("Authorization").replace("Bearer ", "");
      const user = jwt.verify(token, process.env.JWT_KEY);
      console.log(user);
      // const result = await User.findById(user._id).exec()
      if (!user) {
        res.send({
          status: 401,
          message: "You are not authorized to access this page",
          data: null,
        });
      }
      // req.user = user
      // req.token = token
      next();
    } else {
      response.status(403).send(err); //forbidden
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = auth;
