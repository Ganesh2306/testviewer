import { useState, useEffect, useContext } from "react"
import {
  Button,
  CardBody,
  CardImg, Input, Label, Form, Modal, ButtonGroup, Table, Row
} from "reactstrap"
import { ChevronDown, Edit, Hexagon, Star, Grid, List, Trash2 } from 'react-feather'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { DeletePopUp } from "./popup/DeletePopUp"
import { imgData, ImgColumn } from './data'
import ThreeD_Design from "./popup/ThreeD_Design"
import { AbilityContext } from '@src/utility/context/Can'
import '../design.css'
import axios from "axios"
import TopBarOrg, { InputSearchCombo } from "./TopBarOrg"
import { object } from "prop-types"
import { faUserEdit } from "@fortawesome/free-solid-svg-icons"
import classnames from 'classnames'
import Swal from "sweetalert2"

let saveConfgi = {}
export const SaveConfigToArr = () => Object.values(saveConfgi)

let chek = false
export const SetAll = function (p) { chek = p }


const CreateObject = (id, info, type) => {

  if (info.td_showroom_configuration_id !== undefined) {
    //!ShowRoom
    const TdShowroomConfiguration = new Object()
    TdShowroomConfiguration.state = info.td_showroom_configuration_id !== 0 ? 3 : 0
    TdShowroomConfiguration.td_Showroom_Configuration_Id = info.td_showroom_configuration_id
    TdShowroomConfiguration.td_Three_DImage_Id = info.tdImages[0].td_threed_image_id
    TdShowroomConfiguration.td_Organisation_Id = 0
    TdShowroomConfiguration.td_Order_No = info.tdImages[0].isCreditMinus ? 0 : 1
    TdShowroomConfiguration.Td_Credit = info.tdImages[0].td_credit
    TdShowroomConfiguration.Is_Credit_Minus = true//info.tdImages[0].IsCreditMinus || type === 'add'

    return TdShowroomConfiguration
  } else {
    const TdQvImageConfiguration = new Object()
    TdQvImageConfiguration.state = info.td_Qv_Image_Configurations_Id !== 0 ? 3 : 0
    TdQvImageConfiguration.td_Qv_Image_Configurations_Id = info.td_Qv_Image_Configurations_Id
    TdQvImageConfiguration.td_Threed_Image_Id = info.tdImages[0].td_threed_image_id
    TdQvImageConfiguration.td_Organisation_Id = 0
    TdQvImageConfiguration.td_Order_No = info.tdImages[0].isCreditMinus ? 0 : 1
    TdQvImageConfiguration.Td_Credit = info.tdImages[0].td_credit
    TdQvImageConfiguration.Is_Credit_Minus = true//info.tdImages[0].IsCreditMinus || type === 'add'

    return TdQvImageConfiguration
  }
}

const CreateObject2 = (id, info, type) => {

  if (info.td_showroom_configuration_id !== undefined) {
    //!ShowRoom
    const TdShowroomConfiguration = new Object()
    TdShowroomConfiguration.state = info.td_showroom_configuration_id !== 0 ? 3 : 0
    TdShowroomConfiguration.td_Showroom_Configuration_Id = info.td_showroom_configuration_id
    TdShowroomConfiguration.td_Three_DImage_Id = info.tdImages[0].td_threed_image_id
    TdShowroomConfiguration.td_Organisation_Id = 0
    TdShowroomConfiguration.td_Order_No = 0
    TdShowroomConfiguration.Td_Credit = info.tdImages[0].td_credit
    TdShowroomConfiguration.Is_Credit_Minus = info.tdImages[0].isCreditMinus

    return TdShowroomConfiguration
  } else {
    const TdQvImageConfiguration = new Object()
    TdQvImageConfiguration.state = info.td_Qv_Image_Configurations_Id !== 0 ? 3 : 0
    TdQvImageConfiguration.td_Qv_Image_Configurations_Id = info.td_Qv_Image_Configurations_Id
    TdQvImageConfiguration.td_Threed_Image_Id = info.tdImages[0].td_threed_image_id
    TdQvImageConfiguration.td_Organisation_Id = 0
    TdQvImageConfiguration.td_Order_No = 0
    TdQvImageConfiguration.Td_Credit = info.tdImages[0].td_credit
    TdQvImageConfiguration.Is_Credit_Minus = info.tdImages[0].isCreditMinus

    return TdQvImageConfiguration
  }
}

const operation = (type, id, obj, ref) => {
  if (type === 'add') {
    saveConfgi[id] = CreateObject(id, obj, type)
  } else if (type === 'remove') {
    ref === 0 ? delete saveConfgi[id] : saveConfgi[id] = CreateObject2(id, obj, type)
  }
}

export const rmAllSaveConfig = () => {
  saveConfgi = {}
}

window.sv = () => saveConfgi

const CustomPagination = ({ pagestartref, pagendref, count, rerender, prerender, newselctionref }) => {

  const [perPage, setparPage] = useState(pagendref.current - pagestartref.current)
  const pcount = Math.ceil(count / perPage)
  const [selectedPage, setSelectedPage] = useState(0) // 1 
  const handlePagination = page => {

    setSelectedPage(page.selected)
    pagestartref.current = page.selected === 0 ? 1 : page.selected * perPage
    pagendref.current = 25
    rerender(e => !e)
  }

  useEffect(() => {
    if (pagestartref.current === 0) {
      setSelectedPage(0)
    }
    return () => {

    }
  }, [prerender])
  return (
    <ReactPaginate
      previousLabel={''}
      nextLabel={''}
      breakLabel='...'
      pageCount={pcount || 1}
      onPageChange={page => handlePagination(page)}
      marginPagesDisplayed={25}
      pageRangeDisplayed={2}
      activeClassName='active'
      forcePage={selectedPage}
      pageClassName={'page-item'}
      nextLinkClassName={'page-link'}
      nextClassName={'page-item next'}
      previousClassName={'page-item prev'}
      previousLinkClassName={'page-link'}
      pageLinkClassName={'page-link'}
      breakClassName='page-item'
      breakLinkClassName='page-link'
      containerClassName={
        'pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'
      }
    />
  )
}

const OnHoverOption = ({ ability, modal, toggle, id, info, uid, select, forceRerender, credits, name, imgname,
  newselctionref, creditlimit, credit, PrOrList, showTdsConfiguration, applicationref, used_credit, setused_credit, saastoken }) => {
  const [editmodal, seteditModal] = useState(false)
  const [Cancel, setCancel] = useState(false)
  const [delmsg, setdelmsg] = useState("")
  const edittoggle = () => seteditModal(!editmodal)
  const [Del, setDel] = useState(false)
  const deltoggle = () => setDel(!Del)
  const [check, setCheck] = useState(false)
  const [editdata, seteditdata] = useState(null)

  const obj = [
    {
      state: 3,
      td_threed_image_id: info.tdImages[0].td_threed_image_id ? info.tdImages[0].td_threed_image_id : 0,
      td_threed_image_name: info.tdImages[0].td_threed_image_name ? info.tdImages[0].td_threed_image_name : "",
      td_Threed_Image_Display_Name: info.tdImages[0].td_Threed_Image_Display_Name ? info.tdImages[0].td_Threed_Image_Display_Name : "",
      isdeletefinal: false
    }
  ]
  const obj2 = [
    {
      state: 3,
      td_threed_image_id: info.tdImages[0].td_threed_image_id ? info.tdImages[0].td_threed_image_id : 0,
      td_threed_image_name: info.tdImages[0].td_threed_image_name ? info.tdImages[0].td_threed_image_name : "",
      td_Threed_Image_Display_Name: info.tdImages[0].td_Threed_Image_Display_Name ? info.tdImages[0].td_Threed_Image_Display_Name : "",
      isdeletefinal: true
    }
  ]
  const obj1 = {
    TdImageId: info.tdImages[0].td_threed_image_id ? info.tdImages[0].td_threed_image_id : 0
  }

  useEffect(() => {
    setCheck((info.td_Qv_Image_Configurations_Id !== undefined && info.td_Qv_Image_Configurations_Id !== 0) || (info.td_showroom_configuration_id !== undefined && info.td_showroom_configuration_id !== 0))

    return () => {
      setCheck(false)
    }
  }, [id, (info.td_Qv_Image_Configurations_Id !== undefined && info.td_Qv_Image_Configurations_Id !== 0) || (info.td_showroom_configuration_id !== undefined && info.td_showroom_configuration_id !== 0)])

  const rConfigid = (a, b) => {
    if (a !== undefined) {
      return a
    } else {
      return b
    }

  }

  return (
    <>
      <Form>
        <div className="custom-checkbox" >
          <Label
          //className="custom-control-label" 
          >
            <Input
              type="checkbox"
              id="" //defaultChecked={select }
              checked={check}
              onChange={
                (e) => {
                  const crd = parseInt(newselctionref.current?.getAttribute('count'))
                  if (check) {
                    newselctionref.current?.setAttribute('count', crd - parseInt(credits))
                    newselctionref.current.textContent = `[selection ${crd - parseInt(credits)}]`
                    operation('remove', info.tdImages[0].td_threed_image_id,
                      info,
                      rConfigid(info.td_Qv_Image_Configurations_Id, info.td_showroom_configuration_id)) //! remove this -> from saveConfig Obj
                  } else {
                    if (crd + credits + credit > creditlimit) {
                        return alert('Not Enough credit balance for configure 3D Image')
                    }
                    newselctionref.current?.setAttribute('count', crd + parseInt(credits))
                    newselctionref.current.textContent = `[selection ${crd + parseInt(credits)}]`
                    operation('add', info.tdImages[0].td_threed_image_id,
                      info,
                      rConfigid(info.td_Qv_Image_Configurations_Id, info.td_showroom_configuration_id)) //! Add this -> to saveConfig Obj 
                  }
                  setCheck(!check)
                }
              }
            />
          </Label>
        </div>
      </Form>
      {ability.can('add', '3DImages') && <div className="iconstopWrapper">
        <ThreeD_Design modal={editmodal} toggle={edittoggle} forceRerender={forceRerender} PrOrList={PrOrList} uid={id} editobj={obj1} headername="Modify 3D Images" subheadername="Edit & Modify 3D Images"
          editdata={editdata} showTdsConfiguration={showTdsConfiguration} applicationref={applicationref} />
        <div className="iconstop" style={{ float: 'left', zIndex: '9' }}>
          <div>
            {ability.can('Display', '3DImages') && <Button className="iconthumb" color='light' title="Edit" >
              <Edit role='button' onClick={() => {
                axios.post(`./ThreeD/GetTdImageConfigurationsByTdimageId?TdImageId=${obj1.TdImageId}`, obj1).then(res => {
                  const A = [(JSON.parse(res.data))]
                  A[0].state = 2
                  A[0].Td_Productname = []
                  A[0].isdrapeorder = 0
                  A[0].td_Threed_Image_Configuration_Id = null
                  A[0].td_images_org_configuration_id = null
                  const obj = {}
                  obj.td_Productname = null
                  obj.code = null
                  A[0].Td_Productname.push(obj)
                  A[0].td_Image_Configuration.forEach((e) => {
                    if (e.td_Group_Product_Name === null) {
                      A[0].Td_Productname[0].td_Productname = e.td_Productname
                      A[0].Td_Productname[0].code = e.td_Productname
                      A[0].td_Threed_Image_Configuration_Id = e.td_Threed_Image_Configuration_Id
                    }
                  })
                  A[0].td_Image_Configuration = A[0].td_Image_Configuration.filter(e => e.td_Group_Product_Name !== null)

                  A[0].td_Image_Configuration.map((e, k) => {
                    if (e.td_is_drapedfabric === true) {
                      A[0].isdrapeorder = k
                    }
                  })


                  A[0].td_Image_Configuration.forEach((e) => {
                    const td_Group_Products = []
                    const obj2 = {
                      td_Group_Product_Name: e.td_Group_Product_Name,
                      code: e.td_Group_Product_Name
                    }

                    td_Group_Products.push(obj2)
                    e.td_Group_Products = td_Group_Products

                  })

                  if (A[0].td_images_org_configuration?.[0]) {
                    A[0].td_images_org_configuration.forEach(e => {
                      A[0].td_images_org_configuration_id = e.td_Images_Org_Configuration_Id
                    })
                  }

                  seteditdata(A)
                })
                edittoggle()
                //forceRerender()
              }}
              />
            </Button>}
          </div>
          {ability.can('Display', '3DImages') && (
            <Button
              className="iconthumb"
              onClick={() => {
                axios.post(`./ThreeD/TdSaveImageConfigurations`, obj)
                  .then((res) => {
                    const result = JSON.parse(res.data)
                    const popmsg = result.message ? result.message : "No organization has been assigned to this 3D Image!!"
                    if (popmsg !== "No organization has been assigned to this 3D Image!!") {
                      Swal.fire({
                        position: "center",
                        icon: "info",
                        html: `<p style="text-align: center; font-weight: bold;">${popmsg}</p>`,
                        showCancelButton: true,
                        confirmButtonText: "Yes, delete it",
                        cancelButtonText: "Cancel",
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33"
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire({
                            position: "center",
                            icon: "info",
                            html: '<p style="text-align: center; font-weight: bold; color: black">Are you sure? <br/>You want to delete this? <br/> It will delete from all configured organization</p>',
                            showCancelButton: true,
                            confirmButtonText: "Yes, delete it",
                            cancelButtonText: "Cancel",
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33"
                          }).then((result) => {
                            if (result.isConfirmed) {
                              Swal.fire({
                                position: "center",
                                icon: "warning",
                                html: '<p style="text-align: center; font-weight: bold; color: black">Are you sure? <br/>You want to delete this?</p>',
                                showCancelButton: true,
                                confirmButtonText: "Yes, delete it",
                                cancelButtonText: "Cancel",
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33"
                              }).then(async (result) => {
                                if (result.isConfirmed) {
                                  const res = await axios.post(`./ThreeD/TdSaveImageConfigurations`, obj2)
                                  const result1 = JSON.parse(res.data)
                                  if (result1.isSave) {
                                    forceRerender()
                                  }
                                }
                              })
                            } else if (result.isDismissed) {
                              toggle()
                              Swal.close()
                            }
                          })
                        } else if (result.isDismissed) {
                          toggle()
                          Swal.close()
                        }
                      })
                    } else {
                      Swal.fire({
                        position: "center",
                        icon: "info",
                        // title: "Are you sure?",
                        // text: "You want to delete this?",
                        html: `<p style="text-align: center; font-weight: bold;">${popmsg}</p>`,
                        showCancelButton: true,
                        confirmButtonText: "Yes, delete it",
                        cancelButtonText: "Cancel",
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33"
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire({
                            position: "center",
                            icon: "info",
                            html: '<p style="text-align: center; font-weight: bold; color: black">Are you sure? <br/>Please confirm?<br/> You want to delete this?</p>',
                            showCancelButton: true,
                            confirmButtonText: "Yes, delete it",
                            cancelButtonText: "Cancel",
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33"
                          }).then(async (result) => {
                            if (result.isConfirmed) {
                              const res = await axios.post(`./ThreeD/TdSaveImageConfigurations`, obj2)
                              const result1 = JSON.parse(res.data)
                              if (result1.isSave) {
                                forceRerender()
                              }
                            }
                          })
                        }
                      })
                    }
                  })
              }}
              color="light"
              title="Delete"
            >
              <Trash2 role="button" />
            </Button>
          )}
        </div>

      </div>}

    </>
  )
}

//!Img Box For Loop   
const ImgBox = ({ id, src, name, imgname, ability, toggle, modal, e, k, select, credits, Exclusive,
  forceRerender, newselctionref, creditlimit, credit, srNo, PrOrList, showTdsConfiguration, applicationref, tryon, ProductName, Combo, used_credit, setused_credit, saastoken, isCreditMinus }) => {
  const [onHover, setonHover] = useState(false)
  const [editmodal, seteditModal] = useState(false)
  const edittoggle = () => seteditModal(!editmodal)
  const timestamp = Date.now()
  const role = JSON.parse(localStorage.userData).is_administrator
  const orgtype = JSON.parse(localStorage.userData).org_type
  return (
    <tr className='ecommerce-card card mb-2 rounded-0'>
      <td>{srNo}</td>
      <td className="thumb-bg">
        <div className='item-img text-center mx-auto position-relative p-0' id="gallery_3d"  >
          <div className="top">
            <CardImg top src={`${src}?v=${timestamp}`} />
            {Exclusive && <div className="excl">Exclusive </div>}
            <div>
              {ProductName !== null && ProductName !== undefined && <div className="product">{ProductName}</div>}
            </div>
            <div>
              {tryon && <div className="tryon">tryon</div>}
            </div>
            <div>
              {Combo && <div className="combo">combo</div>}
            </div>
            <div>
              {isCreditMinus && <div className="paid">paid</div>}
            </div>
          </div>

        </div>
      </td>
      <td className="thumb-cardbody">
        <CardBody>
          <div className="img_title" title={name}>{name}</div>
          <br />
          {orgtype !== 2 && <div className="img_title1" title={imgname}>{imgname}</div>}

        </CardBody>
      </td>
      <td className="credit_box">
        <div className="credit_score">
          <div>  {"{"} Credits : </div>
          <span>{credits} {"}"}</span>
        </div>
      </td>
      <td className="thumb-checkbox-wrap">
        {onHover || true ? <OnHoverOption credit={credit} creditlimit={creditlimit} newselctionref={newselctionref}
          select={select} forceRerender={forceRerender} credits={credits} info={e} uid={k} src={src} name={name} imgname={imgname}
          ability={ability} id={id} toggle={toggle} modal={modal} fibName={''} PrOrList={PrOrList} showTdsConfiguration={showTdsConfiguration}
          applicationref={applicationref} used_credit={used_credit} setused_credit={setused_credit} saastoken={saastoken} /> : ''}
      </td>
    </tr>
  )
}

//! Looping IMG-Box
const ImgLooped = ({ ability, toggle, modal, imgData, select, forceRerender, newselctionref, creditlimit, credit, srNo, PrOrList, showTdsConfiguration, applicationref, used_credit, setused_credit, saastoken }) => {
  const orgtype = JSON.parse(localStorage.userData).org_type
  return (
    <>
      {
        // does not show tryon images for supplier Admin
        orgtype === 2 ? imgData.map((e, k) => {
          if (e.tdImages[0].isTryon === false) {
            return <ImgBox select={select}
              e={e}
              srNo={k + 1}
              k={e.td_threed_image_id}
              id={e.td_Qv_Image_Configurations_Id ? e.td_Qv_Image_Configurations_Id : e.td_showroom_configuration_id}
              src={e.tdImages[0].imageUrl}
              name={e.tdImages[0].td_Threed_Image_Display_Name}
              imgname={e.tdImages[0].td_threed_image_name}
              credits={e.tdImages[0].td_credit}
              Exclusive={e.tdImages[0].is_exclusive}
              tryon={e.tdImages[0].isTryon}
              Combo={e.tdImages[0].isCombo}
              ProductName={e.tdImages[0].productName}
              ability={ability} toggle={toggle} modal={modal}
              forceRerender={forceRerender} newselctionref={newselctionref}
              creditlimit={creditlimit} credit={credit}
              PrOrList={PrOrList} showTdsConfiguration={showTdsConfiguration} applicationref={applicationref}
              used_credit={used_credit} setused_credit={setused_credit} saastoken={saastoken}
              isCreditMinus={e.tdImages[0].isCreditMinus} />
          }
        }) : imgData.map((e, k) => {
          return <ImgBox select={select}
            e={e}
            srNo={k + 1}
            k={e.td_threed_image_id}
            id={e.td_Qv_Image_Configurations_Id ? e.td_Qv_Image_Configurations_Id : e.td_showroom_configuration_id}
            src={e.tdImages[0].imageUrl}
            name={e.tdImages[0].td_Threed_Image_Display_Name}
            imgname={e.tdImages[0].td_threed_image_name}
            credits={e.tdImages[0].td_credit}
            Exclusive={e.tdImages[0].is_exclusive}
            tryon={e.tdImages[0].isTryon}
            Combo={e.tdImages[0].isCombo}
            ProductName={e.tdImages[0].productName}
            ability={ability} toggle={toggle} modal={modal}
            forceRerender={forceRerender} newselctionref={newselctionref}
            creditlimit={creditlimit} credit={credit}
            PrOrList={PrOrList} showTdsConfiguration={showTdsConfiguration} applicationref={applicationref}
            used_credit={used_credit} setused_credit={setused_credit} saastoken={saastoken} isCreditMinus={e.tdImages[0].isCreditMinus} />
        })
      }
    </>
  )
}
//!Image Grid View


const ImgGrid = (p) => {

  const { imgData, setimgData, setCount, applicationref, modelsref, productsref, orgidref, creditlimit, credit, newcheckedref, PrOrList,
    designameref, txtsearchref, setCredit, setcreditlimit, pagendref, pagestartref, count, forceRerender, newselctionref, activeView, setActiveView,
    setmultiSlectReset, setTempSearchValue, tempsearchValue, used_credit, setused_credit, saastoken, setTotalCredit } = p
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)
  const [reloade, setreload] = useState(false)
  const ability = useContext(AbilityContext)
  const pageRest = () => {
    pagestartref.current = 0
    pagendref.current = 25
  }
  const showTdsConfiguration = (e) => {
    modelsref.current.value = 0
    txtsearchref.current = { value: false }
    newselctionref.current?.setAttribute('count', 0)
    newselctionref.current.textContent = `[selection 0]`
    if (tempsearchValue !== '') {
      setTempSearchValue('')
      designameref.current = { value: '' }
      txtsearchref.current = { value: false }
    }
    pageRest()
    rmAllSaveConfig()
    setmultiSlectReset(prv => !prv)
    setimgData([])
    forceRerender()
  }
  //!Add All State  
  window.getData = () => imgData

  //!Add all view 

  useEffect(async () => {
    const obj = {
      OrganisationId: orgidref.current ? parseInt(orgidref.current.value) : 0,
      Application: applicationref.current?.value,
      ModelState: modelsref.current ? parseInt(modelsref.current.value) : 0,
      Product: productsref.current ? productsref.current.value : "All",
      Textsearch: txtsearchref.current ? txtsearchref.current.value : false,
      DesignName: designameref.current?.value,
      start: pagestartref.current,
      end: pagendref.current
    }
    if (JSON.parse(localStorage.userData).org_type === 2) {
      obj.OrganisationId = JSON.parse(localStorage.profile).org_id
    }
    await axios.post(`./ThreeD/ConfigureTdImageSearchByOrgId`, obj).then(res => {
      const finalAppendFabrics = (tempresult, type = `t`) => {
        //const path = tempresult.imageUrl
        const path = tempresult.localUrl ? tempresult.localUrl : tempresult.imageUrl
        return {
          totalRecords: tempresult.totalRecords,
          //creditLimit: tempresult.creditLimit,
          creditlimit: used_credit,
          totalCredit: tempresult.totalCredit,
          fullViewImageConfigurationDtoList: tempresult.fullViewImageConfigurationDtoList ? tempresult.fullViewImageConfigurationDtoList.map((e) => {
            return {
              ...e,
              tdImages: e.tdImages.map((f) => {
                return {
                  ...f,
                  imageUrl: `${path}${f.td_threed_image_name}\\${f.td_threed_image_name}${type}.jpg`
                }
              })
            }
          }) : null,
          qvImageConfigurationsDtoList: tempresult.qvImageConfigurationsDtoList ? tempresult.qvImageConfigurationsDtoList.map((e) => {
            return {
              ...e,
              tdImages: e.tdImages.map((f) => {
                return {
                  ...f,
                  imageUrl: `${path}${f.td_threed_image_name}\\${f.td_threed_image_name}${type}.jpg`
                }
              })
            }
          }) : null,
          imageUrl: tempresult.imageUrl
        }
      }
      const tempresult = JSON.parse(res.data)
      const updatepares = finalAppendFabrics(tempresult)
      setimgData(updatepares.fullViewImageConfigurationDtoList ? updatepares.fullViewImageConfigurationDtoList : updatepares.qvImageConfigurationsDtoList)
      setCount(updatepares.totalRecords)
      //setCredit(updatepares.totalCredit)
      //setcreditlimit(updatepares.creditLimit)
      //  if (saastoken === null) {
      //   setTotalCredit(updatepares.totalCredit)
      //   setcreditlimit(updatepares.creditLimit)
      //  }
    })
    return () => {
      setimgData([])
    }
  }, [p.rerender, reloade])


  return (
    <>
      <div className="position-static ecommerce-application threedthumbview" >
        <Table className=''>
          <thead className={classnames({
            'grid-view': activeView === 'grid',
            'list-view': activeView === 'list'
          })}>
            <tr>

              <th>Sr. No.</th>
              <th>Model</th>
              <th>Name</th>
              <th>Credits</th>
              {ability.can('Display', '3DImages') && <th>Action</th>}

            </tr>
          </thead>
          <tbody className={classnames({
            'grid-view': activeView === 'grid',
            'list-view': activeView === 'list'
          })}>
            <ImgLooped credit={credit} creditlimit={used_credit} newselctionref={newselctionref}
              select={p.select} toggle={toggle} modal={modal} imgData={imgData} ability={ability} forceRerender={forceRerender}
              newcheckedref={newcheckedref} PrOrList={PrOrList} showTdsConfiguration={showTdsConfiguration} applicationref={applicationref}
              used_credit={used_credit} setused_credit={setused_credit} saastoken={saastoken} />
          </tbody>
          <CustomPagination pagestartref={pagestartref} pagendref={pagendref} count={count} rerender={setreload} prerender={p.rerender} />

        </Table>
      </div>
    </>
  )
}

export default ImgGrid
