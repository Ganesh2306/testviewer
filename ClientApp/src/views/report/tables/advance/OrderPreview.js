// ** Third Party Components
import { useState } from 'react'
import { Button, Card, CardBody, CardText, Row, Col, Table } from "reactstrap"
import { Home, Star, Check } from 'react-feather'

const OrderPreview = (data) => {
  const [isOpen, setis_open] = useState(false)
  console.log(data)
  return (    
    <div>
      <div id="InvoiceCard">
      {/* Address and Contact */}    
      <Card className="invoice-preview-card mb-0">
        <CardBody className="invoice-padding pb-0">
          {/* Header */}
          <div className="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0">
            <div>
             <Button.Ripple color='secondary btn-sm'>
                <Home size={14} />
                <span className='align-middle ml-25' onClick={() => data.setOpen(false)}>Back to Orders</span>
              </Button.Ripple>
            </div>
            <div className="my-3">
              <CardText className="text-center mb-25">
                Raymond, Jekegram, Pokhran Road No.21 Thane, Maharashtra(India)
                - 400 606.{" "}
              </CardText>
              <h4 className="text-center invoice-title">Order Report </h4>
            </div>
            <div className="d-flex mt-md-0 mt-2">
              <div className="mr-1">
              <Button.Ripple color='success btn-sm'>
                <Home size={14} />
                <span className='align-middle ml-25'>Save Pdf</span>
              </Button.Ripple>
              </div>
              <div>
              <Button.Ripple color='primary btn-sm'>
                <Home size={14} />
                <span className='align-middle ml-25'>Print</span>
              </Button.Ripple>
              </div>
            </div>
            
          </div>
          {/* /Header */}
        </CardBody>
      </Card>
      {/* Address and Contact */}
      <Card>
        <CardBody className="p-0">
          <Table responsive>
            <tr>
              <th className="py-1">
                <span className="font-weight-bold">Customer Name</span>
              </th>
              <td className="py-1">
                <span className="font-weight-normal">$60.00</span>
              </td>
              <th className="py-1">
                <span className="font-weight-bold">Order No.</span>
              </th>
              <td className="py-1">
                <span className="">23</span>
              </td>
              <th className="py-1">
                <span className="">Date</span>
              </th>
              <td className="py-1">
                <span className="font-weight-normal">05/10/2020</span>
              </td>
            </tr>
            <tr>
              <td className="py-1">
                <span className="font-weight-bold">Customer Code</span>
              </td>
              <td className="py-1">
                <span className="font-weight-normal">1234</span>
              </td>
              <td className="py-1">
                <span className="font-weight-bold">Email</span>
              </td>
              <td className="py-1">
                <span className="">test@gmail.com</span>
              </td>
              <td className="py-1">
                <span className="font-weight-bold">Quantity</span>
              </td>
              <td className="py-1">
                <span className="font-weight-normal">200</span>
              </td>
            </tr>
            <tr>
              <td className="py-1">
                <span className="font-weight-bold">Customer Comments</span>
              </td>
              <td className="py-1" colspan="5">
                <span className="font-weight-normal">
                  We Require Collection by this month end
                </span>
              </td>
            </tr>
            <tr>
              <td className="py-1">
                <span className="font-weight-bold">Visited Person Name</span>
              </td>
              <td className="py-1">
                <span className="font-weight-normal">Ganesh</span>
              </td>
              <td className="py-1">
                <span className="font-weight-bold">Agenda</span>
              </td>
              <td className="py-1">
                <span className="">Mill Week</span>
              </td>
              <td className="py-1">
                <span className="font-weight-bold">Action Taken</span>
              </td>
              <td className="py-1">
                <span className="font-weight-normal">Selection done</span>
              </td>
            </tr>
          </Table>
        </CardBody>
      </Card>
      <Card className="invoice-preview-card">
        {/* Invoice Description */}
        <Table responsive>
          <thead>
            <tr>
              <th className="py-1 text-capitalize">SR no.</th>
              <th className="py-1 text-capitalize">Reference</th>
              <th className="py-1 text-capitalize">Design Code</th>
              <th className="py-1 text-capitalize">Details</th>
              <th className="py-1 text-capitalize">Collection Details</th>
              <th className="py-1 text-capitalize">Comments</th>
              <th className="py-1 text-capitalize">Order Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-1">
                <span className="font-weight-bold">15</span>
              </td>
              <td className="py-1">
                <span className="font-weight-bold"> <img className="Header-logo" src="../../swatch.jpg" alt="Logo" /></span>
              </td>
              <td className="py-1">
                <span className="font-weight-bold"> <img className="Header-logo" src="../../barcode.png" alt="Logo" width = "80" /></span>
              </td>
              <td className="py-1">
                <span>
                  <table>
                    <tbody>
                      <tr>
                        <td className="pr-1 border-0 font-weight-bold">
                          Finish:
                        </td>
                        <td className="border-0">
                          <span className="border-0">Normal Soft</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-1 border-0 font-weight-bold">
                          Category:
                        </td>
                        <td className="border-0">New Concept</td>
                      </tr>
                      <tr>
                        <td className="pr-1 border-0 font-weight-bold">GSM:</td>
                        <td className="border-0">173</td>
                      </tr>
                      <tr>
                        <td className="pr-1 border-0 font-weight-bold">
                          Product:
                        </td>
                        <td className="border-0">Checks</td>
                      </tr>
                      <tr>
                        <td className="pr-1 border-0 font-weight-bold">
                          Weave:
                        </td>
                        <td className="border-0">Plain + Dobby</td>
                      </tr>
                      <tr>
                        <td className="pr-1 border-0 font-weight-bold">
                          Construction:
                        </td>
                        <td className="border-0">132 x 86</td>
                      </tr>
                      <tr>
                        <td className="pr-1 border-0 font-weight-bold">
                          Blend:
                        </td>
                        <td className="border-0">99% Cotton/ 1% Poly</td>
                      </tr>
                    </tbody>
                  </table>
                </span>
              </td>
              <td className="py-1">
                <span className="">EUNOIA -2</span>
              </td>
              <td className="py-1">
                <span className="">sdfsdfds</span>
              </td>
              <td className="py-1">
                <span className="font-weight-normal">200</span>
              </td>
            </tr>
            <tr>
              <td className="py-1">
                <span className="font-weight-bold">15</span>
              </td>
              <td className="py-1">
                <span className="font-weight-bold"><img className="Header-logo" src="../../swatch.jpg" alt="Logo" /></span>
              </td>
              <td className="py-1">
                <span className="font-weight-bold"><img className="Header-logo" src="../../barcode.png" alt="Logo" width = "80" /></span>
              </td>
              <td className="py-1">
                <span>
                  <table>
                    <tbody>
                      <tr>
                        <td className="pr-1 border-0 font-weight-bold">
                          Finish:
                        </td>
                        <td className="border-0">
                          <span className="border-0">Normal Soft</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-1 border-0 font-weight-bold">
                          Category:
                        </td>
                        <td className="border-0">New Concept</td>
                      </tr>
                      <tr>
                        <td className="pr-1 border-0 font-weight-bold">GSM:</td>
                        <td className="border-0">173</td>
                      </tr>
                      <tr>
                        <td className="pr-1 border-0 font-weight-bold">
                          Product:
                        </td>
                        <td className="border-0">Checks</td>
                      </tr>
                      <tr>
                        <td className="pr-1 border-0 font-weight-bold">
                          Weave:
                        </td>
                        <td className="border-0">Plain + Dobby</td>
                      </tr>
                      <tr>
                        <td className="pr-1 border-0 font-weight-bold">
                          Construction:
                        </td>
                        <td className="border-0">132 x 86</td>
                      </tr>
                      <tr>
                        <td className="pr-1 border-0 font-weight-bold">
                          Blend:
                        </td>
                        <td className="border-0">99% Cotton/ 1% Poly</td>
                      </tr>
                    </tbody>
                  </table>
                </span>
              </td>
              <td className="py-1">
                <span className="">EUNOIA -2</span>
              </td>
              <td className="py-1">
                <span className="">sdfsdfds</span>
              </td>
              <td className="py-1">
                <span className="font-weight-normal">200</span>
              </td>
            </tr>
          </tbody>
        </Table>
        
        {/* /Invoice Note */}
      </Card>
           {/* Invoice Note */}
           <CardBody className='invoice-padding pt-0'>
        <Row>
          <Col sm='12'>
            <span className='font-weight-bold'>Note: </span>
            <span>
              It was a pleasure working with you!
            </span>
          </Col>
        </Row>
      </CardBody>
      {/* /Invoice Note */}
      </div>
    </div>
  ) 
}

export default OrderPreview
