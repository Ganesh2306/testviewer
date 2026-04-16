// ** Third Party Components
import DesignThumb from './DesignThumb'
import '../../../design/css/designpage.css'
import { useContext } from 'react'

import { accessContext } from '../../../context/accessContext'

const DesignCard = (props) => {
 
  const { is_boarduser } = useContext(accessContext)
  return (
    <div className='design_scroll seasonsthumb'>
        <div className="grid-view" id="medium_grid" ref={props.ThumSize} >
          {
            props.data.map((e, k) => {
          
                return <DesignThumb key={`${k}-dThum`} title={e.designCode} stock={e.features.Stock}
                setBoardSelected={props.setBoardSelected}
                srno = {k}
                design_id = {e.designId}
                hideFilterView={props.hideFilterView}
                showFilterView={props.showFilterView}
                currentDesign={e}
                setActiveImageData={props.setActiveImageData}
                PluginModel={props.PluginModel}
                View3dPlugin={props.View3dPlugin}
                designInfo={e.designInfo}
                bgimg={(`${encodeURI(e.imageUrl)}`)} src={encodeURI(e.imageUrl)}
                rating={e.features.Rating} price={e.features.Price} 
                colourWay={e.colorwayDesigns ? e.colorwayDesigns : []}
                fullViewDiv={props.fullViewDiv}
                boardName={ is_boarduser ? e.collectionId : e.boardId}
                cartName={e.cartName ? e.cartName : ""}
                QRurl={props.QRurl}
                Searchobj={props.Searchobj}
                />
            })
          }            
        </div>
     </div>
      )   
    }
export default DesignCard
