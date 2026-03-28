// ** React Imports
import { useHistory } from 'react-router-dom'

import { Card, CardBody } from 'reactstrap'
import PerfectScrollbar from 'react-perfect-scrollbar'

const CardThumb = (props) => {
    //
    const history = useHistory()
    const handleError = (event) => {
        const localSrc = props.localSrc ? (props.localSrc).replaceAll(" ", "%20") : ''
        if (event.currentTarget.src !== localSrc) {
            event.currentTarget.src = props.localSrc
        }
    }
    return (
        <>
        <Card
                role="button"
                tabIndex="-3"
                className='ecommerce-card ' style={{ borderRadius: "0px", cursor: 'pointer' }} onClick={() => { props.setBookStartPage(`${props.pageNum}`); props.setcollview(props.defaultView === "CARD" ? 3 : 4) }}>
            <div className='item-img text-center mx-auto position-relative'>
                <div className="top"  >
                    <a>
                            <img className='img-fluid card-img-top' src={props.src} onError={(event) => handleError(event)} />
                    </a>
                </div>
                </div>
                <CardBody style={{ height: "42px", position: 'Relative' }} className='bg-transparent'>
                    <small className='page_no'>{props.pageNum + 1 }/{props.pagecount}</small>
                    <h6 className='item-name'>
                        <a className='text-body'>
                         {props.name}
                        </a>
                    </h6>                
            </CardBody>
        </Card>
        </>
    )

}
export default CardThumb
