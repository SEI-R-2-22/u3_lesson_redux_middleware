'use strict'
const falso = require('@ngneat/falso')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const departments = [...Array(50)].map(() => ({
      name: falso.randDepartment(),
      createdAt: falso.randPastDate(),
      updatedAt: new Date()
    }))
    return await queryInterface.bulkInsert('departments', departments)
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('departments')
  }
}
