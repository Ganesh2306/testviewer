import React from 'react'

export const rollContext = React.createContext()

const RollProvider = ({ children }) => {
    //! Set Default eg org , supp ,age ,cust

  const [roll, setroll] = React.useState('ORGANISATION')
  const [isFinesh, setisFinesh] = React.useState(false)
  return (
    <rollContext.Provider value={{roll, setroll, isFinesh, setisFinesh}}> {children} </rollContext.Provider>
  )
}

export default RollProvider