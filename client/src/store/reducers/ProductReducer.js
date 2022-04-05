const { GET_PRODUCTS } = require('../types')

const iState = {
  products: []
}

const ProductReducer = (state = iState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, products: action.payload }
    default:
      return { ...state }
  }
}

export default ProductReducer
