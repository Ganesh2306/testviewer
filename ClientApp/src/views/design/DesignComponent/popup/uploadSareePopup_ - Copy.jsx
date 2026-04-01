import React, { useState, useEffect, useRef } from "react"
import '../popup/Poppup.css'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Label,
  Col,
  Row,
  Input,
  Alert,
  FormGroup,
  ButtonGroup
} from "reactstrap"
import { AlertCircle } from "react-feather"
import { selection } from "../Utility/selection"
import axios from 'axios'
import Swal from 'sweetalert2'
import { UploadCard } from "./UploadCard"
import MyDropdown from "./MyDropdown"

export const UploadSareePopup = (props) => {
  const [uploadedSarees, setUploadedSarees] = useState([])
  const [gallery, setGallery] = useState([])
  const [uploadOpen, setUploadOpen] = useState(false)
  const [imagePopup, setImagePopup] = useState({ open: false, src: "", caption: "" })
  const [selectedValue, setSelectedValue] = useState("Saree") // Default is Saree
  const [thumbnailfile, setfile] = useState(null)

  const initialSarees = [
    {
      name: "Silk Banarasi",
      type: "Silk",
      thumbnail: "images/saree-thumbnail.jpg",
      body: "images/saree-body.jpg",
      blouse: "images/saree-blouse.jpg",
      pallu: "images/saree-pallu.jpg"
    }
  ]

  const [Thumbnailfile, setThumbnailfile] = useState()
  const productFields = {
    saree: ["body", "pallu", "blowse"],
    bedsheet: ["cover", "pillow", "blanket", "option1", "option2", "option3"]
  }

  const generateFormData = () => {
    const data = {}
    Object.values(productFields).flat().forEach((part) => {
      data[`${part}File`] = null
      data[`${part}Name`] = ""
    })
    return data
  }

  const [formData, setFormData] = useState(generateFormData())

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("uploadedSarees") || "[]")
    setUploadedSarees(saved)
    setGallery([...initialSarees, ...saved])
  }, [])

  const contentForSaree = ["body", "pallu", "blowse"]
  const contentForBedSheet = ["cover", "pillow", "blanket", "option1", "option2", "option3"]
  useEffect(() => {
    if (!formData) return

    const fields = {
      Saree: ["body", "pallu", "blowse"],
      BedSheet: ["cover", "pillow", "blanket", "option1", "option2", "option3"]
    }

    const newFormData = { ...formData }

    fields[selectedValue]?.forEach((prefix) => {
      const fileKey = `${prefix}File`
      const nameKey = `${prefix}Name`
      if (!(fileKey in newFormData)) newFormData[fileKey] = null
      if (!(nameKey in newFormData)) newFormData[nameKey] = ""
    })

    setFormData(newFormData)
  }, [selectedValue])

  // const handleInputChange = (e) => {
  //   const { name, value, files } = e.target
  //   const isFile = files && files.length > 0

  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: isFile ? files[0] : value
  //   }))
  // }
  const handleInputChange = (e) => {
    const { name, value, files, id } = e.target
    const isFile = files && files.length > 0
    if (isFile) {
      const originalFile = files[0]
      const prefix = id.split("File")[0]
      const extension = originalFile.name.split('.').pop()
      const newFileName = `${prefix}.${extension}`
      const renamedFile = new File([originalFile], newFileName, { type: originalFile.type })
      setFormData((prev) => ({
        ...prev,
        [name]: renamedFile,
        [`${prefix}Name`]: prefix
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }))
    }
    }


  // Save new saree to localStorage
  const saveSaree = (newSaree) => {
    const updated = [...uploadedSarees, newSaree]
    setUploadedSarees(updated)
    localStorage.setItem("uploadedSarees", JSON.stringify(updated))
    setGallery([...initialSarees, ...updated])
  }

  // On form submit
  const handleUploadSubmit = (e) => {
    e.preventDefault()
    props.combofilesRef.current = Object.entries(formData)
      .filter(([key, value]) => key.endsWith("File") && value instanceof File)
      .map(([key, value]) => {
        const prefix = key.replace("File", "")
        const name = formData[`${prefix}Name`] || ""
        return { file: value, name }
      })
    setThumbnailfile(null)
    setFormData(generateFormData())
    setSelectedValue("Saree")
    setUploadOpen(false)
    props.setshowSaree(false)
    props.handleAttachFIle(thumbnailfile)
  }

  // Close upload popup
  const closeUpload = () => {
    setUploadOpen(false)
    document.body.style.overflow = "auto"

    setFormData({
      name: "",
      type: "",
      thumbnailFile: null,
      bodyFile: null
    })
    setSelectedValue("Saree") // Reset dropdown to default on close
  }

  const ToggleButton = () => {
    const [isOn, setIsOn] = useState(false)

    const toggleSwitch = () => setIsOn(prev => !prev)

    return (
      <div>
        <label className="switch">
          <input type="checkbox" checked={isOn} onChange={toggleSwitch} />
          <span className="slider">
            <span className="on-text">Cm</span>
            <span className="off-text">In</span>
          </span>
        </label>
      </div>
    )
  }

  return (
    <>
      <Modal isOpen={props.showSaree} toggle={props.toggleSaree} className="modal-lg modal-dialog-centered"  >
        <ModalHeader toggle={props.toggleSaree} className='text-center justify-content-center'>Upload Saree</ModalHeader>
        <ModalBody>
          <div>
            <div className="popup sareePopup" id="uploadPopup" style={{ display: "flex" }} onClick={closeUpload}>
              <div
                className="popup-content upload-content"
                onClick={(e) => e.stopPropagation()}
                style={{ width: "100%" }}
              >

                {/* <h2>Upload Saree</h2> */}

                <div className="unit-selector" style={{ marginBottom: "10px" }}>
                  <label htmlFor="sizeUnit">
                    {/* Unit: <ToggleButton /> */}
                    <MyDropdown
                      selectedValue={selectedValue}
                      onChange={setSelectedValue}
                    />
                  </label>
                </div>

                <form id="uploadForm"
                onSubmit={handleUploadSubmit}
                >
                  {/* Body Upload with size inputs */}
                  <div
                    className="upload-area upload-area-solid single-upload-area"
                    style={{ width: "40%", margin: "0 auto" }}
                  >
                    <div className="upload-box">
                      <p>Thumbnail</p>
                      {Thumbnailfile && (
                        <img
                          src={URL.createObjectURL(Thumbnailfile)}
                          alt="Preview"
                          style={{ width: "100px", height: "100px", objectFit: "cover", marginBottom: "5px" }}
                        />
                      )}
                      <input
                        type="file"
                        id="bodyFile"
                        name="bodyFile"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0]
                          setfile(e)
                          if (file) {
                            setThumbnailfile(file)
                          }
                        }}
                        required
                      />
                    </div> 

                    <input
                      className="input-box"
                      type="text"
                      name="name"
                      placeholder="Name"
                      style={{ width: "90%", maxWidth: "200px", height: "30px" }}
                      defaultValue={thumbnailfile?.target?.files[0]?.name?.split('.')[0]}
                      disabled
                      //required
                    />
                  </div>

                  <div>
                    <h2>Upload Image:</h2>
                  </div>

                  <div
                    className="card-container"
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      gap: "5px"
                    }}
                  >
                    {selectedValue === "Saree" &&
                      contentForSaree.map((content, index) => (
                        <UploadCard
                          key={index}
                          index={index}
                          prefix={content}
                          formData={formData}
                          onInputChange={handleInputChange}
                        />
                      ))}

                    {selectedValue === "BedSheet" &&
                      contentForBedSheet.map((content, index) => (
                        <UploadCard
                          key={index}
                          index={index}
                          prefix={content}
                          formData={formData}
                          inputValue={content}
                          onInputChange={handleInputChange}
                        />
                      ))}
                  </div>

                  <button type="submit" className="submit-btn"
                    onClick={() => {
                     
                    }}>
                    Upload
                  </button>
                </form>
              </div>
            </div>

          </div>
        </ModalBody>
      </Modal>
    </>
  )
}