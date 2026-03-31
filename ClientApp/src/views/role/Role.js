// // ** React Imports
// import { Fragment } from 'react'

// // ** Custom Components
// import Breadcrumbs from '@components/breadcrumbs'

// // ** Third Party Components
// import { Row, Col } from 'reactstrap'

// // ** Tables
// import TableServerSide from './tables/advance/TableServerSide'

// // ** Styles
// import '@styles/react/libs/tables/react-dataTable-component.scss'

// //**Context  */
// import StateProvider from '../context/stateContext'

// /*<Breadcrumbs breadCrumbTitle='Datatables' breadCrumbParent='Home' breadCrumbActive='Datatables Advance' />*/
// const Role = () => {
//   return (
//     <Fragment>
//       <Breadcrumbs breadCrumbTitle='Role' breadCrumbParent='Role' breadCrumbActive='Role List' />
//       <Row>
//         <Col sm='12'>
//         <StateProvider>
//           <TableServerSide />
//           </StateProvider>
//         </Col>
//       </Row>
//     </Fragment>
//   )
// }

// export default Role
// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Tables
import TableServerSide from './tables/advance/TableServerSide'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

//**Context  */
import StateProvider from '../context/stateContext'

/*<Breadcrumbs breadCrumbTitle='Datatables' breadCrumbParent='Home' breadCrumbActive='Datatables Advance' />*/
const Role = () => {
  const [Loading, setLoading] = useState(false)
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
      <Breadcrumbs breadCrumbTitle='Role' breadCrumbParent='Role' breadCrumbActive='Role List' />
      <Row>
        <Col sm='12'>
        {Loading && !dataFetched ? (
       <div className="text-center">
       <h2 style={{fontFamily: "Montserrat",  color:"#0a66c2"}}>Please Wait ,Loading Role List</h2>
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

export default Role
