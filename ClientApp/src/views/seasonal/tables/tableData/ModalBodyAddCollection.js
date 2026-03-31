import { useState, useContext, forwardRef, useEffect } from 'react'
import { Input, Label, Col, ModalBody, FormFeedback, Button } from 'reactstrap'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios'
import * as validate from '../../../validation/ValidationFunctions'
import { stateContext } from '../../../context/stateContext'
import { data } from 'jquery'
import { selection } from '../../../design/DesignComponent/Utility/selection'

// ! PopUpBody

const ModalBodyAddCollection = forwardRef((props, ref) => {
    const { Seasonlist } = props
    const setseasonallist = Seasonlist.seasonMastersList
    const [Collectionlist, setSeasonlist_id] = useState([])
    const [settest, test] = useState([])
    const seletedfab = Object.keys(selection.slected)
    useEffect(async () => {
        const id = document.getElementById('Season_id').value
        const obj = {
            SeasonID : parseInt(id),
            Start : 0,
            End : 100 
            }
        const res = await axios.post(`./Seasonal/GetCollectionListBySeasonId?SeasonID=${obj.SeasonID}&Start=${obj.Start}&End=${obj.End}`, obj)
        setSeasonlist_id(res.data.myCollection)
        const cid = document.getElementById('Collection_id').value
        const CollectionID = parseInt(cid)
      }, [])
    //   useEffect(() => {
    //     test(
    //         seletedfab = Object.keys(selection.slected), 
    //         SeasonID = parseInt(document.getElementById('Season_id').value),
    //         cid = document.getElementById('Collection_id').value,
    //         CollectionID = parseInt(cid)
    //     )
    //   }, [])

    return (
        < ModalBody >
            <Col className="row form-group ">

                <Label className="col-form-label col-sm-6">Season Name <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-6 p-0">
                    <Input autoComplete="off" type="hidden" id="role_Id" 
                         name="role_Id"  />
                     {/* <FormFeedback></FormFeedback> */}
                     <Input innerRef={props.register}   type="select" name="season_name" className=" col-sm-12" parentid="#" subid="#C_StoreType" id="Season_id"
                     onChange={ async () => { 
                            const id = document.getElementById('Season_id').value
                            const obj = {
                                SeasonID : parseInt(id),
                                Start : 0,
                                End : 100 
                                }
                                const res = await axios.post(`./Seasonal/GetCollectionListBySeasonId?SeasonID=${obj.SeasonID}&Start=${obj.Start}&End=${obj.End}`, obj)
                            setSeasonlist_id(res.data.myCollection)
                            console.log(res.data.myCollection)
                          }
                    }              
                  >
                       {
                            setseasonallist.map((e, k) => {
                            return <option value={e.sm_Season_Id}>{e.sm_Season_Name}</option>
                        })
                        } 
                  </Input>
                    
                </div>
            </Col>   
            <Col className="row form-group ">
                <Label className="col-form-label col-sm-6">Collection <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-6 p-0">
                <Input innerRef={props.register} type="select" name="Collection_name" className=" col-sm-12" parentid="#" subid="#" id="Collection_id"                
                  >
                     {
                            Collectionlist.map((e, k) => {
                            return <option value={e.collection_Id}>{e.collection_Name}</option>
                        })
                        } 
                  </Input>
                </div>
            </Col>          
        </ModalBody >

    )
})

export default ModalBodyAddCollection
