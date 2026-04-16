// ** React Imports
import { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import './assets/CommonScript/setdpi.tds.min.css'
// ** Redux Imports
import { Provider } from 'react-redux'
import { store } from './redux/storeConfig/store'

// ** Toast & ThemeColors Context
import { ToastContainer } from 'react-toastify'
import { ThemeContext } from './utility/context/ThemeColors'

// ** Intl, CASL & ThemeColors Context
import ability from './configs/acl/ability'
import { AbilityContext } from './utility/context/Can'
import NaveBackBtnProvider from './utility/context/NaveBackBtn'

// ** Spinner (Splash Screen)
import Spinner from './@core/components/spinner/Fallback-spinner'

// ** Ripple Button
import './@core/components/ripple-button'

// ** PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx.min'

// ** React Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** React Toastify
import '@styles/react/libs/toastify/toastify.scss'

// ** Core styles
import './@core/assets/fonts/feather/iconfont.css'
import './@core/scss/core.scss'
import './assets/scss/style.scss'

// ** custom styles
import './customstyle/custom_view.css'
import './customstyle/themeUpdate.css'
// import './customstyle/theme_switch.css'
import './customstyle/dark_layout_theme.css'
import './customstyle/light_layout_theme.css'
import './customstyle/ipad-landscape.css'
import './customstyle/ipad-portrait.css'
import './customstyle/mobile.css'
import Swal from 'sweetalert2'

// ** Service Worker
import * as serviceWorker from './serviceWorker'
// ** Lazy load app
const LazyApp = lazy(() => import('./App'))

ReactDOM.render(
  <Provider store={store}>
        <Suspense fallback={<Spinner />}>
          {/* <LoginContextProvider> */}
            <AbilityContext.Provider value={ability}>
              <NaveBackBtnProvider>
      <ThemeContext>
        <LazyApp />
        <ToastContainer newestOnTop />
                </ThemeContext>
                </NaveBackBtnProvider>
            </AbilityContext.Provider>
            {/* </LoginContextProvider> */}
    </Suspense>
  </Provider>,
  document.getElementById('root')
)
//Abhishek server conection
setInterval(function () {
    if (!window.navigator.onLine) {
        Swal.fire('Unable to connect to the server. Check your network settings or try again later')
    }
}, 200000)

//// Disable Right-click Context Menu
//document.addEventListener("contextmenu", function(event) {
//  event.preventDefault();
//})

//// Disable F12 and Ctrl+Shift+I (DevTools Shortcuts)
//document.onkeydown = function (e) {
//    // Block F12 and Ctrl+Shift+I
//    if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && e.keyCode === 73)) {
//        e.preventDefault();
//    }
//}

//// Disable Console Logs (Optional: Hide Console Errors and Warnings)
//if (typeof console === "object") {
//    console.log = function () { };
//    console.info = function () { };
//    console.warn = function () { };
//    console.error = function () { };
//}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
serviceWorker.register() 