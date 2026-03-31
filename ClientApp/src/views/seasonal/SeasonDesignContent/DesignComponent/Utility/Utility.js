import QRious from 'qrious'

const  qr = new QRious()

export const getQRbase64 = (url) => {
     const options = {
        padding: null,
        size: 200,
        value: url
    } 
    qr.set(options)
    const base64 = qr.toDataURL('image/jpeg')
    
    return base64
}