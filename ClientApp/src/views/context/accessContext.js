import React from 'react'

export const accessContext = React.createContext()

const AccessProvider = ({ children }) => {

    //! Set Default eg org , supp ,age ,cust
    const val = localStorage.getItem("accessinfo")
    const val2 = localStorage.getItem("board")
    const val3 = localStorage.selecteduser
    const val4 = localStorage.getItem("selecteduseraccessinfo")
    const warehousetype = localStorage.warehouse
    const text = localStorage.who ? localStorage.who : "" 
    const pattern1 = /Supplier/g
    const loginuserdata = localStorage.loginuserdata ? JSON.parse(localStorage.loginuserdata) : ""
    const org_type = localStorage.userData ? JSON.parse(localStorage.userData).org_type : ""
    
    //ToDo : additional working has to be done : -- do Axios call check for login in sessionStorage :--- 
    const [access, setaccess] = React.useState(val === null || val === undefined || val === "undefined" ? false : JSON.parse(val))
    const [board, setboard] = React.useState(val2 === null || val2 === undefined || val2 === "undefined" ? [] : JSON.parse(val2))  
    const [selectedUser, setSelectesUser] = React.useState(val3 === null || val3 === undefined || val3 === "undefined" ? false : JSON.parse(val3))
    const [SelectesUseraccess, setSelectesUseraccess] = React.useState(val4 === null || val4 === undefined || val4 === "undefined" ? false : JSON.parse(val4))
    const [updateForSupp, setUpdateForSupp] = React.useState(false)
    const [is_boarduser, setis_boarduser] =  React.useState(pattern1.test(text))
    const [loginuser, setlgnuser] = React.useState(loginuserdata)
    const [logincust, setlgncust] = React.useState(loginuserdata)
    const [orgtype, setorgtype] = React.useState(org_type)
  return (
      <accessContext.Provider value={{ updateForSupp, setUpdateForSupp, access, setaccess, board, setboard, is_boarduser, setis_boarduser, selectedUser, setSelectesUser, warehousetype, loginuser, setlgnuser, orgtype, setorgtype, logincust, setlgncust, SelectesUseraccess, setSelectesUseraccess}}> {children} </accessContext.Provider>
  )
}

export default AccessProvider
