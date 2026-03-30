// ** React Imports
import { useHistory } from 'react-router-dom'
import { Fragment } from 'react'
// ** Custom Components
import NavbarUser from './NavbarUser'
import SeasonNavbarBookmarks from './SeasonNavbarBookmarks'

const ThemeNavbar = props => {
    const history = useHistory()
    // ** Props
    const { skin, setSkin, setMenuVisibility } = props
    return (
        <Fragment>
            <div className='bookmark-wrapper d-flex align-items-center'>
                <SeasonNavbarBookmarks setMenuVisibility={setMenuVisibility} />
            </div>
             <NavbarUser skin={skin} setSkin={setSkin} />
           
        </Fragment>
    )
}

export default ThemeNavbar
