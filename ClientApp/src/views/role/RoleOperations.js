// //**React Imports */
// import { Fragment, useState, useEffect } from 'react'
// import Select from 'react-select'
// import { selectThemeColors } from '@utils'

// //**Custom Components */
// import Breadcrumbs from '@components/breadcrumbs'

// // ** Third Party Components
// import { Row, Col, Label, Input, CardBody, Form, Button, CustomInput, Table} from 'reactstrap'
// import Card from '@components/card-snippet'
// import OperationCheck from './tables/tableData/OperationCheck'

// // ** Styles
// import '@styles/react/libs/tables/react-dataTable-component.scss'

// const RoleOperations = () => {
//    return (
// <Fragment>
//     <Breadcrumbs breadCrumbTitle='Role' breadCrumbParent='Role' breadCrumbActive='Role Operations' />      
//     <Card title='Role Operations' className="border-bottom" >
//         <hr/>   
//         <OperationCheck/>          
//      </Card>  
// </Fragment>
//    )
// }  
// export default RoleOperations
//**React Imports */
import { Fragment, useState, useEffect } from 'react'
import Select from 'react-select'
import { selectThemeColors } from '@utils'

//**Custom Components */
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col, Label, Input, CardBody, Form, Button, CustomInput, Table } from 'reactstrap'
import Card from '@components/card-snippet'
import OperationCheck from './tables/tableData/OperationCheck'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const RoleOperations = () => {
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
         <Breadcrumbs breadCrumbTitle='Role' breadCrumbParent='Role' breadCrumbActive='Role Operations' />
         {Loading && !dataFetched ? (
            <div className="text-center">
               <h2 style={{ fontFamily: "Montserrat", color: "#0a66c2" }}>Please Wait ,Loading Role Operations List</h2>
            </div>
         ) : (
            <Card title='Role Operations' className="border-bottom" >
               <hr />
               <OperationCheck />
            </Card>
         )}
      </Fragment>
   )
}
export default RoleOperations