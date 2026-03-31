// ** React Imports
import { Fragment, useState, useEffect, memo, useContext } from 'react'

// ** Table Columns
import CartPreview from './CartPreview'
import CartDetails from './CartDetails'

// ** Third Party Components
import { stateContext } from '../../../context/stateContext'      

const DataTableCart = () => {  
  //! context
  const { isOpen, setOpen } = useContext(stateContext)

  return (
    <Fragment>         
     { isOpen ? <CartPreview setOpen={ setOpen }/> : <CartDetails />} 
    </Fragment>
  )
}

export default memo(DataTableCart)

