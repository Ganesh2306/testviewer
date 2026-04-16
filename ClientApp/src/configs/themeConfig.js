// You can customize the template with the help of this file
import { isMobile } from 'react-device-detect'
let isHide = true
if (isMobile) isHide = false
//Template config options
const themeConfig = {
  app: {
    appName: 'Raymond Archive',
    appLogoImage: require('@src/assets/images/logo/client.jpg').default
    },
   parentapp: {
        parentappName: 'Textronics',
        parentLogoImage: require('@src/assets/images/logo/textronic_logo.png').default
    },
  layout: {
    isRTL: false,
    skin: 'bordered', // light, dark, bordered, semi-dark
    routerTransition: 'fadeIn', // fadeIn, fadeInLeft, zoomIn, none or check this for more transition https://animate.style/
    type: 'horizontal', // vertical, horizontal
    contentWidth: 'full', // full, boxed
    menu: {
      isHidden: isHide,
      isCollapsed: false
    },
    navbar: {
      // ? For horizontal menu, navbar type will work for navMenu type
      type: 'sticky', // static , sticky , floating, hidden
      backgroundColor: 'white' // BS color options [primary, success, etc]
    },
    footer: {
      type: 'hidden' // static, sticky, hidden
    },
    customizer: false,
    scrollTop: true // Enable scroll to top button
  }
}

export default themeConfig
