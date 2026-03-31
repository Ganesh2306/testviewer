// ** React Imports
import { Fragment, useState, useEffect, memo, useContext } from 'react'

// ** Table Columns
import FavouritePreview from './FavouritePreview'
import FavouriteDetails from './FavouriteDetails'

// ** Third Party Components
import { stateContext } from '../../../context/stateContext'      

const DataTableFavourite = () => {  
  //! context
  const { isOpen, setOpen } = useContext(stateContext)

  return (
    <Fragment>         
     { isOpen ? <FavouritePreview setOpen={ setOpen }/> : <FavouriteDetails />} 
    </Fragment>
  )
}

export default memo(DataTableFavourite)

