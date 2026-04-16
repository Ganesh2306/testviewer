import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal, ModalBody, ModalFooter} from 'reactstrap'

const Finish = (props) => { 
  
  const { errorTitle, errorMessage } = props

  return (  
          
    <div className='disabled-backdrop-modal'>
    <Fragment>      
      <Modal
        isOpen={props.disabledModal}
        toggle={() => props.setDisabledModal(!props.disabledModal)}
        className='modal-dialog-centered modal-lg'
        backdrop={'static'}
      >        
        {/* <ModalHeader toggle={() => props.setDisabledModal(!props.disabledModal)}>Disabled Backdrop</ModalHeader> */}
        <ModalBody className='m-0 p-0'>
          <header className='bg-light p-1 m-0 thank-title'>{ (errorTitle === null) ? "Success" : 'Error'}</header>
          <div className='p-3 text-center '><h1 className='thank-text'>{ (errorTitle === null) ? "Thank You!" : errorTitle}</h1>
          <h5 className='thank-subtext'> { (errorMessage === null) ? 'Your submission is received and we will contact you soon' : errorMessage}</h5>
          </div> 

        </ModalBody>
        <ModalFooter>
          <Link to='/login'>
          <Button color='primary' className='rounded-0' 
          onClick={() => props.setDisabledModal(!props.disabledModal)
          }>
            OK
          </Button>
          </Link>
          {' '}
        </ModalFooter>
      </Modal>  
        
    </Fragment>
  </div>
 
  )   
 }
export default Finish
    