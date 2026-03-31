import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export const IdleTimeOutModal = ({ showModal, handleContinue, handleLogout, HandelsetTimeOut, setClearTimeOut, setShowModal }) => {

    React.useEffect(() => {
        //HandelsetTimeOut(handleLogout)
        if (showModal) {
            HandelsetTimeOut(handleLogout, setShowModal)
        }
        /* setTimeout(() => {
            handleLogout()
        }, 30000) */
    }, [showModal])
    
    return (
        <Modal show={showModal} onHide={handleContinue} backdrop={false}>
            <Modal.Header closeButton>
                <Modal.Title>You Have Been Idle!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Your session is Timed Out. You want to stay?</Modal.Body>
            <Modal.Footer>
                
                <Button variant="primary" onClick={() => {
                    handleContinue()
                    //ToDO: Do Some Thing
                }}>
                    Continue Session
                </Button>
            </Modal.Footer>
        </Modal>
    )
}