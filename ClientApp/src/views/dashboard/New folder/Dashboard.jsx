// ** React Imports
import { Fragment } from 'react'
import { RefreshCw, Filter } from 'react-feather'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col, Input, Button } from 'reactstrap'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import './dashbord.css'
//**Context  */
import StateProvider from '../context/stateContext'
import RectangleCard from './cards/RectangleCard'

import OptionCard from './cards/OptionCard'

import ChartCard from './cards/ChartCard'

/*<Breadcrumbs breadCrumbTitle='Datatables' breadCrumbParent='Home' breadCrumbActive='Datatables Advance' />*/
{ /* <div className='d-flex align-items-center mb-sm-0 mb-1 mr-1'></div> */ }

const style = {
  margin : '0px 0px 0px 10px'
}

const pstyle = {
  margin : '0px 0px 15px 0px'
}

const sideViewStyle = {
 // margin : '0px px 0px 120px'
}

const Dashboard = () => {
  return (
    <Fragment>
      <Row style={pstyle}>
      <h1 className='col-8' > Dashboard sss</h1>
      <Input type='date' style={sideViewStyle} className='col-sm-2' /> 
      <Button style={style} ><RefreshCw size={15} /></Button>
      <Button  style={style}> <Filter size={15} /></Button>
      </Row>
      <Row>
        <RectangleCard />
      </Row>
      <Row>
        <OptionCard />
      </Row>
      <Row>
        <ChartCard />
      </Row>
    </Fragment>
  )
}

export default Dashboard
