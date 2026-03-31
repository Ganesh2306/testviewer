import { Button } from 'reactstrap'
import { Link, useHistory } from 'react-router-dom'
import textronicLogo from '../assets/images/logo/textronic_logo.png'
import errorImg from '@src/assets/images/pages/error.svg'

import '@styles/base/pages/page-misc.scss'

const Error = () => {
  const history = useHistory()
  return (
    <div className='misc-wrapper'>
      <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                            <img className="Header-logo" src={textronicLogo} alt="Logo" />  
                            <h2 className='brand-text text-primary ml-1 ' style={{marginTop:'0.9rem'}} >Textronics</h2>                         
         </Link>
      <div className='misc-inner p-2 p-sm-3'>
        <div className='w-100 text-center'>
          <h2 className='mb-1'>Page Not Found 🕵🏻‍♀️</h2>
          <p className='mb-2'>Oops! 😖 The requested URL was not found on this server.</p>
          <Button.Ripple  color='primary' className='btn-sm-block mb-2' onClick = {() => { history.goBack() }}>
            Back to home
          </Button.Ripple>
          <img className='img-fluid' src={errorImg} alt='Not authorized page' />
        </div>
      </div>
    </div>
  )
}
export default Error
