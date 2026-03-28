
import {
  Row,
  Col, 
  CustomInput
} from 'reactstrap'
import { perpage, updateOrderBy } from './DesignsPage'

const RightOptions = ({show, rowsPerPage, setPoc, OrderBy, ThumSize, poc}) => {
  return (
    <>
    <div className='view-options d-flex pt-50'>
    { !show &&   <CustomInput
                            className='form-control mx-50 cursor'
                            type='select'
                            id='rows-per-page'
                            innerRef={rowsPerPage}
                            defaultValue={'25'}                             
                            style={{
                              width: '5rem',
                              padding: '0 0.8rem',
                              backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
                            }}

                            onChange = {(e) => {
                              perpage(parseInt(e.target.value))                           
                             setPoc(!poc)
                            }}
                        >
                            <option value='10' className='dropdown-sort'>10</option>
                            <option value='20' className='dropdown-sort'>20</option>
                            <option value='25' className='dropdown-sort'>25</option>
                            <option value='50' className='dropdown-sort'>50</option>
        </CustomInput> }

{     !show && <CustomInput
                            className='form-control mx-50 cursor'
                            type='select'
                            id='dfhhfd-size-bfjb'
                            innerRef={OrderBy}
                            defaultValue={'25'}                             
                            style={{
                              width: '5rem',
                              padding: '0 0.8rem',
                              backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
                            }}

                            onChange = {(e) => {       
                             
                             updateOrderBy({isRating : undefined, isName : OrderBy.current.selectedIndex === 0, isLatest : OrderBy.current.selectedIndex === 1 })
                             setPoc(!poc)
                            }}
                        >
                            
                            <option value='Name' className='dropdown-sort'>Name</option>
                            <option value='Latest' className='dropdown-sort'>Latest</option>
                            {/* <option value='Rating' className='dropdown-sort'>Rating</option> */}
        </CustomInput>
}
          <CustomInput 
          className='form-control mx-50 sel_size cursor'
          id='my-dfdfd-dfdf-dfd'
          type='select'
          onClick={
            (e) => {
              ThumSize.current.id = e.target.value             
            }
          } >
          <option value='medium_grid' className='dropdown-sort'>Medium</option>
          <option value='large_grid' className='dropdown-sort'>Large</option>
          </CustomInput>        
       </div>
    </>
  )
}

const DesignHeader = props => {
  const { activeView, setActiveView, dispatch, getProducts, store, setSidebarOpen, showfloat, setcollview, showCategory  } = props
  /* const { boardId } = useParams()
  const {is_boarduser, board} = useContext(accessContext) */

  window.order = () => props.OrderBy
  return (
    <> 
    {showCategory ? <div className='ecommerce-header row_search_b'>   
      <Row>
        <Col sm='12'>
          <div className='ecommerce-header-items pr-1'>
             <div className='d-flex align-items-center'>               
                  <div className='result-toggler ml-1'>
                  {/*<span className='search-results small '>{props.totalCount}</span> */}
                     <h5 className='m-0 py-50 collhead ml-1'><small></small></h5>    
                      <div className='align-items-center bn_name'> <b>{props.name}</b></div> 
                  </div> 
             </div>   
          { <RightOptions show={props.showRightOptions} setPoc={props.setPoc} rowsPerPage={props.rowsPerPage} OrderBy={props.OrderBy} ThumSize={props.ThumSize} poc={props.poc} />}
    
          </div>
        </Col>
      </Row>
    </div> : <></> }
    </>
  )
}

export default DesignHeader
