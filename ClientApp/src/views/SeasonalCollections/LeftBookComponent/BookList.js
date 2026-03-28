import { useHistory } from 'react-router-dom'
import { ListGroup, Card, CardImgOverlay, CardText, CardImg, CardTitle } from 'reactstrap'
import { SeasonsBook } from '../LeftBookComponent/data'
import "./book.css"
/*src = { e.CardImage }*/
const BookList = (props) => {
    const history = useHistory()
    return (
        <ListGroup tag='div' className='list-group-labels'>
            {
                SeasonsBook.map((e, k) => {        
                    return <Card className='text-white border-0 bookcard cursor' style={{ backgroundColor: e.bgcolor }} onClick={() => history.push('/SeasonBook')}>
                        <CardImg topalt='card-overlay' />
                        <CardImgOverlay className='overlay'>
                            <div className="book_active active"></div>
                            <CardTitle tag='h5'>
                               Navajo Textiles
                            </CardTitle>                            
                            <CardText>
                                <small className='text-muted'>Color Pattern & Designs</small>
                            </CardText>
                        </CardImgOverlay>
                    </Card>
                })
            }
        </ListGroup>

    )

}
export default BookList

