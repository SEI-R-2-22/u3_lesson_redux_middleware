const ProductsController = require('../controllers/ProductController')
const Router = require('express').Router()

Router.get('/', ProductsController.getAll)

module.exports = { path: ProductsController.path, Router }
