/* eslint-disable */
// ** Router Import
import Router from './router/Router'
import { useEffect, useContext, useState, Suspense } from 'react'
import { Link, useHistory } from 'react-router-dom'
import LoginContextProvider from './utility/context/LoginUserData'
import ProfileProvider from './views/context/profileContext'
import AccessProvider from "./views/context/accessContext"
import BcMenuProvider from './views/context/bcMenuContext'
//import { accessContext } from './views/context/accessContext'
import { logoutUser } from './@core/layouts/store/action/index'
//s@core/layouts/components/store/action
import { useDispatch } from 'react-redux'
import axios from 'axios'
import jQuery from "jquery"
window.jQuery = jQuery
window.$ = jQuery
window.plug = require("./assets/CommonScript/setdpi.tds")
require("./assets/CommonScript/view3DModel.tds.js")
//jquery.ez-zoom.js
require("./assets/CommonScript/jquery.ez-zoom.js")
//jquery.ez-plus.js
require("./assets/CommonScript/jquery.ez-plus")
//
require("./assets/CommonScript/polygon.tds.min")

// require("./assets/CommonScript/Tds.js")


/* export const info = {
orgid: null
} */
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
        alignItems: 'center',
    },
    online :{
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
        background: 'green',
        display: 'flex',
        justifyContent: 'center', // Corrected from 'justify'
        alignItems: 'center',
    }
  }

const Newapp = () => {
    /* axios.get("./DesignSearch/GetOrganisationId").then(e => {
        info.orgid = e
    }) */
    console.info('%cARCHIVE_VIEWER v 0.65 21-02-2025 vm', 'background: #222; color: #bada55')
    const history = useHistory()
    const dispatch = useDispatch() 
    const [showMessage, setShowMessage] = useState(false)
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
    /*  window.addEventListener("beforeunload", function (e) {
        logoutapp()
    }) */  
    const HandleNetworkStatusChangeOnlineB = () => {
        return (
          <div className='online' style = {myStyles.online}  >
            You are Online
          </div>
        )
      }


    const Swal = require('sweetalert2')
    const [isonline, setIsonline] = useState(navigator.onLine)

    useEffect(() => {
            window.demo = $('#setDPI').setDPIPlugin({
                'getDPIValue': function (data) {
                    
                    var DeviceDetailsDto = JSON.parse(localStorage.getItem('DeviceDetailsDto'));
                    delete DeviceDetailsDto.ExtensionData;
                    DeviceDetailsDto.dpi_Unit = $('.screen_size input[type="radio"]:checked').val() == "centmeter" ? true : false;
                    
                        DeviceDetailsDto.screen_X_DPI = data.inch.horizontalDensity;
                        DeviceDetailsDto.screen_Y_DPI = data.inch.verticalDensity;

                    DeviceDetailsDto.state = 2;

                    axios.post('./Login/SaveDeviceDetails', DeviceDetailsDto)
                .then(response => {

                    const Isave = response.data != null && response.data.length > 0
                    if (Isave) {
                       
                        localStorage.setItem('DeviceDetailsDto', JSON.stringify(DeviceDetailsDto));

                        Swal.fire({
                            icon: 'success',
                            title: 'DPI',
                            text: "Device Configuration Saved Successfully"
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Login',
                            text: "Unable to Save Device Configuration"
                        })
                    }
                })
                .then(() => {

                })
                .catch(err => console.log(err))

                }
            });
            /* const f = sessionStorage.getItem("accessinfo")
           if (f === undefined || f === null) { 
                const { setaccess } = useContext(accessContext)
                setaccess(JSON.parse(f))
           } */
    }, []) 
    // Add event listeners to handle online/offline status changes
    useEffect(() => {

        // Prevent Right-click Context Menu
        document.addEventListener("contextmenu", (event) => {
          event.preventDefault();
      });

        // Prevent F12 and Ctrl+Shift+I (DevTools Shortcuts)
          document.onkeydown = function(e) {
            if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && e.keyCode === 73)) {
            e.preventDefault();
            }
           };
        
         // Disable Console Logs (Optional: Hide Console Errors and Warnings)
         if (typeof console === "object") {
          console.log = function() {};
          console.info = function() {};
          console.warn = function() {};
          console.error = function() {};
          }   

          const preventDevTools = function() {
            const devTools = /./;
            devTools.toString = function() {
                throw 'Blocked DevTools';
            };
            console.log(devTools);
            };

            setInterval(preventDevTools, 1000);

        const handleOnline = () => {
          setIsonline(true)
          setShowMessage(true)
          // Set a timeout to reset the state after 2 seconds
          const timeoutId = setTimeout(() => {
            setShowMessage(false)
          }, 2000)
          // Clean up the timeout when the component unmounts or when online again
          return () => clearTimeout(timeoutId);
        };
    
        const handleOffline = () => {
          setIsonline(false)
          setShowMessage(true);
          // Clean up the timeout when the component unmounts or when online again
          return () => clearTimeout(timeoutId)
        }
    
        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)
    
        return () => {
          window.removeEventListener('online', handleOnline)
          window.removeEventListener('offline', handleOffline)
        }
      }, []) 

    return <> 
    <LoginContextProvider>
       <ProfileProvider>
       <AccessProvider>
        <BcMenuProvider>
        <Router />
        </BcMenuProvider>
        </AccessProvider>
        </ProfileProvider>
        {showMessage && (
        <div style={isonline ? myStyles.online : myStyles.offline}>
          {isonline ? 'You are back online' : 'The network connection has been lost'}
        </div>
      )}
    </LoginContextProvider>
    </>
    
}
const App = props => <Newapp />

export default App
