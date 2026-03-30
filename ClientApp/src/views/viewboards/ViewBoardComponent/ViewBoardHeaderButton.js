
import { useContext } from 'react'
import { Row } from 'reactstrap'

import { accessContext } from '../../context/accessContext'

const ViewBoardHeaderButton = (props) => {
    const { board } = useContext(accessContext)
    return (
        <>
    <Row className="col-lg-12 col-sm-12 col-xs-10  mt-0 text-right  d-flex bg-light py-1" style={{ justifyContent: 'left' }}>
              <h6 className=''>All Wishlist {board ? board.length : 0}</h6>
    </Row>
        </>
    )
}
export default ViewBoardHeaderButton