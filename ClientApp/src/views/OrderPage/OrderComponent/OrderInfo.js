//--------------------------------------------------------------------
//    Project Name:-    Archive Viewer
//    File Name   :-    OrderInfo
//    Function    :-    CustRow  
//    Purpose        :-    place Order form data (CustRow funcation for row map in forntend)
//    Created        :-    27-06-2023
//    Author        :-   functionality-Abhishek ---Update the person name here who next working on this project 
//--------------------------------------------------------------------
// ** React Imports
// ** Third Party Components

import { CardBody, Col } from 'reactstrap'

import '../css/order.css'


const CustRow = ({feature, property}) => {
  return (
    <tr>
    <td className='pr-1'>{feature}:</td>
    <td>{property}</td>
    </tr>
  )
}

const OrderInfo = (props) => {  
//feature
    return (
        <CardBody>
            { console.log(props.comment) }
            <div className='item-name'>
              <h6 className='mb-2'>Design Properties:</h6>
                <Col className='p-0 mt-xl-0 mt-2 d-flex' lg='12'>           
                  <table className="w-50" style={{fontSize:'0.857rem'}}>
                    <tbody>
                     {
                      props.feature && Object.keys(props.feature).map((e) => {
                        return <CustRow feature={e} property={props.feature[e]}/>
                      })
                     }
                      
                    </tbody>
                  </table>
                
                </Col>
   
            </div>
        </CardBody>
    )
}

export default OrderInfo