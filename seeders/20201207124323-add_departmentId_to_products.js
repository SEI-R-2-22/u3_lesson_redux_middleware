'use strict'
const { Department, Product, sequelize } = require('../models')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const departments = await Department.findAll({
      attributes: ['id'],
      raw: true
    })
    const products = await Product.findAll()
    return await Promise.all(
      products.map(async (product) => {
        let department = await Department.findOne({
          raw: true,
          order: sequelize.random()
        })
        await product.update({ departmentId: department.id })

        return true
      })
    )
  },

  down: async (queryInterface, Sequelize) => {
    const products = await Product.findAll()
    return await Promise.all(
      products.map(async (product) => {
        await product.update({ departmentId: null })
        return true
      })
    )
  }
}
