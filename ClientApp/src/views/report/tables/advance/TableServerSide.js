// ** React Imports
import { Fragment, useState, useEffect, memo, useContext } from 'react'

// ** Table Columns
import OrderPreview from './OrderPreview'
import OrderDetails from './OrderDetails'

// ** Third Party Components
import { stateContext } from '../../../context/stateContext'      

const DataTableServerSide = () => {  
  //! context
  const { isOpen, setOpen } = useContext(stateContext)

  return (
    <Fragment>         
     { isOpen ? <OrderPreview setOpen={ setOpen }/> : <OrderDetails  />} 
    </Fragment>
  )
}

export default memo(DataTableServerSide)
