// ** React Imports
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { accessContext } from '../../../../views/context/accessContext'
import { bcMenuContext } from '../../../../views/context/bcMenuContext'
// ** Third Party Components
import axios from 'axios'
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Badge } from 'reactstrap'
import { Heart, Book, pill, Layers, Menu } from 'react-feather'
import { BC_Menu, getDataForFav } from '../../../../utility/_boardutils/utils'
//import { searchTemplate } from '../../../../views/design/designview/Sidebar'

const BoardsMenu = (props) => {

    const { access, board, setboard, selectedUser, is_boarduser } = useContext(accessContext)
    const { bcMenudata, setbcMenudata} = useContext(bcMenuContext)
    //const [list, setlist] = useState([])
    const URL = is_boarduser ? `/DesignSearch/GetBoardList` : `/DesignSearch/GetCollectionList`

    useEffect(async() => {
        if (selectedUser) {
            if (!is_boarduser) {

            let log_supplier_id, log_supplier_creBoaredID, log_supplier_custId

            if (localStorage.who === "Customer Admin" || localStorage.who === "Customer User") {
                log_supplier_id = JSON.parse(localStorage.selecteduser).value
                log_supplier_creBoaredID = JSON.parse(localStorage.userData).userid
                log_supplier_custId = JSON.parse(localStorage.userData).org_type_id
                //JSON.parse(localStorage.userData).org_type_id
            } else {
                log_supplier_id = JSON.parse(localStorage.userData).org_type_id
                log_supplier_creBoaredID = JSON.parse(localStorage.selecteduser).user_id
                log_supplier_custId = JSON.parse(localStorage.selecteduser).value
            }
            const response = await axios.get(`/DesignSearch/GetBoardList?id=${log_supplier_id}&custBoardId=${log_supplier_creBoaredID}&suppcustid=${log_supplier_custId}`)
            //.then((e) => {
                // setboard(getDataForFav(JSON.parse(e.data)))
                // const data = getDataForFav(JSON.parse(e.data))
                // localStorage.setItem("board", JSON.stringify(data))
                // // localStorage.setItem('selectUserBoard', e.data)
                // localStorage.setItem("localUrl", JSON.parse(e.data).localUrl)
                const data = JSON.parse(response.data)
                localStorage.setItem("board", response.data) 
                //sessionStorage.setItem("privselected", response.data)
                setboard(getDataForFav(data))
                localStorage.setItem('selectUserBoard', response.data)
            //})

            }
        }
    }, [selectedUser])
    

    if (access["333339"]) {
        if (is_boarduser && !access["333339"]["248889"]) {
            return <></>
        }
    }
    const len = board?.length //(board && board.allFavoriteList) ? board.allFavoriteList.length : 0
    return (
        <UncontrolledDropdown tag='li' className='nav-item text-dark'>
            <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link text-dark px-0 d-xl-block d-md-block d-none' onClick={e => e.preventDefault()}>
                <div className="position-relative  mr-75 ">
                    {/* {selectedUser ? is_boarduser ? <Book size={18} className='primary' /> : <Layers size={18} className='primary' /> : <></>} */}
                    {!is_boarduser ? <><Menu  style={{ display: (JSON.parse(localStorage.userData).organisationId === 757782875) ? 'none' : '' }}size={18} className='primary topFavList' /><Heart  style={{ display: (JSON.parse(localStorage.userData).organisationId === 757782875) ? 'none' : 'flex' }}className='primary topFavIcon'  size={18} /></> : <div className='ml-1'><Layers size={18} className='primary' /><span className="ml-50 collectionText">Collection</span></div>}
                     {/* <Book size={18} className='primary' /> */}
                    <Badge  style={{ display: (JSON?.parse(localStorage?.userData)?.organisationId === 757782875) ? 'none' : '' }} pill color='primary' className='badge-up'>
                        {(len) ? len : 0}
                    </Badge>
                </div>
             {/*   <span className='align-middle'>{!is_boarduser ? `Boardsssss` : `Collections`}</span>*/}
                <span className='align-middle'>{!is_boarduser ? `` : ``}</span>
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem >
                    <span className='align-middle'><h5>Recent Wishlist</h5></span>
                </DropdownItem>
                {
                board && len > 0 && <DropdownItem 
                onClick={() => {
                    BC_Menu.value = false
                    //searchTemplate.designName = ""
                        }}
                        //Added By Vijay Added On : 24-12-2022, Purpose : Show delete icon on viewing board or collection    
                        //tag={Link} to={`/design/${len - 1}`}>
                        tag={Link} to={{ pathname: `/Boards/${len - 1}`, state: "board" }}>
                <span className='align-middle'>{board[len - 1]?.board_Name}{board[len - 1]?.collection_Name}</span>
            </DropdownItem>
            }
            {
                board && len > 1 &&  <DropdownItem onClick={() => {
                    BC_Menu.value = false
                    //searchTemplate.designName = ""
                    //Added By Vijay Added On : 24-12-2022, Purpose : Show delete icon on viewing board or collection    
                }} //tag={Link} to={`/design/${len - 2}`} >
                   tag={Link} to={{ pathname: `/Boards/${len - 2}`, state: "board" }}>
                <span className='align-middle'>{board[len - 2]?.board_Name}{board[len - 2]?.collection_Name}</span>
            </DropdownItem>
            }
            {
                board && len > 2 &&  <DropdownItem onClick={() => {
                    BC_Menu.value = false
                    //searchTemplate.designName = ""
                        //Added By Vijay Added On : 24-12-2022, Purpose : Show delete icon on viewing board or collection   
                }} //tag={Link} to={`/design/${len - 3}`}>
                        tag={Link} to={{ pathname: `/Boards/${len - 3}`, state: "board" }}>
                <span className='align-middle'>{board[len - 3]?.board_Name}{board[len - 3]?.collection_Name}</span>
            </DropdownItem>
            }
            {
                board && len > 3 &&  <DropdownItem onClick={() => {
                    BC_Menu.value = false
                    //searchTemplate.designName = ""
                        //Added By Vijay Added On : 24-12-2022, Purpose : Show delete icon on viewing board or collection   
                }} //tag={Link} to={`/design/${len - 4}`}>
                        tag={Link} to={{ pathname: `/Boards/${len - 4}`, state: "board" }}>
                <span className='align-middle'>{board[len - 4]?.board_Name}{board[len - 4]?.collection_Name}</span>
            </DropdownItem>
            }
            
                <span><hr /></span>
                <DropdownItem tag={Link} to='/Viewboards'
                onClick={() => {
                    BC_Menu.value = false
                    //searchTemplate.designName = ""
                }}
                >
                    <span className='align-middle'>Show all {!is_boarduser ? `Wishlist` : `Collections`}</span>
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    )
}

export default BoardsMenu

