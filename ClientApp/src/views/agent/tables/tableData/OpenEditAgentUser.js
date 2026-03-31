import { useState, useEffect } from 'react'
import axios from 'axios'
import { getAgentUsers } from '../../store/actions/index'
import { Button, Modal, Form } from 'reactstrap'
import { getUser } from '../../store/actions'
import { Edit } from 'react-feather'

import { useDispatch, useSelector } from 'react-redux'
import ModalBodyUI from './ModalBodyAgentUser'

import ModalHeaderUI from '../../../modal/ModalHeader'
import ModalFooterUI from '../../../modal/ModalFooter'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ! Add AddUser function 
const EditUser = (props) => {
  const dispatch = useDispatch()

    const Swal = require('sweetalert2')
    const SignupSchema = yup.object().shape({
        first_name: yup.string().trim().min(2, "Firstname must have at least 2 characters").max(32).required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Firstname "),
        email: yup.string().trim().required('Email is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter valid email address "),
        last_name: yup.string().trim().min(2, "Lastname must have at least 2 characters").max(15).required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Lastname "),
        mobile: yup.string().required('Mobile number is required').matches(/^\d{10}$/, "Mobile number must be 10 digit"),
        login_id: yup.string().trim().min(2, "Username must have at least 2 characters").max(32),
/*        login_id: yup.string().min(2, "Username must have at least 2 characters").max(15).required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Username "),*/
        password_hash: yup.string().trim().min(8, "Password must be at least 8 characters").max(15).required(),
        password_hash2: yup.string().trim().oneOf([yup.ref('password_hash'), null], 'Passwords must match')

    })
    const store = useSelector(state => state.Agent)

    const { register, errors, handleSubmit, trigger } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

    const onSubmit = data => {

        // dispatch({
        //     type: 'GET_USER',
        //     selectedUser: null
        // })
        data.agt_imagebytebase = document.getElementsByName("agt_imagebyte")[0].getAttribute("data") === null ? null : document.getElementsByName("agt_imagebyte")[0].getAttribute("data").split(",")[1]
        data.user_id = Number(props.id) /*Number(document.getElementsByName("login_id")[0].value)*/  /*Number(props.id)*/
        data.id = Number(props.id)
        /*data.userId = data.`id*/
        data.login_id = store.selectedUser.login_id
        data.state = 2
        data.is_blocked = data.status === 'true' && true
        data.is_administrator = false
        /*data.org_type_id = document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0*/  //Abhishek
        data.org_type_id = document.getElementById('sort-select1') !== null ? (document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0) : 0
        data.org_type = 4
      
        axios.post('./Agent/SaveAgentUser', data)
            .then(response => {
                const Isave = response.data === null ? null : JSON.parse(response.data.data).isSave
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
                    /*obj.AgentId = document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0*/
                    if (document.getElementById('sort-select1')) {
                        obj.AgentId = document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0
                    } else {
                        obj.AgentId = 0
                    }
                    dispatch(getAgentUsers(obj))
                    props.setOpen1(false)
                    Swal.fire(
                        'Success!',
                        'AgentUser updated successfully!!',
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
    }

  return (
    <div>
          <Modal isOpen={props.isOpen1} toggle={() => props.setOpen1(false)} backdrop="static" className='modal-md'>
              <ModalHeaderUI setis_open={props.setOpen1} headerName="Edit Agent User" />
              <Form onSubmit={handleSubmit(onSubmit)}>
              <ModalBodyUI register={register} errors={errors} selectedUser={store.selectedUser} bodyFor="edit" />
                  <ModalFooterUI IsCustUser='true' setis_open={props.setOpen1} FooterBtnName="Update" />
              </Form>
      </Modal>
    </div>
  )
}

export default EditUser