const User = require('../models/user');

let email_checker = async (req, res, next) => {
    try {
        let { email } = req.body
        let email_exists = await User.findOne({ email : email });
        console.log(email_exists)
        if(email_exists){
            let message = {
                type: 0,
                message: res.status(200).send('email already used!')
            }
        }
        else {
            next()
        }
    } catch(err) {
        res.status(500).send(err)
    }

}

module.exports = email_checker;