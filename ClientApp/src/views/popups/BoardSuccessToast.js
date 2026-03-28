import React, { Fragment } from "react"
import '@styles/react/libs/tables/react-dataTable-component.scss'

export const BoardSuccessToast = ({ info, url, name}) => (
    <Fragment  >
        <div className='toastify-body '>
            <span role='img' aria-label='toast-text'>
                Added to Wishlist
                {/* {info} */}
            </span>
        </div>
        <div className='toastify-header d-flex successboard pb-0'>           
            <h6 className='toast-title'>{name}</h6>
        </div>
    </Fragment>
)