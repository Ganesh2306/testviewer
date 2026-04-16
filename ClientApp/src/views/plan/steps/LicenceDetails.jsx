import { useContext } from 'react'
import { rollContext } from '../../context/rollContext'
// ** Utils
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { isObjEmpty } from '@utils'
/*import { setLocale } from 'yup'*/
import orgImg from '../steps/images/organisation.svg'
import supImg from '../steps/images/supplier.svg'
import ageImg from '../steps/images/agent.svg'
import custImg from '../steps/images/customer.svg'
// ** Third Party Components
import { useForm } from 'react-hook-form'
import {
  Form,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Row,
  Col,
  CardImg
} from 'reactstrap'
import { Users, ArrowLeft, ArrowRight } from 'react-feather'
import OrgComponent from './SubComponents/OrgComponent'
import SupplierComponent from './SubComponents/SupplierComponent'
import AgentComponent from './SubComponents/AgentComponent'
import CustomerComponent from './SubComponents/CustomerComponent'

// ** Vars
let imgName = orgImg
export let setObj = null

yup.setLocale({
  number: {
    min: 'Please enter Numeric value between 1 to 999',
    max: 'Please enter Numeric value between 1 to 999'
  }
})

const sendObj = (data, Context) => {
  if ("ORGANISATION" === Context) { 
    data['rOrg_Type'] = 1  
    setObj = data 
    } else if ("SUPPLIER" === Context) {
      setObj = {
        rorg_user_limit: data.Srorg_user_limit,
        rorg_customer_limit: data.Srorg_customer_limit,
        rorg_design_limit: data.Srorg_design_limit,
        rorg_agent_limit: data.Srorg_agent_limit,
        rOrg_Type:2
      }
    } else if ("AGENT" === Context) { 
      setObj = {
        rorg_user_limit: data.Arorg_user_limit,
        rorg_customer_limit: data.Arorg_customer_limit,
        rorg_design_limit: data.Arorg_design_limit,
        rorg_supplier_limit: data.Arorg_supplier_limit,
        rOrg_Type:4
      }   
    } else if ("CUSTOMER" === Context) {   
      setObj = {
        rorg_user_limit: data.Crorg_user_limit,
        rOrg_Type:3
      }
    }

  return setObj
}

//!Main Function
const LicenceDetails = props => {   
  // ** Props
  const { stepper } = props
  const SignupSchemaProvider = (Data) => {
    if ("Basic" === Data) {   
      const SignupSchema = yup.object().shape({
        rorg_supplier_limit: yup.number().min(1).max(1000).required(),
        rorg_user_limit: yup.number().min(1).max(1000).required(),
        rorg_customer_limit: yup.number().min(1).max(1000).required(),
        rorg_design_limit: yup.number().min(1).max(1000000).required('Please enter Numeric value between 1 to 999999'),
        rorg_agent_limit: yup.number().min(1).max(1000).required()
      })    
      return  SignupSchema
      } else if ("SUPPLIER" === Data) {
        const SignupSchema = yup.object().shape({
          Srorg_user_limit: yup.number().min(1).max(1000).required(),
          Srorg_customer_limit: yup.number().min(1).max(1000).required(),
          Srorg_design_limit: yup.number().min(1).max(1000).required(),
          Srorg_agent_limit: yup.number().min(1).max(1000).required()
        })
          return SignupSchema
      } else if ("AGENT" === Data) { 
        const SignupSchema = yup.object().shape({
          Arorg_supplier_limit: yup.number().min(1).max(1000).required(),
          Arorg_user_limit: yup.number().min(1).max(1000).required(),
          Arorg_customer_limit: yup.number().min(1).max(1000).required(),
          Arorg_design_limit: yup.number().min(1).max(1000).required()
        })       
          return  SignupSchema
      } else if ("CUSTOMER" === Data) {   
        const SignupSchema = yup.object().shape({
          Crorg_user_limit: yup.number().min(1).max(1000).required()
        })    
          return  SignupSchema
      }
  }
//typeError('Please enter Numeric value between 1 to 999')

  // ** useContext 
  const { roll } = useContext(rollContext)

  const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchemaProvider(roll)) })

  // ** On form submit if there are no errors then go to next step
   const onSubmit = (data, e) => {
       if (isObjEmpty(errors)) {
         sendObj(data, roll)
         stepper.next()
      }
  }   

  /* eslint-disable */
 const loop = (Data) => {
     
   if ("Basic" === Data) {
       imgName = orgImg
       return (
        <OrgComponent  
        register={register}
        errors={errors} 
        onSubmit={onSubmit}
         />
       ) 
     
    }else if("SUPPLIER" === Data) {
        imgName =supImg       
        return (
              <SupplierComponent 
              errors={errors} 
              register={register} 
               />
          )
          
    }else if("AGENT" === Data) {
        imgName =ageImg
        return (
          <AgentComponent 
         errors={errors}
         register={register} 
          />
      )
       
    }else if("CUSTOMER" === Data) {
        imgName = custImg
        return (
            <CustomerComponent
            errors={errors}
            register={register} 
            />
          )            
    }
}
  const headTitle =(Data) =>{
    if ("ORGANISATION" === Data) {       
      return  <CardTitle tag='h4' >&nbsp; Organisation :</CardTitle>
      }else if("SUPPLIER" === Data) {        
          return <CardTitle tag='h4' >&nbsp;Supplier  :</CardTitle>
      }else if("AGENT" === Data) {        
          return  <CardTitle tag='h4' >&nbsp;Agent  :</CardTitle>
      }else if("CUSTOMER" === Data) {       
          return  <CardTitle tag='h4' >&nbsp; Customer :</CardTitle>
      }
  }

  return (
    <>
    <Form className='list-view product-checkout'
    onSubmit={handleSubmit(onSubmit)}
    autocomplete="off"
    >
      <Card className='shadow-none'>
        <CardHeader className='flex-column align-items-start'>
         <Row>
         &nbsp;&nbsp;&nbsp;
         <Users size={20} />
         {headTitle(roll) }
          <CardText className='text-muted '>&nbsp;Select Licences</CardText>
          </Row>
        </CardHeader>
        <CardBody>  
          <Row >
          <Col md='8' >
           <Row> 
             { loop(roll)}
           </Row>                       
            </Col>            
            <Col  md='4' className='planinnerimg text-center'>
                <CardImg  src={imgName}  className='bg-light'/>
          </Col>
          </Row>          
        </CardBody>
      </Card>
      <div className='divider'><div className='divider-text'></div></div>      
         <div className='d-flex justify-content-between'>
          <Button.Ripple color='primary' className='btn-prev rounded-0' onClick={() => props.stepper.previous()}>
            <ArrowLeft size={14} className='align-middle mr-sm-25 mr-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button.Ripple>
          <Button.Ripple type='submit' color='primary' className='btn-next rounded-0'>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight>
          </Button.Ripple>
        </div>
    </Form>
    </>
  )
}

export default LicenceDetails
