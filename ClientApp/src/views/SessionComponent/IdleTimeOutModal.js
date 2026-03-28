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
            <Modal.Body>You have been idle for a few minutes. Your session will expire in a few seconds. To continue your session, please select ‘Continue session.</Modal.Body>
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