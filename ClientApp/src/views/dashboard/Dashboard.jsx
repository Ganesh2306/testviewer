// ** React Imports
import { Fragment, useState} from 'react'
import { RefreshCw, Filter } from 'react-feather'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col, Input, Button } from 'reactstrap'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import './../../customStyles/archivestyle.css'
//**Context  */
import StateProvider from '../context/stateContext'
import RectangleCard from './cards/RectangleCard'

import OptionCard from './cards/OptionCard'

import ChartCard from './cards/ChartCard'

import './dashboard.css'
import DateRangUi from './cards/DateRangeUi'

/*<Breadcrumbs breadCrumbTitle='Datatables' breadCrumbParent='Home' breadCrumbActive='Datatables Advance' />*/
{ /* <div className='d-flex align-items-center mb-sm-0 mb-1 mr-1'></div> */ }

const style = {
  margin : '0px 0px 0px 10px'
}

const pstyle = {
  margin : '0px 0px 15px 0px',
  innerHeight:'100vh'
}

const sideViewStyle = {
 // margin : '0px px 0px 120px'
}

const Dashboard = () => {
 
  return (
    <Fragment>
      <Row style={pstyle}>
      <h1 className='col-md-9 col-sm-6' >Analytics dashboard </h1>
      <div className='col-md-3 col-sm-6 d-flex'>
   

         {/* <Input type='date' style={sideViewStyle} />
         <Input className ='ml-50' type='date' style={sideViewStyle} />

         <Button className="btn-sm" style={style} title="Refresh"><RefreshCw size={15} /></Button>
         <Button className="btn-sm" style={style} title="Filter"> <Filter size={15} /></Button> */}
       </div>
     
      </Row>
 
         <Row className="m-0 Test " >
        <RectangleCard />
        </Row>
      
      
        {/* <Row className="m-0">
        <OptionCard />
        </Row>
      
        <Row className="m-0">
        <ChartCard />
        </Row> */}
      
    </Fragment>
  )
}

export default Dashboard
