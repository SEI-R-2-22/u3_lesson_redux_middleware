const { Product } = require('../models')

class ProductsController {
  static path = 'products'

  static async getAll(req, res) {
    try {
      const products = await Product.findAll()
      res.send(products)
    } catch (error) {
      throw error
    }
  }

  static async getById(req, res) {
    try {
      const product = await Product.findByPk(req.params.product_id)
      res.send(product)
    } catch (error) {
      throw error
    }
  }
}

module.exports = ProductsController
