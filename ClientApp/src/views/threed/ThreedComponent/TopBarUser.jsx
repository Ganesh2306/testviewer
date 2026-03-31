import { useState, useContext } from "react"
import {
    Row,
    Col,
    Input,
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Label,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from "reactstrap"
import { List, Grid } from 'react-feather'
import ThreeD_Design from "./popup/ThreeD_Design"
import { AbilityContext } from '@src/utility/context/Can'
import { priSave } from './popup/Tableold'

//!TopBar
const TopBarUser = (props) => {
   
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const [advsearch, setadvsearch] = useState(false)
    const ability = useContext(AbilityContext)
    const [searchValue, setSearchValue] = useState('')

    const resetInput = event => {      
        setSearchValue('')
    }  
    
    //!Top-Left
    const LeftTop = () => {
        return (
            <Col className="col-xl-7 col-lg-7 col-md-12 col-sm-12 ">
            <form class="form-inline mb-1 flex-nowrap">              
               <span className="float-left mr-1">Models</span>
               <select
                  id="collection3DLibrary"
                  className="col-md-2 col-lg-2 col-sm-4 form-control float-left"
                  >
                  <option
                     index="0"                          
                     >
                     All
                  </option>
                  <option
                     index="1"                          
                     >
                     Used
                  </option>
                  <option
                     index="1"                           
                     productgroupname="notin used"
                     >
                     Not in Used
                  </option>
                  <option
                     index="1"                           
                     productgroupname="notin used"
                     >
                  </option>
                  <hr className = "my-1" style={{borderColor:"#ebe9f1"}} >
                  </hr>
                  <option
                     index="1"                           
                     productgroupname="notin used"
                     >
                     Raymond
                  </option>
                  <option
                     index="1"                           
                     productgroupname="notin used"
                     >
                     Getzner
                  </option>
                  <option index="1" productgroupname="notin used" >
                     Getzner
                  </option>
                  <option
                     index="1"                           
                     productgroupname="notin used"
                     >
                     All Organization      
                  </option>
               </select>
               <span className="float-left mr-1 ml-1">Product</span>
               <select className="ml-1"
                  id="collection3DLibrary"
                  //className="col-md-2 col-lg-2 col-sm-4 form-control float-left"
                  >
                  <option
                     index="0"                        
                     value="Suit"
                     >
                     Suit
                  </option>
                  <option
                     index="1"  
                     value="Shirt"                     
                     >
                     Shirt
                  </option>
                  <option
                     index="1"  
                     value="Shirt"                     
                     >
                     Jacket
                  </option>
                  <option
                     index="1"  
                     value="Shirt"                     
                     >
                     Trouser
                  </option>
               </select>
               <div
               className="col-lg-4 col-sm-4 custom-checkbox float-left" style={{ marginLeft: "6px", marginRight: "6px", float: "left" }} >
               <Input
                  type="checkbox"
                  className="custom-control-input"
                  id="selectAllB"
                  />
               <Label className="custom-control-label" for="selectAllB" style={{ marginLeft: "8px", marginRight: "6px", float: "left" }}
               >Select All</Label>
               </div>
            </form>
            </Col>
        )
    }

    //!Top Right
    const TopRight = () => {
        const [Del, setDel] = useState(false)
        const deltoggle = () => setDel(!Del)
        const [Ddata, setData] = useState(null)
        return (
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 pr-0" >
                <div className="text-lg-right d-lg-flex" style={{ justifyContent: "right", float:"right" }}>
                    <ThreeD_Design modal={modal} toggle={toggle} />
                         <Button className="btn btn-sm btn-default mr-1">
                            Reset
                         </Button>
                    <div>
                        {ability.can('add', '3DImages') && <Button
                            type="button"
                            id="save_3dBTN"
                            className="btn btn-sm btn-success"
                            onClick={    
                                priSave((el) => {
                                    saveThreedImage(el)
                                })
                            }
                        > Save
                         </Button>}
                    </div>
                </div>
            </div>
        )
    }

    //!LeftTopDown
    const InputSearchCombo = () => {
        return (
            <>
                <div
                    style={{ display: 'block', position: 'relative', float: 'right' }}>
                    <InputGroup className='col-12' style={{ marginLeft: "4px" }} >
                      <div class="input-icons"  style={{position:'relative'}}>
                          <Input placeholder="search" className='rounded-left' style={{borderRadius:'0'}}
                          type='text'                         
                          >                         
                           
                        </Input>
                        <i className="fa fa-times" aria-hidden="true" role='button'  onClick={resetInput}  style={{position:'absolute', right:'1rem', top:'0.875rem'}}></i>
                      </div>   
                        <InputGroupAddon addonType="append">
                            <InputGroupText className="bg-primary text-white" role="button" >Search</InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                </div>
            </>
        )
    }
    const SearchToggleComponent = () => {
        return (
            <>
                <div >
                    { /* className="collapse" */}
                    <div id=""  >
                        <div className="AdvanceSearch">
                            <Col className="col-md-4 col-lg-2 flip mb-8 mb-1" style={{ paddingLeft: "4px", paddingRight: "4px", float: "left" }}>
                                <select
                                    id="Season"
                                    type="text"
                                    className="_featureTypeSearch form-control"
                                    selectcss="0"
                                >
                                    <option className="filter_data">Season</option>
                                </select>
                            </Col>

                            <div className="col-md-4 col-lg-2 flip mb-1" style={{ paddingLeft: "4px", paddingRight: "4px", float: "left" }}>
                                <select
                                    id="Color"
                                    type="text"
                                    className="_featureTypeSearch form-control"
                                    selectcss="1"
                                >
                                    <option className="filter_data">Color</option>
                                </select>
                            </div>
                            <div
                                className="col-md-4 col-lg-2 flip mb-1" style={{ paddingLeft: "4px", paddingRight: "4px", float: "left" }}
                            >
                                <select
                                    id="Pattern"
                                    type="text"
                                    className="_featureTypeSearch form-control"
                                    selectcss="2"
                                >
                                    <option className="filter_data">Pattern</option>
                                </select>
                            </div>
                            <div className="col-md-4 col-lg-2 flip mb-1" style={{ paddingLeft: "4px", paddingRight: "4px", float: "left" }}>
                                <select
                                    id="Weave"
                                    type="text"
                                    className="_featureTypeSearch form-control"
                                    selectcss="3"
                                >
                                    <option className="filter_data">Weave</option>
                                </select>
                            </div>
                         <div className="col-md-4 col-lg-2 d-flex">
                            <button
                                type="button"
                                id="AdvanceSearchBtn"
                                className="btn btn-xs btn-primary waves-effect waves-light mb-2"
                            >
                                Search</button
                            ><button
                                type="button"
                                id="ResetBtn"
                                className="btn btn-xs btn-primary waves-effect waves-light mb-2" style={{ marginLeft: "4px" }}                                    >
                                Reset
                              </button>
                             </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
    
    return (
        <>
            <Card className="contain1"> 
            <div className="col-xl-12">
               <CardHeader className='border-bottom'>
                 <CardTitle tag='h4'>3D Images</CardTitle>
                 <TopRight />
                </CardHeader>
            </div>            
             <CardBody >        
                    <Row className="mb-0">
                        <LeftTop /> 
                                     
                        <div className="col-xl-5 col-md-5 d-lg-flex justify-content-end">
                            <InputSearchCombo />       
                            <div className="ml-0 text-lg-right">                        
                                <div style={{ float: "right", padding: "4px" }}>|   Total 497</div>
                                <div style={{ float: "right" }}>
                                    <List onClick={() => {
                                        props.setImgViewToggle(false)
                                    }} color={props.ImgViewToggle ? '#423F3E' : `#CF0000`} size={28} style={{ float: "right", padding: "4px", cursor: "pointer" }} />
                                    <Grid color={props.ImgViewToggle ? '#CF0000' : `#423F3E`} size={28} onClick={() => {
                                        props.setImgViewToggle(true)
                                    }} style={{ float: "right", padding: "4px", cursor: "pointer" }} />
                                &nbsp; &nbsp;
                                </div>
                            </div>
                        </div>
                    </Row>
            </CardBody>
            </Card>
        </>
    )
}

export default TopBarUser
