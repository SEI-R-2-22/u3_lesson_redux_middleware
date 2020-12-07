'use strict'
const faker = require('faker')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = [...Array(100)].map(() => ({
      name: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      createdAt: faker.date.past(),
      updatedAt: new Date()
    }))
    return await queryInterface.bulkInsert('products', products)
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('products')
  }
}
