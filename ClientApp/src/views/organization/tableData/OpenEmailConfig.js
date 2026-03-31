import { useRef} from 'react'

import { Modal, Form, Button, Col } from 'reactstrap'
import { useForm } from 'react-hook-form'
import ModalEmailBodyUI from './EmailModelBody'
import ModalHeaderUI from './../../modal/ModalHeader'
import ModalFooterUI from './../../modal/ModalFooter'
//import * as Form from '@uppy/form'
import axios from 'axios'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// ! Edit user function 
const EditEmail = (props) => {
    
    const Swal = require('sweetalert2')    
    const childRef = useRef()
    const EmailAddSchema = yup.object().shape({
    em_Configuration_Id: yup.string().notRequired(),
    ac_name : yup.string().min(2, "Name must have at least 2 characters").max(32, "Name can have max 32 characters").required("Name is required").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for name "),
    email_id : yup.string().required('Email is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter valid email address "),
    password :yup.string().min(8, "Password must be at least 8 characters").max(15).required("Password is required"),
    accounttype : yup.string().notRequired(),
    mailServer_id : yup.string().min(2, "Mail server (SMTP) must have at least 2 characters").max(50, "Mail server (SMTP) can have max 50 characters").required("Mail server (SMTP) is required"),
    port_id : yup.string().required("Port is required"),
    mailbbc_id : yup.string().required("BCC Email is required"),
    mailcc_id : yup.string().required("CC Email is required")
}) 

    const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(EmailAddSchema) })

    const ClickState = {
        state : true
    }
   
    const setClickState = (a) => {
        ClickState.state = a
    }
    const UpdateEmail = async(e) => {
        //! Object 
        const _emailConfig = new Object()
       // emailDto.Em_Configuration_Id = 0
       _emailConfig.em_Configuration_Id = e.em_Configuration_Id
       if (e.em_Configuration_Id === '' || e.em_Configuration_Id === "0") {   //abhishek 04/03
       _emailConfig.State = 0
       } else {
        _emailConfig.State = 2
       }
        _emailConfig.Em_Organisation_Id =  props.id
        _emailConfig.em_User = e.ac_name
        _emailConfig.Em_Address = e.email_id
        _emailConfig.Em_Password = e.password
        _emailConfig.Em_SMTP = e.mailServer_id
        _emailConfig.Em_SMTP_Port = e.port_id
        _emailConfig.Em_Account_Type = e.accounttype
        _emailConfig.Em_bcc = e.mailbbc_id
        _emailConfig.Em_CC = e.mailcc_id
      
        if (ClickState.state) {
            axios.post(`./Organization/SaveEmailConfigurations`, _emailConfig)
        .then(response => {
            
            const Isave = response.data === null ? null : JSON.parse(response.data).isSave
            if (Isave) {
               // const obj = new Object()                
             //  obj.id = props.id
                props.setEmailOpen1(false)             
                Swal.fire(
                    'Success',
                    'Mail Configered Successfully!!',
                    'success'
                )
            } else {
                if (Isave !== null) {
                Swal.fire({
                    icon: 'info',
                    title: 'Oops...',
                    text: 'Mail Not Configered!'
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                })
            }
            }

        })
        .then(() => {

        })
        .catch(err => console.log(err))              
        } else {
            const res = await axios.post(`./Organization/SendTestMail`, _emailConfig)
            const Issend = res.data === null ? null : JSON.parse(res.data).value
            if (Issend === "Send") {
                Swal.fire({
                    icon: 'Success',
                    title: 'TestMail',
                    text: 'Mail Send Successfully!'
                })
             } else {
                Swal.fire({
                 icon: 'error',
                    title: 'Hmm We\'re having trouble sending the Email',
                    text: 'We can\'t connect to the mail server.Mail address and server mail setting are correct? Here are other things you can try: Try again later.Check your network connection.If you are connected but behind a firewall, check that has permission to access the Web.!'
                 })
                }
        }
    }         
    return (
        
        <div>
            <Modal backdrop="static" isOpen={props.isEmailOpen1} toggle={() => props.isEmailOpen1(false)} className='modal-md-6'>
                <ModalHeaderUI setis_open={props.setEmailOpen1} headerName="Mail Configration" />
               
                <Form onSubmit={handleSubmit(UpdateEmail)}  autocomplete="none" >
                    <ModalEmailBodyUI register={register} errors={errors}  ref={childRef} bodyFor="Save" emailData={props.emailData} />
                   {/*<ModalFooterUI setis_open={props.setEmailOpen1} FooterBtnName="Save" />*/}
                    {/* abhishek 10/03 start*/}
                    <Col className="d-flex  " >
                        <Col className="col-sm-2"></Col>
                        <Col className="col-sm-4">
                            <ModalFooterUI setClickState={setClickState} mystate={true} setis_open={props.setEmailOpen1} FooterBtnName="Save" />
                        </Col>
                        <ModalFooterUI setClickState={setClickState} mystate={false} FooterBtnName="Send Test Mail" />
                    </Col>
                    {/* abhishek 10/03 end*/}
                </Form>
            </Modal>
        </div>
    )
}

export default EditEmail