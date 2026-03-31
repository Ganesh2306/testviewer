export let skipState = {
    storageCheck:true,  //! Temp Set 
    skipFt:true 
}

const reset = {
    storageCheck:true,  //! Temp Set 
    skipFt:true 
}

export const setResetSkipState = () => {
    skipState = reset
}

export const setSkipFt = (a) => {
    skipState.skipFt = a
}

export const setStroge = (a) => {
    skipState.storageCheck = a
} 

