import { useState } from 'react'
import axios from 'axios'
import { getAgentUsers } from '../../store/actions/index'
import { Button, Modal, Form } from 'reactstrap'
import { useDispatch } from 'react-redux'
import ModalBodyUI from './ModalBodyAgentUser'
import ModalHeaderUI from '../../../modal/ModalHeader'
import { ModalFooterUISaveCancel, ModalFooterUI } from '../../../modal/ModalFooterOld'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


// ! Add AddUser function 
const AddUser = (props) => {
    const [is_open, setis_open] = useState(false)
    const dispatch = useDispatch()
    const Swal = require('sweetalert2')
    const SignupSchema = yup.object().shape({
        first_name: yup.string().trim().min(2, "Firstname must have at least 2 characters").max(15).required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Firstname ").matches(/^\S*$/, "please enter valid first Name"),
        email: yup.string().trim().required('Email is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter valid email address "),
        last_name: yup.string().trim().min(2, "Lastname must have at least 2 characters").max(15).required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Lastname ").matches(/^\S*$/, "please enter valid last Name"),
        mobile: yup.string().required('Mobile number is required').matches(/^\d{10}$/, "Mobile number must be 10 digit"),
        login_id: yup.string().trim().min(2, "Username must have at least 2 characters").max(15).required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Username ").matches(/^\S*$/, "please enter valid UserId"),
        password_hash: yup.string().trim().min(8, "Password must be at least 8 characters").max(15).required(),
        password_hash2: yup.string().trim().oneOf([yup.ref('password_hash'), null], 'Passwords must match'),
        status: yup.string().notRequired(), //nirbhay
        is_blocked : yup.string().notRequired()

    })

    const { register, errors, handleSubmit, trigger } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

    const onSubmit = data => {
        //data.is_blocked = data.status
        data.agt_imagebytebase = document.getElementsByName("agt_imagebyte")[0].getAttribute("data") === null ? null : document.getElementsByName("agt_imagebyte")[0].getAttribute("data").split(",")[1]
        data.is_administrator = false
        /* data.org_type_id = document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0*/  //Abhishek
        data.org_type_id = document.getElementById('sort-select1') !== null ? (document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0) : 0
        data.org_type = 4
        
        axios.post('./Agent/SaveAgentUser', data)
            .then(response => {
                
                const Isave = response.data === null ? null : JSON.parse(response.data.data).isSave
                const Isexist = response.data === null ? null : JSON.parse(response.data.data).isUserExisted
                if (JSON.parse(response.data.data).message === null) {
                if (Isexist) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Exist',
                        text: 'Login Id Already Exist Please change login Id!'
                    })
                } else if (Isave !== null && Isave !== false) {
                    setis_open(false)
                    const obj = new Object()
                    obj.page = 0
                    obj.perPage = 7
                    if (document.getElementById('sort-select1')) {
                        obj.AgentId = document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0
                    } else {
                        obj.AgentId = 0
                    }
                    dispatch(getAgentUsers(obj))
                   // setis_open(false)
                    Swal.fire(
                        'Success!',
                        'AgentUser saved successfully!!',
                        'success'
                    )
                } else {
                    setis_open(false)      //abhishek 18-02
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!'
                    })
                    }

                } else {
                    setis_open(false)      //abhishek 18-02
                    Swal.fire({
                        icon: 'error',
                        title: 'Agent User',
                        text: JSON.parse(response.data.data).message   //abhishek 18-02
                    })
                }

            })
            .then(() => {

            })
            .catch(err => console.log(err))
    }

/*  abhishek 10-02 start */
  return (
      <div>
          <Button.Ripple color='primary' onClick={() => {
              const agents1 = []
              const obj = new Object()
              obj.Start = 0
              obj.End = 0
              axios.post(`./Agent/Agents`, obj).then(response => {
                  const agents = response.data.agentListDto
                  if (agents.length > 0) {
                      setis_open(true)
                  } else {
                      Swal.fire({
                          icon: 'info',
                          title: 'Agent ',
                          text: 'ADD Agent!'
                      })
                  }
              })
          }
          }>
              {/*abhishek 10-02 end */}
     {/* <Button.Ripple color='primary' onClick={() => setis_open(true)}>*/}
              Add New User
      </Button.Ripple>
        
          <Modal isOpen={is_open} toggle={() => setis_open(false)} className='modal-md' backdrop="static" >
              <ModalHeaderUI setis_open={setis_open} headerName="Add Agent User" />
              <Form onSubmit={handleSubmit(onSubmit)}>
                  <ModalBodyUI register={register} errors={errors}  bodyFor="add" />

                  <ModalFooterUISaveCancel setis_open={props.setOpen1 === undefined ? setis_open : props.setOpen1} FirstBtnName="Save" SecondBtnName="Cancel" />
              
          </Form>
              </Modal>
    </div>
  )
}

export default AddUser