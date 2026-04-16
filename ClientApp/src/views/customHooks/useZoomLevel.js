import { useState, useEffect } from 'react'
const useZoomLevel = () => {
    const [zoomLevel, setZoomLevel] = useState(window.devicePixelRatio)
    useEffect(() => {
        const handleResize = () => {
            setZoomLevel(window.devicePixelRatio)
        }
        // Listen for resize events to detect any changes in zoom or display scaling
        window.addEventListener('resize', handleResize)

        // Cleanup event listener when the component is unmounted
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    return zoomLevel
}
export default useZoomLevel