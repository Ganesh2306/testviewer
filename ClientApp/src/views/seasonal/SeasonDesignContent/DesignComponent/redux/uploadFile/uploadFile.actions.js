import axios from 'axios'
import uploadFileTypes from './uploadFile.types'
/* eslint-disable */
export const setUploadFile = data => ({
  type: uploadFileTypes.SET_UPLOAD_FILE,
  payload: data,
})

export const setUploadProgress = (id, progress) => ({
  type: uploadFileTypes.SET_UPLOAD_PROGRESS,
  payload: {
    id,
    progress,
  },
})

export const successUploadFile = id => ({
  type: uploadFileTypes.SUCCESS_UPLOAD_FILE,
  payload: id,
})

export const failureUploadFile = id => ({
  type: uploadFileTypes.FAILURE_UPLOAD_FILE,
  payload: id,
})

export const uploadFile = (files) => {
  console.log(files)
  return  dispatch => {
  console.log(files)
  console.log(dispatch)
  
  if (files.length) {
    files.forEach(async file => {
      const formPayload = new FormData()
      formPayload.append('file', file.file.file)
      delete  file['file'].file
      formPayload.append('alldata', JSON.stringify(file.file))
      try {
        await axios({
          url: './Design/UploadDesigns',
          method: 'post',
          data: formPayload,
          enctype: 'multipart/form-data',
          cancelToken: file.cancelSource.token,
          onUploadProgress: progress => {
            const { loaded, total } = progress
            const percentageProgress = Math.floor((loaded / total) * 100)
            dispatch(setUploadProgress(file.id, percentageProgress))
          },
        })
        dispatch(successUploadFile(file.id))
      } catch (error) {
        if (axios.isCancel(error)) {
         
          console.log('cancelled by user')
        }
        dispatch(failureUploadFile(file.id))
      } 
    })
  }
}
}

export const retryUpload = (id) => (dispatch, getState) => {
  dispatch({
    type: uploadFileTypes.RETRY_UPLOAD_FILE,
    payload: id,
  })

  const { fileProgress } = getState().UploadFile

  const reuploadFile = [fileProgress[id]]
  
  dispatch(uploadFile(reuploadFile))
}
