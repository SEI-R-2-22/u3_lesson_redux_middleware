import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getDepartmentProducts } from '../store/actions/DepartmentActions'

const Products = (props) => {
  useEffect(() => {
    props.getProducts(props.match.params.id)
  }, [props.match.params.id])
  const { products } = props.productState
  return (
    <div>
      {products.length ? (
        products.map((product) => (
          <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
          </div>
        ))
      ) : (
        <div>
          <h2>No Products</h2>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    productState: state.productState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: (id) => dispatch(getDepartmentProducts(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
