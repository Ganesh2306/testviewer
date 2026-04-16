import React from "react"
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { ModalCreateCollection } from "./ModalCreateCollection"
import { ModalAssignCollection } from "./ModalAssignCollection"
import { ModalEditCollection } from "./ModalEditCollection"
import { ModalSaveWishlist } from "./ModalSaveWishlist"
import { ModalSaveInCollection } from "./ModalSaveInCollection"
import { ModalStatusReport } from "./ModalStatusReport"
class Page3 extends React.Component {
    render() {
      return (
      <> <h4>This is Page 3.</h4>
    <ModalCreateCollection></ModalCreateCollection>
    <hr></hr>
   <ModalAssignCollection></ModalAssignCollection>
   <hr></hr>
   <ModalEditCollection></ModalEditCollection>
   <hr></hr>
   <ModalSaveWishlist></ModalSaveWishlist>
   <hr></hr>
   <ModalSaveInCollection></ModalSaveInCollection>
   <hr></hr>
   <ModalStatusReport></ModalStatusReport>
    </>)
    }
  }
  
  export default Page3