import { useState } from 'react'
import { getData } from '../../store/actions/index'
import { Button, Modal, Form } from 'reactstrap'
import { SaveAgent } from '../../../MethodList'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import ModalBodyUI from './ModalBody'
import * as yup from 'yup'
import "yup-phone"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ModalHeaderUI from '../../../modal/ModalHeader'
import ModalFooterUI from '../../../modal/ModalFooter'

// ! Add AddUser function 
const AddUser = (btnName) => {
    const Swal = require('sweetalert2')
    const dispatch = useDispatch()

    const [is_open, setis_open] = useState(false)
    const SignupSchema = yup.object().shape({
        agt_name: yup.string().trim().min(2, "Agent Name must have at least 2 characters").max(50, "Agent Name can have max 50 characters").required("Agent Name is required"),
        agt_code: yup.string().trim().min(2, "Agent Code must have at least 2 characters").max(20, "Agent Code can have max 20 characters").required("Agent Code is required"),
        agt_address: yup.string().trim().min(10, "Address must have at least 10 characters").max(150, "Address Code can have max 150 characters").required("Address Code is required"),
        agt_state: yup.string().required("Please select state"),
        agt_pincode: yup.string().matches(/^[1-9][0-9]{5}$/, "Please enter valid pincode"),
        agt_city: yup.string().required("Please select city"),
        agt_country: yup.string().required("Please select country"),
        agt_phone: yup.string().required("Phone number is required").matches(/^\d{10}$/, "Phone number must be valid"),
        agt_email: yup.string().trim().max(48, "Email can have max 48 characters").required('Email is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter valid email address "),
        agt_website: yup.string().required("Website is required").max(48, "Website Name can have max 48 characters").matches(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g, "Please enter valid website"),
        start_Date: yup.date().required('Please select date').typeError('Please select start date'),
        end_Date: yup.date().required('Please select date').typeError('Please select end date').min(yup.ref('start_Date'), "end date can't be before start date "),
        email: yup.string().email().trim().max(48, "Email can have max 48 characters").required(),
        first_name: yup.string().trim().min(2, "Firstname must have at least 2 characters").max(32, "First Name can have max 32 characters").matches(/^\S*$/, "Please enter valid first Name").required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Firstname "),
        last_name: yup.string().trim().min(2, "Lastname must have at least 2 characters").max(32, "Last Name can have max 32 characters").matches(/^\S*$/, "please enter valid last Name").required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Lastname "),
        mobile: yup.string().required('Mobile number is required').matches(/^\d{10}$/, "Mobile number must be 10 digit"),
        password: yup.string().trim().min(8, "Password must be at least 8 characters").max(15, "Password can be upto 15 characters").required('Password is required'),
        passwordConfirmation: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match'),
        login_id: yup.string().trim().min(2, "Username must have at least 2 characters").max(10, "Username can have max 10 characters").matches(/^\S*$/, "please enter valid UserId").required("Username is required")
    })
    const { register, errors, handleSubmit, trigger } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
    const onSubmit = Agent => {

        console.log(Agent)
        Agent.userRequest = new Object()
        Agent.userRequest.first_name = Agent.first_name
        Agent.userRequest.last_name = Agent.last_name
        Agent.userRequest.login_id = Agent.login_id
        Agent.userRequest.email = Agent.email
        Agent.userRequest.mobile = Agent.mobile
        Agent.userRequest.password_hash = Agent.password
        Agent.userRequest.is_blocked = eval(document.getElementById("C_status").value)
        Agent.userRequest.is_administrator = true
        Agent.userRequest.org_type = 4
        Agent.userRequest.agt_imagebytebase = document.getElementsByName("agt_imagebyte")[0].getAttribute("data") === null ? null : document.getElementsByName("agt_imagebyte")[0].getAttribute("data").split(",")[1]
        Agent.start_Date = new Date(new Date(Agent.start_Date - ((Agent.start_Date).getTimezoneOffset() * 60 * 1000))).toISOString().split('T')[0]
        Agent.end_Date = new Date(new Date(Agent.end_Date - ((Agent.end_Date).getTimezoneOffset() * 60 * 1000))).toISOString().split('T')[0]
        axios.post(`${SaveAgent}`, Agent)
            .then(response => {
                const Isave = response.data === null ? null : response.data.isSave
                const Icust = response.data === null ? null : JSON.parse(response.data).isAgentExisted
                const Icustuser = response.data === null ? null : JSON.parse(response.data).isUserExisted
                if (JSON.parse(response.data).message === null) {
                    if (Icustuser && Icust) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Exist',
                            text: 'Login Id and Agent Name Already Exist Please change login Id and Agent Name!'
                        })
                    } else if (Icustuser) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Exist',
                            text: 'Login Id Already Exist Please change login Id!'
                        })
                    } else if (Icust) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Exist',
                            text: 'Agent Name Already Exist Please change Name !'
                        })
                    } else if (Isave !== null && Isave !== false) {
                        const obj = new Object()
                        obj.page = 0
                        obj.perPage = 7
                        dispatch(getData(obj))
                        setis_open(false)
                        Swal.fire(
                            'Success!',
                            'Agent saved successfully!!',
                            'success'
                        )
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!'
                        })
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Agent',
                        text: JSON.parse(response.data).message
                    })
                }
            })
            .then(() => {

            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <Button.Ripple color='primary' onClick={() => setis_open(true)}>
                Add Agent
      </Button.Ripple>
            <Modal backdrop="static" isOpen={is_open} toggle={() => setis_open(false)} className='modal-lg'>
                <ModalHeaderUI setis_open={setis_open} headerName="Add Agent" />
                <Form onSubmit={handleSubmit(onSubmit)}>

                    <ModalBodyUI register={register} errors={errors} bodyFor="add" />
                    <ModalFooterUI setis_open={setis_open} FooterBtnName="Save" />
                </Form>
            </Modal>
        </div>
    )
}

export default AddUser