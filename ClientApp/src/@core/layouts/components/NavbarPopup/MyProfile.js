import React, { useContext, useRef, useState, useEffect } from 'react'
import { Edit, Shield, HelpCircle } from 'react-feather'
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker"
import Avatar from '@components/avatar'
import avatarImg from '@src/assets/images/portrait/small/avatar-s-20.jpg'
import { FormGroup, Input, Label, Col, Modal, Button, ModalHeader, ModalBody, ModalFooter, Row, DropdownItem, Form, FormFeedback, Media } from 'reactstrap'
import InputPasswordToggle from '@components/input-password-toggle'
import * as yup from 'yup'
import "yup-phone"
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import ModalBodyUIProfile from './ModalBodyUIProfile'
import { ModalFooterProfile } from './ModalFooterProfile'
import { ProfileContext } from "./../../../../views/context/ProfileContext"
export const MyProfile = (props) => {
    const { ctxprofile, setctxProfile } = useContext(ProfileContext)
    const Swal = require('sweetalert2')
    const fileRef = useRef()
    const pbtnRef = useRef()

    const SignupSchema = yup.object().shape({
        first_name: yup.string().min(2, "First Name must have at least 2 characters").max(32, "First Name can have max 32 characters").required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Firstname "),
        last_name: yup.string().min(2, "Last Name must have at least 2 characters").max(32, "Last Name can have max 32 characters").required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Lastname "),
        login_id: yup.string().notRequired(),
        email: yup.string().min(2, "Email must have at least 2 characters").max(150, "Email can have max 150 characters").email().required('Email is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter valid email address "),
        mobile: yup.string().required('Mobile number is required').matches(/^\d{10}$/, "Mobile number must be 10 digit"),
        user_id: yup.string().notRequired(),
        profile_Image: yup.string().notRequired()

    })
    const { register, errors, handleSubmit, trigger } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
    const onSubmit = data => {

        const _Organisation = new Object()
        _Organisation.first_name = data.first_name
        _Organisation.last_name = data.last_name
        _Organisation.login_id = data.login_id
        _Organisation.email = data.email
        _Organisation.user_id = data.user_id
        _Organisation.mobile = data.mobile
        _Organisation.org_id = 0
        _Organisation.agt_imagebytebase = fileRef.current.getAttribute('data') === null ? null : fileRef.current.getAttribute('data').split(",")[1]

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