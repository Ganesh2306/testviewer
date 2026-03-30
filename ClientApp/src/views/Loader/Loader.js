import React from 'react'
import "./Loader.css"
import loaderimg from './img/textronic_logo.png'
const Loader = ({
  isShow
}) => {
  const style = isShow === true ? {display: 'flex'} : {display: 'none'}
  return (
    <div className="loader" style={style} >
      <img className='loaderImg' src={loaderimg}  height={50} width={50}/>
      <div className="spinner"></div>
    </div>
  )
}

export default Loader
