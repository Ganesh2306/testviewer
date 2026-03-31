import axios from 'axios'
import Swal from 'sweetalert2'

export const getExistDname = async (designData) => {
  try {
    const response = await axios.post(`./Design/IsDesignExist`, designData)
    if (response.data.existingDesigns === null) {
      return null
    }
    return JSON.parse(response.data)
  } catch (error) {

    return null
  }
}

const renderstatus = async (dsize, imageurl, items, mainTDS, Dm_Design, loader_Ref, isoverwrite, ConfiguredProducts) => {
  loader_Ref.current.style.display = 'block'
  const [widthStr, heightStr] = dsize.split(',').map(value => value.trim())
  const height = parseFloat(heightStr)
  const width = parseFloat(widthStr)
  let saveBase64Image = {}
  const axiosRequests = []
  function isBlankOrWhiteBackground(base64Data, threeDImageName) {
    // Decode the base64 data to get the raw image data
    const binaryData = atob(base64Data)
    const arrayBuffer = new ArrayBuffer(binaryData.length)
    const uint8Array = new Uint8Array(arrayBuffer)

    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i)
    }

    // Create an image object from the raw data
    const blob = new Blob([uint8Array], { type: 'image/png' })
    const imageUrl = URL.createObjectURL(blob)
    const image = new Image()
    image.src = imageUrl

    // Wait for the image to load
    return new Promise((resolve) => {
      image.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0)

        // Get the pixel data from the canvas
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const pixels = imageData.data
        // Check if all pixels are white or transparent
        let isBlank = true
        for (let i = 0; i < pixels.length; i += 4) {
          const r = pixels[i]
          const g = pixels[i + 1]
          const b = pixels[i + 2]
          const a = pixels[i + 3]

          // Check if the pixel is not fully transparent and not white
          if (a > 0 && (r !== 255 || g !== 255 || b !== 255)) {
            isBlank = false
            break
          }
        }

        resolve(isBlank)
        //show popup if base64 is blank or white background
        if (isBlank === true) {
          Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: `Design cache not save for ${threeDImageName}`
          })
        }
      }
    })
  }
  const result = await new Promise((resolve) => {
    mainTDS.generateFabricImage(imageurl, width, height, 1, 'webp', items, 0.7, (result) => {
      resolve(result)
      console.log(result)
    })
  })
  if (result.length > 0 && result !== null && result !== undefined) {
    result.forEach(async (e, k) => {
      const base64Data = e.data.split(',')[1]
      const isBlank = await isBlankOrWhiteBackground(base64Data, e.threeDImageName)
      const index = ConfiguredProducts.indexOf(e.productName)
      const productName = e.productName
      let flag = false
      if (isoverwrite === true) {
        if (k === 0) {
          flag = true
        } else {
          flag = false
        }
      }
      if (!isBlank) {
        saveBase64Image = {
          base64image: e.data.split(',')[1],
          ThreedImageName: e.threeDImageName, //`${e.threeDImageName}_${k + 1}`
          ThreedImageId: e.id,
          ProductName: productName,
          DesignName: Dm_Design,
          IsOverrite: isoverwrite,
          IsDelete: false,
          IsFirstImage: flag
        }
        axiosRequests.push(
          axios.post(`./Design/SaveBase64Image`, saveBase64Image).then((response) => {
            const res = JSON.parse(response.data)
            if (res === false) {
              Swal.fire({
                icon: 'info',
                title: 'Oops...',
                text: 'Design cache not saved!'
              })
            }
            return res
          }).catch((error) => {
            console.error('Error in axios request:', error)
            return false
          })
        )
      }
    })
  } else {
    Swal.fire({
      icon: 'info',
      title: 'Oops...',
      text: 'Design cache not saved!'
    })
  }
  await Promise.all(axiosRequests).finally(() => {
    loader_Ref.current.style.display = 'none' // Hide loader regardless of request success or failure
  })
}

const help_for_upload = async (file, cb, totalCount, fileno, imageurl, mainTDS, loader_Ref, ConfiguredProducts, isoverwrite, unsavedesigns, combofilesRef, saastoken, setused_credit, failureGroups, saasapi) => {

  const formPayload = new FormData()
  const result = {} 
  formPayload.append('file', file.file)

  // combo files (renamed)
  combofilesRef?.current?.forEach((item) => {
    const newFileName = `${file.file.name.split('.')[0]}_${item.name}`
    const renamedFile = new File([item.file], newFileName, { type: item.file.type })
    formPayload.append('combofiles', renamedFile)
  })

  const FileSize = file.file.size
  delete file.file
  formPayload.append('alldata', JSON.stringify(file))

  // notify start (no message)
  if (cb) cb(file.Dm_Design, totalCount, fileno, null, FileSize, null)

  await axios({
    url: './Design/UploadDesigns',
    method: 'post',
    data: formPayload,
    headers: { 'Content-Type': 'multipart/form-data' },
    enctype: 'multipart/form-data'
  }).then(async (e) => {
    result[file.Dm_Design] = e.data?.issaved ?? false

    if (e.data) {
      // -------- FAILURE HANDLING & GROUPING --------
      if (e.data.issaved === false) {
        // track globally
        unsavedesigns.push(file.Dm_Design_Code)
        // (store as JSON for safety)
        localStorage.setItem('unsavedesigns', JSON.stringify(unsavedesigns))

        // message normalization
        let msg
        if (e.data.message === 'You have exceed design limit') {
          msg = 'Upload limit exceeded. Upgrade your plan or contact Textronics Design System Pvt Ltd'
        } else {
          msg = (e.data.message === null || e.data.message === undefined) ? 'Failed to save design' : e.data.message
        }

        // group by message (reason)
        if (!failureGroups[msg]) failureGroups[msg] = []
        failureGroups[msg].push(file.Dm_Design_Code)
      }

      // -------- CREDIT DEDUCTION (only on success) --------
      try {
        if (e.data.issaved && file.State === 0 && saastoken && JSON.parse(localStorage.profile).user_type !== 0) {
          const saasobj = {
            // email: JSON.parse(localStorage.profile).org_email,
            organisation_id: String(JSON.parse(localStorage.profile).org_id),
            activity: 'UploadDesign',
            deduct_credit: 1,
            api_token: saastoken
          }
          if (JSON.parse(localStorage.profile).user_type === 1) {
            saasobj.email = JSON.parse(localStorage.profile).org_email
          } else {
            saasobj.email = JSON.parse(localStorage.profile).login_id
          }
          const deductcredit = await axios.post(`${saasapi}deduct-credit`, saasobj, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          setused_credit?.(deductcredit.data.used_fabric_upload)
        }
      } catch (err) {
        console.error('Error deducting SaaS credit:', err)
      }
    }

    const checkboxElement = document.getElementById(`check-${file.Dm_Design_Code}`)
    if (checkboxElement?.checked && e.data?.issaved === true) {
      const timestamp = Date.now()
      let imageUrl = `${e.data.imageUrl}/z/${file.Dm_Design_Code}z.jpg`

      const productlist = (file.SaveInventoryDesignRequestDto?.Di_Product || '').split(',')
      const items = []
      ConfiguredProducts?.forEach(product => {
        productlist.forEach(p => {
          if (p.toLowerCase().includes(product.toLowerCase()) && !items.includes(product)) {
            items.push(product)
          }
        })
      })

      if (
        items.length > 0 &&
        e.data.designSize &&
        imageUrl &&
        mainTDS &&
        file.Dm_Design_Code &&
        isoverwrite !== undefined &&
        loader_Ref !== undefined
      ) {
        imageUrl = isoverwrite ? `${e.data.imageUrl}/z/${file.Dm_Design_Code}z.jpg?v=${timestamp}` : `${e.data.imageUrl}/z/${file.Dm_Design_Code}z.jpg`

        await renderstatus(e.data.designSize, imageUrl, items, mainTDS, file.Dm_Design_Code, loader_Ref, isoverwrite, ConfiguredProducts)
      }
    }

    if (cb) cb(file.Dm_Design, totalCount, fileno, e.data?.issaved, FileSize, null)
  })

  return result
}

export const uploadFile = async (files, cb = null, imageurl, mainTDS, loader_Ref, ConfiguredProducts, isoverwrite, unsavedesigns, combofilesRef, saastoken, setused_credit, failureGroups, remaning_credit, saasapi) => {

  const res = []
  try {
    if (files.length > 0) {
      if (saastoken && remaning_credit > 0) {
        const uploadCount = Math.min(remaning_credit, files.length)
        for (let i = 0; i < uploadCount; i++) {
          res.push(await help_for_upload(files[i], cb, uploadCount, i, imageurl, mainTDS, loader_Ref, ConfiguredProducts, isoverwrite, unsavedesigns, combofilesRef, saastoken, setused_credit, failureGroups, saasapi))
        }
      } else {
        for (let i = 0; i < files.length; i++) {
          res.push(await help_for_upload(files[i], cb, files.length, i, imageurl, mainTDS, loader_Ref, ConfiguredProducts, isoverwrite, unsavedesigns, combofilesRef, saastoken, setused_credit, failureGroups, saasapi))
        }
      }
      const reasons = Object.keys(failureGroups)
      if (reasons.length > 0) {
        const finalMessages = reasons.map((reason, index) => {
          const names = failureGroups[reason].join(', ')
          const label = failureGroups[reason].length > 1 ? 'Names' : 'Name'
          return `${index + 1}. ${reason}\nFailed design ${label}: ${names}`
        })

        const finalMessage = finalMessages.join('\n\n')

        if (cb) cb(null, files.length, null, null, null, finalMessage)
      }

      return res
    } else {
      return res
    }
  } catch (error) {

    return { data: false }
  }

}