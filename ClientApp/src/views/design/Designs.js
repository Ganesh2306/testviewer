
import { Fragment, useState, useRef, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar, { searchTemplate, reSetSearchTemplate } from './designview/Sidebar'
import DesignView from '../FullDesignView/DesignView'
import DesignsPage from './designview/DesignsPage'
import DesignSearchbar from './designview/DesignSearchbar'
import { accessContext } from '../context/accessContext'
import IdleTimeOutHandler from "../SessionComponent/IdleTimeOutHandler"
import ColorPalette from '../ColorPalette/ColorPalette'
import axios from 'axios'
// ** Styles
import '@styles/base/pages/app-ecommerce.scss'
import { FullView, getPluginObject, rmovePluginObject, View3dPlugin, rmview3d } from "../FullViewPlugin/FullView"
import { Edit2, Upload, X } from 'react-feather'
//import Cropper from 'react-cropper'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
export const NaveRef = {
    mainv: null,
    fullv: null
}
const PluginObject = {
    PluginModel: false
}


export const setPluginObject = (a = false) => {
    if (a) {
        PluginObject.PluginModel = false
    }
}

const showSideSearchbar = ({ id, data }) => {
    const d = data && id ? data[id] : false
    return {
        show: d && true,
        msg: d
    }
}
let reRender
const SecondPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [ImgColumn, setImgColumn] = useState(null)
    const [Searchobj, setSearchobj] = useState('')
    const [imgDataForDetail, setImgDataForDetail] = useState(null)
    const [colodata, setColordata] = useState('')
    const [selectedImgDataForDetail, setSelectedImgDataForDetail] = useState(null)
    const { board, access } = useContext(accessContext)
    const { boardId } = useParams()
    const val = showSideSearchbar({ id: boardId && parseInt(boardId), data: board })

    const [isActive, setIsActive] = useState(true)
    const [isLogout, setLogout] = useState(false)

    const setActiveImageData = (data) => {
        setSelectedImgDataForDetail(data)
    }
    const [ImgdataFullView, setImgdataFullView] = useState([])
    const setImgDetails = (data) => {
        setImgDataForDetail(data)
        setImgdataFullView(data)
    }
    const [btnshow, setBtnShow] = useState(null)
    const [poc, setPoc] = useState(false)
     const [isColorChecked, setIsColorChecked] = useState(true)
    const  [isPatternChecked, setIsPatternChecked] = useState(false)
    const [selectedPage, setSelectedPage] = useState(0)
    const [Is_AISearch, setIs_AISearch] = useState(false)
    const fileImageRef = useRef(null)
    const aiDesignNameRef = useRef(null)
    const rowsPerPage = useRef()
    const LogicalOperator = useRef()
    const OrderBy = useRef()
    const ThumSize = useRef()
    const showfloat = useRef()
    const hideMainDiv = useRef(null)
    const fullViewDiv = useRef(null)
    const getFeatureListD = useRef(null)
    const selectRef = useRef(null)
    const backbuttonRef = useRef(false)
    const positionFilter = useRef(null)
    const searchClickRef = useRef(false)
    const AIsearchref = useRef(false)
    const hideFilterView = () => {
        hideMainDiv.current.style.display = 'none'
    }

    const showFilterView = () => {
        fullViewDiv.current.style.display = 'block'
    }
    useEffect(() => {
        NaveRef.mainv = hideMainDiv
        NaveRef.fullv = fullViewDiv
        return () => {
            rmview3d()
            reSetSearchTemplate()
        }
    }, [])

    const setBoardSelected = (data) => { setPoc(e => !e) }
    const mergedToObj = (prev, newobj, prevState) => {
        prev = Array.isArray(prev) ? true : prev
        if (prev === true) {
            return newobj
        } else if (prevState === true) {
            newobj.designMaster = [...newobj.designMaster, ...prev.designMaster]
            return newobj
        } else {
            newobj.designMaster = [...prev.designMaster, ...newobj.designMaster]
            return newobj
        }
    }

    const setImgdata1 = (data, prevState) => {
        setImgdataFullView(e => {
            return mergedToObj(e, data, prevState)
        })
    }
    const searchDesignByPagination = async (searchObj, designNo, isPrev) => {
        try {
            const config = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(searchObj)
            }
            const finalAppendFabrics = (pareseData, type = `t`) => {
                const path = pareseData.imageUrl
                return searchObj.designstate === "sample" ? {
                    totalCount: pareseData.totalCount,
                    designMaster: pareseData.designMaster.map((e) => {
                        return {
                            ...e,
                            imageUrl: `${path}/${e.folderId}/${type}/${e.designName}${type}.jpg`,
                            colorwayDesigns: e.colorwayDesigns.map((f) => {
                                return { ...f, imageUrl: `${path}/${e.folderId}/${type}/${f.designName}${type}.jpg` }
                            })
                        }
                    }),
                    localUrl: pareseData.localUrl,
                    imageUrl: pareseData.imageUrl
                } : {
                    totalCount: pareseData.totalCount,
                    designMaster: pareseData.designMaster.map((e) => {
                        return {
                            ...e,
                            imageUrl: `${path}/${e.folderId}/${type}/${e.designName}${type}.jpg`
                        }
                    }),
                    localUrl: pareseData.localUrl,
                    imageUrl: pareseData.imageUrl
                }
            }
            let url = `/DesignSearch/DesignThumbForSeasonal`
            if (searchObj && searchObj.designstate === "sample") {
                url = `/DesignSearch/GetDesignSearchByfolderId`
            }

            const response = await fetch(url, config)
            if (response.ok) {
                const res = await response.json()
                const pareseData = JSON.parse(res)
                const updatepares = finalAppendFabrics(pareseData)
                setImgdata1(updatepares, isPrev)
                if (designNo) {
                    setTimeout(() => {
                        const element = document.getElementById(`BottomDesignThum${designNo + 1}`)
                        element.classList.add("active-Bottom-image-for-fullview")
                    }, 2000)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    const [cropper, setCropper] = useState(null)
    const [croppedImageUrl, setCroppedImageUrl] = useState(null)
    const [fileImage, setFileImage] = useState(null)
    const fileInputRef = useRef(null)
    reRender = [setPoc, poc, setSearchobj]

        const blobToBase64 = (blobUrl) => {
  return new Promise((resolve, reject) => {
    fetch(blobUrl)
      .then(res => res.blob())
      .then(blob => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result) // base64 result
        reader.onerror = reject
        reader.readAsDataURL(blob)
      })
      .catch(reject)
  })
}
       const sendImage = async () => {
  try {
    let imageToSend = fileImageRef.current

    // If it's a blob URL, convert to base64 first
    if (fileImage.startsWith("blob:")) {
      imageToSend = await blobToBase64(fileImage)
    }

    const response = await axios.post("https://ais.dam3d.in/store_fabric_details", {
      base64_images: [fileImageRef.current]
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    })

    const ApiData = response.data
    setColordata(ApiData)
    // console.log("Response:", response.data)
  } catch (error) {
    console.error("Error:", error)
  }
}
const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    setFileImage(null)
    setTimeout(() => {
      const fileUrl = URL.createObjectURL(file)
      setFileImage(fileUrl)

      // Clear old data
      localStorage.removeItem('hsv1')
      localStorage.removeItem('hsv2')
      localStorage.removeItem('pattern')

      const reader = new FileReader()
      reader.onload = async (e) => {
        fileImageRef.current = e.target.result
        aiDesignNameRef.current = file.name.replace(/\.jpg$/, '')
        reRender[0](!reRender[1])

        // Call API here after base64 is ready
        if (AIsearchref?.current === true) {
          await sendImage()
        }
      }
      reader.readAsDataURL(file)
    }, 2)
    event.target.value = ''
  }
}

        const getCroppedImg = () => {
        if (cropper) {
            const croppedCanvas = cropper.getCroppedCanvas()
            croppedCanvas?.toBlob((blob) => {
                if (blob) {
                    const fileUrl = URL.createObjectURL(blob)

                } else {
                    console.error('Blob is null')
                }
                localStorage.removeItem('hsv1')
                localStorage.removeItem('hsv2')
                localStorage.removeItem('pattern')
                const reader = new FileReader()
                reader.onload = async (e) => {
                    fileImageRef.current = e.target.result
                    aiDesignNameRef.current = 'cropped_image'
                    // reRender[0](!reRender[1])
                    document.getElementById('clearall').click()
                      await sendImage()
                }
                reader.readAsDataURL(blob)
            }, 'image/jpeg')
        }
    }
    const handleUploadClick = () => {
        fileInputRef.current.click()
        //document.getElementById('reset-button').click()
    }
    const handleCropAreaClick = (event) => {
        getCroppedImg()
    }

useEffect(() => {
  if (fileImage && AIsearchref?.current === true && !fileImage.startsWith("blob:")) {
      sendImage()
     }
}, [fileImage])
    const loadScript = (src) => {
        return new Promise((resolve, reject) => {
            const existingScript = document.querySelector(`script[src="${src}"]`)
            if (existingScript) {
                resolve()
                return
            }
            const script = document.createElement('script')
            script.src = src
            script.async = true
            script.onload = () => resolve()
            script.onerror = () => reject(new Error(`Script load error for ${src}`))
            document.head.appendChild(script)
        })
    }

    useEffect(() => { 
        const loadScripts = async () => {
            try {
                // Load the primary script
                // await loadScript("https://plugin.dam3d.in/q3d/v1/Tds.min.js?v3.4")
                 //await loadScript("https://plugin.dam3d.in/q3d/v1/Tds.min.js?v4.4")
                await loadScript("https://plugin.dam3d.in/q3d/v2/Tds.min.js?v6.1")
                console.log('Primary script loaded successfully')
                // Optionally load more scripts here, e.g., additional plugins or utilities
                await loadScript("https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.0/FileSaver.min.js")
                console.log('Another script loaded successfully')
                // Optionally load more scripts here, e.g., additional plugins or utilities
                await loadScript("https://plugin.dam3d.in/archive/v1/view3DModel.tds.js?v=1.145207152025")
                console.log('Another script loaded successfully')
                // Optionally load more scripts here, e.g., additional plugins or utilities
                await loadScript("https://s3.ap-south-1.amazonaws.com/aws.tds/dam/archive/clientapp/build/js/JsBarcodeNew.all.min.js")
                console.log('Another script loaded successfully')
                // Optionally load more scripts here, e.g., additional plugins or utilities
                await loadScript("https://s3.ap-south-1.amazonaws.com/aws.tds/dam/archive/clientapp/build/js/qrious.js")
                console.log('Another script loaded successfully')

                // Add more scripts as necessary
            } catch (error) {
                console.error("Error loading scripts:", error)
            }
        }

        loadScripts()
    }, [])
    const dropdownNumRef = useRef(null)
    // const handleColorButtonClick = () => {
    //     setShowColorPalette(!showColorPalette)
    // }
    const handleClosePopup = () => {
        const containerPS = document.getElementsByClassName("thumbnailsHeight")[0]
        if (positionFilter.current) {
            setFileImage(null)
            positionFilter.current.id = 'noLeftImg'
            reRender[0](!reRender[1])
            fileImageRef.current = null
            aiDesignNameRef.current = null
            AIsearchref.current = false
            searchTemplate.filterSearchRequestDto.features = {}
            searchTemplate.filterSearchRequestDto.isAnd = true
            searchTemplate.filterSearchRequestDto.folderId = 0
            // searchTemplate.designName = null
            searchTemplate.isSmart = false
            searchTemplate.isText = false
            searchTemplate.start = 0
            searchTemplate.end = 25
            searchTemplate.Difference = 25
            searchTemplate.iscolor = true
            searchTemplate.ispattern = false
            const currentHeight = containerPS.clientHeight
            const newHeight = Math.max(currentHeight + 50, 0)
            containerPS.style.height = `${newHeight}px`
           setIsColorChecked(true)
          setIsPatternChecked(false)

        }
    }

    return (
        <Fragment>
            <div ref={positionFilter} id="noLeftImg" className='division'>
                <div className="img_searchHeader">
                    <h5>Search by Image</h5>
                    <div className="popup_close" onClick={handleClosePopup}>
                        <X />
                    </div>


                </div>
                {btnshow && (
                    <div className="imageArea">
                        <div className='imageCropArea' >
                            <div onClick={handleCropAreaClick}>
                            <Cropper
                                className="cropper"
                                zoomTo={0.10}
                                initialAspectRatio={1}
                                src={fileImage} // Use the image source here
                                viewMode={2}
                                minCropBoxHeight={10}
                                minCropBoxWidth={10}
                                background={true}
                                responsive={true}
                                autoCropArea={0.8}
                                checkOrientation={false}
                                style={{ width: '250px', height: '250px' }}
                                onInitialized={(instance) => {
                                    setCropper(instance)
                                }}
                                guides={true}
                                onClick={handleCropAreaClick}
                            />
                            </div>
                          <div className='upload_Img mt-50'>
                            <button className="btn btn-sm w-auto innerUploadbt btn-primary" onClick={handleUploadClick}> <Upload width={16} height= {16} /><span> Search by Image</span></button>
                            <input
                                type="file"
                                accept="image/*"
                                className="btn btn-sm w-auto btn-secondary btn-outline"
                                style={{ display: 'none' }} // Hide the file input
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />

                            {/* <div id='Colr_Pallate' >
                                <button className='Color_btn'><span> <Edit2 width={16} height= {16}/> Color </span></button>
                                {/* {showColorPalette && <ColorPalette />} */}
                            {/* </div> */} 
                        </div>
                        </div>
                          {isColorChecked && <ColorPalette colodata={colodata} fileInputRef={fileInputRef}/>}
                        <div class="btn-holder">
                        
                        {croppedImageUrl && (
                            <div style={{ marginTop: '20px' }}>
                                <img alt="Cropped" src={croppedImageUrl} style={{ display: "none" }} />
                            </div>
                        )}
                       
                        </div>
                    </div>

                )}
                <div ref={showfloat} id='off_floatfilter' className={boardId ? `board_collection_box addon_options` : `addon_options`}>
                    <div ref={hideMainDiv} id='Filter-main-viewPage' >
                        <div id='searchPageInner'>
                            {<DesignSearchbar LogicalOperator={LogicalOperator} showfloat={showfloat}
                                poc={poc} setPoc={setPoc} setSearchobj={setSearchobj} Searchobj={Searchobj}
                                rowsPerPage={rowsPerPage} OrderBy={OrderBy} Is_AISearch={Is_AISearch} setIs_AISearch={setIs_AISearch}
                                fileImageRef={fileImageRef} aiDesignNameRef={aiDesignNameRef} setSelectedPage={setSelectedPage} positionFilter={positionFilter}
                                btnshow={btnshow} setBtnShow={setBtnShow} getFeatureListD={getFeatureListD} searchClickRef={searchClickRef} setFileImage={setFileImage} AIsearchref={AIsearchref}
                            />}

                            {!val.show && !boardId && <Sidebar sidebarOpen={sidebarOpen} showfloat={showfloat}
                                OrderBy={OrderBy}
                                poc={poc} setPoc={setPoc}
                                selectRef={selectRef}
                                rowsPerPage={rowsPerPage}
                                LogicalOperator={LogicalOperator}
                                setSearchobj={setSearchobj} Searchobj={Searchobj} AIsearchref={AIsearchref}
                                Is_AISearch={Is_AISearch} setIs_AISearch={setIs_AISearch} getFeatureListD={getFeatureListD} dropdownNumRef={dropdownNumRef} />}
                            <DesignsPage
                                positionFilter={positionFilter}
                                setBoardSelected={setBoardSelected}
                                hideFilterView={hideFilterView}
                                setSidebarOpen={setSidebarOpen}
                                ImgColumn={ImgColumn}
                                sidebarOpen={sidebarOpen}
                                setSearchobj={setSearchobj}
                                Searchobj={Searchobj}
                                poc={poc} setPoc={setPoc}
                                rowsPerPage={rowsPerPage}
                                PluginModel={getPluginObject}
                                View3dPlugin={View3dPlugin}
                                LogicalOperator={LogicalOperator}
                                OrderBy={OrderBy}
                                setImgDetails={setImgDetails}
                                setActiveImageData={setActiveImageData}
                                ThumSize={ThumSize}
                                showfloat={showfloat}
                                showFilterView={showFilterView}
                                fullViewDiv={fullViewDiv}
                                boardData={val}
                                board={board}
                                imgDataForDetail={imgDataForDetail}
                                searchDesignByPagination={searchDesignByPagination}
                                fileImageRef={fileImageRef}
                                fileImage={fileImage}
                                croppedImageUrl={croppedImageUrl}
                                aiDesignNameRef={aiDesignNameRef}
                                setSelectedPage={setSelectedPage}
                                selectedPage={selectedPage}
                                backbuttonRef={backbuttonRef}
                                searchClickRef={searchClickRef}
                                dropdownNumRef={dropdownNumRef}
                                isColorChecked= {isColorChecked}
                                setIsColorChecked ={setIsColorChecked}
                                isPatternChecked={isPatternChecked}
                                setIsPatternChecked={setIsPatternChecked}
                            />
                        </div>
                    </div>
                    <div ref={fullViewDiv} id='Filter-fullview-viewPage' className='scrollbar-hidden' style={{ display: "none" }}
                    >
                        {true ? <FullView setImgdataFullView={setImgdataFullView} imgDataForDetail={ImgdataFullView} SearchObj={Searchobj} designTotalCount={100} rmovePluginObject={rmovePluginObject} NaveRef={NaveRef} searchDesignByPagination={searchDesignByPagination} poc={poc} setPoc={setPoc} backbuttonRef={backbuttonRef} AIsearchref={AIsearchref}
                            handleClosePopup={handleClosePopup} setFileImage={setFileImage} fileImageRef={fileImageRef} positionFilter={positionFilter} /> : <DesignView toggalDesignView={""}
                                PluginModel={getPluginObject}
                                View3dPlugin={View3dPlugin}
                                rmovePluginObject={rmovePluginObject}
                                imgDataForDetail={imgDataForDetail} setActiveImageData={setActiveImageData}
                                ishide={true}
                                boardData={val}
                                setBoardSelected={setBoardSelected}
                                reRender={reRender}
                                fileImage={fileImage}
                                croppedImageUrl={croppedImageUrl}
                                aiDesignNameRef={aiDesignNameRef}
                                Searchobj={Searchobj}
                                poc={poc} setPoc={setPoc}
                                setSearchobj={setSearchobj}
                                backbuttonRef={backbuttonRef}

                        />}
                    </div>
                    <IdleTimeOutHandler
                        onActive={() => { setIsActive(true) }}
                        onIdle={() => { setIsActive(false) }}
                        onLogout={() => { setLogout(true) }}
                    />
                </div>
            </div>
        </Fragment>
    )
}
export default SecondPage

