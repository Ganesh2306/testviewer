// ** React Imports
import { useState, useContext, useEffect } from 'react'
import { Link, useLocation  } from 'react-router-dom'

// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Badge } from 'reactstrap'
import { Heart, Layers, Menu } from 'react-feather'
import axios from 'axios'
import { getDataForFav, BC_Menu } from '../../../../utility/_boardutils/utils'
import { bcMenuContext } from '../../../../views/context/bcMenuContext'
import { accessContext } from '../../../../views/context/accessContext'
const CollectionsMenu = (props) => {
    const [list, setlist] = useState([])
    const { is_boarduser, selectedUser, access } = useContext(accessContext)
    const { setbcMenudata, bcMenudata } = useContext(bcMenuContext)
    const URL = is_boarduser ? `/DesignSearch/GetBoardList` : `/DesignSearch/GetCollectionList`
    const location = useLocation()

    useEffect(() => {
        // console.log(location, 'hj')
        if (selectedUser) {
            let log_supplier_id, log_supplier_creBoaredID, log_supplier_custId
            if (is_boarduser) {
                if (localStorage.who === "Customer Admin" || localStorage.who === "Customer User") {
                    log_supplier_id = JSON.parse(localStorage.selecteduser).value
                    log_supplier_creBoaredID = JSON.parse(localStorage.userData).userid
                    log_supplier_custId = JSON.parse(localStorage.userData).org_type_id
                    //JSON.parse(localStorage.selecteduser).cus_orgtypeId
                } else {
                    log_supplier_id = JSON.parse(localStorage.userData).org_type_id
                    log_supplier_creBoaredID = JSON.parse(localStorage.selecteduser).user_id
                    log_supplier_custId = JSON.parse(localStorage.selecteduser).value
                }
            } else {
                log_supplier_id = JSON.parse(localStorage.selecteduser).user_id   
            }
            //const supp_id = JSON.parse(localStorage.userData).org_type_id;
            axios.get(`${URL}?id=${log_supplier_id}&custBoardId=${log_supplier_creBoaredID}&suppcustid=${log_supplier_custId}`).then((e) => {
                setlist(getDataForFav(JSON.parse(e.data)))
                setbcMenudata(getDataForFav(JSON.parse(e.data)))
                localStorage.setItem('selectUserBoard', e.data)
                localStorage.setItem("localUrl", JSON.parse(e.data).localUrl)
                
            })
        }
        return () => {
            setlist([])
        }
    }, [selectedUser])


    if (access["333339"]) {
        if (!is_boarduser && !access["333339"]["248889"]) {
            return <></>
        }
    }
    window.BC_Menu = BC_Menu.value
    return (
        <>
              {location.pathname === '/design' ? <UncontrolledDropdown tag='li' className='nav-item text-dark'>
           <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link px-0 text-dark' onClick={e => e.preventDefault()}>
                    <div className="position-relative ">
                        {selectedUser ? is_boarduser ? <><Menu style={{ display: (JSON.parse(localStorage.userData).organisationId === 757782875) ? 'none' : '' }}size={18} className='primary topFavList' /><Heart style={{ display: (JSON.parse(localStorage.userData).organisationId === 757782875) ? 'none' : '' }}className='topFavIcon'/></> : <Layers size={18} className='primary' /> : <></>} {selectedUser && <>
                            <Badge  style={{ display: (JSON.parse(localStorage.userData).organisationId === 757782875) ? 'none' : '' }}pill color='primary' className='badge-up'>
                                {(bcMenudata.length) ? bcMenudata.length : 0}
                            </Badge></>}
                    </div> 
                  {/*  <span className='align-middle'>{selectedUser ? is_boarduser ? `Boardssss` : `Collections` : <></>}</span>*/}
                    <span className='align-middle'>{selectedUser ? is_boarduser ? `` : `` : <></>}</span>
                </DropdownToggle> 

                <DropdownMenu right>
                    <DropdownItem>
                        <span className='align-middle'><h5>Recent Wishlist</h5></span>
                    </DropdownItem>
                    {
                        bcMenudata && bcMenudata.length > 0 && <DropdownItem
                            onClick={() => {
                                BC_Menu.value = true
                                //searchTemplate.designName = ""
                            }}          //Added By Vijay Added On : 24-12-2022, Purpose : Show delete icon on viewing board or collection    
                            //tag={Link} to={`/design/${list.length - 1}`} state = "board" >
                            tag={Link} to={{ pathname: `/Boards/${bcMenudata.length - 1}`, state: "board" }} >
                            <span className='align-middle'>{bcMenudata[bcMenudata.length - 1]?.board_Name}{bcMenudata[bcMenudata.length - 1]?.collection_Name}</span>
                        </DropdownItem>
                    }
                    {
                        bcMenudata && bcMenudata.length > 1 && <DropdownItem
                            onClick={() => {
                                BC_Menu.value = true
                                //searchTemplate.designName = ""
                            }}
                            //Added By Vijay Added On : 24-12-2022, Purpose : Show delete icon on viewing board or collection    
                            // tag={Link} to={`/design/${list.length - 2}`} >
                            tag={Link} to={{ pathname: `/Boards/${bcMenudata.length - 2}`, state: "board" }} >
                            <span className='align-middle'>{bcMenudata[bcMenudata.length - 2]?.board_Name}{bcMenudata[bcMenudata.length - 2]?.collection_Name}</span>
                        </DropdownItem>
                    }
                    {
                        //Added By Vijay Added On : 24-12-2022, Purpose : Show delete icon on viewing board or collection    
                        //list && list.length > 2 &&  <DropdownItem tag={Link} to={`/design/${list.length - 3}`}>
                        bcMenudata && bcMenudata.length > 2 && <DropdownItem tag={Link} to={{ pathname: `/Boards/${bcMenudata.length - 3}`, state: "board" }}>
                            <span className='align-middle'>{bcMenudata[bcMenudata.length - 3]?.board_Name}{bcMenudata[bcMenudata.length - 3]?.collection_Name}</span>
                        </DropdownItem>
                    }
                    {
                        bcMenudata && bcMenudata.length > 3 && <DropdownItem
                            onClick={() => {
                                BC_Menu.value = true
                                //searchTemplate.designName = ""
                            }}
                            //Added By Vijay Added On : 24-12-2022, Purpose : Show delete icon on viewing board or collection    
                            //tag={Link} to={`/design/${list.length - 4}`}>
                            tag={Link} to={{ pathname: `/Boards/${bcMenudata.length - 4}`, state: "board" }}>
                            <span className='align-middle'>{bcMenudata[bcMenudata.length - 4]?.board_Name}{bcMenudata[bcMenudata.length - 4]?.collection_Name}</span>
                        </DropdownItem>
                    }

                    <span><hr /></span>
                    <DropdownItem
                        onClick={() => {
                            BC_Menu.value = true
                            //searchTemplate.designName = ""
                        }}
                        tag={Link} to='/Viewboards' >
                        <span className='align-middle'>Show all {selectedUser ? is_boarduser ? `Wishlist` : `Collections` : <></>}</span>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown> : null }

        </>
    )
}

export default CollectionsMenu
