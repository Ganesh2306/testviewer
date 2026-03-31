
import { useDebugValue, useEffect, useState, useLayoutEffect, useRef } from "react"
import Select from "react-select"
import { selectThemeColors } from "@utils"
import '@styles/react/libs/react-select/_react-select.scss'
import './../ThreedStyle.css'
import { Edit } from "react-feather"
/*import Example from "./MultiSelect"*/
import { Threedold, currentselected, setCurrentselected, UpdateThreedold, DelIndex, reset, setThreedold, emptyThreedold } from './Tableold'
import MultiSelectDropdown, { SelectOrg, SelectTryonType, SelectGender, MultiSelectDropdown2} from "./MultiselectDropodown"

import {
  Table,
  FormGroup,
  Label,
  Input 
} from "reactstrap"
import { event } from "jquery"

export const old = []

const DefaultGroups = ({ name, handelOnchange, identifiers, id, pid, src }) => {
  return (
    <>
    <tr><td><Input type='text' id='basicInput' placeholder='Mesh1' value={name} disabled /></td></tr>
    </>
  )
}
const GroupImgOrder = ({ name, handelOnchange, identifiers, id, pid, src, GroupOrder  }) => {
  useEffect(() => {
    handelOnchange({identifiers, id, text:{target:{value:GroupOrder}}, pid})
   }, [])
    return (
        <>
            <tr><td><Input type='text' className='text-center' id='' disabled style={{marginTop : '0px', marginBottom:'50px', marginLeft:'20px', marginRight:'20px', width:'70px'}}
            defaultValue={GroupOrder} onChange={(text) => {
              handelOnchange({identifiers, id, text, pid})
            }}
            /></td></tr>
        </>
    )
}

const ImgPicGroups = ({ key, src }) => { //{`${src}?v=${timestamp}`}
  const timestamp = Date.now()
  return (
    <>
     <tr><td><img src={src} /></td></tr>
    {/* <tr><td><img src={src.startsWith('http') ? `${src}?v=${timestamp}` : `data:image/jpeg;base64,${src}`} /></td></tr>  */}
    </>
  )
}
const DisplayGroupOrderNo = ({ name, handelOnchange, identifiers, id, pid, src, NewGroupOrder }) => {
  useEffect(() => {
    handelOnchange({identifiers, id, text:{target:{value:NewGroupOrder}}, pid})
  }, [])
  
     return <>
         <tr><td><Input type='number' className='text-center' id=''  style={{marginTop : '0px', marginBottom:'50px', marginLeft:'20px', marginRight:'20px', width:'70px'}}
            defaultValue={NewGroupOrder} onChange={(text) => {
              handelOnchange({identifiers, id, text, pid})
            }}/></td></tr>
   </>
 }

 const Drapeorder = ({ name, handelOnchange, identifiers, id, pid, src, Drapeorder, selectedOrder, setSelectedOrder, totalItems }) => {
  // useEffect(() => {
  //   handelOnchange({identifiers, id, text:{target:{value:Drapeorder}}, pid})
  // }, [])
  useEffect(() => {
    if (selectedOrder === id) {
      handelOnchange({ identifiers, id, text: { target: { value: Drapeorder } }, pid })
    }
  }, [])
//selectedOrder, identifiers, id, Drapeorder, pid, handelOnchange
  const handleRadioChange = (e) => {
    const id = parseInt(e.target.id)
    setSelectedOrder(id)
    handelOnchange({ identifiers, id, text: { target: { value: e.target.checked  } }, pid })
  }

  return <>
  <tr><td><input
            type='radio'
            className='text-center'
            id={id}
            style={{ marginTop: '0px', marginBottom: '50px', marginLeft: '20px', marginRight: '20px', width: '70px' }}
            checked={selectedOrder === id}
            onChange={handleRadioChange}
          /></td></tr></>
}
const NewGroups = ({ name, groupName, handelOnchange, identifiers, id, pid, productName }) => {

 //td_Group_Display_Name
 useEffect(() => {
  handelOnchange({identifiers, id, text:{target:{value:productName}}, pid})
 }, [])
 
    return <>
        <tr><td><Input type='text' id='basicInput' placeholder='Mesh2' defaultValue={productName} onChange={(text) => {
    handelOnchange({identifiers, id, text, pid})
  }} /></td></tr>
  </>
}

const GroupProducts = ({ productName, handelOnchange, identifiers, id, pid }) => {
  return <>
  <tr><td><Input type='text' id='basicInput' placeholder='Mesh3' onChange={(text) => {
    handelOnchange({identifiers, id, text, pid})
  }} 
  defaultValue={productName}  /></td></tr>
  </>
}

const Textures = ({groupColour, handelOnchange, identifiers, id, pid}) => {
  return <>
  <tr><td><Input type='text' id='basicInput' placeholder='texture' onChange={(text) => {
    handelOnchange({identifiers, id, text, pid})
  }} 
  defaultValue={groupColour}  /></td></tr>
  </>
}
// manisha
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  const handleSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  useLayoutEffect(() => {
    handleSize()

    window.addEventListener("resize", handleSize)

    return () => window.removeEventListener("resize", handleSize)
  }, [])
  return windowSize
}
// manisha
const MainRow = ({datard, id, PrOrList, props, DispalyNameRef, DispalyNameErrorRef, DispalyNameOnChange}) => {
  const [check, setcheck] = useState(datard.td_Is_Tryon || false)
  const [combocheck, setcombocheck] = useState(datard.td_Is_Combo || false)
  const [list, setlist] = useState()
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [newProduct, setNewProduct] = useState(null)
  const totalItems = datard.td_Image_Configuration.length
  const timestamp = Date.now()
  const handleAddProduct = (newPro) => {
    setNewProduct(newPro)
    }
    const handleAddGroupProduct = (newPro) => {
        //setNewGroupProduct(newPro)
    }
  useEffect(() => {
    if (datard.state === 0 && totalItems === 1) {
      setSelectedOrder(0)// If there is only one radio button, check the first one
      datard.td_Image_Configuration[0].td_is_drapedfabric = true
    } else if (totalItems > 1 && datard.state === 0) {
      setSelectedOrder(1) // If there are multiple radio buttons, check the second one
      datard.td_Image_Configuration[1].td_is_drapedfabric = true
    } else if (datard.state === 2) {
     setSelectedOrder(datard.isdrapeorder) 
    }
  }, [datard.td_Image_Configuration.length])
  const handelOnchange  = ({identifiers, id, text, pid, rootstage}) => {
        text = text.target.value
        UpdateThreedold({identifiers, id, text, pid, rootstage})
  }
  useEffect(() => {
    setlist(Threedold.length)
    }, [])

  return <>
  <tr key={id} id={`mainRow-${id}`} style={{backgroundColor: currentselected.id === id ? `#f7f7f7` : ''}} onClick={() => {
    if (currentselected.id !== id) {
      setCurrentselected(id)
      //setactive(currentselected)
    }
  }}>
    <td>{list}</td>
     <td>
            <div className="d-flex flex-column text-center align-items-center">
                  <img src={datard.imageUrl.startsWith('http') ? `${datard.imageUrl}?v=${timestamp}` : `data:image/jpeg;base64,${datard.imageUrl}`} alt={`Thum Images`} />
                  {/* `data:image/jpeg;base64,${base64String}` */}
                  {/* src={`${datard.imageUrl}?v=${timestamp}` */}
                  <span>{datard.td_Threed_Image_Name}</span>
                  <div className="pt-50">
                      <label style={{ fontSize: '0.8rem' }}>Rename</label>
                      <Input type='text' id='basicInput' innerRef={DispalyNameRef} placeholder={datard.td_Threed_Image_Display_Name} 
                      defaultValue={datard.td_Threed_Image_Display_Name} 
                      required
                      onChange={(event) => {
                        DispalyNameOnChange(event)
                        handelOnchange({identifiers:`td_Threed_Image_Display_Name`, id, text:event, pid:id, rootstage:true})
                      }}
                      className="text-align:center" />
                    </div>
                    <div style={{ color: 'red' }} className="error-message" ref={DispalyNameErrorRef}></div>
                  </div>
              </td>
              <td>
              <table className="ContentInner">
                {/* {
                  datard.td_Image_Configuration.map((e, k) => {
                   return <MultiSelectDropdown handelOnchange={handelOnchange}  identifiers={`td_Products`} pid={id} PrOrList={PrOrList} />
                  })
                } */}
                <MultiSelectDropdown handelOnchange={handelOnchange}  identifiers={`Td_Productname`} pid={id} PrOrList={PrOrList} rootstage={true} 
                //td_Productname = {datard?.Td_Productname[0]?.td_Productname} 
                      datard={datard} onAddProduct={handleAddProduct} onAddGroupProduct={handleAddGroupProduct}
                />   

              </table>
          </td>
          <td>
              <SelectOrg PrOrList={PrOrList} handelOnchange={handelOnchange} pid={id} identifiers={`td_Organisations`} also={`is_Exclusive`} datard={datard} />
          </td>
          <td style={{ textAlign: 'center' }}><Input type='text' className='text-center' id='basicInput' defaultValue={datard.td_Credit} onChange={(e) => {
              handelOnchange({ identifiers: `td_Credit`, pid: id, rootstage: true, id, text: e })
          }} />
          </td>
          <td>
              <div className='custom-control custom-checkbox'>
                  <Input type='checkbox' id="xx" name="aa" className='custom-control-input ' value={check} checked={check} onChange={(e) => {
                      handelOnchange({ identifiers: `td_Is_Tryon`, pid: id, rootstage: true, id, text: { target: { value: e.target.checked } } })
                      setcheck((prv) => !prv)
                  }} />
                  <label for="xx" className='custom-control-label' />
              </div>
          </td>
           <td>
              <div className='custom-control custom-checkbox'>
                  <Input type='checkbox' id="xy" name="ab" className='custom-control-input ' value={combocheck} checked={combocheck} onChange={(e) => {
                      handelOnchange({ identifiers: `td_Is_combo`, pid: id, rootstage: true, id, text: { target: { value: e.target.checked } } })
                      setcombocheck((prv) => !prv)
                  }} />
                  <label for="xy" className='custom-control-label' />
              </div>
          </td>
          <td>
          <SelectGender  handelOnchange={handelOnchange} pid={id} identifiers={`Td_Tryon_Gender`} td_Tryon_Gender={datard.td_Tryon_Gender} />
          </td>
            <td>
              <SelectTryonType  handelOnchange={handelOnchange} pid={id} identifiers={`Td_Tryon_type`} td_Tryon_Type={datard.td_Tryon_Type}/>
          </td>
          <td td style={{ textAlign: 'center' }}><Input type='text' className='text-center' id='basicInput' defaultValue={datard.td_Sub_Category} onChange={(e) => {
              handelOnchange({ identifiers: `Td_Sub_Category`, pid: id, rootstage: true, id, text: e })
          }}/></td>
          <td>
              <table className="ContentInner">
                  {                                                                                                                                                                    
                      datard.td_Image_Configuration.map((e, k) => {
                          return <ImgPicGroups
                          //src={e.groupPath}
                          key={e}
                          src={e.groupPath.startsWith('http') ? `${e.groupPath}?v=${timestamp}` : `data:image/jpeg;base64,${e.groupPath}`}
                          />
                      })
                  }
              </table>
          </td>
          <td style={{ textAlign: 'center' }}>
              <table className="ContentInner">
                  {
                      datard.td_Image_Configuration.map((e, k) => {
                          return <GroupImgOrder pid={id} id={k} identifiers={`td_Group_Order_No`}
                          handelOnchange={handelOnchange} GroupOrder={e.td_Group_Order_No} src={e.groupPath}
                              />
                      })
                  }
              </table>
            
          </td>
          <td>
                <table className="ContentInner">
                  {
                    datard.td_Image_Configuration.map((e, k) => {
                    return <DisplayGroupOrderNo pid={id} id={k} identifiers={`Td_Group_Display_Order_No`} 
                    productName={e.td_Group_Name}
                    handelOnchange={handelOnchange}  NewGroupOrder={e.td_Group_Display_Order_No} src={e.groupPath} />
                  })
                  }
              </table>
              </td>
              <td>
                <table className="ContentInner">
                  {
                    datard.td_Image_Configuration.map((e, k) => {
                    return <Drapeorder key={k} pid={id} id={k} identifiers={`td_is_drapedfabric`} 
                    //productName={e.td_Group_Name}
                    selectedOrder={selectedOrder}
                    setSelectedOrder={setSelectedOrder}
                    handelOnchange={handelOnchange}  
                    Drapeorder={e.td_is_drapedfabric} //td_is_drapedfabric
                    src={e.groupPath} totalItems={totalItems}/>
                  })
                  }
              </table>
              </td>   

              <td>
                <table className="ContentInner">
                    {
                        datard.td_Image_Configuration.map((e, k) => {
                        return <DefaultGroups pid={id} id={k} identifiers={`td_Group_Name`} 
                        handelOnchange={handelOnchange} name={e.td_Group_Name} src={e.groupPath} />
                      })
                    }
                </table>
              </td>
          
              <td>
                <table className="ContentInner">
                  {
                    datard.td_Image_Configuration.map((e, k) => {    
                    return <NewGroups pid={id} id={k} identifiers={`td_Group_Display_Name`} 
                    productName={e.td_Group_Name}
                    handelOnchange={handelOnchange} groupName={e.td_Group_Display_Name} />
                  })
                  }
              </table>
              </td>
              <td>
                <table className="ContentInner">
                { datard.td_Image_Configuration.map((e, k) => { 
                  return <MultiSelectDropdown2 handelOnchange={handelOnchange} identifiers={`td_Group_Products`} 
                  pid={id} id={k} PrOrList = { PrOrList } rootstage={false}  datard = {datard}
                   />
                   }) 
                   }

                {/*{ datard.td_Image_Configuration.map((e, k) => {*/}
                 
                {/*    return <Example PrOrList={ PrOrList }/>*/}
                {/*       })*/}
                {/*       }*/}
                  {/* { datard.td_Image_Configuration.map((e, k) => {
                 
                  return <GroupProducts pid={id} id={k} identifiers={`td_Group_Product_Name`} 
                        handelOnchange={handelOnchange} 
                        productName={e.td_Group_Product_Name} />
                        })
                        } */}
              </table>
              </td>
              <td>
                  <table className="ContentInner">
                    {datard.td_Image_Configuration.map((e, k) => <Textures pid={id} id={k} identifiers={`td_Group_Colour`} 
                    handelOnchange={handelOnchange} 
                    groupColour={e.td_Group_Colour} />)}
                  </table>
              </td>
             
          </tr>
  </>
}


const ContentTable = (props) => {
  const [Thumb, setThumb] = useState([])
  const windowSize = useWindowSize()

  useEffect(() => {
    setThumb(setThreedold(props.files ? props.files : []))
    }, [props.files])
  
  useEffect(() => {
    if (!props.modal) {
      reset()
    }
  
    return () => {}
  }, [props.modal])
  
  
  useEffect(() => {
    try {
      if (Threedold.length > 0) {
        setCurrentselected(currentselected.id, () => {
          DelIndex(currentselected.id, setThumb) 
        })
      } 
    } catch (error) {
      
    }

    return () => {
    }
  }, [props.reMoveid])

  useEffect(() => {
    if (Threedold.length > 0) {
    emptyThreedold(() => setThumb([]))
    }
    return () => {}
  }, [props.changeFile])

  const menuelement = document.getElementById("threedTable")
  const handleMouseDown = (event) => {
      menuelement.click()
  }

  return (
    <Table responsive className="text-center" id="threedTable"
    onClick={handleMouseDown}>
      
 <thead id="main-thead">
<tr>
      <th>sr.no</th>
      <th>Model</th>
      <th>Product</th>
      <th>Oranization Name</th>
      <th>Credits</th>
      <th>TryON</th>
      <th>Combo</th>
      <th>Gender</th>
      <th>TryON Type</th>
      <th>SubCategory</th>
      <th>Group Pic</th>
      <th>Group Order</th>
      <th>New Order</th>   
      <th>Drape Order</th> 
      <th>Group Name</th>
      <th>New Group Name</th>
      <th>Group Product</th>
      <th>Texture</th>   
  
 </tr>

</thead>
          <tbody style={{width :'({windowSize.width})px'}} width= {windowSize.width}>
            {
              //ToDOo :- Table body comp 
            }
              
              {
              props.files && Thumb.map((e, k) => <MainRow PrOrList={props.PrOrList} id={k} datard = {e} editdata={props.editdata} 
              DispalyNameRef={props.DispalyNameRef} DispalyNameErrorRef={props.DispalyNameErrorRef} DispalyNameOnChange={props.DispalyNameOnChange} />)
              }

      </tbody>
    </Table>
  )
}

export default ContentTable