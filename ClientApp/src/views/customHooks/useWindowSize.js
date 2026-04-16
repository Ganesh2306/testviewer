import React, { useEffect, useState } from 'react'
const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight
    })
  
    useEffect(() => {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        })
      }
  
      // Add event listener
      window.addEventListener('resize', handleResize)
  
      // Cleanup function (remove event listener)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [])// Empty dependency array means this runs once (like componentDidMount)
   
    return windowSize

  }
  
  export default useWindowSize