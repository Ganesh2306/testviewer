// ** React Imports
import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, Input, Label, Row, Col, CardBody } from 'reactstrap'
import AddtoCollection from '../tableData/AddtoCollection'
import Design from '../../../design/Design'
import { getData } from '../../store/actions'
import { useSelector, useDispatch } from 'react-redux'


import '../../seasons.css'

const AssignDesignContent = () => {

    return (
      <>
          <Design />         
    </>
  )
}

export default AssignDesignContent