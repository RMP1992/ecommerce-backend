const express = require('express');
const {userById} = require('../controllers/user')

const router = express.Router()

const {createProduct, productById, read, deleteProduct, updateProduct, list, listRelated, listCategories, listBySearch, photo, listSearch} = require('../controllers/product')
const {requireSignin, isAdmin, isAuth} = require('../controllers/auth')

router.get('/product/:productId', read)

router.post('/product/create/:userId', requireSignin, isAdmin, isAuth, createProduct)

router.delete('/product/:productId/:userId', requireSignin, isAdmin, isAuth, deleteProduct)

router.put('/product/:productId/:userId', requireSignin, isAdmin, isAuth, updateProduct)

router.get('/products', list)

router.get('/products/search', listSearch)

router.get('/products/related/:productId', listRelated)

router.get('/products/categories', listCategories)

router.post('/products/by/search', listBySearch)

router.get('/product/photo/:productId', photo)

router.param('userId', userById)
router.param('productId', productById)

module.exports = router