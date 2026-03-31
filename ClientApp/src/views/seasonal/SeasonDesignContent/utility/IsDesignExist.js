import axios from 'axios'

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
                                            //t.length //C Count
  const help_for_upload = async (file, cb, totalCount, fileno) => {
    
    const formPayload = new FormData()
    const obj = {}
    formPayload.append('file', file.file)
    const FileSize = file.file.size
     delete  file.file
    formPayload.append('alldata', JSON.stringify(file))
    if (cb !== null) {
      cb(file.Dm_Design, totalCount, fileno, null, FileSize)
    }
     await axios({
        url: './Design/UploadDesigns',
        method: 'post',
        data: formPayload,
        headers: { 'Content-Type': 'multipart/form-data' },
        enctype: 'multipart/form-data',            
        onUploadProgress: progress => {
          const { loaded, total } = progress
          //console.log(`${loaded} ---- ${total}`)
          const percentageProgress = Math.floor((loaded / total) * 100)
          if (cb !== null) {
            //cb(loaded, total, percentageProgress, file.Dm_Design, totalCount, fileno)
          }
          //const percentageProgress = Math.floor((loaded / total) * 100)
        }
      }).then(e => {
        obj[file.Dm_Design] = e.data.issaved
        if (cb !== null) {
          cb(file.Dm_Design, totalCount, fileno, e.data.issaved, FileSize)
        }
      })
      
      return obj
  }

  export const  uploadFile = async(files, cb = null) => {
    
    const res = []
    try {
      if (files.length > 0) {

        for (let i = 0; i < files.length; i++) {

            res.push(await help_for_upload(files[i], cb, files.length, i))
        }
        return res
      } else {
        return res
      }
    } catch (error) {
      
    return {data:false} 
  }
  
}