
import axios from 'axios'

export const getRoleDesignConfiguration = async() => {
    const response = await axios.get(`./Role/GetRoleDesignConfigurationByRole?RoleId=${0}`)
    return response.data
}

export const getFeatureTypeList = async() => {
    const response = await axios.get(`./Design/GetFeatureTypeList`)
    return response.data
}
  /*  const response = await axios.get(`./Role/GetRoleDesignConfigurationByRole?RoleId=${0}`)
   setrollData(response.data)

   const resGetFt = await axios.get(`./Design/GetFeatureTypeList`) */