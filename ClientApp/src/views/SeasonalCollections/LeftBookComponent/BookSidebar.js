// ** Third Party Components
import classnames from 'classnames'
import { useParams } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import BookList from '../LeftBookComponent/BookList'

const BookSidebar = props => {
    // ** Props
    const { store, sidebarOpen, toggleCompose, dispatch, getMails, resetSelectedMail, setSidebarOpen } = props
    // ** Vars
    const params = useParams()
  
    return (
        <div
            className={classnames('sidebar-left', {
                show: sidebarOpen
            })}
        >
            <div className='sidebar'>
                <div className='sidebar-content email-app-sidebar bg-light'>
                    <div className='email-app-menu'>                       
                        <PerfectScrollbar className='sidebar-menu-list' >
                            <BookList/>
                        </PerfectScrollbar>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookSidebar
