// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Components
import * as Icon from 'react-feather'
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { handleSearchQuery } from '../../store/action'

const NavbarSearch = (props) => {
  // ** Store Vars
  const dispatch = useDispatch()

  // ** States
  const [suggestions, setSuggestions] = useState([])
  const [navbarSearch, setNavbarSearch] = useState(true)
  const [showSearch, setShowSearch] = useState(false)

  // ** ComponentDidMount
  useEffect(() => {
    /* axios.get('./api/main-search/data').then(({ data }) => {
      setSuggestions(data.searchArr)
    }) */
  }, [])

  // ** Removes query in store
 const handleClearQueryInStore = () => dispatch(handleSearchQuery(''), setShowSearch(false))

  // ** Function to handle external Input click
    const handleExternalClick = () => {
          handleClearQueryInStore()   
         
  }

  // ** Function to clear input value
    const handleClearInput = setUserInput => {
        setUserInput('')
        handleClearQueryInStore()
  }

  // ** Function to close search on ESC & ENTER Click
    const getSearchData = (e) => {
    if (e.keyCode === 27 || e.keyCode === 13) {
      setTimeout(() => {       
          handleClearQueryInStore()
      }, 1)
    }
        //Added By : Vijay Pansande, Added On : (15/17)-11-2022, Purpose search card on the basis on card name 
        props.searchCardByName(e.target.value)
  }

  // ** Function to handle search suggestion Click
  const handleSuggestionItemClick = () => {
      handleClearQueryInStore()
  }

  // ** Function to handle search list Click
  const handleListItemClick = (func, link, e) => {
    func(link, e)
    setTimeout(() => {
      setNavbarSearch(false)
    }, 1)
      handleClearQueryInStore()
  }

    return (
        <>
   
       <InputGroup className='input-group-merge'>
                <Input
                    placeholder='Search Cards...'
                    className='search-product'
                    filterKey='title'
                    filterHeaderKey='groupTitle'
                    grouped={true}
                    autoFocus={true}
                    externalClick={handleExternalClick}
                    clearInput={(userInput, setUserInput) => handleClearInput(setUserInput)}
                    onKeyUp={(getSearchData, setShowSearch)} 
                                      
                />
                <InputGroupAddon addonType='append' className='search_button'>
                    <InputGroupText >
                        <Icon.Search className='text-muted' size={14}/>
                    </InputGroupText>
                    <div className='search-input-close' style={{ display: showSearch ? "block" : "none" }}
                        onClick={e => {
                            e.stopPropagation()
                            handleClearQueryInStore() 
                            setShowSearch(false)             
                        }}>
                        <Icon.X 
                            className='ficon'
                        />
                    </div> 
                </InputGroupAddon>
               
            </InputGroup>
            </>        
   
            )
}

export default NavbarSearch
