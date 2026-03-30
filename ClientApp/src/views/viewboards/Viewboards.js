import BoardTable from './ViewBoardComponent/BoardTable'
import './css/viewboard.css'
// ** Styles
import '@styles/base/pages/app-ecommerce.scss'

const Viewboards = (props) => { 
  return (
    <div className = 'viewcol_boardpanel'>   
          <BoardTable />          
    </div>
  )
}
export default Viewboards
