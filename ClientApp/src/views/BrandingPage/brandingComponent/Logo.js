import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/actions/auth'
import { logoutUser } from './../../auth/store/action'
export const Logo = () => {
    const dispatch = useDispatch()
     const onSubmit = data => {
         const role = JSON.parse(localStorage.getItem('userData')).role
         localStorage.clear()
         logoutUser({ role })
             .then(res => {
                 if (res) {
                     dispatch(handleLogout)
                 }
             })
             .catch(err => console.log(err))
     }
    return (   
      <div className="row d-inline">
        <div className="text-left float-left">
            <img className="Header-logo-viewer" src="../../design_archive_logo.png" alt="Logo" />
        </div>
        <Link onClick={onSubmit}  to='/login' >
        <div className="text-right text-white float-right">
            Back to Login
        </div>
        </Link>   
      </div>
    )
}