import React from 'react'

export const NaveBackBtn = React.createContext()

const NaveBackBtnProvider = ({ children }) => {
    //! Set Default eg org , supp ,age ,cust

  const [showBack, setshowBack] = React.useState(false)
  return (
    <NaveBackBtn.Provider value={{showBack, setshowBack}}> {children} </NaveBackBtn.Provider>
  )
}

export default NaveBackBtnProvider