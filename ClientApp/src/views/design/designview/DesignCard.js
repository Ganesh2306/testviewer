// ** React Imports

// ** Third Party Components
import DesignThumb from './DesignThumb'
import '../css/designpage.css'
import { useContext } from 'react'
import { accessContext } from '../../context/accessContext'
import PerfectScrollbar from 'react-perfect-scrollbar'

const DesignCard = (props) => {
  const { is_boarduser } = useContext(accessContext)
  const gridClassName = (Array.from(props.data) && props.data.length < 4 ? 'less_than_four grid-view' : 'grid-view')

  // Step 1: Get the search design name
  const searchDesignName = props.Searchobj.designName
  const displayData = [...props.data] 
  if (searchDesignName) {
      const filteredData = props.data.filter(e => e.designCode === searchDesignName)
      
      if (filteredData.length > 0) {
          const searchedDesign = filteredData[0]
          if (displayData[0].designCode !== searchedDesign.designCode) {
              displayData[0] = searchedDesign
          }
          const uniqueDisplayData = displayData.filter((design, index) => {
              return design.designCode !== searchedDesign.designCode || index === 0
          })
          displayData.length = 0
          displayData.push(...uniqueDisplayData)
      }
  }
  return (
      <PerfectScrollbar className="thumbnailsHeight" style={{ height: `${props.windowHeight - 220}px` }}>
          {props.searchClickRef && props.totalCount === 0 ? <div className='pt-2'>
              <h6>Sorry, your search returned zero results </h6>
              <p><strong>Have you tried doing the following: </strong><br></br>

                  Check for spelling errors or typos<br></br>

                  Clear search filter options<br></br>

                  Use fewer keywords
              </p>

          </div> : <></>}
          <div className='design_scroll'>
              <div className={gridClassName} id="large_grid" ref={props.ThumSize}>
                  {
                      displayData.map((e, k) => {
                          return (
                              <DesignThumb
                                  key={e.designId}
                                  feature={e.features ? e.features : ''}
                                  title={e.designCode ? e.designCode : ''}
                                  stock={e.features?.Stock ? e.features.Stock : ''}
                                  temp={`${k}-dThum`}
                                  setBoardSelected={props.setBoardSelected}
                                  srno={k}
                                  design_id={e.designId}
                                  hideFilterView={props.hideFilterView}
                                  showFilterView={props.showFilterView}
                                  currentDesign={e}
                                  setActiveImageData={props.setActiveImageData}
                                  PluginModel={props.PluginModel}
                                  View3dPlugin={props.View3dPlugin}
                                  bgimg={(`${encodeURI(e.imageUrl)}`)} src={encodeURI(e.imageUrl)}
                                  localUrl={e.localUrl}
                                  designInfo={e.designInfo ? e.designInfo : ''}
                                  rating={e.features?.Rating ? e.features.Rating : ''}
                                  price={e.features?.Price ? e.features.Price : ''}
                                  colourWay={e.colorwayDesigns ? e.colorwayDesigns : []}
                                  fullViewDiv={props.fullViewDiv}
                                  boardName={is_boarduser ? e.collectionId : e.boardId}
                                  cartName={e.cartName ? e.cartName : ""}
                                  bID={e.boardId}
                                  q3dUrl={e.q3dUrl}
                                  selectedDesignRef={props.selectedDesignRef}
                                  designRef={props.designRef}
                                  selectionDataRef={props.selectionDataRef}
                                  selectedElementRef={props.selectedElementRef}
                                  setcheck={props.setcheck}
                                  QRurl={props.QRurl}
                                  setforloader={props.setforloader}
                                  SearchObj={props.Searchobj}
                                  imgdata={props.data}
                                  searchDesignByPagination={props.searchDesignByPagination}
                                  isSingleItem={props.isSingleItem}
                                  positionFilter={props.positionFilter}
                                  backbuttonRef={props.backbuttonRef}
                              />
                          )
                      })
                  }
              </div>
          </div>
      </PerfectScrollbar>
  )
}

export default DesignCard