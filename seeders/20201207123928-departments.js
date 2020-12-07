'use strict'
const faker = require('faker')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const departments = [...Array(50)].map(() => ({
      name: faker.commerce.department(),
      createdAt: faker.date.past(),
      updatedAt: new Date()
    }))
    return await queryInterface.bulkInsert('departments', departments)
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('departments')
  }
}
