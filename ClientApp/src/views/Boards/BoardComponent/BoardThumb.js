// ** React Imports
import { useHistory } from 'react-router-dom'
import React, { useState } from "react"

// ** Third Party Components
import { Card, CardBody, Button, Badge } from 'reactstrap'
import { MessageSquare } from 'react-feather'
import BoardThumbHover from './BoardThumbHover'
import CommentPopup from './../BoardPopup/CommentPopup'


const BoardThumb = (props) => {
    const [chat_open, setchat_open] = useState(false)
    const togglechat = () => setchat_open(!chat_open)

    const history = useHistory()
    const [notes, setNotes] = useState(false)
    const togglenotes = () => setNotes(!notes)
    return (
        <>
         
        <Card
            role="button"
            tabIndex="-3"
            className='ecommerce-card' style={{ borderRadius: "0px" }} > <BoardThumbHover id={props.id} />
            <div className='item-img text-center mx-auto position-relative' style={{ backgroundImage: `url("${props.bgimg}")` }} onClick={() => history.push('/designview')}>
                <div className="top"  >                 
                
                        <img className='img-fluid card-img-top' />
                  
                </div>
                </div>
                <CardBody style={{ height: "78px", position: 'relative' }}> <h6 className='item-name'><a className='text-body'>
                    {props.title}
                </a> </h6>
                    <h4 className='item-description text-primary'>$55</h4> <span className='item-description'>In Stock: {props.stock}</span>
                    <div className='msgbox' onClick={() => setchat_open(!chat_open)}>
                        <Button className='h-100'
                            color='white'>
                            <MessageSquare className='ficon' />
                            <Badge pill color='secondary' className='badge-up text-white bg-grey'>
                                5
                            </Badge>
                        </Button>                 
                    </div>      
                    <CommentPopup chat_open={chat_open} setchat_open={togglechat} />
                </CardBody>
            </Card>
          
        </>
      )
   
    }
export default BoardThumb