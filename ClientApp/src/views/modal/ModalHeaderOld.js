import { ModalHeader } from 'reactstrap'

const ModalHeaderUI = (data) => {
  return (
      <ModalHeader toggle={() => data.setis_open(false)}> {data.headerName}</ModalHeader>
  )
}

export default ModalHeaderUI