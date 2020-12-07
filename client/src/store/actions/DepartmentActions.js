import {
  GetDepartmentProducts,
  GetDepartments
} from '../../services/DepartmentService'
import { GET_DEPARTMENTS, GET_DEPARTMENT_PRODUCTS } from '../types'

export const getDepartments = () => async (dispatch) => {
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

export const getDepartmentProducts = (id) => async (dispatch) => {
  try {
    const products = await GetDepartmentProducts(id)
    dispatch({
      type: GET_DEPARTMENT_PRODUCTS,
      payload: products
    })
  } catch (error) {
    throw error
  }
}
