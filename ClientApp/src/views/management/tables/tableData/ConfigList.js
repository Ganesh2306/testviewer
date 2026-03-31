import { useState } from 'react'
import { ReactSortable } from 'react-sortablejs'
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col, ListGroupItem, ListGroup, CustomInput } from 'reactstrap'


const ConfigList = (props) => {
    const dataRender = () => {
      
        let option
        if (props.forWhat === "config") {
            const data = props.data.map((item) => {
                console.log(item.design_configuration_id)
                option = (<ListGroupItem id={item.design_Type_Id} PCid={item.design_configuration_id} className="pointer" role="button">
                    <CustomInput defaultChecked={item.selected ? "checked" : ""} className="config_check" type='checkbox' id={`A-${item.design_Type_Id}`} > {item.design_Type_Name}</CustomInput>
                </ListGroupItem>)
                return option
            })
            return data
        } else if (props.forWhat === "Dtype") {
            const data = props.data.map((item) => {

                option = (<ListGroupItem id={item.design_Group_Id} PCid={item.design_configuration_id} className="pointer" role="button"> 
                    <CustomInput className="config_check" defaultChecked={item.selected ? "checked" : ""} type='checkbox' id={`B-${item.design_Group_Id}`}> {item.design_Group_Name}</CustomInput>
                </ListGroupItem>)
                return option
            })
            return data
        } else {
           
            const data = props.data.map((item) => {

                option = (<ListGroupItem id={item.design_Feature_Id} PCid={item.design_configuration_id} className="pointer" role="button">
                    <CustomInput className="config_check" defaultChecked={item.selected ? "checked" : ""} type='checkbox' id={`C-${item.design_Feature_Id}`} > {item.design_Feature_Name}</CustomInput>
                </ListGroupItem>)
                return option
            })
            return data
                }
    }

  return (       
      <div> 
          <span style={{ fontSize: "1rem", padding: "1rem 0rem", lineHeight: "1.2rem", fontWeight: "500", marginBottom: "1rem" }}>{props.forWhat === "config" ? "Design Type List" : props.forWhat === "Dtype" ? "Design Group List" : "Design Feature List" }</span>
        <ListGroup id="listTypeGF" flush className="spanStyles rounded-0 mt-1" style={{borderColor: '#0000', height:'250px', overflowY:"scroll", border:"1px solid rgba(34, 41, 47, 0.125)", width:"100%"}}>
              {dataRender()}
         </ListGroup>
      </div>
 
  )
}

export default ConfigList
