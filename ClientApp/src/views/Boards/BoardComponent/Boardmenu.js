// ** React Imports
import { useState } from "react"
import { CustomInput } from 'reactstrap'

import {Trash, ShoppingCart } from 'react-feather'

import '../css/boardspage.css'

const Boardmenu = (props) => {
    const [Delwish, setDelwish] = useState(false)
    const delwishtoggle = () => setDelwish(!Delwish)
    const [move, setMove] = useState(false)
    const movetoggle = () => setMove(!move)

    const [notes, setNotes] = useState(false)
    const togglenotes = () =>  setNotes(!notes) 

    return (
        <>
        
        <div className='d-flex p-50 mr-1 '>
                <div><span>5 </span>designs selected</div>
                <div className='px-50'> | </div>
                <div>Deselect</div>
                <div className='px-50'> | </div>
                <div>Select All</div>
        </div>
            <div className='d-flex '>
                    <a className='mr-50 btn btn-light p-50' onClick={delwishtoggle}>
                        <Trash size={16} style={{ transform: 'rotate(0deg)' }} />
                    </a>
                    <a className='mr-50 btn-light p-50' onClick={movetoggle}>
                        <ShoppingCart size={16} style={{ transform: 'rotate(0deg)' }} />                            
                    </a>
               
              </div>          
          
            <div className='view-options d-flex'>
                <CustomInput
                    className='form-control mx-50'
                    type='select'
                    id='rows-per-page'
                    value={'20'}
                    style={{
                        width: '5rem',
                        padding: '0 0.8rem',
                        backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
                    }}
                >
                    <option value='10' className='dropdown-sort'>10</option>
                    <option value='25' className='dropdown-sort'>25</option>
                    <option value='50' className='dropdown-sort'>50</option>
                </CustomInput>
                <CustomInput
                    className='form-control mx-50'
                    type='select'
                    id='rows-per-page'
                    value={'20'}
                    style={{
                        width: '5rem',
                        padding: '0 0.8rem',
                        backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
                    }}
                >
                    <option value='Latest' className='dropdown-sort'>Latest</option>
                    <option value='Date' className='dropdown-sort'>Date</option>
                    <option value='Stock' className='dropdown-sort'>Stock</option>
                    <option value='Rating' className='dropdown-sort'>Rating</option>
                </CustomInput>
                <CustomInput
                    className='form-control mx-50'
                    type='select'
                    id='rows-per-page'
                    value={'20'}
                    style={{
                        width: '5rem',
                        padding: '0 0.8rem',
                        backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
                    }}
                >
                    <option value='Large' className='dropdown-sort'>Large</option>
                    <option value='Medium' className='dropdown-sort'>Medium</option>
                    <option value='Small' className='dropdown-sort'>Small</option>
                </CustomInput>
            </div>

       
        </>
    )
}
export default Boardmenu