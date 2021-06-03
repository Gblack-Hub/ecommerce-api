const Product = require('../models/product')

const g_response = {
    error: null,
    message: null,
}
let product_checker = async (req, res, next) => {
    let response= g_response
    try {
        let product_exists = await Product.findById( req.params.id );
        if(product_exists.active === false){
            response.message = res.status(200).send({type: 0, error: 'This product is not available for shopping!'})
        }
        if(product_exists.quantity <= 0){
            response.message = res.status(200).send({type: 1, error: 'This product has finished!'})
        }
        else {
            next()
        }
    } catch(err) {
        response.error = true
        res.status(500).send(err)
    }

}

module.exports = product_checker;