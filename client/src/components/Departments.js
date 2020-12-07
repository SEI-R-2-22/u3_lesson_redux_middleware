import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const mapStateToProps = ({ departmentState }) => {
  return { departmentState }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const Departments = (props) => {
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
