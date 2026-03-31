 // ** Router Import
import Router from './router/Router'
//import { useSelector } from 'react-redux'

import { logoutUser } from './@core/layouts/components/store/action/index'
import UILoader from '@components/ui-loader'
import { useEffect, useState} from 'react'
import Spinner from '@components/spinner/Loading-spinner'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import  ProfileProvider from "./views/context/ProfileContext"
import { R_Loader } from '../../ClientApp/src/views/loader/loader'

const Newapp = () => {
    const [isOnline, setIsOnline] = useState(true)
    console.info('%cARCHIVE_ADMIN v 0.86--05/03', 'background: #222; color: #bada55')
    const history = useHistory()
    const dispatch = useDispatch()
    const myStyles = {
        offline :{
            position: 'fixed',
            zIndex: '999',
            transform: 'translate(-50%, -17%)',
            width: 'auto',
            padding: '0.8rem 5rem',
            borderRadius: '9px',
            height: '18px',
            color: '#fff',
            textAlign: 'center',
            bottom:'0', // Make sure it's a string with a unit (e.g., '75%')
            left: '50%',
            fontWeight: '500',
            background: '#d12727',
            display: 'flex',
            justifyContent: 'center', // Corrected from 'justify'
            alignItems: 'center'
        }
      }    
    const logoutapp = () => {
        const role = JSON.parse(localStorage.getItem('userData')).role
        const token = JSON.parse(localStorage.getItem("accessToken"))
        logoutUser({ role, token })
            .then(res => {
                    //localStorage.setItem('userData', res)
                    dispatch(handleLogout)
                    localStorage.clear()
                    history.push('/login')
            })
            .catch(err => console.log(err))
    }

    const validation = async() => {
        try {
            const v = sessionStorage.getItem("login")
           if (v === undefined || v === null) {
            logoutapp()
           }
        } catch (error) {
            
        }
    }
    validation()

        const Swal = require('sweetalert2')
        window.addEventListener("online", () => {
            setIsOnline(true)
        })
        window.addEventListener("offline", () => {
            setIsOnline(false)
        })
    
    return (
    <UILoader blocking={false} loader={<Spinner />}>
        <ProfileProvider>
        <Router >
         </Router >
        </ProfileProvider>
        <R_Loader>
        </R_Loader>
 { !isOnline && <div style={myStyles.offline}>Internet Connection has been lost</div> }
</UILoader>
)
}
const App = (props) =>  <Newapp />
export default App
