import { Upload } from "react-feather"
import axios from "axios"
import {
    Modal,
    ModalHeader,
    ModalBody
} from "reactstrap"


export const ImageSearch = (props) => {

    const handleFileChange = (event) => {
        const containerPS = document.getElementsByClassName("thumbnailsHeight")[0]
         localStorage.removeItem('hsv1')
         localStorage.removeItem('hsv2')
        localStorage.removeItem('pattern')
        const uploadfile = event.target.files[0]
        if (uploadfile) {
            const reader = new FileReader()
            reader.onload = (e) => {
                props.fileImageRef.current = e.target.result
                props.setFileImage(e.target.result)
                props.aiDesignNameRef.current = uploadfile.name.replace(/\.jpg$/, '')
                props.reRender[0](!props.reRender[1])
                props.setshowImgpop(false) // Close modal here
                props.setBtnShow(true)
            }
            reader.readAsDataURL(uploadfile)

        }
        if (props.positionFilter.current) {
            props.positionFilter.current.id = 'searchPage'
            const currentHeight = containerPS.clientHeight

            // Subtract 50px from the current height, ensuring it doesn't go below 0
            const newHeight = Math.max(currentHeight - 50, 0)

            // Set the new height back to the container element
            containerPS.style.height = `${newHeight}px`

        }
        props.AIsearchref.current = true
        // props.setshowImgpop(false)
        // props.setBtnShow(true)
    }
    const handleDragOver = (event) => {
        event.preventDefault()
    }
    return (
        <>
            <Modal isOpen={props.showImgpop} toggle={() => props.setshowImgpop(false)} className="modal-md mt-4">
                <ModalHeader toggle={() => props.setshowImgpop(false)} className="imgsearch">
                    <p className="d-flex justify-content-center pt-1 w-100"> AI Search By Image</p>
                </ModalHeader>
                <ModalBody>
                    <div className="imageDrop" onDragOver={handleDragOver} onDrop={handleFileChange}>
                        {props.viewuploadImg ? <div className="imgBox" style={{ backgroundImage: `url(${props.fileImageRef.current})` }}>
                        </div> : <><svg width="108" height="95" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="MXOuRWzYzu12oSePqo1o"><g clip-path="url(#clip0_994_14916)"><path d="M7.82 77.37H0v-7.83h4.69v3.13h3.13v4.7zM4.69 59.65H0v-9.88h4.69v9.88zm0-19.77H0V30h4.69v9.88zM4.69 20.11H0v-7.82h7.82v4.69H4.69v3.13zM47.37 16.98h-9.89v-4.69h9.89v4.69zm-19.78 0h-9.88v-4.69h9.93l-.05 4.69z" fill="#666"></path><path d="M80.21 31.62H19.83V92h60.38V31.62z" fill="#A6A6A6"></path><path d="M80.22 75.28L61.4 56.45 42.29 75.56l-8.99-8.99-13.46 12.8V92h60.38V75.28zM40.83 55.23a6.26 6.26 0 100-12.52 6.26 6.26 0 000 12.52z" fill="#fff"></path><path d="M40.83 57.57a8.61 8.61 0 01-8.6-8.6 8.61 8.61 0 018.6-8.6 8.61 8.61 0 018.6 8.6 8.61 8.61 0 01-8.6 8.6zm0-12.51a3.91 3.91 0 100 7.82 3.91 3.91 0 000-7.82z" fill="#666"></path><path d="M80.22 52.84c13.945 0 25.25-11.305 25.25-25.25S94.165 2.34 80.22 2.34 54.97 13.645 54.97 27.59s11.305 25.25 25.25 25.25z" fill="#fff"></path><path d="M107.81 27.59A27.632 27.632 0 0080.22 0a27.63 27.63 0 00-27.6 27.59c0 .57 0 1.12.09 1.68H17.49v65.07h65.07V55.07a27.63 27.63 0 0025.25-27.48zM77.87 89.65H22.18v-9.27l11.08-10.53 9 9 19.1-19.11 16.48 16.48.03 13.43zM61.39 53.13l-19.1 19.11-9-9-11.16 10.61V33.91h31.22a27.63 27.63 0 0024.47 21.11v14.54L61.39 53.13zm18.83-2.64a22.92 22.92 0 01-22.9-22.9 22.93 22.93 0 0122.9-22.9 22.93 22.93 0 0122.89 22.9 22.922 22.922 0 01-22.89 22.86v.04z" fill="#666"></path><path d="M94.1 25.47L80.57 11.94 67.1 25.41l3.32 3.32 7.86-7.86V40h4.7V20.99l7.8 7.8 3.32-3.32z" fill="#666"></path></g><defs><clipPath id="clip0_994_14916"><path fill="#fff" d="M0 0h107.81v94.34H0z"></path></clipPath></defs></svg>
                            <p className="py-1">Drag and drop your file anywhere here</p>
                            <div className="uploadbt2 bg-primary d-flex">  <Upload /><div className="btinner">Upload Image</div> <input type="file" accept="image/*" onChange={handleFileChange} className="btn btn-sm w-auto btn-secondary btn-outline" />                       </div>

                        </>

                        }
                    </div>

                    <p className="d-flex justify-content-center pt-1">Accepted file formats: JPG, PNG </p>
                </ModalBody>
            </Modal>
        </>
    )
}
