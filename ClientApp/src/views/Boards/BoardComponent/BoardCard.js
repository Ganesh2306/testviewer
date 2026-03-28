// ** React Imports
import { Card, CardBody, Col, Row } from 'reactstrap'
// ** Third Party Components
import '../css/boardspage.css'
import { BoardColumnA, boardName, Image } from '../BoardData/Thumbdata'

import BoardThumb from '../BoardComponent/BoardThumb'
import BoardHeader from '../BoardComponent/BoardHeaderButton'
import '@styles/base/pages/app-ecommerce.scss'
const BoardCard = (props) => {
    return (
        <>
            <Row className='row_search'>
                <Col className='py-1 bg-light mysearch_head d-flex justify-content-between'>
                    <div className='left-heading w-50'>                      
                        <h6 className='m-0'>{boardName.map((e) => {
                            return e.title
                        })} </h6>
                            <small style={{fontSize:'0.8rem', position:'absolute', Top:'0'}}>50 designs</small>
                    </div>
                    <BoardHeader />
                </Col>
            </Row>
            <div className='py-1 d-flex flex-row selected_status'>
                    <div><span>5 </span>designs selected</div>
                    <div className='px-50'> | </div>
                    <div>Deselect</div>
                    <div>Select All</div>
          </div>    
        <Col md={12} className='p-0'>
                <Card className='border-0'>                             
                <CardBody className='px-0'>
                    <div className="grid-view wishgrid mb-0" >
                        {
                            BoardColumnA.map((e, k) => {
                                return <BoardThumb key={k} toggle={props.toggle} src={e.Image} title={e.Design_Name} stock={e.InStock} id={e.id} bgimg={(`${e.Image}`)} />
                            })
                        }
                    </div>

                </CardBody>
                </Card>
            </Col>
       </>
    )
}
export default BoardCard
