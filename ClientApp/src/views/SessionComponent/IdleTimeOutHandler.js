import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/actions/auth'
import { IdleTimeOutModal } from './IdleTimeOutModal'
import { useIdleTimer } from 'react-idle-timer'
import Swal from 'sweetalert2'
import { logoutUser } from '../../@core/layouts/components/store/action'

let timeOut = null
let checkforUpload = false 

export const updatecheckforUpload = (a) => {
    checkforUpload = a
}

  const IdelTime = 1000 * 60 * 8 //0.3

  const LogoutTime = 1000 * 60  * 2

export const HandelsetTimeOut = async(cb = null, state = null) => {
    if (checkforUpload) {
        state(false)
    } else {
        timeOut = await setTimeout(() => {
            //state
            if (cb !== null) {
                cb()
            }
        }, LogoutTime)
    }
    
}

export const setClearTimeOut = (cb = null) => {
    if (cb !== null) {
        cb()
    }
    clearTimeout(timeOut)
}
const IdleTimeOutHandler =  (props) => {
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    
    const handleOnIdle = event => {
        setShowModal(true)
      console.log('user is idle', event)
      console.log('last active', getLastActiveTime())
    }
  
    const handleOnActive = event => {
      console.log('user is active', event)
      console.log('time remaining', getRemainingTime())
    }
  
    const handleOnAction = event => {
        setClearTimeOut()
        setShowModal(false)
      console.log('user did something', event)
    }
    const { getRemainingTime, getLastActiveTime } = useIdleTimer({
      timeout: IdelTime,
      onIdle: handleOnIdle,
      onActive: handleOnActive,
      onAction: handleOnAction,
      debounce: 600
    })

    const handleContinueSession = () => {
        setClearTimeOut()
        setShowModal(false)
    }

    const logoutapp = () => {
        Swal.fire({
            title: 'Session Expired',
            text: "Your session has expired due to (10) minutes of inactivity.!",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK!',
            allowOutsideClick: false, 
            allowEscapeKey: false,
            backdrop:true
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    const role = JSON.parse(localStorage.getItem('userData')).role
                    localStorage.clear()
                    logoutUser({ role })
                        .then(res => {
                            dispatch(handleLogout)
                            history.push('/login')
                        })
                        .catch(err => console.log(err))
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }
    return (
      <div>
        <IdleTimeOutModal
                 setShowModal={setShowModal}
                 HandelsetTimeOut={HandelsetTimeOut}
                 setClearTimeOut={setClearTimeOut}
                  showModal={showModal}
                  handleContinue={handleContinueSession}
                  handleLogout={logoutapp}
              />
      </div>
    )
  }

  export default IdleTimeOutHandler