import { createStore, combineReducers } from 'redux'
import DepartmentReducer from './reducers/DepartmentReducer'

const store = createStore(
  combineReducers({
    departmentState: DepartmentReducer
  })
)

export default store
