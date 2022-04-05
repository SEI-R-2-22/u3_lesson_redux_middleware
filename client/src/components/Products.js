import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { LoadDepartmentProducts } from '../store/actions/DepartmentActions'

const mapStateToProps = ({ productState }) => {
  return { productState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: (id) => dispatch(LoadDepartmentProducts(id))
  }
}

const Products = (props) => {
  let { id } = useParams()

  useEffect(() => {
    props.fetchProducts(id)
  },[id])

  return (
    <ul>
      {props.productState.products.length ? (
        props.productState.products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))
      ) : (
        <h3>No Products</h3>
      )}
    </ul>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
