// import React from 'react'
// import { ModalFooter, Button } from "reactstrap"
// // import { data as d } from '../validation/ValidationFunctions'
// import { stateContext } from "../context/stateContext"
// const ModalFooterUI = (data) => {
//   const { isValide, setIsValide, isEmpty, setisEmpty } = React.useContext(stateContext)
//   return (
//     <ModalFooter>
//       <Button
//         color="primary"
//         type="submit"
//         {data.FooterBtnName}
//       </Button>
//     </ModalFooter>
//   )
// }

// export default ModalFooterUI

import { ModalFooter, Button } from 'reactstrap'
const EditButtonName = (data) => {
return (  
  <Button color='primary' onClick={() => data.setis_open(false)}>
    {data.editBtnName}
  </Button>
  )
}
export default EditButtonName