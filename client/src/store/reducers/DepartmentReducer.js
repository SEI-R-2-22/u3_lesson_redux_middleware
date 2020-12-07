const { DEPARTMENT_LOADING_TYPE } = require('../types')

const iState = {
  departments: [],
  departmentsLoading: '' // Should be type enum('Loading', 'Loaded', 'Inactive')
}

const DepartmentReducer = (state = iState, action) => {
  switch (action.type) {
    case DEPARTMENT_LOADING_TYPE:
      return { ...state, departmentsLoading: action.payload }
    default:
      return { ...state }
  }
}

export default DepartmentReducer
