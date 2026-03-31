import React, { useState } from 'react'

export const stateContext = React.createContext()

const StateProvider = ({ children }) => {
    const [isOpen, setOpen] = useState(false)
    const [isValide, setIsValide] = React.useState(false)
    const [isEmpty, setisEmpty] = React.useState(false)
    const [isEdit, setEdit] = React.useState(false)
    //console.log(isEdit)
    return (
        <stateContext.Provider value={{isValide, setIsValide, isEmpty, setisEmpty, isEdit, setEdit, isOpen, setOpen }}> { children } </stateContext.Provider>
    )
}

export default StateProvider