const getInitials = (name) => {
    let initials
    const nameSplit = name.split(" ")
    const nameLength = nameSplit.length
    if (nameLength > 1) {
        initials =
            nameSplit[0].substring(0, 1) +
            nameSplit[nameLength - 1].substring(0, 1)
    } else if (nameLength === 1) {
        initials = nameSplit[0].substring(0, 1)
    } else return

    return initials.toUpperCase()
}

export const createImageFromInitials = (size, name) => {
    if (name === null) return
    name = getInitials(name)

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = canvas.height = size

    context.fillStyle = "#D3D3D3" //background color of box
    context.fillRect(0, 0, size, size) //to draw reactangular background
   
    context.arc(100, 75, 50, 0, 2 * Math.PI)
   
    context.fillStyle = "#FF5733" //Name initial color
    context.textBaseline = 'middle'
    context.textAlign = 'center'
    context.font = `${size / 2}px Roboto`
    context.fillText(name, (size / 2), (size / 2))

    return canvas.toDataURL()
}