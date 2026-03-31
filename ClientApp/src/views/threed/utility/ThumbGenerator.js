
//!thumb Img generator Default size is 50 * 50 

//ToDo: call Function is ThumbGenerator(file).then((e)=>{ e //e is a base64 String })
const unsupporFiles = ["tiff", "tif"]
const ThumbGenerator = async(file) => {
    return new Promise(function (resolve, reject) {
        if (unsupporFiles.includes(file.name.split('.')[1])) {
            resolve(["data:image/jpeg;base64,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", file.name, file])
           } else {
                const img = document.createElement("IMG")
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                const blob = URL.createObjectURL(file)
                //const reader = new FileReader()
                    //reader.onload = function(event) {
                    img.onload = function() {    
                    canvas.width = 50
                    canvas.height = 50
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                    resolve([canvas.toDataURL(), file.name, file])
                }
                img.src = blob
    //}
    //reader.readAsDataURL(blob)  
    }
    })       
}

export default ThumbGenerator