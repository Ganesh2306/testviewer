import { Button, Col, Row, Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap'
import { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { accessContext } from '../../context/accessContext'
import { BC_Menu } from '../../../utility/_boardutils/utils'
import { searchTemplate } from '../../design/designview/Sidebar'
import CollectionsMenu from '../../../@core/layouts/components/navbar/CollectionsMenu'
import './branding.css'
export const ProductTypeCard = (data) => {
    const {is_boarduser} = useContext(accessContext)
    const history = useHistory()
    return (   
                     <div className='child'                                           
                     onClick={() => {                        
                         localStorage.setItem('warehouse', data.titleName.toLowerCase())
                        if (localStorage.warehouse === 'collections') {
                            BC_Menu.value = !is_boarduser                         
                            history.push(`/Viewboards`)
                        } else {
                            history.push(data.link)
                        }                     
                       }}
                     >
                                       {is_boarduser ? '' : <CollectionsMenu /> }
            <Card className="rounded-0">
                     <a>
                        <CardImg top src={data.banner} alt='Card cap' />
                    </a>
                            <CardBody className="text-center">
                    <CardTitle tag='h4'>{data.titleName}</CardTitle>
                    <hr/>
                                <Button.Ripple color='secondary rounded-0' outline >
                                View
                    </Button.Ripple>       
                            </CardBody>
                        </Card>
             </div>
                   
    )    
}