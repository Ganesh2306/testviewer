// ** React Imports
// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'
import { useState, useEffect, Fragment } from 'react'

// ** Tables
import TableServerSide from './tables/tableData/AgentUserTable'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import  StateProvider  from '../context/stateContext'

/*<Breadcrumbs breadCrumbTitle='Datatables' breadCrumbParent='Home' breadCrumbActive='Datatables Advance' />*/
const OrganizationUser = () => {
    const [loading, setLoading] = useState(true)
  const [dataFetched, setDataFetched] = useState(false)
   useEffect(() => {
    const dataFetchedStorage = localStorage.getItem('dataFetched')
    if (dataFetchedStorage) {
      setDataFetched(true)
    } else {
      // Simulate a delay to demonstrate the loader
      setTimeout(() => {
        setLoading(false)
        setDataFetched(true)
        localStorage.setItem('dataFetched', true)
      }, 1000)
    }
  }, [])
  return (
    <Fragment>
          <Breadcrumbs breadCrumbTitle='Agent' breadCrumbParent='Agent' breadCrumbActive='Agent User List' />
      <Row>
              <Col sm='12'>
              {loading && !dataFetched ? (
            <div className="text-center">
              <h2 style={{fontFamily: "Montserrat",  color:"black"}}>Please Wait ,Loading Agent User List</h2>
            </div>
          ) : (
            <StateProvider>
            <TableServerSide />
        </StateProvider>
          )}
        </Col>
      </Row>
    </Fragment>
  )
}

export default OrganizationUser
