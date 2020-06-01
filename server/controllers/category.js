const Category = require('../model/category');
const {errorHandler} = require('../helpers/dbErrorHandler')


exports.categoryById = (req, res, next, id) =>{
    Category.findById(id).exec((err, category) => {
        if(err || !category){
            return res.status(400).json({
                error: 'Category not found.'
            })
        }
        req.category = category;
        next();
    })
}

exports.read = (req, res) => {
    return res.json(req.category)
}

exports.create = (req, res) => {
    const category = new Category(req.body)
    category.save((err, data) => {
        if(err){
            return res.status(404).json({
                error: errorHandler(err)
            })
        }
        res.json({data})
    })
    
}
exports.updateCategory = (req, res) => {
    const category = req.category
    category.name = req.body.name
    category.save((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}

exports.deleteCategory = (req, res, id) => {
    const category = req.category
    
    category.remove((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: 'Category deleted.'
        })
    })
}

exports.list = (req, res) => {
    Category.find().exec((err, data) =>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}
