import React from "react"

export const loginContext = React.createContext()

const LoginContextProvider = ({ children }) => {
    const [loginData, setloginData] = React.useState()
    return (
      <loginContext.Provider value={{ loginData, setloginData }}>
        {children}
      </loginContext.Provider>
    )
  }
  
  export default LoginContextProvider