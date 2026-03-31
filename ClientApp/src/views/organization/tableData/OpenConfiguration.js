import React, { useRef } from 'react'
import { Modal, Form, Col } from 'reactstrap'
import { SaveOrganisation, DatabaseMigration } from '../../MethodList'
import axios from 'axios'
import ModalBodyUI from './ConfigurationModalBody'
import { getOrgData } from '../store/actions/index'
import { useDispatch, useSelector } from 'react-redux'
import ModalHeaderUI from './../../modal/ModalHeader'
import ModalFooterUI from './../../modal/ModalFooter'
import { object } from 'yup'
import Swal from 'sweetalert2'


// ! Add AddUser function 
const OpenConfigOrganization = (props) => {
    const store = useSelector(state => state.users)
    const dispatch = useDispatch()
    const childRef = useRef()
    console.log(store.selectedUser)
  const SaveConfiguration = e => {
      
      e.preventDefault()
      const dataobj = new object()
      const org = new Object()
      const user = new Object()
      const rootobj = new Object()
      let local = false
      let ftp = false
      let aws = false
      let cdn = false
      let azure = false
      
      
      switch (document.getElementById("C_StoreType").selectedOptions[0].getAttribute("name")) {
          case 'local':
              local = true
              dataobj.local = true 
              dataobj.drive_Path = document.getElementById("C_drive").selectedOptions[0].value
              break
          case 'ftp':
              dataobj.ftp_Store = true 
              ftp = childRef.current.ftp()
              dataobj.ftp_Store = true 
              dataobj.ftp_Host = document.getElementById("O_Host").value 
              dataobj.ftp_Port = document.getElementById("O_Port").value 
              dataobj.ftp_Url_Acces_User_Id = document.getElementById("O_URlID").value 
              dataobj.ftp_Url_Access_Password = document.getElementById("O_Urlpass").value 
              break
          case 'cdn':
              cdn = childRef.current.cdn()
              dataobj.cdn = true
              dataobj.cdn_CdnPath = document.getElementById("O_CdnPath").value
              dataobj.cdn_Cloud_Name = document.getElementById("O_CloudNAme").value
              dataobj.cdn_Api_Secret = document.getElementById("O_ApiSecret").value
              dataobj.cdn_Api_Key = document.getElementById("O_ApiKey").value 
              break
          case 'aws':
              aws = childRef.current.aws()
              dataobj.aws_S3_Bucket = true
              dataobj.aws_Url_Access = document.getElementById("C_accessURL").value
              dataobj.aws_Url_Access_Id = document.getElementById("C_URLaccessUserID").value
              dataobj.aws_Url_Access_Password = document.getElementById("C_URLaccesspasswordL").value
              break
          case 'azure':
              azure = childRef.current.aws()
              dataobj.azure_Blob_Storage = true
              dataobj.azure_Url_Access = document.getElementById("O_URlAccess").value
              dataobj.azure_Url_Access_Id = document.getElementById("O_AURlID").value
              dataobj.azure_Url_Access_Password = document.getElementById("O_AURlPass").value
              break

          default:
              break
      }

      const C_userlimit = document.getElementById("C_userlimit").value
      const C_creditlimit = document.getElementById("c_creditlimit").value
      const C_custlimit = document.getElementById("C_custlimit").value
      const C_supplimit = document.getElementById("C_supplimit").value
      const C_designlimit = document.getElementById("C_designlimit").value
      const c_agentlimit = document.getElementById("c_agentlimit").value
      const C_serverIP = document.getElementById("C_serverIP").value
      const C_serverPass = document.getElementById("C_serverPass").value
      const C_ServerUserID = document.getElementById("C_ServerUserID").value
      const obj = childRef.current.getLimitField()
      
      //Limit
      dataobj.state = 2
      dataobj.organisation_Id = props.id
      dataobj.Organisation_Data_Id = e.target.elements[0].getAttribute("dataId")
      dataobj.user_Limit = C_userlimit
      dataobj.supllier_Limit = C_supplimit
      dataobj.customer_Limit = C_custlimit
      dataobj.agent_Limit = c_agentlimit
      dataobj.design_Limit = C_designlimit
      dataobj.credit_limit = C_creditlimit
      //product
      dataobj.product_Dobby = obj.IsDobby
      dataobj.product_Archive = obj.IsArchive
      dataobj.product_Collezioni = obj.IsCollezioni
      dataobj.product_Q3d = obj.IsQ3D
      dataobj.product_Showroom = obj.IsStyleME
      //license
      dataobj.sql_Data_Source_Name = C_serverIP
      dataobj.sql_User_Id = C_ServerUserID
      dataobj.sql_Password = C_serverPass
      //user
      user.state = 1
        //org
      org.state = 1
      org.organisation_Id = props.id
      org.req_Registration_Id = 0

      rootobj.orgDanisationData = dataobj
      rootobj.organisation = org
      rootobj.Users = user
      
      if (azure || aws || cdn || ftp || local) {

          axios.post(`${SaveOrganisation}`, rootobj)
              .then(response => {
                  
                  const Isave = JSON.parse(response.data) === null ? null : JSON.parse(response.data).isSave
                  if (Isave !== null && Isave !== false) {
                      const obj = new Object()
                      obj.page = 0
                      obj.perPage = 7
                      dispatch(getOrgData(obj))
                     // dispatch(getOrgData())
                      props.setOpenConfiGuration(false)
                      Swal.fire(
                          'Success!',
                          'Configuration Updated Successfully!!',
                          'success'
                      )
                  } else {
                      Swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          text: 'Something went wrong!'
                      })
                  }

              })
              .then(() => {

              })
              .catch(err => console.log(err))
        
      }

    }

    const MigrateDatabase = b => {
        b.preventDefault()
        const dataobj = new object()
        const org = new Object()
        const user = new Object()
        const rootobj = new Object()

  
            axios.post(`${DatabaseMigration}`, rootobj)
                .then(response => {
                    const Isave = JSON.parse(response.data) === null ? null : JSON.parse(response.data).isSave
                    if (Isave !== null && Isave !== false) {
                        const obj = new Object()
                        obj.page = 0
                        obj.perPage = 7
                        dispatch(getOrgData(obj))
                        // dispatch(getOrgData())
                        props.setOpenConfiGuration(false)
                        Swal.fire(
                            'Success!',
                            'Database Migration Updated Successfully!!',
                            'success'
                        )
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!'
                        })
                    }

                })
                .then(() => {

                })
                .catch(err => console.log(err))
    }

  return (
      <div>
          <Modal backdrop="static" isOpen={props.isOpenConfiGuration} toggle={() => props.setOpenConfiGuration(false)} className='modal-lg'>  {/* abhishek 16-02*/}
              <ModalHeaderUI setis_open={props.setOpenConfiGuration} headerName=" Organization Configuration" />
              <Form onSubmit={SaveConfiguration }>
                  <ModalBodyUI selectedConfiguredata={store.selectedUser} ref={childRef} IsDisable="false" bodyFor="add" />
                  <Col className=" col-sm-12">
                      {/* <Col className="col-md-4 ml-1"></Col> */}
                      <ModalFooterUI csetis_open={props.setOpenConfiGuration} FooterBtnName="Update"  className=" ml-5"/>
                  </Col>
              </Form>
              <Form onSubmit={MigrateDatabase}>
                  <Col  className="col-sm-12">
                      <ModalFooterUI className=" ml-5" FooterBtnName="Migrate Database" />
                  </Col>
              </Form>
      </Modal>
    </div>
  )
}

export default OpenConfigOrganization