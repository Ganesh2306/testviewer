import * as yup from 'yup'
import { Fragment, useState } from 'react'
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import InputPasswordToggle from '@components/input-password-toggle'

import { Button, Media, Label, Row, Col, Input, FormGroup, Form} from 'reactstrap'
const Profile = () => {
    const PasswordTabContent = () => {
        const SignupSchema = yup.object().shape({
            'old-password': yup.string().required(),
            'new-password': yup.string().required(),
            'retype-new-password': yup
                .string()
                .required()
                .oneOf([yup.ref(`new-password`), null], 'Passwords must match')
        })

        const { register, errors, handleSubmit, trigger } = useForm({
            resolver: yupResolver(SignupSchema)
        })

        const onSubmit = () => trigger()
    }

    return (
        <Fragment>
            <div class="border-bottom "><h4 class="card-title">Profile Details</h4></div>
            <Media>
                <Media className='mr-25' left>
                    <Media src="/static/media/avatar-s-11.1d46cc62.jpg" object className='rounded mr-50'  alt='Generic placeholder image' height='80' width='80' />
                </Media>
                <Media className='mt-75 ml-1' body>
                    <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
                        Upload
                        <Input type='file'  hidden accept='image/*' />
                    </Button.Ripple>
                    <Button.Ripple color='secondary' size='sm' outline>
                        Reset
                    </Button.Ripple>
                    <p>Allowed JPG, GIF or PNG. Max size of 800kB</p>
                </Media>
            </Media>
            <Form className='mt-2'>
                <Row>
                    <Col sm='6'>
                        <FormGroup>
                            <Label for='username'>Username</Label>
                            <Input
                                id='username'
                                name='username'
                                placeholder='Username'
                        
                            />
                        </FormGroup>
                    </Col>
                    <Col sm='6'>
                        <FormGroup>
                            <Label for='name'>Name</Label>
                            <Input                                
                                id='name'
                                name='fullName'
                                placeholder='Name'                               
                            />
                        </FormGroup>
                    </Col>
                    <Col sm='6'>
                        <FormGroup>
                            <Label for='Mobile NO.'>Mobile Number</Label>
                            <Input
                                id='Mobile NO.'
                                name='Mobile NO.'
                                placeholder='Mobile Noumber'

                            />
                        </FormGroup>
                    </Col>
                    <Col sm='6'>
                        <FormGroup>
                            <Label for='email'>E-mail</Label>
                            <Input
                                type='email'
                                id='email'
                                name='email'
                                placeholder='Email'                              
                            />
                        </FormGroup>
                    </Col>
                    <Col sm='6'>
                        <FormGroup>
                            <Label for='company'>Company</Label>
                            <Input
                                id='company'
                                name='company'
                                placeholder='Company Name'                             
                               
                            />
                        </FormGroup>
                    </Col>
                    {/*<Col className='mt-2' sm='12'>*/}
                    {/*    <Button.Ripple type='submit' className='mr-1' color='primary'>*/}
                    {/*        Save changes*/}
                    {/*    </Button.Ripple>*/}
                    {/*    <Button.Ripple color='secondary' outline>*/}
                    {/*        Cancel*/}
                    {/*    </Button.Ripple>*/}
                    {/*</Col>*/}

                </Row>
            </Form>         
                    <FormGroup>          
                        <div class="border-bottom"><h4 class="card-title">Change Password</h4></div>
                    </FormGroup>     
            <Form>
                <Row>
                    <Col sm='6'>
                        <FormGroup>
                            <InputPasswordToggle
                                label='Old Password' />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm='6'>
                        <FormGroup>
                            <InputPasswordToggle
                                label='New Password'                           
                            />
                        </FormGroup>
                    </Col>
                    <Col sm='6'>
                        <FormGroup>
                            <InputPasswordToggle
                                label='Retype New Password'                         
                            />
                        </FormGroup>
                    </Col>
                    <Col className='mt-1' sm='12'>
                        <Button.Ripple type='submit' className='mr-1' color='primary'>
                            Save changes
                        </Button.Ripple>
                        <Button.Ripple color='secondary' outline>
                            Cancel
                        </Button.Ripple>
                    </Col>
                </Row>
            </Form>
        </Fragment>       
    )
}

export default Profile
