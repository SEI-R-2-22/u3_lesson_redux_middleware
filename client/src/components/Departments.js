import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getDepartments } from '../store/actions/DepartmentActions'
import { Link } from 'react-router-dom'

const mapStateToProps = ({ departmentState }) => {
  return { departmentState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDepartments: () => dispatch(getDepartments())
  }
}

const Departments = (props) => {
  useEffect(() => {
    props.fetchDepartments()
  }, [])

  return (
    <div>
      {props.departmentState.departments.map((department) => (
        <ul key={department.id}>
          <Link to={`/departments/${department.id}`}>{department.name}</Link>
        </ul>
      ))}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Departments)
