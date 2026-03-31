import { Fragment, useEffect, useState } from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import { Row, Col } from 'reactstrap'
import TableServerSide from './tables/tableData/SupplierTable'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const Supplier = () => {
  const [loading, setLoading] = useState(true)
  const [dataFetched, setDataFetched] = useState(false)

 useEffect(() => {
  const dataFetchedStorage = localStorage.getItem('dataFetched')
  if (dataFetchedStorage) {
    setDataFetched(true)
  } else {
    setTimeout(() => {
    setLoading(false)
    setDataFetched(true)  
    localStorage.setItem('dataFetched', true)
    }, 1000)
  }
 }, [])
  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='Supplier' breadCrumbParent='Supplier' breadCrumbActive='Supplier List' />
      <Row>
        <Col sm='12'>
        {loading && !dataFetched ? (
           <div className= "text-center">
           <h2 style={{fontFamily: "Montserrat", color:"black"}}>Please Wait ,Loading Supplier List</h2>
         </div>
        ) : (<TableServerSide/>)}
          </Col>
      </Row>
    </Fragment>
  )
}

export default Supplier
