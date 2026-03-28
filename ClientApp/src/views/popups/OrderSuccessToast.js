import React, { Fragment } from "react"
import '@styles/react/libs/tables/react-dataTable-component.scss'

export const OrderSuccessToast = ({ info, url, name}) => (
    <Fragment >
        <div className='toastify-body mb-1 pl-0 '>
            <span role='img' aria-label='toast-text'>
                <strong> Placed:: </strong>
               Your Order has been succesfully placed
                {/* {info} */}
            </span>
        </div>
        <div className='toastify-header d-flex successboard'>           
            <h6 className='toast-title'>{name}</h6>
        </div>
    </Fragment>
)