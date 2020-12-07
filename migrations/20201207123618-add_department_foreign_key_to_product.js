'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('products', 'department_id', {
      type: Sequelize.INTEGER,
      onDelete: 'cascade',
      references: {
        model: 'departments',
        key: 'id'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('products', 'department_id')
  }
}
