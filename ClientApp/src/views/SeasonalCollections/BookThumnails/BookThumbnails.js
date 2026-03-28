import { useParams, useHistory } from 'react-router-dom'
import DesignsPage from './SeasonDesignView/DesignsPage'
import '../css/seasonspage.css'
import '@styles/base/pages/app-ecommerce.scss'
import DesignSearchbar from './SeasonDesignView/DesignSearchbar'
import { Fragment, useEffect, useState, useContext, useRef } from 'react'

const BookThumbnails = (props) => {
 
    //const history = useHistory()
    const [poc, setPoc] = useState(false)
    //const setBoardSelected = (data) => { setPoc(e => !e) }

  return (
    <>        
          <DesignsPage
            getDesignOnly={props.getDesignOnly}
            AllCataDesign={props.AllCataDesign}
            setBoardSelected={props.setBoardSelected}
            poc={props.poc} setPoc={props.setPoc}
            setSidebarOpen={props.setSidebarOpen}
            sidebarOpen={props.sidebarOpen}
            ImgColumn={props.ImgColumn}
            setSearchobj={props.setSearchobj}
            Searchobj={props.Searchobj}
           
            rowsPerPage={props.rowsPerPage}
            PluginModel={props.PluginModel}
            View3dPlugin={props.View3dPlugin}
            LogicalOperator={props.LogicalOperator}
            OrderBy={props.OrderBy}
            setImgDetails={props.setImgDetails}
            setActiveImageData={props.setActiveImageData}
            imgDataForDetail={props.imgDataForDetail}                       
            selectedImgDataForDetail={props.selectedImgDataForDetail} 
            setPluginObject={props.setPluginObject}
            ThumSize={props.ThumSize} // added tanmay 18-04-2024 :- changes the size of the thumbnail                                            
            fullViewDiv={props.fullViewDiv}
            boardData={props.val}
            board={props.board}  
            showFilterView={props.showFilterView}  
            hideFilterView={props.hideFilterView}
              catID={props.catID}
              // setSearchobj={props.setSearchobj}
              // Searchobj={props.Searchobj}
          /> 
          
    </>
  )
}
export default BookThumbnails
