import { useState } from 'react'

import { Button, Modal, Form } from 'reactstrap'

import { Edit } from 'react-feather'
import axios from 'axios'
import { getData } from '../../store/actions/index'
import ModalBodyUI from './ModalBody'
import { SaveAgent } from '../../../MethodList'
import { useDispatch, useSelector } from 'react-redux'
import ModalHeaderUI from '../../../modal/ModalHeader'
import ModalFooterUI from '../../../modal/ModalFooter'

import * as yup from 'yup'
import "yup-phone"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ! Add AddUser function 
const EditUser = (props) => {
    const Swal = require('sweetalert2')
    const [is_open, setis_open] = useState(false)
    const store = useSelector(state => state.Agent)
    const dispatch = useDispatch()
    const SignupSchema = yup.object().shape({
        agt_name: yup.string().trim().notRequired(),
        /*agt_name: yup.string().min(2, "Agent Name must have at least 2 characters").max(32, "Agent Name can have max 32 characters").required("Agent Name is required"),*/
        agt_code: yup.string().trim().min(2, "Agent Code must have at least 2 characters").max(20, "Agent Code can have max 20 characters").required("Agent Code is required"),
        agt_address: yup.string().trim().min(10, "Address must have at least 10 characters").max(150, "Address Code can have max 150 characters").required("Address Code is required"),
        agt_state: yup.string().required("Please select state"),
        agt_pincode: yup.string().matches(/^[1-9][0-9]{5}$/, "Please enter valid pincode"),
        agt_city: yup.string().required("Please select city"),
        agt_country: yup.string().required("Please select country"),
        agt_phone: yup.string().required("Phone number is required").matches(/^\d{10}$/, "Phone number must be valid"),
        agt_email: yup.string().trim().max(48, "Email can have max 48 characters").required('Email is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter valid email address "),
        agt_website: yup.string().required("Website is required").matches(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g, "Please enter valid website"),
        start_Date: yup.date().required('Please select date').typeError('Please select start date'),
        end_Date: yup.date().required('Please select date').typeError('Please select end date').min(
            yup.ref('start_Date'),
            "end date can't be before start date"
        ),
        email: yup.string().email().trim().required(),
        first_name: yup.string().trim().min(2, "Firstname must have at least 2 characters").max(32, "First Name can have max 32 characters").required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Firstname "),
        last_name: yup.string().trim().min(2, "Lastname must have at least 2 characters").max(32, "Last Name can have max 32 characters").required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Lastname "),
        mobile: yup.string().required('Mobile number is required').matches(/^\d{10}$/, "Mobile number must be 10 digit"),
        password: yup.string().trim().min(8, "Password must be at least 8 characters").max(15, "Password can be upto 15 characters").required('Password is required'),
        passwordConfirmation: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match'),
        login_id: yup.string().trim().min(2, "Username must have at least 2 characters").max(10, "Username can have max 10 characters")/*.required("Username is required")*/
    })
    const { register, errors, handleSubmit, trigger } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
    const onSubmit = Agent => {
        console.log(Agent)
        Agent.agt_name = document.getElementsByName("agt_name")[0].value
        Agent.agent_id = Number(document.getElementById("agt_name").getAttribute("agentID"))
        Agent.state = 2
        Agent.start_Date = new Date(new Date(Agent.start_Date - ((Agent.start_Date).getTimezoneOffset() * 60 * 1000))).toISOString().split('T')[0]      /*abhishek 09*/
        Agent.end_Date = new Date(new Date(Agent.end_Date - ((Agent.end_Date).getTimezoneOffset() * 60 * 1000))).toISOString().split('T')[0]          /*abhishek 09*/
        Agent.userRequest = new Object()
        Agent.userRequest.first_name = Agent.first_name
        Agent.userRequest.last_name = Agent.last_name
        Agent.userRequest.login_id = document.getElementsByName("login_id")[0].value
        Agent.userRequest.email = Agent.email
        Agent.userRequest.mobile = Agent.mobile
        Agent.userRequest.password_hash = Agent.password
        Agent.userRequest.is_administrator = true
        Agent.userRequest.state = 2
        Agent.userRequest.is_blocked = eval(document.getElementById("C_status").value)
        Agent.userRequest.org_type_id = Number(document.getElementById("agt_name").getAttribute("agentID"))
        Agent.userRequest.user_id = Number(document.getElementById("first_name").getAttribute("userId"))
        Agent.userRequest.org_type = 4
        Agent.userRequest.login_id = store.selectedUser.userRequest.login_id 
        Agent.userRequest.agt_imagebytebase = document.getElementsByName("agt_imagebyte")[0].getAttribute("data") === null ? null : document.getElementsByName("agt_imagebyte")[0].getAttribute("data").split(",")[1]

        axios.post(`${SaveAgent}`, Agent)
            .then(response => {

                const Isave = response.data === null ? null : response.data.isSave
                if (Isave !== null && Isave !== false) {
                    const obj = new Object()
                    const pageno = Number(document.getElementsByClassName("pagination")[0].getElementsByClassName("active")[0].innerText) - 1
                    const entries = Number(document.getElementById("sort-select").value)
                    if (pageno === 0) {
                        obj.page = 0
                        obj.perPage = entries
                    } else {
                        obj.page = pageno * entries
                        obj.perPage = entries
                    }
                    dispatch(getData(obj))
                    props.setOpen1(false)
                    Swal.fire(
                        'Success!',
                        'Agent updated successfully!!',
                        'success'
                    )
                    setis_open(false)
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!'
                    })
                }
            })
            .then(() => {

            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <Modal backdrop="static" isOpen={props.isOpen1} toggle={() => props.setOpen1(false)} className='modal-lg'>
                <ModalHeaderUI setis_open={props.setOpen1} headerName="Edit Agent" />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBodyUI register={register} errors={errors} selectedUser={store.selectedUser} bodyFor="edit" />
                    <ModalFooterUI setis_open={props.setOpen1} FooterBtnName="Update" />
                </Form>
            </Modal>
        </div>
    )
}

export default EditUser