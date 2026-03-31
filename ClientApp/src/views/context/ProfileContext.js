import React from 'react'

export const ProfileContext = React.createContext()

const ProfileProvider = ({ children }) => {
    //! Set Default eg org , supp ,age ,cust
    const ProfileData = () => {
        if (localStorage.profile !== undefined && localStorage.profile !== 'undefined' && localStorage.profile !== null) {
            return JSON.parse(localStorage.profile)
        }
        return null
    }
    const [ctxprofile, setctxProfile] = React.useState(ProfileData())
    //const [isFinesh, setisFinesh] = React.useState(false)
    return (
        <ProfileContext.Provider value={{ ctxprofile, setctxProfile }}> {children} </ProfileContext.Provider>
    )
}

export default ProfileProvider