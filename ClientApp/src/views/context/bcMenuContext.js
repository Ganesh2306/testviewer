import React from 'react'

export const bcMenuContext = React.createContext()

const BcMenuProvider = ({ children }) => {
    const [bcMenudata, setbcMenudata] = React.useState([])
    const [forceRender, setforceRender] = React.useState([])
  return (
      <bcMenuContext.Provider value={{ bcMenudata, setbcMenudata, forceRender, setforceRender}}> {children} </bcMenuContext.Provider>
  )
}

export default BcMenuProvider