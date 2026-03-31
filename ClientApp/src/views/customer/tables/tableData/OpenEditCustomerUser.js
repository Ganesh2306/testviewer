import { useState, useRef } from 'react'
import { Button, Form, Modal } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCustUser, getCustomerUsers } from '../../store/actions/index'
import { Edit } from 'react-feather'
import ModalBodyUI from './ModalBodyCustUser'
import ModalHeaderUI from '../../../modal/ModalHeader'
import ModalFooterUI from '../../../modal/ModalFooter'
import * as yup from 'yup'
import axios from 'axios'
import Swal from 'sweetalert2'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
// ! Add AddUser function 
const EditUser = (props) => {
    const dispatch = useDispatch()
    const [is_open, setis_open] = useState(false)
    const store = useSelector(state => state.Customerusers)

    const CustUserEditSchema = yup.object().shape({
        first_name: yup.string().trim().min(2, "Firstname must have at least 2 characters").max(32, "First Name can have max 32 characters").required("First name is required").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Firstname "),
        last_name: yup.string().trim().min(2, "Lastname must have at least 2 characters").max(32, "Last Name can have max 32 characters").required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Lastname "),
        login_id: yup.string().trim().notRequired(), /*yup.string().min(2, "Username must have at least 2 characters").max(32).required(),*/
        email: yup.string().trim().max(150, "First Name can have max 150 characters").required('Email is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter valid email address "),
        mobile: yup.string().required('Mobile number is required').matches(/^\d{10}$/, "Mobile number must be 10 digit"),
        password_hash: yup.string().trim().min(8, "Password must be at least 8 characters").max(15, "Password can be upto 15 characters").required('Password is required'),
        c_password: yup.string().trim().oneOf([yup.ref('password_hash'), null], 'Passwords must match'),
        department: yup.string().trim().min(2, "Department must have at least 2 characters").max(15, "Department can have max 15 characters").required(),
        status: yup.string().notRequired(),
        profile_Image: yup.string().notRequired(),
        user_id: yup.string().notRequired()
    })


    const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(CustUserEditSchema) })

    const UpdateCustUser = e => {
        const orgUser = new Object()
        orgUser.user_id = e.user_id
        orgUser.login_id = store.selectedCustomerUser.login_id 
        orgUser.first_name = e.first_name
        orgUser.last_name = e.last_name
        orgUser.email = e.email
        orgUser.mobile = e.mobile
        orgUser.department = e.department
        orgUser.password_hash = e.password_hash
        orgUser.is_blocked = eval(document.getElementById("C_status").value)
        orgUser.agt_imagebytebase = document.getElementsByName("agt_imagebyte")[0].getAttribute("data") === null ? null : document.getElementsByName("agt_imagebyte")[0].getAttribute("data").split(",")[1]
      //  orgUser.isBlocked = e.state === "Active" ? 0 : 1
        orgUser.state = 2
        orgUser.is_administrator = false
        orgUser.org_type = 3
        //orgUser.org_type_id = document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0
        orgUser.org_type_id = document.getElementById('sort-select1') !== null ? (document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0) : 0
       // dispatch(addCustUser(orgUser))
       // props.setOpen1(false)
        axios.post(`./Customer/SaveCustomerUser`, orgUser)
            .then(response => {

                const Isave = JSON.parse(response.data.data) === null ? null : JSON.parse(response.data.data).isSave
                if (Isave !== null && Isave !== false && Isave !== undefined) {
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
                    obj.CustomerId = response.data.req.org_type_id
                    dispatch(getCustomerUsers(obj))
                    props.setOpen1(false)
                    Swal.fire(
                        'Success!',
                        'Customeruser updated successfully!!',
                        'success'
                    )
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
        props.setOpen1(false)
    }

    return (
        <div>
            <div className='d-flex' onClick={() => setis_open(true)}>
                {/*<Button.Ripple color='primary' className='btn-sm'>*/}
                {/*  <Edit size={15} />*/}
                {/*</Button.Ripple>*/}
            </div>
            <Modal isOpen={props.isOpen1} toggle={() => props.setOpen1(false)} className='modal-md' backdrop={'static'}>
                <ModalHeaderUI setis_open={props.setOpen1} headerName="Edit Customer User" />
                <Form onSubmit={handleSubmit(UpdateCustUser)}>
                    <ModalBodyUI bodyFor="edit"
                        selectedUser={store.selectedCustomerUser}
                        register={register}
                        errors={errors}
                    />
                    <ModalFooterUI IsCustUser='true' setis_open={props.setOpen1} FooterBtnName="Update" />
                </Form>
            </Modal>
        </div>
    )
}

export default EditUser