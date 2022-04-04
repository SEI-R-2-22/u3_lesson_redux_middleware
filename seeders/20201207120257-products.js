'use strict'
const falso = require('@ngneat/falso')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = [...Array(100)].map(() => ({
      name: falso.randProductName(),
      description: falso.randProductDescription(),
      createdAt: falso.randPastDate(),
      updatedAt: new Date()
    }))
    return await queryInterface.bulkInsert('products', products)
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('products')
  }
}
