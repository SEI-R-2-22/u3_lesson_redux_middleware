import {
  GetDepartmentProducts,
  GetDepartments
} from '../../services/DepartmentService'
import { GET_DEPARTMENTS, GET_DEPARTMENT_PRODUCTS, GET_PRODUCTS } from '../types'

export const LoadDepartments = () => {

  return async (dispatch) => {
    try {
      const departments = await GetDepartments()
      
      dispatch({
        type: GET_DEPARTMENTS,
        payload: departments
      })
    } catch (error) {
      throw error
    }
  }
}

export const LoadDepartmentProducts = (id) => {

  return async (dispatch) => {
    try {
      const products = await GetDepartmentProducts(id)

      dispatch({
        type: GET_PRODUCTS,
        payload: products
      })
    } catch (error) {
      throw error
    }
  }
}
