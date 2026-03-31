import { getRoleByRoleType } from "../../MethodList"
import axios from 'axios'

export const  getRole = async(tro_type) => {
    const Role = new Object()
        Role.role_Type = tro_type
    
    try {
      const response = await axios.get(`./Role/GetRoleDesignConfigurationByRole?RoleId=${tro_type}`)
      return response.data
    } catch (error) {
      return false
    }
  }