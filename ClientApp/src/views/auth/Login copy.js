import { useState, Fragment } from 'react'
import { useSkin } from '@hooks/useSkin'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { isObjEmpty } from '@utils'
import { validateLogin } from './store/action'
import Avatar from '@components/avatar'
import { toast, Slide } from 'react-toastify'
import { handleLogin } from '@store/actions/auth'
import { Coffee } from 'react-feather'
import { Link, useHistory } from 'react-router-dom'
import { Row, Col } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import '../../views/auth/login-style.css'


const LoginV2 = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [forget, setforget] = useState(true)

  const { register, errors, handleSubmit } = useForm()
  const [skin, setSkin] = useSkin()

  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2-dark.jpg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  const ToastContent = ({ name, role }) => (
    <Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
          <h6 className='toast-title font-weight-bold'>Welcome, {name}</h6>
        </div>
      </div>
      <div className='toastify-body'>
        <span>You have successfully logged in as an {role} user to Design Archive. Now you can start to explore. Enjoy!</span>
      </div>
    </Fragment>
  )

  const onSubmit = data => {
    if (isObjEmpty(errors)) {
      validateLogin({ email, password })
        .then(res => {
          if (res) {
            localStorage.setItem('userData', JSON.stringify(res))
            dispatch(handleLogin(res))
            history.push('/BrandingPage')
            toast.success(
              <ToastContent name={res.fullName || res.Name || 'Sanket Shinde'} role={res.role || 'admin'} />,
              { transition: Slide, hideProgressBar: true, autoClose: 2000 })
          } else {
            alert('Enter valid username and password')
          }
        })
        .catch(err => console.log(err))
    }
  }

  return (
    
    <div className='auth-wrapper auth-v2' style={{ backgroundImage: `url(${source})` }}>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
         <img className="Header-logo-viewer" src="../../design_archive_logo.png" alt="Logo" />
         <h2 className='text-viewer-h  mb-5'>An Online <br/>Textile Library</h2>
         <p className='text-viewer-p'>Design Archive is an intelligent design data management system <br/><br/>
            which hosts a comprehensive library created over a period of time</p>         
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='12' sm='12' >
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>           
          </div>
        </Col>
        {forget ? <LoginView email/> : <ForgetView />}
      </Row>
    </div >
  )
}

export default LoginV2
