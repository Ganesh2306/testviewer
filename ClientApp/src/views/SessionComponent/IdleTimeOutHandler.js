import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/actions/auth'
import { IdleTimeOutModal } from './IdleTimeOutModal'
import { useIdleTimer } from 'react-idle-timer'
import Swal from 'sweetalert2'
import { logoutUser } from '../../@core/layouts/store/action' //../../@core/layouts/components/store/action

let timeOut = null
let checkforUpload = false 

export const updatecheckforUpload = (a) => {
    checkforUpload = asssss
}

const IdelTime = 1000 * 60 * 8 //0.3 //8 minutes

const LogoutTime = 1000 * 60  * 2 //2 minutes

export const HandelsetTimeOut = async (cb = null, state = null) => {
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
/*     const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)

    const [isLogout, setLogout] = useState(false)
    const history = useHistory()
    let timer = undefined
    let count = 0
    const events = ['click', 'load', 'keydown']

    const logoutapp = () => {
        
        const role = JSON.parse(localStorage.getItem('userData')).role
        localStorage.clear()
        logoutUser({ role })
            .then(res => {
              
                    //localStorage.setItem('userData', res)

                    dispatch(handleLogout)
                    history.push('/login')
            })
            .catch(err => console.log(err))
    }

    const TimeOut = () => {
        
        count = 1
        setTimeout(function () {
            
            if (count === 1) {
                setShowModal(false)
                props.onIdle()
                handleLogouts()
                logoutapp()
            }
        }, 120000)

    }
 */
    
    const handleOnIdle = event => {
        setShowModal(true)
      //console.log('user is idle', event)
      //console.log('last active', getLastActiveTime())
    }
  
    const handleOnActive = event => {
      //console.log('user is active', event)
      //console.log('time remaining', getRemainingTime())
    }
  
    const handleOnAction = event => {
        setClearTimeOut()
        setShowModal(false)
      //console.log('user did something', event)
    }

    const { getRemainingTime, getLastActiveTime } = useIdleTimer({
      timeout: IdelTime,
      onIdle: handleOnIdle,
      onActive: handleOnActive,
      onAction: handleOnAction,
      debounce: 500
    })

    const handleContinueSession = () => {
        setClearTimeOut()
        setShowModal(false)
    }

    const logoutapp = () => {
        Swal.fire({
            title: 'Session Timeout',
            text: "Your Session has expired due to inactivity (10 min), You will be logged out and redirected to login page",
            icon: 'warning',
            theme: 'dark',
            confirmButtonColor: '#3085d6',
            backdrop: true, // You can set this to true to show a backdrop
            allowOutsideClick: false,
            confirmButtonText: 'OK!'
          }).then((result) => {
            if (result.isConfirmed) {
                try {
                    const role = JSON.parse(localStorage.getItem('userData')).role
                    localStorage.clear()
                    logoutUser({ role })
                        .then(res => {
                            //localStorage.setItem('userData', res)
                            dispatch(handleLogout)
                            history.push('/login')
                    })
                    .catch(err => console.log(err))
                } catch (error) {
                    console.log(error)
                }
            }
          })
        // try {
        //     const role = JSON.parse(localStorage.getItem('userData')).role
        //     localStorage.clear()
        //     logoutUser({ role })
        //         .then(res => {
        //             //localStorage.setItem('userData', res)
        //             dispatch(handleLogout)
        //             history.push('/login')
        //     })
        //     .catch(err => console.log(err))
        // } catch (error) {
        //     console.log(error)
        // }
       
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