const iState = {
  products: [],
  productsLoading: '' // Should be type enum('Loading', 'Loaded', 'Inactive')
}

const ProductReducer = (state = iState, action) => {
  switch (action.type) {
    default:
      return { ...state }
  }
}

export default ProductReducer
