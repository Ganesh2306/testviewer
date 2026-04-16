import React, { useContext, useRef } from 'react'

import { Modal, ModalHeader, Form } from 'reactstrap'
import * as yup from 'yup'
import "yup-phone"
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import ModalBodyUIProfile from './ModalBodyUIProfile'
import { ModalFooterProfile } from './ModalFooterProfile'
import { ProfileContext } from "./../../../../views/context/profileContext"
export const MyProfile = (props) => {
    const { ctxprofile, setctxProfile } = useContext(ProfileContext)
    const Swal = require('sweetalert2')
    const fileRef = useRef()
    const pbtnRef = useRef()
    
    const SignupSchema = yup.object().shape({
        first_name: yup.string()
        .min(2, "Please fill in the required fields")
        .max(32, "First Name can have max 32 characters")
        .required()
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Firstname "),
         last_name: yup.string()
        .min(2, "Please fill in the required fields")
        .max(32, "First Name can have max 32 characters")
        .required()
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Firstname "),
        login_id: yup.string().notRequired(),
        email: yup.string()

        .email("Please enter valid email address")
        .required('Email is required')
        .test('gmail-domain', 'Please enter a valid Gmail address', 
          val => val.endsWith('@gmail.com') || val.endsWith('@.net') || val.endsWith('@myyahoo.com') || val.endsWith('@yahoo.com') || val.endsWith('Google.com') || val.endsWith('Zoho.com') || val.endsWith('mail.com') || val.endsWith('textronics.com') || val.endsWith('textronics.in') || val.endsWith('@textronic.net')
        ),
        mobile: yup.string().required('Mobile number is required').matches(/^\d{10}$/, "Mobile number must be 10 digit"),
        user_id: yup.string().notRequired(),
        profile_Image: yup.string().notRequired()

    })
    const { register, errors, handleSubmit, trigger } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema)})
    const onSubmit = data => {
        //console.log(fileRef.current.getAttribute('data'))

         const _Organisation = new Object()
        _Organisation.first_name = data.first_name
        _Organisation.last_name = data.last_name
        _Organisation.login_id = data.login_id
        _Organisation.email = data.email
        _Organisation.user_id = data.user_id
        _Organisation.mobile = data.mobile
        _Organisation.org_id = 0
        if (fileRef.current.getAttribute('data')) {
            _Organisation.agt_imagebytebase = fileRef.current.getAttribute('data').split(",")[1]
        } //_Organisation.agt_imagebytebase = fileRef.current.getAttribute('data') === null ? null : fileRef.current.getAttribute('data').split(",")[1]

        axios.post('./Login/SaveProfile', _Organisation)
            .then(async response => {
                const Isave = response.data === null ? null : JSON.parse(response.data).isSave
                props.setprofileOpen(false)
                if (Isave !== null && Isave !== false) {
                    const response = await axios.get(`./Login/GetEditOrgUser`)
                    localStorage.setItem("profile", null)
                    localStorage.setItem("profile", JSON.stringify(response.data))
                    //JSON.parse(localStorage.profile)
                    setctxProfile(response.data)
                    Swal.fire(
                        'Success',
                        'Updated Successfully!!',
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

            <Modal isOpen={props.profileOpen} toggle={() => props.setprofileOpen(false)} className='modal-md modal-dialog-centered' backdrop='static' >
                <ModalHeader toggle={() => props.setprofileOpen(false)}> My Profile</ModalHeader>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBodyUIProfile
                        profile={props.profile}
                        register={register}
                        pbtnRef={pbtnRef}
                        fileRef={fileRef}
                        errors={errors} />
                    <ModalFooterProfile pbtnRef={pbtnRef} setprofileOpen={props.setprofileOpen} FirstBtnName="Update" />

                </Form>
            </Modal>
        </div>
    )
}