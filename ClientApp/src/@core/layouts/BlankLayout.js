// ** React Imports
import { useEffect, useState } from 'react'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'

import IdleTimeOutHandler from '../../views/SessionComponent/IdleTimeOutHandler'

const BlankLayout = ({ children, ...rest }) => {
  // ** Hooks
  const [skin, setSkin] = useSkin()

  // ** States
  const [isMounted, setIsMounted] = useState(false)

  const [isActive, setIsActive] = useState(true)
  const [isLogout, setLogout] = useState(false)

  //** ComponentDidMount
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
    <div className='blank-page'>
      <div className='app-content content'>
        <div className='content-wrapper'>
          <div className='content-body'>{children}</div>
        </div>
      </div>
    </div>
    <IdleTimeOutHandler
            onActive={() => { setIsActive(true) }}
            onIdle={() => { setIsActive(false) }}
            onLogout={() => { setLogout(true) }}
        />
    </>
  )
}

export default BlankLayout
