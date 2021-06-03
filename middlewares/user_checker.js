const User = require('../models/user');

//check if user exists
let user_checker = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).exec();
    if (user == null) {
      return res.status(404).send('user not found')
    } else {
      res.user = user
      next();
    }
  } catch(err){
    return res.status(500).send(err);
  }

}

module.exports = user_checker;