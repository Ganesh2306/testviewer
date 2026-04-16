// ** React Imports
import {useRef, useState } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'


// ** Steps
import LicenceDetails from '../plan/steps/LicenceDetails'
import Requirment from '../../views/plan/steps/Requirment'
import Register from '../../views/plan/steps/Register'
import SubHeader from './steps/SubComponents/SubHeader'
import PlanLogo from './steps/SubComponents/PlanLogo'

// ** Third Party Components
import { CheckSquare, Layers, User } from 'react-feather'

//** Context  */
import RollProvider from '../context/rollContext'
// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
//import { getCartItems, deleteCartItem, deleteWishlistItem, addToWishlist } from '../store/actions'

// ** Styles
import '@styles/base/pages/app-ecommerce.scss'
import './css/plan.css'
import organizationImg from './steps/images/organisation.svg'
import supplierImg from './steps/images/supplier.svg'
import agentImg from './steps/images/agent.svg'
import cutomerImg from './steps/images/customer.svg'

const planCard = [
  {
        id: 'Basic',
        title: 'Basic',
        cc_subtitle:'',
       subtitle: 'A simple start for everyone',
       facilities: [           
            '500 Designs',
            'Localized global selling ',
            '2 Licenses',
            '1 Customer'
        ],
       iconImg: organizationImg          
  },
  {
      id: 'SUPPLIER',
      title: 'SUPPLIER',
      cc_subtitle:'',
      subtitle: 'For small to medium businesses',
      facilities: [
          '24/7 chat support',
          '600 Designs',
          'Localized global selling ',
          '10 Licenses',
          '5 Customer'
      ],
      iconImg:supplierImg
  },
  {
      id: 'AGENT',
      title: 'AGENT',
    cc_subtitle:'',
      subtitle: 'Solution for big organizations',
      facilities: [
          '24/7 chat support',
          '1000 Designs',
          'Localized global selling ',
          '10 Licenses',
          '10 Customer'
      ],
    iconImg:agentImg
  },
    {
        id: 'CUSTOMER',
        title: 'CUSTOMER',
        cc_subtitle:'(Garment Facturer)',
        subtitle: 'Best for Designs (User Limit 10)',
        facilities: [
            '24/7 chat support',
            '50000 Designs',
            'Localized global selling ',
            '50 Licenses',
            '20 Customer'
        ],
   
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
        content: <LicenceDetails stepper={stepper} planCard={planCard}/>
    },
    {
      id: 'registerNow',
      title: 'Register Now',
      subtitle: 'Enter Your Address',
      icon: <User size={18} />,
        content: <Register stepper={stepper} planCard={planCard} />
    }
  ]

  return (
    <div className="pricewrapper px-sm-0">
    <PlanLogo/>
    <SubHeader/>
    <div>       
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
