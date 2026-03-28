// ** React Imports

import { BookData } from '../BookData/bookdata'
import CardThumb from './CardThumb'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Menu } from 'react-feather'

// ** Renders Mail
const SeasonCard = (props) => {
    const {       
        setSidebarOpen
    } = props
    return (
        <>
            <div className='sidebar-toggle d-block d-lg-none ml-1' onClick={() => setSidebarOpen(true)}>
                <Menu className='book-icon' />
            </div>
        <PerfectScrollbar className="ecommerce-application myseasons">
            <div className="grid-view">
                {
                    BookData.map((e, k) => {
                        return <CardThumb title={e.Design_Name} src={e.CardImage} />
                    })
                }
            </div>
            </PerfectScrollbar>
        </>
    )
}

export default SeasonCard