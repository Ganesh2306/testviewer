import React, { Fragment } from "react"
import '@styles/react/libs/tables/react-dataTable-component.scss'

export const CollectionSuccessToast = () => (
    <Fragment>
        <div className='toastify-body d-flex '>
            {/* <Avatar size='sm' color='success' icon={<Check size={12} />} /> */}
            <span role='img' aria-label='toast-text' className="ml-1 p-0">
                Added to Collection
            </span>
        </div>
    </Fragment>
)