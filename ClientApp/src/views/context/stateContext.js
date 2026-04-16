import React from 'react'

export const stateContext = React.createContext()

const StateProvider = ({ children }) => {
  const [isValide, setIsValide] = React.useState(false)
  const [isEmpty, setisEmpty] = React.useState(false)
  return (
    <stateContext.Provider value={{ isValide, setIsValide, isEmpty, setisEmpty }}> {children} </stateContext.Provider>
  )
}

export default StateProvider