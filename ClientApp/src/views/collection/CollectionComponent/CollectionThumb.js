// ** React Imports
import { useHistory } from 'react-router-dom'
import React, { useState, useContext } from "react"

// ** Third Party Components
import { Card, CardBody, CardText, CustomInput } from 'reactstrap'

import '../css/collection.css'
import { ModalEditCollection } from '../../popups/ModalEditCollection'
import { accessContext } from "../../context/accessContext"

const CollectionThumb = (props) => {
  const { is_boarduser } = useContext(accessContext)
    const history = useHistory()
    const [checked, setChecked] = useState(false)
    return (
        <Card
            role="button"
            tabIndex="-3"
            className='ecommerce-card' style={{ borderRadius: "0px" }}>
           <div className="icon-wrap-check">
                <CustomInput inline type='checkbox'
                    onChange={() =>  setChecked(!checked) }
                    id={props.id} />
          </div>
          <div className='item-img text-center mx-auto position-relative collection_img' onClick = {() => history.push('/design')}>           
            <div className="top">
              <a>
                        <img className='img-fluid card-img-top' src={ props.bannerimg } />
              </a>  
            </div>  
          </div>         
          <CardBody className="collection_body">  
            <h6 className='item-name'>
              <a className='text-body mb-1'>
                        {props.title }
              </a>
              <CardText tag='span' className='item-description'>
                  151 Designs
                  {is_boarduser ? " " : <ModalEditCollection coll_edit="coll_edit" /> }                
              </CardText>
            </h6>
            <CardText className='item-description'>diversity, wellness,love</CardText>
           
          </CardBody>         
        </Card>
 
      )
   
    }
 export default CollectionThumb