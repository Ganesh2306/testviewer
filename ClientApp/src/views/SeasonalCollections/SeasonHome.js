import { Fragment, useState, useEffect, useContext } from 'react'
import { TabContent, TabPane, NavItem, Button } from 'reactstrap'
import { SeasonCard } from './SeasonCard'
import stock from '../../assets/images/pages/stock.jpg'
import sample from '../../assets/images/pages/sample1.jpg'
import nos from '../../assets/images/pages/nos1.jpg'
import customercollection from "../../assets/images/pages/seasons_fabric.jpg"
import seasonal_collezioni from '../../assets/images/pages/collezioni_app.jpg'
import './css/seasonspage.css'
import Swal from 'sweetalert2'
//below swal not working in publish so updated above Swal by manisha
//const Swal = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js")
import axios from 'axios'
import { accessContext } from '../../../src/views/context/accessContext'
import loder from "../../assets/images/fabicon/loaderTds.gif"
import { object } from 'prop-types'

const arr = [
    { id: 1, name: "Stock", src: stock },
    { id: 2, name: "Nos", src: nos },
    { id: 3, name: "Samples", src: sample },
    { id: 4, name: "My Collection", src: customercollection },
    { id: 5, name: "Winter", src: seasonal_collezioni },
    { id: 6, name: "Stock", src: stock },
    { id: 7, name: "Nos", src: nos },
    { id: 8, name: "Samples", src: sample },
    { id: 9, name: "My Collection", src: customercollection },
    { id: 10, name: "Winter", src: seasonal_collezioni }
]
const optionsb = [
    { id: 7, name: "Nos", src: nos },
    { id: 8, name: "Samples", src: sample },
    { id: 9, name: "My Collection", src: customercollection },
    { id: 10, name: "Winter", src: seasonal_collezioni }
]
const optionsc = [
    { id: 9, name: "My Collection", src: customercollection },
    { id: 10, name: "Winter", src: seasonal_collezioni }
]
const Seasontab = () => {
    const { is_boarduser, selectedUser, access } = useContext(accessContext)
    const [active, setActive] = useState(0)
    const [allSeasons, setAllSeason] = useState(null)
    const [seasonWiseCol, setCollection] = useState(null)
    const [seasonID, setseasonID] = useState(null)
    const [loading, setLoading] = useState(true)
    const toggleSeasons = (tab, index) => {
        setActive(index)
        const getSeasonWiseColListObj = { SeasonId: tab }
        getSeasonWiseColListObj.SupplierId = !is_boarduser && selectedUser ? selectedUser.value : 0
        getSeasonWiseColListObj.customerId = is_boarduser && selectedUser ? selectedUser.value : 0
        setseasonID(tab)
        localStorage.setItem('selectedSeasonIndex', index)
        localStorage.setItem('selectedSeasonID', tab)
        setLoading(true)
        //Abhishek daynamic url 
        const finalAppendFabrics = (pareseData, type = `t`) => {
            return {
                totalCount: pareseData.totalCount,
                designMaster: pareseData.map((e) => {  
                    return {
                        ...e,
                        localUrl: `${e.localUrl }/${e.seasonId }/${e.collectionName}.jpg`,
                        collectionImageUrl: `${e.localUrl }/${e.seasonId }/${e.collectionName}.jpg`
                    }
                })
            }
        }
        axios.post("/DesignSearch/getSeasonWiseColListObj", getSeasonWiseColListObj).then(e => {
            const pareseData = JSON.parse(e.data).collectionNameIdDto
            const updatepares = finalAppendFabrics(pareseData)
            // console.log(updatepares)
            setCollection(updatepares.designMaster)
            setLoading(false)
        }).catch(err => Swal.fire({
            icon: 'error',
            title: 'Collections',
            text: "some thing went wrong"
        }))
    }

    useEffect(() => {
        const obj = {}
        const finalAppendFabrics = (pareseData, type = `t`) => {
            return {
                totalCount: pareseData.totalCount,
                designMaster: pareseData.map((e) => {  
                    return {
                        ...e,
                        localUrl: `${e.localUrl }/${e.seasonId }/${e.collectionName}.jpg`,
                        collectionImageUrl: `${e.localUrl }/${e.seasonId }/${e.collectionName}.jpg`
                    }
                })
            }
        }
        obj.SupplierId = !is_boarduser && selectedUser ? selectedUser.value : 0 //JSON.parse(localStorage.selecteduser).value  //Abhishek
        obj.customerId = is_boarduser && selectedUser ? selectedUser.value : 0
        setLoading(true)
        axios.post("/DesignSearch/getAllSeason", obj).then(e => {
            
            setAllSeason(JSON.parse(e.data.result1).seasonNameIdDto)
            if (!Number(localStorage.selectedSeasonIndex)) {
                setseasonID(JSON.parse(e.data.result1).seasonNameIdDto[0].seasonId)
                const pareseData = JSON.parse(e.data.result2).collectionNameIdDto
                const updatepares = finalAppendFabrics(pareseData)
                setCollection(updatepares.designMaster)
                //setCollection(JSON.parse(e.data.result2).collectionNameIdDto)
            } else { toggleSeasons(localStorage.selectedSeasonID, Number(localStorage.selectedSeasonIndex)) }
            setLoading(false)
        }).catch(err => Swal.fire({
            icon: 'error',
            title: 'Seasons',
            text: "some thing went wrong"
        }))
    }, [])
    return (
        <Fragment>
            {loading ? <div className="loder"><img src={loder} height={80} width={80} /></div> : ''}
            <ul className='ButtonGroup groupfixed bg-light' id="book_catlog">

                {allSeasons && allSeasons.map((e, k) => (<NavItem>
                    <Button color='light' active={k === active}
                        onClick={() => {
                            toggleSeasons(e.seasonId, k)
                        }}>{e.seasonName}</Button>
                </NavItem>))}

            </ul>
            <TabContent className='py-50 grandparent' activeTab="0" id="book_list">
                <TabPane tabId='0'>
                    <div className="parent">
                        <div>
                            {seasonWiseCol && seasonWiseCol.map((e, k) => {
                                return <SeasonCard key={`${e.collectionName}_${seasonID}`} titleName={e.collectionName} banner={e.collectionImageUrl} localUrl={e.localUrl} seasonID={seasonID} k={k} />
                            })}

                        </div>
                    </div>
                </TabPane>
            </TabContent>
        </Fragment>
    )
}
export default Seasontab
