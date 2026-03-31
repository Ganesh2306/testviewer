import { useState, useContext, useEffect, useRef } from "react"
import {
    Row,
    Col,
    Input,
    Button,
    Card,
    CardBody,
    InputGroup,
    InputGroupAddon   
} from "reactstrap"
import AddDesign from "./popup/AddDesign"
import AddtoCollection from "../../tables/tableData/AddtoCollection"
import { AbilityContext } from '@src/utility/context/Can'
import axios from "axios"
import { skipState, setSkipFt } from "./SkipCall"
import { forColour } from './popup/ContentTable'

let selectedObj = {}
let getFeatureListD = null
let getDesignTypeGroup = null

export const getFTG = () => {
    return [getFeatureListD, getFilteredData({ rollData: getDesignTypeGroup })]
}
const Swal = require('sweetalert2')
const myComplexobj = {
    type: [],
    group:[],
    ft:[],
    roll:[]
  }

const getFilteredData = (Data) => {
    try {
        const val = document.getElementById('collectionFabLibrary').value
        const options = val.split('-')
        let DesignTypes = null
        let designFeatures = []
        for (let i = 0; i < Data.rollData.allDesignTypesByRoles.length; i++) {
            if (`${Data.rollData.allDesignTypesByRoles[i].design_type_id}` === options[0].trim()) {
                DesignTypes = Data.rollData.allDesignTypesByRoles[i]
                for (let j = 0; j < DesignTypes.getDesignGroupsByRoleListDto.length; j++) {
                    if (`${DesignTypes.getDesignGroupsByRoleListDto[j].design_groups_id}` === options[1].trim()) {
                        designFeatures = DesignTypes.getDesignGroupsByRoleListDto[j].getDesignFeaturesByRoleListDto
                        return designFeatures
                    }
                }
            }
        }
        return designFeatures
    } catch (error) {
        return []
    }
}

let f = false
const Loop = (props) => {
    if (props.rollData !== null) {
        return (props.rollData.allDesignTypesByRoles.map((e, k) => {
            return (e.getDesignGroupsByRoleListDto.map((a, b) => {
                if (f) {                  
                    f = false
                }
                return (<option
                    key={k + b + 25}
                    designtypeid={e.design_type_id}
                    designgroupid={a.design_groups_id}
                    value={`${e.design_type_id} - ${a.design_groups_id}`}                   
                    name={`${e.design_type_name}-${a.design_groups_name}`}
                    d_conf_i={`d_conf${e.design_Configuration_Id}`}
                >
                    {`${e.design_type_name}-${a.design_groups_name}`}
                </option>)
            }))
        }))
    } else {
        return <></>
    }
}

// ps-advance search txt-textsearch  isAllSearch- all search
export const searchHandel = async (ps, txt, isAllSearch, start, end, cid, te, sid) => {
    try {
        // const isPtPg = document.getElementById('collectionFabLibrary').value
        // if (isPtPg === undefined || isPtPg === "") {
        //     Swal.fire({
        //         icon: 'info',
        //         position: 'center',
        //         text: 'Please Assign Product Group',
        //         showConfirmButton: false,
        //         timer: 5000
        //     })
        //     return
        // }
        // console.log(ps)
        let obj = {}
        let isText1 = true
        if (isAllSearch === true) {
            isText1 = false
        } else if (txt !== undefined || ps !== undefined) {
            isText1 = true
        }
    
        if (txt !== undefined) {
            obj = {
                folderId: "0",
                designName: txt,
                isText: isText1,
                isUserAdmin: false,
                createdBy: "string",
                filterSearchRequestDto: {
                    folderId: 0,
                    features: {},
                    isAnd: false
                },
                IsRating: false,
                IsName: false,
                start: start ? start : 0,
                end: end ? end : 15,
                Range: {},
                Iswearhouse: false,
                designstate: '',
                Difference: (start && end) ? end - start : 15,
                DesignTypeIdGroupId: document.getElementById('collectionFabLibrary').value
            }
        } else {
            const temp = {}
            if (isAllSearch === false) {
                Object.keys(selectedObj).map((e, k) => {
                    if (document.getElementById(e) !== null) {
                        const fname = document.getElementById(e)[0].text
                        if (fname !== selectedObj[e]) {
                            temp[document.getElementById(e)[0].text] = selectedObj[e].replace("dsp-", "")
                        }
                    }
                })
            }
     
            obj = {
                folderId: "0",
                designName: "string",
                CollectionId : cid ? cid : 0,  //"Collection_Id",//Abhishek
                SeasonId : sid ? sid : 0,
                isText: isText1,
                isUserAdmin: false,
                createdBy: "string",
                filterSearchRequestDto: {
                    folderId: 0,
                    features: temp,
                    isAnd: true
                },
                IsRating: false,
                IsName: false,
                start: start ? start : 0,
                end: end ? end : 15,
                Range: {},
                Iswearhouse: false,
                designstate: '',
                Difference: (start && end) ? end - start : 15,
                DesignTypeIdGroupId: document.getElementById('collectionFabLibrary').value
            }
        }

    const response = await axios.post(`./Seasonal/GetCollectionDesignBySeasonId`, obj)
        if (response.data === null) {
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Searching Data Not Found  !?',
                showConfirmButton: true
            })
            return
        }
        ps.setDesignList(JSON.parse(response.data))
        try {
            Object.keys(selectedObj).map((e, k) => {
                document.getElementById(e).value = selectedObj[e]  //a:{a:a, name:}
            })
        } catch (error) {

        }
    } catch (error) {

    }  
}

//!Top-Left
const LeftTop = (props) => {
    const ability = useContext(AbilityContext)
    return (
        <>
            <Col className="col-xl-6 col-lg-6 col-md-12 col-sm-12 pr-0 design_content">
            {ability.can('add', 'Design') && <> <form className="form-inline flex-wrap select col-md-4 col-sm-12 pl-0 pr-50">
            <span className="float-left mr-1">Select Supplier</span>
            <select id="" 
            className="col-md-12 col-lg-12 col-md-6 col-sm-4 form-control float-left"
            ref={props.supplierref} 
            onChange={(e) => {
                props.setreRender(e => !e)
            }}
            >       
                    {
                        props.splist && Object.keys(props.splist).map((e, k) => {
                           
                            return <option value={e}>{props.splist[e]}</option>
                            
                        })}
                </select> </form> </>}
        
               <form className="form-inline flex-wrap select col-md-4 col-sm-12 pr-50 pl-0">
                <span className="float-left mr-1">Product Group</span>
                <select
                    id="collectionFabLibrary"
                    className="col-md-12 col-lg-12 col-md-6 col-sm-4 form-control float-left"
                    onChange={(e) => {
                        props.setreRender(e => !e)
                        props.setSelect(e.target.value)
                        const isAllSearch = true
                        props.searchHandel(props.fprops, undefined, isAllSearch)
                    }}
                >
                    <Loop rollData={props.rollData} />
                </select>         
                
            </form> 
               <form className="form-inline flex-wrap select col-md-4 col-sm-12 pr-50 pl-0">
                <span className="float-left mr-1">Warehouse</span>
                <select id="" className="col-md-12 col-lg-12 col-md-6 col-sm-4 form-control float-left">
                    <option>All</option>
                    <option>Stock</option>
                    <option>Nos</option>
                    <option>Sample</option>
                </select>
            </form>
            </Col>
        </>
     
    )
}

//!Top Right
const TopRight = (props) => {
    const [Del, setDel] = useState(false)
    const deltoggle = () => setDel(!Del)
    const [showqr, setshowqr] = useState(false)

    const ability = useContext(AbilityContext)

    return (
        <div className="col-xl-6 col-lg-6 col-md-10 col-sm-12 d-flex justify-content-end" >
           <div className="button-menu">
                <div className="text-lg-right d-lg-flex slidemenu d-inline-flex" style={{ justifyContent: "right" }}>                       
                        <AddDesign IdData={props.IdData} myColour={props.myColour} modal={props.modal} toggle={props.toggle} />               
                        {ability.can('display', 'Design') && 
                        <Button.Ripple color='success'
                            type="button"
                            id="add_designBTN"
                        className="btn btn-sm btn-success design_content upload_common_button"
                        onClick={async () => {
                                const isStorageF = await axios.post(`./Design/GetStorageLocation`)
                                if (!isStorageF.data.isStorage) {
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'info',
                                        title: 'Please configure storage  !?',
                                        showConfirmButton: true
                                    })
                                } else {
                                    props.toggle()
                                }
                            }
                            }
                        >
                       <i className="fas fa-plus-circle mr-1"></i> Add Designs
                        </Button.Ripple>}
                         <div className="seasonal_content_assign"><AddtoCollection /></div>                
                </div>                
            </div>            
        </div>        
    )
}
//!Dynamic with Div <SelectBoxWithDiv />
const SelectBoxWithDiv = (props) => {
    //FidName
    const [options, setoptions] = useState(``)
    const Options = (op) => {
        return (
            <option tempid={op.value.design_featuretype_id} value={op.value.design_featuretype_name}>{op.value.design_featuretype_name}</option>
        )
    }

    const handelSelectChange = (e) => {
        if (e.target.id !== e.target.value) {
            selectedObj[e.target.id] = e.target.value
        } else {
            delete selectedObj[e.target.id]
        }
    }

    return (
        <>
            <Col className="col-md-4 col-lg-2 flip mb-8 mb-1"
                style={{ paddingLeft: "0px", paddingRight: "4px", float: "left" }}>
                <select
                    id={`dsp-${props.FidName[0].id}`}
                    type="text"
                    className="_featureTypeSearch form-control"
                    selectcss="0"
                    sfid={props.FidName[0].id}
                    sfname={props.FidName[0].name}
                    onChange={handelSelectChange}
                >
                    <option value={`dsp-${props.FidName[0].id}`}>{props.FidName[0].name}</option>
                    {
                        props.ftdata.map((e, k) => {
                            return <Options key={k} value={e} />
                        })
                    }
                </select>
            </Col>
        </>
    )
}
//! id: collectionFabLibrary

let ftData1 = []
const SearchToggleComponent = (props) => {
    const [ft, setft] = useState(ftData1)
    useEffect(() => {
        ftData1 = getFilteredData(props)
        selectedObj = {}
        return () => {
            props.setSelect(null)
        }
    }, [props.select])

    ftData1 = getFilteredData(props)
    return (
        <>
            <div >
                <div id="cardCollpase1"  >
                    <div className="AdvanceSearch">
                        {
                            ftData1.map((e, k) => {
                                let ftdata = []
                                const FidName = []                              
                                if (props.featureTData !== null) {
                                    for (let i = 0; i < props.featureTData.length; i++) {
                                        if (props.featureTData[i].design_feature_id === e.design_features_id) {
                                            ftdata = props.featureTData[i].featureTypeList
                                        }
                                    }
                                }
                                FidName.push({ id: e.design_features_id, name: e.design_features_name })
                                return <SelectBoxWithDiv key={`${k}-select-m`} FidName={FidName} 
                                ftdata={ftdata} tid={k} 
                                setSelect={props.setSelect} />
                            })
                        }

                        <div className="col-md-4 col-lg-2 d-flex pl-0" >
                            <button
                                type="button"
                                id="AdvanceSearchBtn"
                                className="btn btn-xs btn-primary waves-effect waves-light mb-2 px-1 py-50"
                                onClick={() => {
                                    const isAllSearch = false
                                    searchHandel(props, undefined, isAllSearch)
                                }
                                }
                            >
                                Search                         
                               </button>
                            <button
                                type="button"
                                id="ResetBtn"
                                className="btn btn-xs btn-primary waves-effect waves-light mb-2" style={{ marginLeft: "4px" }}
                                onClick={() => {
                                    props.setSelect(!props.select)
                                    const isAllSearch = true
                                    searchHandel(props, undefined, isAllSearch)
                                }
                                }
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

//!TopBar

const InputSearchCombo = (props) => {
        return (
            <>
                <Row
                    style={{ display: 'block'}}>
                    <InputGroup className='col-lg-4 col-md-6 col-sm-12 d-block' >
                        <div className="input-icons" style={{ position: 'relative' }}>
                            <Input id='txtSearch' className='rounded-left w-100' style={{ borderRadius: '0' }}                           
                                type='text' onChange={(e) => {                                  
                                }}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        if (document.getElementById('txtSearch').value !== "") {
                                            const isAllSearch = false
                                            searchHandel(props, document.getElementById('txtSearch').value, isAllSearch)
                                        }
                                    }
                                }}
                            >

                            </Input>
                            <i className="fa fa-times" aria-hidden="true" role='button' onClick={() => {
                                document.getElementById('txtSearch').value = ''
                                props.setreRender(!props.reRender)
                            }} style={{ position: 'absolute', right: '60px', top: '0.875rem' }}></i>
                        </div>
                        <InputGroupAddon addonType="append">
                            <Button className="bg-light text-white px-1" role="button" onClick={(e) => {
                                const isAllSearch = false
                                searchHandel(props, document.getElementById('txtSearch').value, isAllSearch)
                            }} ><i class="fa fa-search" aria-hidden="true"></i></Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Row>
            </>
        )
    }

    const TopBar = (props) => {

        const [advsearch, setadvsearch] = useState(false)
        const [searchValue, setSearchValue] = useState('')
        const resetInput = event => {
            setSearchValue('')
        }
        const [select, setSelect] = useState(null)
        const [Collectionlist, setSeasonlist_id] = useState([])
    
        //!LeftTopDown
        const [Seaslist, sslist] = useState(null)
        const [rollData, setrollData] = useState(null)
        const [featureTData, setfeatureTData] = useState(null)
        const [modal, setModal] = useState(false)
        const toggle = () => setModal(!modal)
        const [Del, setDel] = useState(false)
        const deltoggle = () => setDel(!Del)
        const seasonidref = useRef(null)
        const collectionlidref = useRef(null)

        const IdData = {
            Season_Id : parseInt(seasonidref.current?.value),
            Collection_Id: parseInt(collectionlidref.current?.value)
            }
            const selectedType = {
                type: null,
                group: null,
                selectedUSer: null
               }
    
        useEffect(async () => {  
    
            forColour.value = ""
            if (skipState.skipFt) {            
                  const response = await axios.get(`./Design/GetRoleDesignConfigurationByRole?RoleId=${0}`)
                  getDesignTypeGroup = response.data
                //ToDo: -> not in('Warehouse','Product','Rating','Price','Credit','Date','Stock')
                //
                const data = (rs = null) => {
                    let arr = []
                    if (rs !== null) {
                        (rs.allDesignTypesByRoles.map((e, k) => { 
                          const obj = {}
                          obj.alldata = e
                          obj.value = `${e.design_type_id}-${k}`
                          obj.label = `${e.design_type_name}`
                          arr.push(obj)
                         }))
                       } else {
                       arr = []
                     }
                     selectedType.type = arr[0] !== undefined ? arr[0].value : ''
                     return arr
                  }
                  const res = response.data
                    const arr = res.allDesignTypesByRoles[0].getDesignGroupsByRoleListDto.map((e, k) => {
                    const obj = e
                    obj.label = obj.design_groups_name
                    obj.design_featuretype_name = obj.design_groups_name
                    obj.design_featuretype_id = `${obj.design_groups_id}-${k}`
                    obj.value = `${obj.design_groups_id}-${k}`
                    return obj
          //arr.push(obj)
                    })
                    selectedType.group = arr[0] !== undefined ? arr[0].value : ''
                    myComplexobj.type = data(res)
                    myComplexobj.group = arr
                    myComplexobj.roll = res
                //
                /* if (!getFeatureListD) { */
                    //const resGetFt = await axios.get(`./Design/GetFeatureTypeList`)
                    const resGetFt = await axios.get(`./Design/GetFeatureTypeList?PTPG=${selectedType.type.split('-')[0]}-${selectedType.group}`)
                    myComplexobj.ft = resGetFt.data
                    getFeatureListD = resGetFt.data
                    setfeatureTData(resGetFt.data)
                    setrollData(response.data)
                /* } */
                const isAllSearch = true
                await searchHandel(props, undefined, isAllSearch, undefined, undefined, collectionlidref.current?.value, collectionlidref, seasonidref.current?.value)
            } else {
                setSkipFt(true)
                const isAllSearch = true
                setTimeout(async () => {
                    await searchHandel(props, undefined, isAllSearch, undefined, undefined, IdData)
                }, 1000)
            }
            // console.log(props.reRender)
            return () => {
                forColour.value = ""
                //props.setDesignList(null)
            }
        }, [modal, props.reRender]) // props.setreRender(!props.reRender)   
        
        const obj = {
            OrganisationId: 0,
            SupplierId: 0,
            start: 0,
            end: 0
        }

        useEffect(async () => {
            
            const res = await axios.post("./Seasonal/GetSeasonMastersList", obj)
            const SortedSeasonMasterList = res.data.seasonMastersList.sort((a, b) => {
                if (a.sm_Season_Name.toUpperCase() > b.sm_Season_Name.toUpperCase()) {
                    return 1
                } else {
                    return -1
                }
            })
            sslist(SortedSeasonMasterList)
            //sslist(res.data.seasonMastersList)
          }, [])
    
          useEffect(async () => {
            const id = seasonidref.current?.value
            const obj = {
                SeasonID : parseInt(id),
                Start : 0,
                End : 100 
                }
            const res = await axios.post(`./Seasonal/GetCollectionListBySeasonId?SeasonID=${obj.SeasonID}&Start=${obj.Start}&End=${obj.End}`, obj)
              const SortedCollectionList = res.data.myCollection.sort((a, b) => {
                if (a.collection_Name.toUpperCase() > b.collection_Name.toUpperCase()) {
                    return 1
                } else {
                    return -1
                }
            })
              //setSeasonlist_id(res.data.myCollection)
              setSeasonlist_id(SortedCollectionList)
            // const cid = document.getElementById('collectionId').value
            // const CollectionID = parseInt(cid)
            // console.log(CollectionID())

            forColour.value = ""
            if (skipState.skipFt) {            
                  const response = await axios.get(`./Design/GetRoleDesignConfigurationByRole?RoleId=${0}`)
                  getDesignTypeGroup = response.data
                //ToDo: -> not in('Warehouse','Product','Rating','Price','Credit','Date','Stock')
                /* if (!getFeatureListD) { */
                    const resGetFt = await axios.get(`./Design/GetFeatureTypeList_save`)
                    getFeatureListD = resGetFt.data
                    setfeatureTData(resGetFt.data)
                    setrollData(response.data)
                /* } */
                const isAllSearch = true
                await searchHandel(props, undefined, isAllSearch, undefined, undefined, collectionlidref.current?.value, collectionlidref, seasonidref.current?.value)
            } else {
                setSkipFt(true)
                const isAllSearch = true
                setTimeout(async () => {
                    await searchHandel(props, undefined, isAllSearch, undefined, undefined, IdData)
                }, 1000)
            }
            
          }, [Seaslist])
          
    
        return (
            <>
                <Card className="contain1 mb-0">
                    <CardBody>
                        <Row className='mx-0 pb-2 seasonal_content_viewupload'>
                            <>
                                <Col className="col-xl-6 col-lg-6 col-md-8 col-sm-12 d-flex pr-0 pl-0">
                                    <form className="form-inline flex-wrap select col-md-4 col-sm-12 pr-50 pl-0">
                                        <span className="float-left mr-1">Seasons</span>
                                        <select id="seasonid" className="col-md-12 col-lg-12 col-md-6 col-sm-4 form-control float-left"
                                        ref={ seasonidref }
                                         onChange={ async () => { 
                                            const id = document.getElementById('seasonid').value
                                            const obj = {
                                                SeasonID : parseInt(id),
                                                Start : 0,
                                                End : 100  
                                                }
                                            const res = await axios.post(`./Seasonal/GetCollectionListBySeasonId?SeasonID=${obj.SeasonID}&Start=${obj.Start}&End=${obj.End}`, obj)
                                            setSeasonlist_id(res.data.myCollection)
                                            console.log(res.data.myCollection)
                                            props.setreRender(e => !e)
                                            collectionlidref.current.selectedIndex = 0   
                                          }
                                    }  
                                        >
                                            {
                                               Seaslist && Seaslist.map((e, k) => {
                                                return <option value={e.sm_Season_Id}>{e.sm_Season_Name}</option>
                                                 })
                                            } 
                                        </select>
                                    </form>
                                    <form className="form-inline flex-wrap select col-md-4 col-sm-12 pr-50 pl-0">
                                        <span className="float-left mr-1">Collection</span>
                                        <select id="collectionId" className="col-md-12 col-lg-12 col-md-6 col-sm-4 form-control float-left"
                                        onChange={() => {
                                            props.setreRender(e => !e)
                                        }}
                                        ref={ collectionlidref }
                                        // onChange = { props.setreRender(!props.reRender) }
                                        >
                                            {
                                                Collectionlist && Collectionlist.map((e, k) => {
                                                 return <option value={e.collection_Id}>{e.collection_Name}</option>
                                                  })
                                            } 
                                        </select>
                                    </form>
    
                                </Col>
                            </>
                        </Row>
                        <Row className="mb-1 justify-content-end">               
                            <LeftTop rollData={rollData} setSelect={setSelect} searchHandel={searchHandel} fprops={props} splist={props.splist} supplierref={props.supplierref} setreRender={props.setreRender}/>
                            <TopRight myColour={props.myColour} IdData={IdData} rollData={rollData} modal={modal} setModal={setModal} toggle={toggle} setreRender={props.setreRender} reRender={props.reRender}  />
                         
                        </Row>
                        <Row className='design_content'>
                            <div className="col-xl-12 col-md-12 m-0 d-lg-flex flex-lg-column flex-sm-row">
                                <div className="col-lg-12 col-md-12 col-sm-12 p-0">
                                 <div className="filterPanel">
                                    <div className="card-widgets pt-0">
                                        <a
                                            id="filter-expand"
                                            role="button"
                                            aria-expanded="false"
                                            aria-controls="cardCollpase1"
                                            className="btn btn-secondary btn-xs waves-effect waves-light m-0 collapsed"
                                            style={{ lineHeight: '1rem' }}
                                            onClick={() => {
                                                setadvsearch(!advsearch)
                                            }}
                                        >
                                            {advsearch ? <i className="fas fa-minus mr-50"></i> : <i className="fas fa-plus mr-50"></i>}
                                            Filter
                                        </a>
                                    </div>
                                        {advsearch ? <SearchToggleComponent setDesignList={props.setDesignList} advsearch={advsearch} setSelect={setSelect} select={select} rollData={rollData} featureTData={featureTData} /> : <InputSearchCombo setDesignList={props.setDesignList} setreRender={props.setreRender} reRender={props.reRender} />}
                                 
                                        </div>
                                 </div>
    
                            </div>
                        </Row>
                    </CardBody>
                </Card>
            </>
        )
    }

export default TopBar
