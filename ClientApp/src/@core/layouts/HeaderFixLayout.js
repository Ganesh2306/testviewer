// ** React Imports
import { useState, useEffect, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { handleMenuHidden, handleContentWidth } from '@store/actions/layout'

// ** Third Party Components
import classnames from 'classnames'
import { ArrowUp } from 'react-feather'
import ScrollToTop from 'react-scroll-up'
import { Navbar, NavItem, Button } from 'reactstrap'

// ** Configs
import themeConfig from '@configs/themeConfig'

// ** Custom Components
import Customizer from '@components/customizer'
import NavbarComponent from './components/navbar/NavbarBack'
/*import NavbarComponent from './components/navbar'*/
import FooterComponent from './components/footer'
import MenuComponent from './components/menu/horizontal-menu'

// ** Custom Hooks
import { useRTL } from '@hooks/useRTL'
import { useSkin } from '@hooks/useSkin'
import { useNavbarType } from '@hooks/useNavbarType'
import { useFooterType } from '@hooks/useFooterType'
import { useNavbarColor } from '@hooks/useNavbarColor'
import clientLogo from '../../assets/images/logo/pentaloons.jpg'

// ** Styles
import '@styles/base/core/menu/menu-types/horizontal-menu.scss'

const HeaderFixLayout = props => {
    // ** Props
    const { children, navbar, footer, menu, currentActiveItem, routerProps } = props
  
    // ** Hooks
    const [skin, setSkin] = useSkin()
    const [isRtl, setIsRtl] = useRTL()
    const [navbarType, setNavbarType] = useNavbarType()
    const [footerType, setFooterType] = useFooterType()
    const [navbarColor, setNavbarColor] = useNavbarColor()

    // ** States
    const [isMounted, setIsMounted] = useState(false)
    const [navbarScrolled, setNavbarScrolled] = useState(false)

    // ** Store Vars
    const dispatch = useDispatch()
    const layoutStore = useSelector(state => state.layout)

    // ** Vars
    const contentWidth = layoutStore.contentWidth
    const isHidden = layoutStore.menuHidden

    // ** Handles Content Width
    const setContentWidth = val => dispatch(handleContentWidth(val))

    // ** Handles Content Width
    const setIsHidden = val => dispatch(handleMenuHidden(val))

    // ** UseEffect Cleanup
    const cleanup = () => {
        setIsMounted(false)
        setNavbarScrolled(false)
    }

    //** ComponentDidMount
    useEffect(() => {
        setIsMounted(true)
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 65 && navbarScrolled === false) {
                setNavbarScrolled(true)
            }
            if (window.pageYOffset < 65) {
                setNavbarScrolled(false)
            }
        })
        return () => cleanup()
    }, [])

    // ** Vars
    const footerClasses = {
        static: 'footer-static',
        sticky: 'footer-fixed',
        hidden: 'footer-hidden'
    }

    const navbarWrapperClasses = {
        floating: 'navbar-floating',
        sticky: 'navbar-sticky',
        static: 'navbar-static'
    }

    const navbarClasses = {
        floating: 'floating-nav',
        sticky: 'fixed-top'
    }

    const bgColorCondition = navbarColor !== '' && navbarColor !== 'light' && navbarColor !== 'white'

    if (!isMounted) {
        return null
    }
    const userData = localStorage.getItem('userData')
    const history = useHistory()
if (!userData) {
    history.push('/login')
    return null
}

let organisationId

try {
    organisationId = JSON.parse(userData).organisationId
} catch (error) {
    console.error("Error parsing userData:", error)
    history.push('/login')
    return null
}

if (!organisationId) {
    history.push('/login')
    return null
}

// Continue with your logic, e.g., rendering the logo
const logo = organisationId === 757782875 ? clientLogo : themeConfig.app.appLogoImage

    return (
        <div
            className={classnames(
                `wrapper horizontal-layout horizontal-menu ${navbarWrapperClasses[navbarType] || 'navbar-floating'} ${footerClasses[footerType] || 'footer-static'
                } menu-expanded`
            )}
            {...(isHidden ? { 'data-col': '1-column' } : {})}
        >
           
            <Navbar
                expand='lg'
                className={classnames('header-navbar navbar-fixed align-items-center navbar-shadow navbar-brand-center', {
                    'navbar-scrolled': navbarScrolled
                })}
            >
                {!navbar && (
                    <div className='navbar-header d-xl-block d-md-block d-none'>
                        <ul className='nav navbar-nav'>
                            <NavItem>
                            <Link to = {localStorage.getItem("IsSingleCategory") === "true" ? "/SupplierList" : "/brandingpage"}   className='navbar-brand'>
                                    <span className='brand-logo'>
                                    <img className="login-logo-viewer text-lg-center hidden-xs hidden-sm p-50"  src={logo} alt="Logo" />
                                    </span>
                                    {/*<h2 className='brand-text mb-0'>{themeConfig.app.appName}</h2>*/}
                                </Link>
                                {/* <a href='#' className='navbar-brand'>
                                    <span className='brand-logo logo_2'>
                                        <img src={themeConfig.app.appLogoImage} alt='logo' />
                                    </span>
                                   
                                </a> */}
                            </NavItem>
                        </ul>
                    </div>
                )}

                <div className='navbar-container d-flex content'>
                    {navbar ? navbar : <NavbarComponent skin={skin} setSkin={setSkin} />}
                </div>
            </Navbar>

            {children}
            {themeConfig.layout.customizer === true ? (
                <Customizer
                    skin={skin}
                    setSkin={setSkin}
                    footerType={footerType}
                    setFooterType={setFooterType}
                    navbarType={navbarType}
                    setNavbarType={setNavbarType}
                    navbarColor={navbarColor}
                    setNavbarColor={setNavbarColor}
                    isRtl={isRtl}
                    setIsRtl={setIsRtl}
                    layout={props.layout}
                    setLayout={props.setLayout}
                    isHidden={isHidden}
                    setIsHidden={setIsHidden}
                    contentWidth={contentWidth}
                    setContentWidth={setContentWidth}
                    transition={props.transition}
                    setTransition={props.setTransition}
                    themeConfig={themeConfig}
                />
            ) : null}
            <footer
                className={classnames(`footer footer-light ${footerClasses[footerType] || 'footer-static'}`, {
                    'd-none': footerType === 'hidden'
                })}
            >
                {footer ? footer : <FooterComponent footerType={footerType} footerClasses={footerClasses} />}
            </footer>

            {themeConfig.layout.scrollTop === true ? (
                <div className='scroll-to-top'>
                    <ScrollToTop showUnder={300} style={{ bottom: '5%', zindex:'9' }}>
                        <Button className='btn-icon' color='primary'>
                            <ArrowUp size={14} />
                        </Button>
                    </ScrollToTop>
                </div>
            ) : null}
        </div>
    )
}
export default HeaderFixLayout
