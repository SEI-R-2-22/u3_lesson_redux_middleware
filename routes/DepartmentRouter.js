const DepartmentController = require('../controllers/DepartmentController')

const Router = require('express').Router()

Router.get('/', DepartmentController.getAll)
Router.get('/:department_id', DepartmentController.getById)

module.exports = { path: DepartmentController.path, Router }
