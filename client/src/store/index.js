import { createStore, combineReducers } from 'redux'
import DepartmentReducer from './reducers/DepartmentReducer'
import ProductReducer from './reducers/ProductReducer'

const store = createStore(
  combineReducers({
    productState: ProductReducer,
    departmentState: DepartmentReducer
  })
)

export default store
