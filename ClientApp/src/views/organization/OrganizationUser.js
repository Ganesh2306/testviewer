
// import { Fragment } from 'react' 

// // ** Custom Components
// import Breadcrumbs from '@components/breadcrumbs'

// // ** Third Party Components
// import { Row, Col } from 'reactstrap'

// // ** Tables
// import TableServerSide from './tableData/OrganizationUserTable'

// // ** Styles
// import '@styles/react/libs/tables/react-dataTable-component.scss'

// //**Context  */
// import StateProvider from './../context/stateContext'

// /*<Breadcrumbs breadCrumbTitle='Datatables' breadCrumbParent='Home' breadCrumbActive='Datatables Advance' />*/
// const OrganizationUser = () => {
//     console.log("parent")
//   return (
//     <Fragment>
//       <Breadcrumbs breadCrumbTitle='Organization User' breadCrumbParent='Organization' breadCrumbActive='Organization List' />
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

// export default OrganizationUser
// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Tables
import TableServerSide from './tableData/OrganizationUserTable'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

//**Context  */
import StateProvider from './../context/stateContext'

/*<Breadcrumbs breadCrumbTitle='Datatables' breadCrumbParent='Home' breadCrumbActive='Datatables Advance' />*/
const OrganizationUser = () => {
  const [Loading, setLoading] = useState(true)
  const [dataFetched, setDataFetched] = useState(false)
  useEffect(() => {
    const dataFetchedStorage  = localStorage.getItem('dataFetched')
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
    console.log("parent")
  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='Organization User' breadCrumbParent='Organization' breadCrumbActive='Organization List' />
      <Row>
        <Col sm='12'>
        {Loading && !dataFetched ? (
          <div className="text-center">
          <h2 style={{fontFamily: "Montserrat",  color:"#0a66c2"}}>Please Wait ,Loading Organization User List</h2>
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
