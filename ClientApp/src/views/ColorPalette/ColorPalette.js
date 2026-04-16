import React, { useState, useRef, useEffect } from "react"
import "./ColorPalette.css"
import { HexColorPicker } from "react-colorful"
import paletteImg from './Images/palette.png'
import { Delete, Edit2, Trash2 } from 'react-feather'
import namer from 'color-namer'

const ColorPalette = (props) => {
  const [selectedColor, setSelectedColor] = useState("#FFFFFF")
  const [isPouring, setIsPouring] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [colorMix, setColorMix] = useState([])
  const [showMaxMessage, setShowMaxMessage] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [pickerColor, setPickerColor] = useState('#FFFFFF')
  const [initialColors, setInitialColors] = useState([])
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const canvasRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.onload = () => {
        setIsImageLoaded(true)
      }
    }
  }, [])

const handleReset = () => {
  setColorMix([])  
  setSelectedColor("#FFFFFF")
  setIsPouring(true)
  setTimeout(() => setIsPouring(false), 500)
}
  const handleImageClick = (e) => {
    if (!isImageLoaded) return
    
    if (colorMix.length >= 5) {
      setShowMaxMessage(true)
      setTimeout(() => setShowMaxMessage(false), 2000)
      return
    }

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const img = imageRef.current
    
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)
    
    const rect = e.target.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const scaleX = img.naturalWidth / rect.width
    const scaleY = img.naturalHeight / rect.height
    
    const pixel = ctx.getImageData(x * scaleX, y * scaleY, 1, 1).data
    const hexColor = `#${pixel[0].toString(16).padStart(2, '0')}${pixel[1].toString(16).padStart(2, '0')}${pixel[2].toString(16).padStart(2, '0')}`
    
    const newColor = hexColor.toUpperCase()
    setSelectedColor(newColor)
    
    // Add new color with default percentage (equal distribution)
    const totalColors = colorMix.length + 1
    const equalPercentage = Math.round(100 / totalColors)
    
    const updatedColors = [...colorMix].map(color => ({
      ...color,
      percentage: equalPercentage
    }))
    
    updatedColors.push({
      color: newColor,
      percentage: equalPercentage
    })
    
    // Adjust percentages to sum to 100
    const total = updatedColors.reduce((sum, color) => sum + color.percentage, 0)
    if (total !== 100) {
      updatedColors[0].percentage += (100 - total)
    }
    
    setColorMix(updatedColors)
    setIsPouring(true)
    setTimeout(() => setIsPouring(false), 500)
  }

  const handleImageHover = (e) => {
    if (!isImageLoaded) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const img = imageRef.current
    
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)
    
    const rect = e.target.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const scaleX = img.naturalWidth / rect.width
    const scaleY = img.naturalHeight / rect.height
    
    const pixel = ctx.getImageData(x * scaleX, y * scaleY, 1, 1).data
    const hexColor = `#${pixel[0].toString(16).padStart(2, '0')}${pixel[1].toString(16).padStart(2, '0')}${pixel[2].toString(16).padStart(2, '0')}`
    
    setSelectedColor(hexColor.toUpperCase())
  }

const draggingRef = useRef(null)

const handleDraggging = (e) => {
  if (!draggingRef.current) return
  
  const { index, startX, leftPercent, rightPercent } = draggingRef.current
  const deltaX = e.clientX - startX
  const container = document.querySelector('.color_slider_container')
  const containerWidth = container.offsetWidth
  
  // Calculate percentage change based on mouse movement
  const deltaPercent = Math.round((deltaX / containerWidth) * 100)
  
  // Calculate new percentages
  const newLeftPercent = leftPercent + deltaPercent
  const newRightPercent = rightPercent - deltaPercent

  if (newLeftPercent < 0 || newRightPercent < 0) return
  
  // Update the color mix
  const updated = [...colorMix]
  updated[index] = { ...updated[index], percentage: newLeftPercent }
  updated[index + 1] = { ...updated[index + 1], percentage: newRightPercent }
  
  setColorMix(updated)
}

const handleDragEnd = () => {
  draggingRef.current = null
  document.removeEventListener("mousemove", handleDraggging)
  document.removeEventListener("mouseup", handleDragEnd)
}

const handleDragStart = (e, index) => {
  draggingRef.current = {
    index,
    startX: e.clientX,
    leftPercent: colorMix[index].percentage,
    rightPercent: colorMix[index + 1].percentage
  }
  document.addEventListener("mousemove", handleDraggging)
  document.addEventListener("mouseup", handleDragEnd)
}
const getContrastColor = (hexColor) => {
  const r = parseInt(hexColor.substr(1, 2), 16)
  const g = parseInt(hexColor.substr(3, 2), 16)
  const b = parseInt(hexColor.substr(5, 2), 16)
  const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000
  return brightness > 128 ? "#000000" : "#FFFFFF"
}
// console.log(props.colodata, 'colodata')
const hsvToHex = ({ h, s, v }) => {
  s /= 100
  v /= 100
  const c = v * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = v - c
  let r = 0, g = 0, b = 0

  if (h < 60) [r, g, b] = [c, x, 0]
  else if (h < 120) [r, g, b] = [x, c, 0]
  else if (h < 180) [r, g, b] = [0, c, x]
  else if (h < 240) [r, g, b] = [0, x, c]
  else if (h < 300) [r, g, b] = [x, 0, c]
  else [r, g, b] = [c, 0, x]

  const toHex = (val) => Math.round((val + m) * 255).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
}
useEffect(() => {
  if (props.colodata && props.colodata.length > 0) {
    const dominantColors = props.colodata[0]?.dominant_colors || []

    const formatted = dominantColors.map(d => ({
      color: hsvToHex(d.hsv_value),
      percentage: Math.round(d.weight)
    }))

    const total = formatted.reduce((sum, c) => sum + c.percentage, 0)
    if (total !== 100 && formatted.length > 0) {
      formatted[0].percentage += (100 - total)
    }

    setColorMix(formatted)
    setInitialColors(JSON.parse(JSON.stringify(formatted))) // store for reset
  }
}, [props.colodata])

  return (
    <div className="color-picker-container">
      
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div className="pickerHolder">
      <div className="image-container">
        <img
          ref={imageRef}
          src={paletteImg}
          alt="Color Picker"
          onMouseMove={handleImageHover}
          onClick={handleImageClick}
          className="color-picker-image"
          crossOrigin="anonymous"
        />
        {!isImageLoaded && <div className="loading-message">Loading image...</div>}
        <button 
        className="reset-button"
        id='reset-button'
        onClick={handleReset}
      >
        Reset Colors
      </button>
      </div>
      </div>
      <div className="color_slider_container">
        {colorMix.map((color, index) => (
          <div
            key={index}
            className="color-segment"
            style={{
              backgroundColor: color.color,
              flexGrow: color.percentage,
              position: 'relative'
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="color-tooltip">
              {/* {hoveredIndex === index &&  namer(color.color).basic[0].name} */}
              {hoveredIndex === index && (
                <div style={{ backgroundColor: 'lightgray', padding: '2px', borderRadius: '4px', display: 'flex', justifyContent: 'center' }}>
                  {namer(color.color).basic[0].name}
                </div>
              )}
            </div>
            <span className="color-label" style={{ color: getContrastColor(color.color), textAlign: 'right' }}>
              {color.percentage}%
              <span style={{ display: 'flex', gap: '4px', alignItems: 'center', marginTop: '4px' }}>
                <button
                  className="edit-color-button"
                  onClick={() => {
                    setEditingIndex(index)
                    setPickerColor(color.color)
                  }}
                  style={{ color: getContrastColor(color.color) }}
                >
                  <Edit2 size={10} />
                </button>

                <button
                  className="delete-color-button"
                  onClick={() => {
                    const deletedPercentage = colorMix[index].percentage
                    const updatedColors = [...colorMix]
                    updatedColors.splice(index, 1)

                    const remainingTotal = updatedColors.reduce((sum, c) => sum + c.percentage, 0)

                    const redistributed = updatedColors.map(c => ({
                      ...c,
                      percentage: Math.round(c.percentage + ((c.percentage / remainingTotal) * deletedPercentage))

                    }))

                    // Final fix to make sure total is exactly 100
                    const finalTotal = redistributed.reduce((sum, c) => sum + c.percentage, 0)
                    if (finalTotal !== 100 && redistributed.length > 0) {
                      redistributed[0].percentage += (100 - finalTotal)
                    }

                    setColorMix(redistributed)
                  }}

                  style={{ color: getContrastColor(color.color) }}
                >
                  <Trash2 size={9} />
                </button>
              </span>
            </span>
            {index < colorMix.length - 1 && (
              <div
                className="divider1"
                onMouseDown={(e) => handleDragStart(e, index)}
              />
            )}
          </div>
        ))}
  {editingIndex !== null && (
  <div className="color-picker-popup">
    <div className="picker-overlay" onClick={() => setEditingIndex(null)} />
    <div className="picker-box">
      <HexColorPicker color={pickerColor} onChange={setPickerColor} />
      <button
        className="apply-color-button"
        onClick={() => {
          const updated = [...colorMix]
          updated[editingIndex].color = pickerColor.toUpperCase()
          setColorMix(updated)
          setEditingIndex(null)
        }}
      >
        Apply
      </button>
    </div>
  </div>
)}
</div>
    </div>
  )
}
export default ColorPalette
