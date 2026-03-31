// ** React Imports
import {Trash2} from 'react-feather'
import { Card, CardHeader, CardTitle, Input, Label, Row, Col, CardBody, CustomInput } from 'reactstrap'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Design from '../../../design/Design'

import '../../seasons.css'

const MySwal = withReactContent(Swal)
const ViewDesignContent = () => {

  const onSubmit = () => { 
    return MySwal.fire({
     title: ' Do you want to Delete Designs?',
//     text: "Move designs in Collection?",
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      customClass: {
        confirmButton: 'btn btn-outline-danger',
        cancelButton: 'btn btn-primary ml-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        MySwal.fire({
          icon: 'success',
          title: 'Designs Deleted!',
          text: 'Your file has been removed from seasonal collection.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      }
    })
  }

  return (
    <Card className="view_season_content">
            <CardHeader className='border-bottom'>
                <CardTitle tag='h4'>View Designs</CardTitle>
            </CardHeader>          
             <Row className='mx-0 mt-1 '>
                <Col sm='2' md='4' className='pl-0 pt-50'>
                  <div className="col-md-12 text-left p-0">
                    <Col className="form-group d-flex p-0">
                        <Label className="col-form-label col-md-5 col-lg-4">Seasons</Label>
                        <Input type="select" name="OrderCName" className="states order-alpha form-control state col-md-6 col-lg-8" parentid="#" subid="#" id="">
                            <option value="none">Selects</option>
                            <option value="CustB" name="B">Birla</option>
                            <option value="CustC" name="C">Morarji</option>
                            <option value="CustD" name="D">Raymond</option>                      
                        </Input>
                    </Col>
                  </div>
                </Col>
                <Col sm='2' md='4' className='pl-0 pt-50'>
                  <div className="col-md-12 text-left p-0">
                    <Col className="form-group d-flex p-0">
                          <Label className="col-form-label col-md-6 col-lg-4">Collection</Label>
                        <Input type="select" name="OrderCName" className="states order-alpha form-control state col-md-6 col-lg-8" parentid="#" subid="#" id="">
                            <option value="none">Select</option>
                            <option value="CustB" name="B">Birla</option>
                            <option value="CustC" name="C">Morarji</option>
                            <option value="CustD" name="D">Raymond</option>                      
                        </Input>
                    </Col>
                  </div>
                </Col>
                <Col className='d-inline-flex pt-50' sm='3' md='5'>
                 <CustomInput inline type='checkbox' id='exampleCustomCheckbox' label='Select All' defaultChecked />
                 <div>
                 <Trash2 size={16} className='mx-50'/>
                   <Label className="col-form-label p-0" onClick={onSubmit}>Remove Designs</Label>
                 </div>
               </Col>
             </Row>
             <hr></hr>
            <CardBody>
            <Design/>
            </CardBody>              
            </Card>
  )
}

export default ViewDesignContent