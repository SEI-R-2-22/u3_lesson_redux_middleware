const { DEPARTMENT_LOADING_TYPE, GET_DEPARTMENTS } = require('../types')

const iState = {
  departments: [],
  departmentsLoading: '' // Should be type enum('Loading', 'Loaded', 'Inactive')
}

const DepartmentReducer = (state = iState, action) => {
  switch (action.type) {
    case DEPARTMENT_LOADING_TYPE:
      return { ...state, departmentsLoading: action.payload }
    case GET_DEPARTMENTS:
      return { ...state, departments: action.payload }
    default:
      return { ...state }
  }
}

export default DepartmentReducer
