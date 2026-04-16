import { useState } from 'react'
import { Modal, ModalBody } from 'reactstrap'

import '@styles/base/pages/app-chat.scss'
import '@styles/base/pages/app-chat-list.scss'

// ** Store & Actions
import DesignChat from '../BoardComponent/DesignChat'

const CommentPopup = (props) => {
    const [commentModal, setcommentModal] = useState(false)   
    return (
        <div className=''>
            <div className='basic-modal' >       
                <Modal id="commentwindow" isOpen={props.chat_open} toggle={() => props.setchat_open(false)} className='modal-dialog-right m-0 '  >
                    <ModalBody className='p-0 commentmodal' >
                        <div className='chatpopup lg-12 d-flex'>
                            <div className="col-md-6 col-lg-6 col-sm-12 mobile-hide">
                                <div className='designpic'>
                                    <a>
                                        <img src='https://res.cloudinary.com/tdscloudcdn/TEXTRONICS_ARCHIVE_DEMO/689455444042/304681266431//7436-62-1t.jpg' />
                                    </a>                             
                                    <h6 className="item-name mt-1"><a className="text-body" href="">Cotton dark shadow color 43</a> </h6>
                                    <span className="item-description ">In Stock: 2.5 mtr</span>
                                </div>
                            </div>
                          
                            <div className='col-md-6 col-lg-6 col-sm-12 px-0 chat-app-window'>
                                <div className="active-chat">
                                    <DesignChat />
                                </div>
                            </div>
                        </div>
                    </ModalBody>                   
                </Modal>
            </div>
        </div>
    )
}
export default CommentPopup
