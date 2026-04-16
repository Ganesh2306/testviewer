
import { useContext } from 'react'
import {Card, CardBody, Input, CardText, Col, Row, Button, CustomInput} from "reactstrap"
import { ArrowLeft, ArrowRight, Check } from 'react-feather'
import { rollContext } from '../../context/rollContext'
import Form from 'reactstrap/lib/Form'
import '../css/plan.css'

const Requirment = (props) => {
   // const data
 
   //* useContext hook
   const {roll, setroll} = useContext(rollContext)
   //console.log(roll)
   
   const hendelSubmit = (e) => {
    //e.preventDefault()
       
    e.preventDefault()
    props.stepper.next()
   
}
    const AcCard = (props) => {    
       
        console.log('Facilities:', props.facilities)
       return (
          <>          
          <Col md={6} lg={3} >
          
        <div id={`roll${props.title}`} >

          <center>
            <Card className="card-developer-meetup shadow-none rounded-0">
                               <div className="meetup-img-wrapper rounded-top text-center" id="customplanInput">
                                   <h6 className="text-black">{props.title} </h6>
                                   <CardText className="text-primary d-flex justify-content-center align-items-center "> <h1 className="text-primary">$49</h1></CardText>
                                   <CardText className="px-2" style={{ fontSize: '0.875rem' }}>{props.subtitle}</CardText>
                                   <CustomInput className="mt-2 btn btn-primary" type='radio' id={props.id} checked={props.isSelected} inline label='Buy Now' onClick={(e) => {
                                       //console.log(e.target.id)
                                       // console.log(props.title)

                                       setroll(props.title)
                                       props.stepper.next()
                                   }} />
             {/* <CardImg   src={props.iconImg} className='required-img' />   */}
              </div>
            <CardBody className="bg-light">                         
                                   {/*<h6 className="text-black">{props.title} </h6>*/}
                                   {/*<CardText className="text-primary d-flex justify-content-center align-items-center "> <h1 className="text-primary">$49</h1></CardText>*/}
                                   {props.facilities.map((plan, t) => (
                                       <div className="facilities">
                                           <div className="feature"><Check size={11} className="mr-50" /> {plan}</div>
                                           </div>
                                       
                                   ))
                                   }
                            
                                   {/* <CardText className="text-primary">{props.cc_subtitle}</CardText>
            
                                <CardText className="px-2" style={{fontSize:'0.9rem'}}>{props.subtitle}</CardText>
          <CustomInput className="mt-2"type='radio' id={props.id} checked={props.isSelected} inline label='Go with this' />    */}                 
            </CardBody>
            </Card>
            </center>
            </div>
            </Col>
          </>
        )    
    }
    
    return (
    <>       
    <div className="cc">
        <CardBody className='p-0'>
        <Form onSubmit={hendelSubmit} >
                <Row>  
                    {                        
                          props.planCard.map((e, k) => { 
                              if (e.title === roll) {
                                  return <AcCard id={e.id} title={e.title} isSelected={true} subtitle={e.subtitle} iconImg={e.iconImg} stepper={props.stepper} cc_subtitle={e.cc_subtitle} facilities={e.facilities} />
                          }
                              return <AcCard id={e.id} title={e.title} isSelected={false} subtitle={e.subtitle} iconImg={e.iconImg} stepper={props.stepper} cc_subtitle={e.cc_subtitle} facilities={e.facilities} />
                          })  
                    }             
            </Row>
            <div className='divider'><div className='divider-text'></div></div>      
   <div className='d-flex justify-content-between'>
          <Button.Ripple color='secondary' className='btn-prev rounded-0' outline disabled>
            <ArrowLeft size={14} className='align-middle mr-sm-25 mr-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button.Ripple>
          <Button.Ripple type='submit' value='submit' color='primary' className='btn-next rounded-0' /*  onClick={() => {
       props.stepper.next()
   }} */>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight>
          </Button.Ripple>
        </div>
        </Form>
   </CardBody>
   </div>
    </>
    )    
 }


export default Requirment
    