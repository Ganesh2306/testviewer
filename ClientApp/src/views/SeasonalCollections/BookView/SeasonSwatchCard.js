// ** React Imports
import { useState } from 'react'
import CardThumb from './Component/CardThumb'
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Renders Mail
const SeasonSwatchCard = (props) => {
    const [pageview, setpageview] = useState(3)    
    return (
        <> 
            {/* <BookThumbnails setImgDetails={props.setImgDetails} rowsPerPage={25} getDesignOnly={props.getDesignOnly} /> */}
           
        <div className='noSearchPanel'>
                <PerfectScrollbar className="ecommerce-application myseasons">
                    <div className="grid-view book-swatches">
                        {
                            props.cards && props.cards.map((e, k) => {
                                
                                return <CardThumb title="" src={e.imagePath} localSrc={e.localUrl} name={e.cardcode} pageNum={k} pagecount={props.cards.length} setBookStartPage={props.setBookStartPage} setcollview={props.setcollview} defaultView={props.defaultview} />
                            })
                        }
                    </div> 
                </PerfectScrollbar>
        </div>
          
        </>
    )
}


export default SeasonSwatchCard