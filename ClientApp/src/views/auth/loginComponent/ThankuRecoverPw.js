
import { Coffee, ChevronLeft } from 'react-feather'

import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput, Button } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import archivelogo from '../img/design_archive_logo.png'

const ThankuRecoverPw = (props) => {
    return (
        <div className='auth-wrapper auth-v1 px-2'>
        <div className='auth-inner py-2'>
        <div class="mb-0 card">
        <div class="card-body">     
            <div className='align-items-center auth-bg auth-viewer'>
                <div className='mx-auto text-center'>
                    <img class="login-logo-viewer text-center mb-1" src={archivelogo} alt="Logo" />
                    <CardTitle tag='h3' className='font-weight-bold mb-50 mt-1 text-center login-header text-success'>
                    Password reset successful
                    </CardTitle>
                    <small className='mb-2 text-center'>
                    You can now login with your new password
                    </small>
            
                    <p className='text-center mt-2'>
                        <ChevronLeft className='mr-25' size={14} />
                        <span className='align-middle' onClick={() => { props.setshow(0) }}>Back to login</span>
                    </p>
                </div>
            </div>
        </div>
        </div>
        </div>
        </div>   
    )
}
export default ThankuRecoverPw