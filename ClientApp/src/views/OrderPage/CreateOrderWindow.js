import React, {useState, useEffect} from 'react'
import { Modal, ModalHeader, ModalBody} from 'reactstrap'
import OrderPage from './OrderComponent/OrderPage'
import axios from 'axios'

export const CreateOrderWindow = (props) => {

   const [showOrder, setShowOrder] = useState(0)  //0 1 2
   const [alldesign, setalldesigndata] = useState([])
   const BoardId = props.selectedboard
   let selectedDesign = []
    Object.entries(props.Deisgn.selectionDataRef.current).forEach((e, i) => {
    if (e[1].checked === true) {
      selectedDesign.push(e[1].prop)
      document.getElementById('count').innerHTML = selectedDesign.length
        }
    }) 
    
    useEffect(async () => {

      const finalAppendFabrics = (pareseData, type = `t`) => {
        const path  = pareseData.imageUrl 
        return {
            totalCount:pareseData.totalCount, 
            designMaster:pareseData.designMaster.map((e) => { 
            return {...e, 
                imageUrl: `${path}/${e.folderId}/${type}/${e.designName}${type}.jpg`,
                colorwayDesigns: e.colorwayDesigns.map((f) => {
                    return { ...f, imageUrl: `${path}/${e.folderId}/${type}/${f.designName}${type}.jpg`}
                  })
            }
            }),
            localUrl:pareseData.localUrl,
            imageUrl:pareseData.imageUrl
        }               
    }
      try {
        axios.get(`/Order/GetAllBoardDesigns?BoardId=${BoardId}`).then(async e => {
          const data = await JSON.parse(e.data)
          const pareseData = (data)
          const updatepares = finalAppendFabrics(pareseData)
          setalldesigndata(updatepares.designMaster)
        })
    } catch (error) {
        console.log(error)
    }
    }, [BoardId])

    if (selectedDesign.length <= 0) {
      // selectedDesign = alldesign
      //(props.Deisgn.Deisgn?.designMaster || [])
      selectedDesign = props.Deisgn?.Deisgn?.designMaster || []
    } 
    return (
        <div className='ordermodel' >    
         <Modal id='createWindow' isOpen={props.showOrder} toggle={() => props.setShowOrder(false)} className='modal-xl modal-dialog-centered m-0' style={{maxWidth:'100%'}}>
           <ModalHeader  toggle={() => props.setShowOrder(false)}></ModalHeader>  
           {/* Order Request Form */}
           <ModalBody>
                    <OrderPage selectedDesign={selectedDesign} Design={props.Deisgn.Deisgn?.designMaster} selectedboard={props.selectedboard} 
                    selectionDataRef={props.Deisgn?.selectionDataRef} showOrder={props.showOrder} setShowOrder={props.setShowOrder}
                     setViewOrder={props.setViewOrder} desc={true}/>
           </ModalBody>
         </Modal>
               
       </div>
    )
}
