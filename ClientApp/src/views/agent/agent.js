// // ** React Imports
// import { Fragment } from 'react'

// // ** Custom Components
// import Breadcrumbs from '@components/breadcrumbs'

// // ** Third Party Components
// import { Row, Col } from 'reactstrap'

// // ** Tables
// import TableServerSide from './tables/tableData/AgentTable'

// // ** Styles
// import '@styles/react/libs/tables/react-dataTable-component.scss'

// const Organization = () => {
//   return (
//     <Fragment>
//           <Breadcrumbs breadCrumbTitle='Agent' breadCrumbParent='Agent' breadCrumbActive='Agent List' />
//       <Row>
//         <Col sm='12'>
//           <TableServerSide />
//         </Col>
//       </Row>
//     </Fragment>
//   )
// }

// export default Organization
// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import { Row, Col } from 'reactstrap'
import TableServerSide from './tables/tableData/AgentTable'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const Organization = () => {
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
          <Breadcrumbs breadCrumbTitle='Agent' breadCrumbParent='Agent' breadCrumbActive='Agent List' />
      <Row>
        <Col sm='12'>
        {loading && !dataFetched ? (
          <div className= "text-center">
            <h2 style={{fontFamily: "Montserrat", color:"black"}}>Please Wait ,Loading Agent List</h2>
          </div>
        ) :  (<TableServerSide />)}
        </Col>
      </Row>
    </Fragment>
  )
}

export default Organization
