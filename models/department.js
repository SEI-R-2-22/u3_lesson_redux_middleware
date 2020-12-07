'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    static associate(models) {
      // define association here
      Department.hasMany(models.Product, {
        foreignKey: 'department_id',
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    }
  }
  Department.init(
    {
      name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Department',
      tableName: 'departments'
    }
  )
  return Department
}
