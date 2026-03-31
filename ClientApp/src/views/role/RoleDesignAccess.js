// //**React Imports */ 


// import { Fragment } from 'react'

// //**Custom Components */
// import Breadcrumbs from '@components/breadcrumbs'

// // ** Third Party Components
// import { Row, Col } from 'reactstrap'

// // ** Styles
// import '@styles/react/libs/tables/react-dataTable-component.scss'

// //**Context  */
// import StateProvider from '../context/stateContext'

// // ** Tables
// import RoleAccessTable from './tables/tableData/RoleAccessTable'


// const RoleDesignAccess = () => {
//    return (
//     <Fragment>
//           <Breadcrumbs breadCrumbTitle='Role' breadCrumbParent='Role' breadCrumbActive='Role Design Access' />
//         <Row>
//             <Col sm ='12'>
//                 <StateProvider>
//                  <RoleAccessTable/>   
//                 </StateProvider>
//             </Col>
//         </Row>
//     </Fragment>
//    )
// }
// export default RoleDesignAccess
//**React Imports */
import { Fragment, useEffect, useState } from 'react'

//**Custom Components */
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

//**Context  */
import StateProvider from '../context/stateContext'

// ** Tables
import RoleAccessTable from './tables/tableData/RoleAccessTable'


const RoleDesignAccess = () => {
  const [Loading, setLoading] = useState(true)
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
      <Breadcrumbs breadCrumbTitle='Role' breadCrumbParent='Role' breadCrumbActive='Role Design Access' />
      <Row>
        <Col sm='12'>
          {Loading && !dataFetched ? (
            <div className="text-center">
              <h2 style={{ fontFamily: "Montserrat", color: "#0a66c2" }}>Please Wait ,Loading Role Design Access List</h2>
            </div>
          ) : (
            <StateProvider>
              <RoleAccessTable />
            </StateProvider>
          )}
        </Col>
      </Row>
    </Fragment>
  )
}
export default RoleDesignAccess