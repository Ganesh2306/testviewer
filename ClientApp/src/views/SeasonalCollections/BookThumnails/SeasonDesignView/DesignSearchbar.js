// ** Third Party Components
import { Search, ChevronLeft, ChevronRight } from 'react-feather'
import { useParams } from 'react-router-dom'   
import {
    Row,
    Col,
    InputGroup,
    InputGroupAddon,
    Input,
    InputGroupText,
    CustomInput,
    Form,
    Label} from 'reactstrap'
    
import { setLogical } from './Sidebar'
import classnames from 'classnames'
import { textSearch } from './DesignsPage'
import NavbarSearch from '../../../../@core/layouts/components/navbar/NavbarSearch'
let Text = ""

const DesignSearchbar = props => {

  const { floatbook, setSidebarOpen, sidebarOpen, showCategory } = props
  const { boardId } = useParams()
  // ** Props
  // *** LogicalOperator={LogicalOperator}

    return (
        <>
            <Row className='row_search'>
                   <button className='navbar-toggler shop-sidebar-toggler p-25 bg-primary' onClick={() => setSidebarOpen(true)}>
                          <span className='navbar-toggler-icon d-lg-none d-flex-sm mobile-filter-text'>
                            <span className='text-white mb-50'> Collection</span>
                            
                          </span>
                      </button>
                          <div id='book_filter_button' className='align-items-center d-flex toggle_filter d-flex-row'  onClick = {() => {                                   
                                                if (floatbook.current) {
                                                if (floatbook.current.id === 'on_book_filter') {
                                                    floatbook.current.id = 'off_book_filter'
                                                } else {
                                                    floatbook.current.id = 'on_book_filter'
                                                }
                                            }
                                            }} 
                                    > Collection
                                    <span> <ChevronLeft className='goleft'/><ChevronRight className='goright'/>  </span>
                                    <small>catalogues</small>
                          </div> 
                      <div
                    className={classnames('body-content-overlay', {
                      show: sidebarOpen
                    })}
                    onClick={() => setSidebarOpen(false)}
                  > 
                  </div>
              <Col className="p-1 bg-light mysearch_head d-flex">
                 { showCategory ? <div id='ecommerce-searchbar' className='ecommerce-searchbar w-100'>
                          <Row className='d-flex justify-content-between flex-nowrap m-0'>
                            <div className='mr-50 w-100'>
                              <Form onSubmit={(e) => {
                                        e.preventDefault()
                                        textSearch(Text)
                                      }}>
                                <InputGroup className='input-group-merge'>
                                  <Input
                                    className='search-product' /// {props.cataloguesName} seasonName : {props.seasonName} / collectionName : {props.collectionName} / cataloguesName : {props.cataloguesName}
                                    placeholder='Search Design'
                                    onChange={e => {
                                      Text = e.target.value
                                    }}
                                  />
                                  <InputGroupAddon addonType='append'>
                                    <InputGroupText>                                    
                                      <Search type='submit' className='text-primary' size={22} 
                                      onClick={(e) => {                                     
                                      textSearch(Text)
                                    }}
                                      />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                </InputGroup>
                                </Form>
                            </div>                          
                        </Row>
                    </div> : <><h5 className='m-0 py-50 w-50 collhead '> {props.seasonName} / {props.collectionName} / {props.cataloguesName} <small> ({props.setCardCount} cards) </small></h5>
                            <div className='d-flex w-50 justify-content-end'>
                                <div className='toggle_search_panel mr-1'>                                                    
                                   <div className='navbar-container d-flex content'>
                                            <ul className='nav navbar-nav align-items-center ml-auto'>
                                                {/* <NavbarSearch searchCardByName={props.searchCardByName} /> */}
                                        </ul>
                                   </div>                                                
                                </div>
                                <Label className = 'mt-75'> Sort By</Label>
                                <CustomInput
                                    className='form-control mx-50 cursor'
                                    type='select'
                                    id='rows-per-page'
                                    // innerRef={rowsPerPage}
                                    defaultValue={'Sort By'}
                                    style={{
                                        width: '6rem',
                                        padding: '0 0.8rem',
                                        backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
                                    }}
                                    onChange={(e) => { props.setSearchType(e.target.value) } }>
                                    {/* <option value='cardcode' className='dropdown-sort'>Name</option> */}
                                    <option value='pageNumber' className='dropdown-sort'>Page</option>
                                </CustomInput>
                            </div>
                     </> 
                  }                 
               
                </Col> 
            </Row> 
            { /* boardId ? <BoardHeader/> : " " */}
     </>
  )
}

export default DesignSearchbar
