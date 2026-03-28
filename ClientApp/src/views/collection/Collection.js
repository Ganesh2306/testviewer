import { Fragment, useContext } from 'react'
import CollectionCard from './CollectionComponent/CollectionCard'
import { Col, Card, CardImg } from 'reactstrap'
import Banner from './bannerImg/Banner.jpg'
// ** Styles
import '@styles/base/pages/app-ecommerce.scss'

import CollectionHeaderButton from './CollectionComponent/CollectionHeaderButton'
import { accessContext } from "../../views/context/accessContext"

const CollectionView = () => {
   const { is_boarduser } = useContext(accessContext)
  return (
    <Fragment>
       <div className='collection_page_view'>
       <Card className='profile-header mb-2'>
          <CardImg src={Banner} alt='User Profile Image' top />
       </Card>
       <Col className='px-0 d-lg-inline-flex mb-1'>
        <div className="col-lg-5 col-sm-5 col-xs-5 p-0">
                  <h2>Explore Collections</h2>
        </div>
        {is_boarduser ? " " :  <CollectionHeaderButton/>}
          </Col>
          
          <CollectionCard/>
       </div>
      </Fragment>
  )
}

export default CollectionView
