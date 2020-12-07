import { GET_DEPARTMENT_PRODUCTS } from '../types'

const iState = {
  products: [],
  productsLoading: '' // Should be type enum('Loading', 'Loaded', 'Inactive')
}

const ProductReducer = (state = iState, action) => {
  switch (action.type) {
    case GET_DEPARTMENT_PRODUCTS:
      return { ...state, products: action.payload }
    default:
      return { ...state }
  }
}

export default ProductReducer
