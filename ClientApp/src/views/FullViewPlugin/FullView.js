import { useState, useRef, useEffect } from 'react'

import { useHistory } from 'react-router-dom'

// ** Store & Actions
// ** Custom Components
//import Sidebar from './designview/Sidebar'
import DesignView from '../FullDesignView/DesignView'
//import DesignsPage from './designview/DesignsPage'
//import DesignSearchbar from './designview/DesignSearchbar'
//import { NaveBackBtn } from '../../utility/context/NaveBackBtn'
//import { goTonext, goTopriv } from './Utility/utility'

import { goTonext, goTopriv } from '../design/Utility/utility'
// ** Styles
import '@styles/base/pages/app-ecommerce.scss'
//import { searchTemplate, track } from './Sidebar'
//import { searchTemplate, track } from '../design/designview/Sidebar'
//const activeimagedata = '{"designCode":"V1622-1858-9","designName":"V1622-1858-9","article":null,"design":null,"folderId":3706202182,"designId":957128780,"createdby":0,"features":{"Product":"suit","Credit":"18","Weave":"Twill","Look":"Normal","Season":"AW-23","Fabric Type":"Yarn-Dyed","Price":"1400","Rating":"4","Category":"Casual","Color":"Blue","Blend":"100%Wool","Pattern":"Stripes"},"prod":null,"created_On":"0001-01-01T00:00:00","imageUrl":"http://172.16.10.91/TDS_TEXTRONIC/3706202182/t/V1622-1858-9t.jpg","state":"cad","price":1400,"stock":0,"rating":4,"credit":0,"design_Desc":null,"designSize":"4.263,3.960","colorwayDesigns":[{"designCode":"V1622-1858-10","designName":"V1622-1858-10","article":null,"design":null,"folderId":3706202182,"designId":2581809792,"createdby":0,"features":{"Product":"suit","Look":"Normal","Blend":"100%Wool","Pattern":"Stripes","Credit":"18","Weave":"Twill","Rating":"4","Price":"1400","Category":"Casual","Season":"AW-23","Color":"Blue","Fabric Type":"Yarn-Dyed"},"prod":null,"created_On":"0001-01-01T00:00:00","imageUrl":"http://172.16.10.91/TDS_TEXTRONIC/3706202182/t/V1622-1858-10t.jpg","state":"cad","price":1400,"stock":0,"rating":4,"credit":0,"design_Desc":null,"designSize":"4.263,3.960","colorwayDesigns":null,"designInfo":{"0":"Blend","1":"Color","2":"Season","3":"Pattern","4":"Category","5":"Product","6":"Look","7":"Weave","8":"Stock"},"products":null,"boardId":null,"cartName":null,"supplierId":1533554537,"collectionId":null,"thumbPath":null,"customerId":0,"isCollectionExist":false,"isBoardExist":false,"isExclusive":false,"isNew":false,"isCollectionBoardExist":false,"localUrl":"http://172.16.10.91/TDS_TEXTRONIC/3706202182/t/V1622-1858-10t.jpg","totalStock":0,"q3dUrl":"http://localhost:8080/Bitbucket_Update/q3d_dotnetcore/"},{"designCode":"V1622-1858-11","designName":"V1622-1858-11","article":null,"design":null,"folderId":3706202182,"designId":2967844187,"createdby":0,"features":{"Product":"suit","Color":"Blue","Pattern":"Stripes","Look":"Normal","Weave":"Twill","Fabric Type":"Yarn-Dyed","Price":"1400","Category":"Casual","Credit":"18","Blend":"100%Wool","Rating":"4","Season":"AW-23"},"prod":null,"created_On":"0001-01-01T00:00:00","imageUrl":"http://172.16.10.91/TDS_TEXTRONIC/3706202182/t/V1622-1858-11t.jpg","state":"cad","price":1400,"stock":0,"rating":4,"credit":0,"design_Desc":null,"designSize":"4.263,3.960","colorwayDesigns":null,"designInfo":{"0":"Blend","1":"Color","2":"Season","3":"Pattern","4":"Category","5":"Product","6":"Look","7":"Weave","8":"Stock"},"products":null,"boardId":null,"cartName":null,"supplierId":1533554537,"collectionId":null,"thumbPath":null,"customerId":0,"isCollectionExist":false,"isBoardExist":false,"isExclusive":false,"isNew":false,"isCollectionBoardExist":false,"localUrl":"http://172.16.10.91/TDS_TEXTRONIC/3706202182/t/V1622-1858-11t.jpg","totalStock":0,"q3dUrl":"http://localhost:8080/Bitbucket_Update/q3d_dotnetcore/"}],"designInfo":{"0":"Blend","1":"Color","2":"Season","3":"Pattern","4":"Category","5":"Product","6":"Look","7":"Weave","8":"Stock"},"products":null,"boardId":2459925291,"cartName":null,"supplierId":null,"collectionId":null,"thumbPath":null,"customerId":0,"isCollectionExist":false,"isBoardExist":false,"isExclusive":false,"isNew":false,"isCollectionBoardExist":false,"localUrl":null,"totalStock":0,"q3dUrl":"http://localhost:8080/Bitbucket_Update/q3d_dotnetcore/"}'
//const imagedata = '{"totalCount":119,"designMaster":[{"designCode":"V1622-1858-11","designName":"V1622-1858-11","article":null,"design":null,"folderId":3706202182,"designId":2967844187,"createdby":0,"features":{"Product":"suit","Color":"Blue","Pattern":"Stripes","Look":"Normal","Weave":"Twill","Fabric Type":"Yarn-Dyed","Price":"1400","Category":"Casual","Credit":"18","Blend":"100%Wool","Rating":"4","Season":"AW-23"},"prod":null,"created_On":"0001-01-01T00:00:00","imageUrl":"http://172.16.10.91/TDS_TEXTRONIC/1009644251/a/00-sd%20(10)a.jpg","state":"cad","price":1400,"stock":0,"rating":4,"credit":0,"design_Desc":null,"designSize":"4.263,3.960","colorwayDesigns":[],"designInfo":{"0":"Blend","1":"Color","2":"Season","3":"Pattern","4":"Category","5":"Product","6":"Look","7":"Weave","8":"Stock"},"products":null,"boardId":2459925291,"cartName":null,"supplierId":null,"collectionId":null,"thumbPath":null,"customerId":0,"isCollectionExist":false,"isBoardExist":false,"isExclusive":false,"isNew":false,"isCollectionBoardExist":false,"localUrl":null,"totalStock":0,"q3dUrl":"http://localhost:8080/Bitbucket_Update/q3d_dotnetcore/"},{"designCode":"V1622-1858-10","designName":"V1622-1858-10","article":null,"design":null,"folderId":3706202182,"designId":2581809792,"createdby":0,"features":{"Product":"suit","Look":"Normal","Blend":"100%Wool","Pattern":"Stripes","Credit":"18","Weave":"Twill","Rating":"4","Price":"1400","Category":"Casual","Season":"AW-23","Color":"Blue","Fabric Type":"Yarn-Dyed"},"prod":null,"created_On":"0001-01-01T00:00:00","imageUrl":"http://172.16.10.91/TDS_TEXTRONIC/1009644251/a/00-sd%20(10)a.jpg","state":"cad","price":1400,"stock":0,"rating":4,"credit":0,"design_Desc":null,"designSize":"4.263,3.960","colorwayDesigns":[],"designInfo":{"0":"Blend","1":"Color","2":"Season","3":"Pattern","4":"Category","5":"Product","6":"Look","7":"Weave","8":"Stock"},"products":null,"boardId":3398965340,"cartName":null,"supplierId":null,"collectionId":null,"thumbPath":null,"customerId":0,"isCollectionExist":false,"isBoardExist":false,"isExclusive":false,"isNew":false,"isCollectionBoardExist":false,"localUrl":null,"totalStock":0,"q3dUrl":"http://localhost:8080/Bitbucket_Update/q3d_dotnetcore/"}],"imageUrl":"http://172.16.10.91/TDS_TEXTRONIC","localUrl":"http://172.16.10.91/TDS_TEXTRONIC"}'

//let nextDesignSearchObj
//let totalCount
let prevState = false //tanmay purpose : click on previous button in fullview  06-01-202

export const NaveRef = {
    mainv: null,
    fullv: null
}
const PluginObject = {
    PluginModel: false
}

//! Sn -changes
export const getPluginObject = () => {
    if (PluginObject.PluginModel) {
    }

    return PluginObject.PluginModel
}

export const rmview3d = () => {
    PluginObject.PluginModel = false
}

export const rmovePluginObject = () => {
    if (PluginObject.PluginModel) {
        // PluginObject.PluginModel.getTdsPlugin().stopAnimation(true)
    }

}

export const View3dPlugin = (data, nextDesignSearchObj, searchFun, totalCount) => {

    // Filter-fullview-viewPage
    PluginObject.PluginModel = $('#mainZoomdiv').view3DModel({
        data,
        onView3DModelPluginLoad: () => {

            // console.log('View3DModelPluginLoad loaded')
        },
        onAddToCart: (status) => {
            // console.log(status)
        },
        onAddToFav: (status) => {
            // console.log(status)
        },
        onPreviousBtnClick: () => {
            prevState = true
            const first = document.querySelectorAll('#AllBottomDesign .BottomDesignThumEmpty').length
            let csrno = document.querySelectorAll('#AllBottomDesign .BottomDesignThumEmpty.active-Bottom-image-for-fullview')[0]
            csrno = parseInt(csrno.getAttribute('id').replace('BottomDesignThum', ''))
            if (csrno === (first % 5)) {
                totalCount = 1000
                if (nextDesignSearchObj.start <= totalCount && nextDesignSearchObj.start !== 0) {
                    nextDesignSearchObj.start -= 25
                    nextDesignSearchObj.end -= 25
                    nextDesignSearchObj.Difference = 25
                    searchFun(nextDesignSearchObj, csrno, prevState)
                }

            }
            try {
                goTopriv()
            } catch (error) {

            }

        },
        onNextBtnClick: () => {
            //totalCount = 46545
            const last = document.querySelectorAll('#AllBottomDesign .BottomDesignThumEmpty').length - 1
            const csrnoElement = document.querySelectorAll('#AllBottomDesign .BottomDesignThumEmpty.active-Bottom-image-for-fullview')[0]
            if (!csrnoElement) {
                // Handle the case when csrnoElement is undefined
                console.error("No matching element found for csrno")
                return
            }
            const csrno = parseInt(csrnoElement.getAttribute('id').replace('BottomDesignThum', ''))
            if (csrno === last) {
                totalCount = 1000
                if (nextDesignSearchObj.end <= totalCount) {
                    nextDesignSearchObj.start += 25
                    nextDesignSearchObj.end += 25
                    searchFun(nextDesignSearchObj, csrno)
                }
            }
            try {
                //data.onNextBtnClick()
                goTonext()
                /*data.SetBoard(true)*/
            } catch (error) {
                console.error("Error:", error)
            }
            // console.log('Next Button Clicked')
        },
        onColorwayImgChange: (cbData) => {
            // console.log(cbData)
        }
    })
    return PluginObject.PluginModel
}

export const FullView = (props) => {
    // console.log(props, 'lop')
    const [poc, setPoc] = useState(false)

    const hideMainDiv = useRef(null)
    const fullViewDiv = useRef(null)
    const history = useHistory()
    const [selectedImgDataForDetail, setSelectedImgDataForDetail] = useState(null)
    const setActiveImageData = (data) => {
        setSelectedImgDataForDetail(data)
    }

    const [imgData, setImgdata] = useState(props.imgDataForDetail)
    const selectionDataRef = useRef({})
    window.seeobjme = selectionDataRef

    const selectedElementRef = useRef({})
    window.seeobjmes = selectedElementRef
    const mergedToObj = (prev, newobj, prevState) => {
        prev = Array.isArray(prev) ? true : prev
        if (prev === true) {
            return newobj
        } else if (prevState === true) { // tanmay purpose : click on previous button in fullview  06-01-2023
            newobj.designMaster = [...newobj.designMaster, ...prev.designMaster]
            return newobj
        } else {
            //const newdata = prev //ud
            newobj.designMaster = [...prev.designMaster, ...newobj.designMaster]
            return newobj
        }
    }
    useEffect(async () => {
    }, [])
    const setBoardSelected = (data) => { setPoc(e => !e) }
    return (
        <DesignView toggalDesignView={""}
            PluginModel={getPluginObject}
            View3dPlugin={View3dPlugin}
            imgDataForDetail={props.imgDataForDetail} setActiveImageData={setActiveImageData}
            selectedImgDataForDetail={window.colorways} ishide={true}
            boardData={1234}
            rmovePluginObject={rmovePluginObject}
            rmview3d={rmview3d}//shubham added purpose: remove plugin object after close
            setBoardSelected={setBoardSelected}
            SearchObj={props.SearchObj}
            searchDesignByPagination={props.searchDesignByPagination}
            NaveRef={props.NaveRef}
            positionFilter={props.positionFilter}
            poc={props.poc}
            setPoc={props.setPoc}
            setSearchobj={props.setSearchobj}
            backbuttonRef={props.backbuttonRef}
             AIsearchref={props.AIsearchref}
            handleClosePopup={props.handleClosePopup}
              fileImageRef={props.fileImageRef}
               setFileImage={props.setFileImage}
        />
    )
}

export default FullView