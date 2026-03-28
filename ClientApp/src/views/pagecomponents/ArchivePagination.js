//import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import ReactPaginate from 'react-paginate'
import { useEffect, useState } from 'react'
import { OnclickPageClick, track } from '../design/designview/Sidebar'
import { useParams } from 'react-router-dom'
import { OnpageClick } from '../SeasonalCollections/BookThumnails/SeasonDesignView/DesignsPage'
const ArchivePagination = (props) => {

   // const dep = props.rowsPerPage.current && props.rowsPerPage.current[props.rowsPerPage.current.selectedIndex].value   
const [pageCount, setpageCount] = useState(1)
const [parPage, setparPage] = useState(10)
const [selectedPage, setSelectedPage] = useState(0)
const { boardId } = useParams()

useEffect(() => {
    window.getout = track
    if (props.rowsPerPage.current && props.DesignCount !== '') {
       
        if (track.isChanged() || track.type || track.group || track.textSearch || track.resChanged()) {
            track.resetTypeGroup()
            //setSelectedPage(0)
            props.setSelectedPage(0)
        } 
        const rowsPerPage = Number(props.rowsPerPage.current[props.rowsPerPage.current.selectedIndex].value)
         setpageCount(Math.ceil(Number((props.DesignCount / rowsPerPage))))
         setparPage(rowsPerPage)
    }

}, [props.poc, props.DesignCount, boardId])
   
const handlePagination = page => {
    
    //setSelectedPage(page.selected)
    props.setSelectedPage(page.selected)
    const start = page.selected === 0 ? 0 : page.selected * parPage
    const end = parPage
    OnclickPageClick(start, end)
    OnpageClick(start)
    props.setPoc(!props.poc)
    if (document.getElementById("pagechk")) {
        document.getElementById("pagechk").checked = false
    }
    }
    

    return (
           <ReactPaginate
                    nextLabel={''}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    onPageChange={page => handlePagination(page)}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={2}
                    forcePage={props.selectedPage}
                    activeClassName={'active'}
                    pageClassName={'page-item'}
                    previousLabel={''}
                    nextLinkClassName={'page-link'}
                    nextClassName={'page-item next-item'}
                    previousClassName={'page-item prev-item'}
                    previousLinkClassName={'page-link'}
                    pageLinkClassName={'page-link'}
                    breakClassName='page-item'
                    breakLinkClassName='page-link'
                    containerClassName={'pagination react-paginate'}
                    className='justify-content-center'
                />        
    )
}
export default ArchivePagination
