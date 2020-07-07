const {Order, CartItem } = require('../model/order')
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
    //console.log('createorder', req.body)
    req.body.order.user = req.profile
    const order = new Order(req.body.order)
    order.save((error, data) => {
        if(error){
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json(data)
    })
}

exports.listOrders = (res, req, next) => {
    Order.find()
    .populate('user', "_id, name, address")
    .sort('-created')
    .exec((err, orders) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json(orders)
    })
}