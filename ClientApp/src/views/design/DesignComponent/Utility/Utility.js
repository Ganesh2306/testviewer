import QRious from 'qrious'

const  qr = new QRious()

export const getQRbase64 = (url, size = 300) => {
     const options = {
        padding: null,
        size,
        value: url,
        mime:"image/png"
    } 
    qr.set(options)
    const base64 =  qr.toDataURL('image/png')
   
    return base64
}

// export const getQRbase642 = (url) => {
//     const options = {
//        padding: null,
//        size: 1000,
//        value: url
//    } 
//    qr.set(options)
//    const base64 = qr.toDataURL('image/jpeg')
   
//    return base64
// }

export const getQRbase642 = async(url, fabName = false, isBase64 = true) => {
   const Dpi = 300
    const size = 1 * Dpi // define 1 inch QR size
    const options = {
       padding: null,
       size,
       value: url,
       mime:"image/png"
   } 
   qr.set(options)
   let encodedUrl = null
   encodedUrl =  await qr.toDataURL('image/png')
   if (fabName) {
    encodedUrl =  await drawFabName(encodedUrl, fabName, size, Dpi)
     return encodedUrl
   } 
   return encodedUrl
}
const drawFabName = (encodedUrl, fabName, size, Dpi) => {
    return new Promise((resolve, reject) => {
    let canvas = document.getElementById('canvas')

    if (!canvas) {
        canvas = document.createElement('canvas')
        canvas.id = 'canvas'
        canvas.style.display = "none"
        document.body.appendChild(canvas)
    }
    const img = new Image()

    img.onload = function() {

       const ctx = canvas.getContext("2d")
        let refinedFabName = null

       //const fontSize = 10 * (Dpi / 100)
       const fontSize = 0.1 * size
       ctx.font = `${fontSize}px bold`
       ctx.textBaseline = 'middle'
       const metrics = ctx.measureText(fabName)
        
       if (metrics.width > size) {
         refinedFabName = getLines(ctx, fabName, canvas.width)
       } else {
        refinedFabName = [fabName]
       }
       
       const margin = size  * 0.10 // margin set to 10% of size

       canvas.width = size
       canvas.height = size + margin + (refinedFabName.length * margin)
    
       //let fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent
     
       const textPosX = refinedFabName.length > 1 ? 0 : (size / 2) - (metrics.width / 2) 
       let textPosY = img.height

       ctx.fillStyle = "white"
       ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.drawImage(img, 0, 0, size, size)
    ctx.font = `${fontSize}px bold`
    //ctx.textBaseline = 'top'
    refinedFabName?.forEach((fabName) => {
                 textPosY += margin
                 ctx.fillStyle = "white"
                 ctx.fillRect(textPosX, textPosY, canvas.width, margin)
                 ctx.fillStyle = "black"
                 ctx.fillText(fabName, textPosX, textPosY)
                })
       encodedUrl =  canvas.toDataURL('image/png') 
       resolve(encodedUrl)
    }
    img.onerror = (function(err) {
        reject(err)
    })
    img.src = encodedUrl
})
}

function getLines(ctx, text, maxWidth) {
    const words = text.split("")
    const lines = []
    let currentLine = words[0]

    for (let i = 1; i < words.length; i++) {
        const word = words[i]
        const width = ctx.measureText(`${currentLine}${word}`).width
        if (width < maxWidth) {
            currentLine += `${word}`
        } else {
            lines.push(currentLine)
            currentLine = word
        }
    }
    lines.push(currentLine)
    return lines
}