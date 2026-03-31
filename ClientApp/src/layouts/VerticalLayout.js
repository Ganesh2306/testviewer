// !Do not remove the Layout import
import Layout from '@layouts/VerticalLayout'
import { useEffect, useState } from 'react'
import IdleTimeOutHandler from '../views/SessionComponent/IdleTimeOutHandler'
const VerticalLayout = (props) => {
    const [isActive, setIsActive] = useState(true)
    const [isLogout, setLogout] = useState(false)
    return (<>
      
        <Layout {...props}>{props.children}</Layout>
        <IdleTimeOutHandler
            onActive={() => { setIsActive(true) }}
            onIdle={() => { setIsActive(false) }}
            onLogout={() => { setLogout(true) }}
        />
    </>
    )
}

export default VerticalLayout
