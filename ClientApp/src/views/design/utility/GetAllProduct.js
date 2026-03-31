import { getRoleByRoleType } from "../../MethodList"
import axios from 'axios'

export const  getRole = async(designData) => {
    try {
      const response = await axios.post(`./Design/IsDesignExist`, designData)
      return JSON.parse(response.data)
    } catch (error) {
      const existingDesigns = []
      return existingDesigns 
    }
  }

  export const  sendDesign = async(file) => {
    
    const loginFormData = new FormData()
    loginFormData.append('file', file)  
  
    try {
      // make axios post request
      const response = await axios({
        method: "post",
        url: "./Design/GenerateThumb",
        data: loginFormData,
        headers: { "Content-Type": "multipart/form-data" }
        })
        return response.data.base64
        
    } catch (error) {
      return ""
    }
  }

export const  sendDesign11 = async(file) => {
  
      const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      }
      const data = new FormData()
      data.append('file', file)

      try {
        const response = await axios.post('./Design/GenerateThumb', data,  { headers: { 'Content-Type': 'multipart/form-data' } })
        
        return JSON.parse(response.data)
      } catch (error) {        
        return "" 
      }     
}