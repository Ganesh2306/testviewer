import React from 'react'
const DesignExist = (props) => {
    function replaceUrl(replace) {
        props.setSrc(replace)
    }
    return (
        <>           
            <img src={props.cdnUrl} onError={replaceUrl(props.localUrl)} style={{ display: 'none' }} />
        </>
       
    )
  }

  export default DesignExist