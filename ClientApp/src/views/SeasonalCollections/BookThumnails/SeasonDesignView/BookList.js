import { Check } from 'react-feather'
import { useHistory } from 'react-router-dom'
import { ListGroup, Card, CardImgOverlay, CardText, CardImg, CardTitle } from 'reactstrap'
import PerfectScrollbar from 'react-perfect-scrollbar'
function hashCode(str) {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    return hash
}

function pickColor(str) {
    return `hsl(${hashCode(str) % 360}, 100%, 80%)`
}
const BookList = (props) => {
 
    const history = useHistory()
    const {    
        showCategory, setAllCataDesign
      } = props
    
 
    const passData = (tab, e, k) => {
        localStorage.setItem("value", k)
        // console.log(e)
        $('.bookcard.selected_card').removeClass('selected_card')
        props.getData(tab)
        $(e.target.parentElement).closest('.bookcard').addClass('selected_card')
    }
    

    return (
        <>
            {showCategory ? <div className='ecommerce-header row_search books'>
                <input type="checkbox" value="Male" name="catalogues" onClick={(e) => { setAllCataDesign(e => !e) }} />
                  <span className='pl-1'>All Catalogues</span>                 
             </div> : <></>}
            
        <PerfectScrollbar>
        <ListGroup tag='div' className='list-group-labels'>                         
                    {props.catalogues && props.catalogues.map((e, k) => {
                        const obj = { CollectionId: e.collectionId, CollectionType: e.collectionType, ProductTypeId: e.productTypeId, ProductGroupId: e.productGroupId}
                        return <Card className='text-white border-0 cardlayer' id = {k} onClick={(e) => { passData(obj, e, k) }} style={{background: 'none'}}>
                          
                            <Card className={k === 0 ? 'bookcard cursor selected_card' : 'bookcard cursor'} style={{ backgroundColor:'' }}>
                                <CardImg topalt='card-overlay' />
                                <CardImgOverlay className='overlay'>
                                        { k === Number(localStorage.getItem("value")) ? <div className="book_active active"><Check size={16} /></div> : ""}
                                    <CardTitle tag='h5'>
                                        {e.catalogueName}
                                    </CardTitle>                            
                                    <CardText>
                                        <small className='text-muted'>{e.articleName}</small>
                                    </CardText>
                                </CardImgOverlay>
                            </Card>
                    </Card>
                })
            }
         </ListGroup>
                {/*<ListGroup tag='div' className='list-group-labels'>*/}
                {/*    {props.catalogues && props.catalogues.map((e, k) => {*/}
                {/*        const obj = { CollectionId: e.collectionId, CollectionType: e.collectionType, ProductTypeId: e.productTypeId, ProductGroupId: e.productGroupId }*/}
                {/*        return <Card className='text-white border-0 bookcard cursor ' style={{ backgroundColor: 'red' }} onClick={() => { passData(obj) }}>*/}
                {/*            <div className='selected_card'>*/}
                {/*                <CardImg topalt='card-overlay' />*/}
                {/*                <CardImgOverlay className='overlay'>*/}
                {/*                    {k === 0 ? <div className="book_active active"><Check size={16} /></div> : ""}*/}
                {/*                    <CardTitle tag='h5'>*/}
                {/*                        {e.catalogueName}*/}
                {/*                    </CardTitle>*/}
                {/*                    <CardText>*/}
                {/*                        <small className='text-muted'>Color Pattern & Designs</small>*/}
                {/*                    </CardText>*/}
                {/*                </CardImgOverlay>*/}
                {/*            </div>*/}
                {/*        </Card>*/}
                {/*    })*/}
                {/*    }*/}
                {/*</ListGroup>*/}
        </PerfectScrollbar>
</>
    )

}
export default BookList

