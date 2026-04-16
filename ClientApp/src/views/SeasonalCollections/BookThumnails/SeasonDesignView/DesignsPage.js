// ** React Imports
import { Fragment, useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import DesignCard from './DesignCard'
import { accessContext } from '../../../context/accessContext'
import axios from 'axios'
//bcMenuContext 
import { bcMenuContext } from '../../../context/bcMenuContext'
import ArchivePagination from '../../../pagecomponents/ArchivePagination'
export const searchBoard = {
    folderId: "0",
    designName: "",
    isText: false,
    isUserAdmin: false,
    createdBy: "",
    IsBoard: true,
    BoardName: '',
    filterSearchRequestDto: {
        folderId: 0,
        features: {}, //!  ,..,..,
        isAnd: true
    },
    isRating: false,
    isName: true,
    start: 0,
    end: 25,
    DesignTypeIdGroupId: null,
    iswearhouse: false,
    designstate: '',
    designstate: `sample`,
    range: {}, //! +
    Difference: 25,
    isSmart: false
}
const DesignSearchObj = { 
    start: 0,
    end: 25,
    isNameWise: true,
    designName: undefined
 }
 
 export const OnpageClick = (start) => {
    DesignSearchObj.start = start
    //DesignSearchObj.end = start + end
   //searchTemplate.Difference = end
}

export const perpage = (a) => {
    DesignSearchObj.start = 0
    DesignSearchObj.end = a
    //searchTemplate.Difference = a
}
let reRenderStatus
export const textSearch = (text) => {
    text = text.toString()
    if (text.trim() !== "") {
        DesignSearchObj.designName = text
        reRenderStatus[0](DesignSearchObj)
        reRenderStatus[0](!reRenderStatus[1])
    } else {
        DesignSearchObj.designName = ''
        reRenderStatus[0](!reRenderStatus[1])
    }
}
export const updateOrderBy = ({isRating, isName, isLatest}) => {
    DesignSearchObj.isRating = isRating
    DesignSearchObj.isNameWise = isName
    DesignSearchObj.isLatest = isLatest
  }

const DesignsPage = props => {
    reRenderStatus = [props.setPoc, props.poc]
    const [imgData, setImgdata] = useState([])
    const [designCount, setDesignCount] = useState('')
    const [QRurl, setQRurl] = useState('')
    const [selectedPage, setSelectedPage] = useState(0)

    const { boardId } = useParams()
    //const [poc, setPoc] = useState(false)
    const { is_boarduser, board } = useContext(accessContext)
    const { bcMenudata } = useContext(bcMenuContext)
    //const setBoardSelected = (data) => { setPoc(e => !e) }
    // DesignSearchObj.designName = null
    DesignSearchObj.CollectionName = history.state.state.colName
    DesignSearchObj.CollectionId = props.AllCataDesign ? 0 : props.catID
    DesignSearchObj.BoardId = Number(sessionStorage.privselected) ? sessionStorage.privselected : 0
    const BID = Number(sessionStorage.privselected) ? sessionStorage.privselected : 0
    
    function resetTextSearch() {
        DesignSearchObj.designName = ''
        DesignSearchObj.start = 0
        DesignSearchObj.end = 25

    }
    useEffect(() => {
        return () => resetTextSearch()
    }, [])
    useEffect(async () => {
        try {
            props.setSearchobj(DesignSearchObj)
            sessionStorage.setItem("SeasonalSearchDesign", JSON.stringify(DesignSearchObj))
            const config = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(DesignSearchObj)
            }
            //Abhishek daynamic url 
            const finalAppendFabrics = (pareseData, type = `t`) => {
                const path = pareseData.imageUrl 
                return {
                    totalCount: pareseData.totalCount,
                    designMaster: pareseData.designMaster.map((e) => {  
                        return {
                            ...e,
                            imageUrl: `${path}/${e.folderId}/${type}/${e.designName}${type}.jpg`
                            // colorwayDesigns: e.colorwayDesigns.map((f) => {
                            //     return { ...f, imageUrl: `${path}/${e.folderId}/${type}/${f.designName}${type}.jpg` }
                            // })
                        }
                    }),
                    localUrl: pareseData.localUrl,
                    imageUrl: pareseData.imageUrl
                }
            }
            const response = await fetch(`/DesignSearch/DesignThumbForSeasonal`, config)
            if (response.ok) {
                const res = await response.json()
                const pareseData = JSON.parse(res)
                const updatepares = finalAppendFabrics(pareseData)
                const geturl = await axios('/Login/Q3durl')
                setQRurl(geturl.data)
                console.log("DesignThumbForSeasonal: ", pareseData)
               // setImgdata(updatepares.designMaster)
               //setDesignCount(updatepares.totalCount)
               // Added By : Vijay Pansande, Added On : 26-10-2023, Purpose : Design thumb is not loading in fullview plugin from direct book or card
                if (!props.getDesignOnly) {
                    setImgdata(updatepares.designMaster)
                    setDesignCount(updatepares.totalCount)
                }
                props.setImgDetails(updatepares)
            } else {
                //!
            }
        } catch (error) {
            console.log(error)
        }
    }, [props.poc, BID, props.AllCataDesign])
    return (
        <>
            <Fragment>
                <DesignCard
                    setBoardSelected={props.setBoardSelected}
                    ImgColumn={props.ImgColumn}
                    setSearchobj={() => 1} data={imgData}
                    hideFilterView={props.hideFilterView}
                    showFilterView={props.showFilterView}
                    PluginModel={props.PluginModel}
                    View3dPlugin={props.View3dPlugin}
                    setActiveImageData={props.setActiveImageData}
                    ThumSize={props.ThumSize}
                    showfloat={props.leftfloat}
                    poc={props.poc} setPoc={props.setPoc}
                    fullViewDiv={props.fullViewDiv}
                    QRurl={QRurl}
                    Searchobj={props.Searchobj}
                />
            </Fragment>
            
            {!props.getDesignOnly ? <ArchivePagination
                poc={props.poc} 
                setPoc={props.setPoc}
                rowsPerPage={props.rowsPerPage}
                setSelectedPage={setSelectedPage}
                selectedPage={selectedPage}
                DesignCount={designCount}
                className='justify-content-center' /> : <></>}
        </>
    )
}

export default DesignsPage

