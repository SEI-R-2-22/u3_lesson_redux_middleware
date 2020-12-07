const { Department, Product } = require('../models')

module.exports = class DepartmentController {
  static path = 'departments'

  static async getAll(req, res) {
    try {
      const departments = await Department.findAll()
      res.send(departments)
    } catch (error) {
      throw error
    }
  }

  static async getById(req, res) {
    try {
      const departmentsAndProducts = await Department.findByPk(
        req.params.department_id,
        { include: [Product] }
      )
      res.send(departmentsAndProducts)
    } catch (error) {
      throw error
    }
  }
}
