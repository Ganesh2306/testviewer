// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'
import BreadCrumbs from '@components/breadcrumbs'

// ** Steps
import LicenceDetails from '../plan/steps/LicenceDetails'
import Requirment from '../../views/plan/steps/Requirment'
import Register from '../../views/plan/steps/Register'
import SubHeader from './steps/SubComponents/SubHeader'
import PlanLogo from './steps/SubComponents/PlanLogo'

// ** Third Party Components
import { CheckSquare, Layers, User, Home, CreditCard } from 'react-feather'

//** Context  */
import RollProvider from '../context/rollContext'
// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
//import { getCartItems, deleteCartItem, deleteWishlistItem, addToWishlist } from '../store/actions'
import {Card, CardBody, CardText} from "reactstrap"
// ** Styles
import '@styles/base/pages/app-ecommerce.scss'
import './css/plan.css'
import organizationImg from './steps/images/organisation.svg'
import supplierImg from './steps/images/supplier.svg'
import agentImg from './steps/images/agent.svg'
import cutomerImg from './steps/images/customer.svg'

const planCard = [
  {
    id: 'ORGANISATION',
    title: 'ORGANISATION',
    cc_subtitle:'',
    subtitle: 'Best for Supplier, Customer, Agent, User and Designs ',
    iconImg: organizationImg          
  },
  {
    id: 'SUPPLIER',
    title: 'SUPPLIER',
    cc_subtitle:'',
    subtitle: 'Best for Customer, Agent, User and Designs',
    iconImg:supplierImg
  },
  {
    id: 'AGENT',
    title: 'AGENT',
    cc_subtitle:'',
    subtitle: 'Best for Supplier, Customer, User and Designs',
    iconImg:agentImg
  },
  {
    id: 'CUSTOMER',
    title: 'CUSTOMER',
    cc_subtitle:'(Garment Facturer)',
    subtitle: 'Best for Designs (User Limit 10)',
    iconImg: cutomerImg
  }
]

const Plan = () => {
  // ** Ref & State
  const ref = useRef(null)
  const [stepper, setStepper] = useState(null)

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.ecommerce)

 /*  // ** Get Cart Items on mount
  useEffect(() => {
    dispatch(getCartItems())
  }, []) */

  //!RollProvider
  const steps = [
    {
      id: 'myRequirement',
      title: 'My Requirement',
      subtitle: 'Select option as per your requirement',
      icon: <CheckSquare size={18} />,
      content: <Requirment stepper={stepper} planCard={planCard}/>    
    },
    {
      id: 'licenceDetails',
      title: 'Licence Details',
      subtitle: 'Select your Limits',
      icon: <Layers size={18} />,
      content: <LicenceDetails stepper={stepper} />
    },
    {
      id: 'registerNow',
      title: 'Register Now',
      subtitle: 'Enter Your Address',
      icon: <User size={18} />,
      content: <Register stepper={stepper} />
    }
  ]

  return (
    <div className="pricewrapper px-sm-0">
    <PlanLogo/>
    <SubHeader/>
    <div>       
        {/*  <BreadCrumbs breadCrumbTitle='Checkout' breadCrumbParent='eCommerce' breadCrumbActive='Checkout' /> */}
        <RollProvider>
        <div id='Main-Plan-div'>
          <Wizard
            ref={ref}
            steps={steps}
           
            instance={el => setStepper(el)}
            /* options={{
              linear: false
            }} */
          />
          </div>
       </RollProvider>
        </div>          
    </div>
  )

}

export default Plan
