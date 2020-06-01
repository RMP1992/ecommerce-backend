const express = require('express');
const {userById} = require('../controllers/user')


const router = express.Router()

const {create, categoryById, read, deleteCategory, updateCategory, list} = require('../controllers/category')
const {requireSignin, isAdmin, isAuth} = require('../controllers/auth')

router.get('/category/:categoryId', read)
router.post('/category/create/:userId', requireSignin, isAdmin, isAuth, create)
router.delete('/category/:categoryId/:userId', requireSignin, isAdmin, isAuth, deleteCategory)
router.put('/category/:categoryId/:userId', requireSignin, isAdmin, isAuth, updateCategory)
router.get('/categories', list)


router.param('userId', userById)
router.param('categoryId', categoryById)

module.exports = router