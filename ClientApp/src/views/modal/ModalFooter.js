import React from 'react'
import { ModalFooter, Button } from "reactstrap"
import { stateContext } from "../context/stateContext"
const ModalFooterUI = (data) => {
  const { isValide, setIsValide, isEmpty, setisEmpty } = React.useContext(stateContext)
  return (
    <ModalFooter>
      <Button
        color="primary"
        type="submit"     
      >
        {data.FooterBtnName}
      </Button>
    </ModalFooter>
  )
}

export default ModalFooterUI
