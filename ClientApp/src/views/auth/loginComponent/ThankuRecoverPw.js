
import { ChevronLeft } from 'react-feather'
import { CardTitle } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'

const ThankuRecoverPw = (props) => {
    return (
        <div className='align-items-center auth-bg auth-viewer'>
            <div className='mx-auto text-center'>
                <img className="login-logo-viewer text-center mb-1" src="https://s3.ap-south-1.amazonaws.com/aws.tds/dam/archive/images/archive-logo.png" alt="Logo" />
                <CardTitle tag='h3' className='font-weight-bold mb-50 mt-1 text-center login-header text-success'>
                   Password reset successful
                </CardTitle>
                <small className='mb-2 text-center'>
                 You can now login with your new password
                </small>
        
                <p className='text-center mt-2'>
                    <ChevronLeft className='mr-25' size={14} />
                    <span className='align-middle' onClick={() => { props.setcview(1) }}>Back to login</span>
                </p>
            </div>
        </div>
    )
}
export default ThankuRecoverPw