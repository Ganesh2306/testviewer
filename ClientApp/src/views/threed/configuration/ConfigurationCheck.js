//**React Imports */
import { Fragment, useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import DatePicker from 'react-datepicker'
//**Custom Components */
import Breadcrumbs from '@components/breadcrumbs'
// ** Third Party Components
import { Row, Col, Label, Input, CardBody, Form, Button, CustomInput, Table, FormGroup, CardHeader, CardTitle } from 'reactstrap'
import Card from '@components/card-snippet'
const ConfigurationCheck = () => {
   const [orglist, setOrglist] = useState([])
   const [Q3dConfiguration, setQ3dConfiguration] = useState(null)
   const orgidRef = useRef(0)
   const DomainNameRef = useRef()
   const ServerIPRef = useRef()
   const LoginUserIDRef = useRef()
   const LoginPasswordRef = useRef()
   const MinFabricshowRef = useRef()
   const DrapingfileRef = useRef()
   const NoOfRenderingRef = useRef()
   const SameUserMulitiLoginRef = useRef()
   const IdalTimeRef = useRef()
   const CookieStoreRef = useRef()
   const ProfileImgSizeRef = useRef()
   const FullViewDisplayimgRef = useRef()
   const DispalyproductNameRef = useRef()
   const TryonTrialCountRef = useRef()
   const FeatureNameRef = useRef()
   const StartDateref = useRef() //vaibhavi

   const RotationWithPanRef = useRef()
   const DownloadOptionRef = useRef()
   const ShareOptionRef = useRef()
   const DrapeOptionRef = useRef()
   const DoubleClickZoomRef = useRef()
   const DisplayGroupsRef = useRef()
   const ThreedImage2ndGroupRef = useRef()
   const ModelChangeFabricRef = useRef()
   const FabricChangeModelRef = useRef()
   const ModelDrape1stFabricRef = useRef()
   const UploadFabricRef = useRef()
   const BackgroundLogoRef = useRef()
   const TryonVisibleRef = useRef()
   const ClientLogoRef = useRef()
   const ShowmodelProductsRef = useRef()
   const InfoRef = useRef()
   const Q3dliteRef = useRef()
   const CustomDownloadRef = useRef()
   const QrRenderDownloadRef = useRef()

   const DomainNameErrorRef = useRef(null)
   const ServerIPErrorRef = useRef(null)
   const LoginUserIDErrorRef = useRef(null)
   const LoginPasswordErrorRef = useRef(null)
   const MinFabricshowErrorRef = useRef(null)
   const DrapingfileErrorRef = useRef(null)
   const NoOfRenderingErrorRef = useRef(null)
   const SameUserMulitiLoginErrorRef = useRef(null)
   const IdalTimeErrorRef = useRef(null)
   const CookieStoreErrorRef = useRef(null)
   const ProfileImgSizeErrorRef = useRef(null)
   const FullViewDisplayimgErrorRef = useRef(null)
   const DispalyproductNameErrorRef = useRef(null)
   const TryonTrialCountErrorRef = useRef(null)
   const FeatureNameErrorRef = useRef(null)
   const StartDateErrorref = useRef(null) //vaibhavi
   let Q3dConfigurationRequest = {}
   const validateInput = () => {
      if (DomainNameRef.current.value.trim() === "") {
         DomainNameErrorRef.current.textContent = 'Domain Name must have at most 100 characters'
      }
      if (ServerIPRef.current.value.trim() === "") {
         ServerIPErrorRef.current.textContent = 'Server Ip must have at most 100 Digits'
      }
      if (LoginUserIDRef.current.value.trim() === "") {
         LoginUserIDErrorRef.current.textContent = 'UserID must have at most 32 characters and digits'
      }
      if (LoginPasswordRef.current.value.trim() === "") {
         LoginPasswordErrorRef.current.textContent = 'Password must be at least 8 characters'
      }
      if (MinFabricshowRef.current.value.trim() === "") {
         MinFabricshowErrorRef.current.textContent = 'Min FabricShow must have at most 5 digits'
      }
      if (DrapingfileRef.current.value.trim() === "") {
         DrapingfileErrorRef.current.textContent = 'Draping File must have at most 2 digits'
      }
      if (NoOfRenderingRef.current.value.trim() === "") {
         NoOfRenderingErrorRef.current.textContent = 'NoOfRendering must have at most 5 digits'
      }
      if (SameUserMulitiLoginRef.current.value.trim() === "") {
         SameUserMulitiLoginErrorRef.current.textContent = 'Same User MulitiLogin must have at most 2 digits'
      }
      if (IdalTimeRef.current.value.trim() === "") {
         IdalTimeErrorRef.current.textContent = 'Ideal Time must have  digits'
      }
      if (CookieStoreRef.current.value.trim() === "") {
         CookieStoreErrorRef.current.textContent = 'Cookie Store must have digits'
      }
      if (ProfileImgSizeRef.current.value.trim() === "") {
         ProfileImgSizeErrorRef.current.textContent = 'ProfileImage Size must have at most 100 digit'
      }
      if (FullViewDisplayimgRef.current.value.trim() === "") {
         FullViewDisplayimgErrorRef.current.textContent = 'FullViewDisplay image Size must have at most 2 character'
      }
      if (DispalyproductNameRef.current.value.trim() === "") {
         DispalyproductNameErrorRef.current.textContent = 'Display product Name must have character'
      }
      if (StartDateref.current.value.trim() === "") {
         StartDateErrorref.current.textContent = 'The field is required'
      }

      if (DomainNameRef.current.value !== "" && ServerIPRef.current.value !== "" && LoginUserIDRef.current.value !== "" &&
         LoginPasswordRef.current.value !== "" && MinFabricshowRef.current.value !== "" && DrapingfileRef.current.value !== "" &&
         NoOfRenderingRef.current.value !== "" && SameUserMulitiLoginRef.current.value !== "" && IdalTimeRef.current.value !== "" && CookieStoreRef.current.value !== "" &&
         ProfileImgSizeRef.current.value !== "" && FullViewDisplayimgRef.current.value !== "" && DispalyproductNameRef.current.value !== "" && StartDateref.current.value !== "") {
         SaveQ3dConfiguration(Q3dConfigurationRequest)
      }
   }
   const [startDate, setStartDate] = useState(new Date(''))

   const SaveQ3dConfiguration = async (Q3dConfigurationRequest) => {
      await axios.post(`./ThreeD/SaveQ3dConfiguration`, Q3dConfigurationRequest).then(response => {
         const data = JSON.parse(response.data).value
         if (data === true) {
            Swal.fire(
               'Success !',
               'Q3dConfiguration Saved Successfully!',
               'success'
            )
         } else {
            Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: 'Q3dConfiguration not Saved!'
            })
         }
         const obj = {
            id: orgidRef.current ? orgidRef.current.value : 0
         }
         GetQ3dConfiguration(obj)
      })
   }

   const DomainNameOnChange = () => {
      const userInput = DomainNameRef.current.value
      if (userInput.length > 0) {
         DomainNameErrorRef.current.textContent = ''
      } else {
         DomainNameErrorRef.current.textContent = 'Domain Name must have at most 100 characters'
      }
   }
   const ServerIPOnChange = () => {
      const userInput = ServerIPRef.current.value
      const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/
      const ipv6Pattern = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/
      if (ipv4Pattern.test(userInput) || ipv6Pattern.test(userInput)) {
         ServerIPErrorRef.current.textContent = ''
      } else {
         ServerIPErrorRef.current.textContent = 'Server Ip must have at most 100 Digits'
      }
   }
   const LoginUserIDOnChange = () => {
      const userInput = LoginUserIDRef.current.value
      const hasMinimumLength = userInput.length <= 32
      const containsAtLeastOneDigit = /[0-9]/.test(userInput)
      if ((/^[A-Za-z]+$/.test(userInput)) || (/[0-9]/.test(userInput))) {
         LoginUserIDErrorRef.current.textContent = ''
      } else {
         LoginUserIDErrorRef.current.textContent = 'UserID must have at most 32 characters and digits'
      }
   }
   const LoginPasswordOnChange = () => {
      const userInput = LoginPasswordRef.current.value
      const symbolRegex = /^[!@#$%^&*()_+{}\[\]:;<>,.?~\\|/]*$/
      if (/^[A-Za-z]+$/.test(userInput) || (/[0-9]/.test(userInput)) || (symbolRegex.test(userInput))) {
         LoginPasswordErrorRef.current.textContent = ''
      } else {
         LoginPasswordErrorRef.current.textContent = 'Password must be at least 8 characters'
      }
   }
   const MinFabricshowOnChange = () => {
      const userInput = MinFabricshowRef.current.value
      if (/[0-9]/.test(userInput) && userInput.length <= 5) {
         MinFabricshowErrorRef.current.textContent = ''
      } else {
         MinFabricshowErrorRef.current.textContent = 'Min FabricShow must have at most 5 digits'
      }
   }
   const DrapingfileOnChange = () => {
      const userInput = DrapingfileRef.current.value
      if (/^[A-Za-z]+$/.test(userInput) && userInput.length < 3) {
         DrapingfileErrorRef.current.textContent = ''
      } else {
         DrapingfileErrorRef.current.textContent = 'Draping File must have at most 2 digits'
      }
   }
   const NoOfRenderingOnChange = () => {
      const userInput = NoOfRenderingRef.current.value
      if (/[0-9]/.test(userInput) && userInput.length <= 5) {
         NoOfRenderingErrorRef.current.textContent = ''
      } else {
         NoOfRenderingErrorRef.current.textContent = 'NoOfRendering must have at most 5 digits'
      }
   }
   const SameUserMulitiLoginOnChange = () => {
      const userInput = SameUserMulitiLoginRef.current.value
      if (/[0-9]/.test(userInput) && userInput.length <= 2) {
         SameUserMulitiLoginErrorRef.current.textContent = ''
      } else {
         SameUserMulitiLoginErrorRef.current.textContent = 'Same User MulitiLogin must have at most 2 digits'
      }
   }
   const IdalTimeOnChange = () => {
      const userInput = IdalTimeRef.current.value
      if (/[0-9]/.test(userInput)) {
         IdalTimeErrorRef.current.textContent = ''
      } else {
         IdalTimeErrorRef.current.textContent = 'Idal Time must have  digits'
      }
   }
   const CookieStoreOnChange = () => {
      const userInput = CookieStoreRef.current.value
      if (/[0-9]/.test(userInput)) {
         CookieStoreErrorRef.current.textContent = ''
      } else {
         CookieStoreErrorRef.current.textContent = 'Cookie Store must have digits'
      }
   }
   const ProfileImgSizeOnChange = () => {
      const userInput = ProfileImgSizeRef.current.value
      if (/[0-9]/.test(userInput) && userInput.length <= 100) {
         ProfileImgSizeErrorRef.current.textContent = ''
      } else {
         ProfileImgSizeErrorRef.current.textContent = 'ProfileImage Size must have at most 100 digit'
      }
   }
   const FullViewDisplayimgOnChange = () => {
      const userInput = FullViewDisplayimgRef.current.value
      if (/^[A-Za-z]+$/.test(userInput) && userInput.length <= 2) {
         FullViewDisplayimgErrorRef.current.textContent = ''
      } else {
         FullViewDisplayimgErrorRef.current.textContent = 'FullViewDisplay image Size must have at most 2 character'
      }
   }
   const DispalyproductNameOnChange = () => {
      const userInput = DispalyproductNameRef.current.value
      if (userInput.length > 0) {
         DispalyproductNameErrorRef.current.textContent = ''
      } else {
         DispalyproductNameErrorRef.current.textContent = 'Please Enter Display product Name '
      }
   }
   const DateOnchange = () => {
      const userInput = StartDateref.current.value
      if (userInput.length > 0) {
         StartDateErrorref.current.textContent = ''
      } else {
         StartDateErrorref.current.textContent = 'Please Enter valid date '
      }
   }
   const FeatureNameOnChange = () => {
      const userInput = FeatureNameRef.current.value
      if (userInput.length > 0) {
         FeatureNameErrorRef.current.textContent = ''
      } else {
         FeatureNameErrorRef.current.textContent = 'Please Enter Feature Name'
      }
   }
   const TryonTrialCountOnChange = () => {
      const userInput = TryonTrialCountRef.current.value
      if (userInput.length > 0) {
         TryonTrialCountErrorRef.current.textContent = ''
      } else {
         TryonTrialCountErrorRef.current.textContent = 'Please Enter Tryon Trial Count'
      }
   }
   useEffect(() => {
      const showconfiguration = async () => {
         if (Q3dConfiguration !== undefined && Q3dConfiguration !== null) {
            if (Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_product_order_no === 1) {
               Q3dConfiguration.q3d_product_order_no = true
            }
            if (Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_product_order_no === 0) {
               Q3dConfiguration.q3d_product_order_no = false
            }
            DomainNameRef.current.value = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_domain_name ? Q3dConfiguration.q3d_domain_name : ""
            ServerIPRef.current.value = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_ip ? Q3dConfiguration.q3d_ip : ""
            LoginUserIDRef.current.value = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_user_id ? Q3dConfiguration.q3d_user_id : ""
            LoginPasswordRef.current.value = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_password ? Q3dConfiguration.q3d_password : ""
            FullViewDisplayimgRef.current.value = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_fullview_image ? Q3dConfiguration.q3d_fullview_image : ""
            MinFabricshowRef.current.value = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_show_fabrics ? Q3dConfiguration.q3d_show_fabrics : ""
            DrapingfileRef.current.value = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_draping_file ? Q3dConfiguration.q3d_draping_file : ""
            NoOfRenderingRef.current.value = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_drape_count ? Q3dConfiguration.q3d_drape_count : ""
            SameUserMulitiLoginRef.current.value = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_user_multi_logins ? Q3dConfiguration.q3d_user_multi_logins : ""
            IdalTimeRef.current.value = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_IdealTime ? Q3dConfiguration.q3d_IdealTime : ""
            CookieStoreRef.current.value = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_CookieStore ? Q3dConfiguration.q3d_CookieStore : ""
            ProfileImgSizeRef.current.value = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_ProfileImgSize ? Q3dConfiguration.q3d_ProfileImgSize : ""
            DispalyproductNameRef.current.value = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_Product_Name ? Q3dConfiguration.q3d_Product_Name : ""
            TryonTrialCountRef.current.value = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_tryon_trial_count ? Q3dConfiguration.q3d_tryon_trial_count : ""
            FeatureNameRef.current.value = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_Feature_name ? Q3dConfiguration.q3d_Feature_name : ""
            StartDateref.current.value = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.startDate ? (Q3dConfiguration.startDate).split('T')[0] : ""

            RotationWithPanRef.current.checked = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_rotation_with_pan ? Q3dConfiguration.q3d_rotation_with_pan : false
            ShareOptionRef.current.checked = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_share_option ? Q3dConfiguration.q3d_share_option : false
            DownloadOptionRef.current.checked = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_download_option ? Q3dConfiguration.q3d_download_option : false
            DrapeOptionRef.current.checked = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_drape_option ? Q3dConfiguration.q3d_drape_option : false
            DoubleClickZoomRef.current.checked = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_double_click_zoom ? Q3dConfiguration.q3d_double_click_zoom : false
            DisplayGroupsRef.current.checked = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_display_groups ? Q3dConfiguration.q3d_display_groups : false
            ThreedImage2ndGroupRef.current.checked = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_second_group_selection ? Q3dConfiguration.q3d_second_group_selection : false
            ModelChangeFabricRef.current.checked = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_model_to_fabric ? Q3dConfiguration.q3d_model_to_fabric : false
            FabricChangeModelRef.current.checked = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_fabric_to_model ? Q3dConfiguration.q3d_fabric_to_model : false
            ModelDrape1stFabricRef.current.checked = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_drape_first_fabric ? Q3dConfiguration.q3d_drape_first_fabric : false
            UploadFabricRef.current.checked = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_Upload_Fabrics ? Q3dConfiguration.q3d_Upload_Fabrics : false
            BackgroundLogoRef.current.checked = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_Background_Image ? Q3dConfiguration.q3d_Background_Image : false
            TryonVisibleRef.current.checked = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_Tryon_Visible ? Q3dConfiguration.q3d_Tryon_Visible : false
            ClientLogoRef.current.checked = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_product_order_no ? Q3dConfiguration.q3d_product_order_no : false
            ShowmodelProductsRef.current.checked = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_is_Show_Product ? Q3dConfiguration.q3d_is_Show_Product : false
            InfoRef.current.checked = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_is_Show_Info ? Q3dConfiguration.q3d_is_Show_Info : false
            Q3dliteRef.current.checked = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_is_q3d_lite ? Q3dConfiguration.q3d_is_q3d_lite : false
            CustomDownloadRef.current.checked = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_is_custom_download ? Q3dConfiguration.q3d_is_custom_download : false
            QrRenderDownloadRef.current.checked = Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_qr_render_download ? Q3dConfiguration.q3d_qr_render_download : false

         }
         if (Q3dConfiguration === "") {
            Swal.fire({
               position: 'center',
               icon: 'info',
               title: 'please enter data'
            })
         }
      }
      showconfiguration()

   }, [Q3dConfiguration])

   useEffect(() => {
      const fetchdata = async () => {
         await axios.post(`./ThreeD/GetConfiguredOrganisations`).then(response => {
            setOrglist(JSON.parse(response.data))
            const obj = {
               id: orgidRef.current ? orgidRef.current.value : 0
            }
            GetQ3dConfiguration(obj)
         })
      }
      fetchdata()
   }, [])

   const GetQ3dConfiguration = async (obj) => {
      axios.post(`./ThreeD/GetQ3dConfiguration?OrganisationId=${obj.id}`, obj).then(response => {
         const res = JSON.parse(response.data).value
         setQ3dConfiguration(res)
      })
   }
   return (
      <>
         <Fragment>
            <div className='card border-0'  >
               <CardHeader className='border-bottom'>
                  <div className='col-md-8 col-sm-12 d-flex' style={{ justifyContent: "left" }} >
                     <CardTitle tag='h4' className="mr-4" style={{ paddingTop: "0.5rem" }}> 3D Operations </CardTitle>
                     <form className="form-inline flex-wrap select col-md-3 col-sm-12 pl-0 pr-50"> <span className="float-left mr-1">Organization</span>
                        <select className="form-control"
                           ref={orgidRef}
                           onChange={() => {
                              const obj1 = {
                                 id: orgidRef.current ? orgidRef.current.value : 0
                              }
                              GetQ3dConfiguration(obj1)
                           }}
                        >
                           {orglist?.value && orglist.value.map((e, k) => {
                              return <option value={e.organisation_id}>{e.organization_Name}</option>
                           })}
                        </select>
                     </form>
                  </div>
                  <Button className="btn btn-sm btn-success mr-1"
                     onClick={async () => {
                        Q3dConfigurationRequest = {
                           state: 0,
                           Q3d_Organisation_id: orgidRef.current ? orgidRef.current.value : 0,
                           Q3d_supplier_id: 0,
                           Q3d_customer_id: 0,
                           Q3d_domain_name: DomainNameRef.current ? DomainNameRef.current.value : DomainNameRef.current.defaultValue,
                           Q3d_ip: ServerIPRef.current ? ServerIPRef.current.value : ServerIPRef.current.defaultValue,
                           Q3d_user_id: LoginUserIDRef.current ? LoginUserIDRef.current.value : LoginUserIDRef.current.defaultValue,
                           Q3d_password: LoginPasswordRef.current ? LoginPasswordRef.current.value : LoginPasswordRef.current.defaultValue,
                           Q3d_fullview_image: FullViewDisplayimgRef.current ? FullViewDisplayimgRef.current.value : FullViewDisplayimgRef.current.defaultValue,
                           Q3d_show_fabrics: MinFabricshowRef.current ? MinFabricshowRef.current.value : MinFabricshowRef.current.defaultValue,
                           Q3d_draping_file: DrapingfileRef.current ? DrapingfileRef.current.value : DrapingfileRef.current.defaultValue,
                           Q3d_drape_count: NoOfRenderingRef.current ? NoOfRenderingRef.current.value : NoOfRenderingRef.current.defaultValue,
                           Q3d_user_multi_logins: SameUserMulitiLoginRef.current ? SameUserMulitiLoginRef.current.value : SameUserMulitiLoginRef.current.defaultValue,
                           Q3d_IdealTime: IdalTimeRef.current ? IdalTimeRef.current.value : IdalTimeRef.current.defaultValue,
                           Q3d_CookieStore: CookieStoreRef.current ? CookieStoreRef.current.value : CookieStoreRef.current.defaultValue,
                           Q3d_ProfileImgSize: ProfileImgSizeRef.current ? ProfileImgSizeRef.current.value : ProfileImgSizeRef.current.defaultValue,
                           Q3d_Product_Name: DispalyproductNameRef.current ? DispalyproductNameRef.current.value : DispalyproductNameRef.current.defaultValue,
                           Q3d_tryon_trial_count: TryonTrialCountRef.current ? TryonTrialCountRef.current.value : TryonTrialCountRef.current.defaultValue,
                           q3d_feature_name: FeatureNameRef.current ? FeatureNameRef.current.value : FeatureNameRef.current.defaultValue,
                           startDate: StartDateref.current ? StartDateref.current.value : StartDateref.current.value,

                           Q3d_rotation_with_pan: RotationWithPanRef.current[0] ? RotationWithPanRef.current[0] : RotationWithPanRef.current.checked,
                           Q3d_download_option: DownloadOptionRef.current[0] ? DownloadOptionRef.current[0] : DownloadOptionRef.current.checked,
                           Q3d_share_option: ShareOptionRef.current[0] ? ShareOptionRef.current[0] : ShareOptionRef.current.checked,
                           Q3d_drape_option: DrapeOptionRef.current[0] ? DrapeOptionRef.current[0] : DrapeOptionRef.current.checked,
                           Q3d_double_click_zoom: DoubleClickZoomRef.current[0] ? DoubleClickZoomRef.current[0] : DoubleClickZoomRef.current.checked,
                           Q3d_display_groups: DisplayGroupsRef.current[0] ? DisplayGroupsRef.current[0] : DisplayGroupsRef.current.checked,
                           Q3d_second_group_selection: ThreedImage2ndGroupRef.current[0] ? ThreedImage2ndGroupRef.current[0] : ThreedImage2ndGroupRef.current.checked,
                           Q3d_model_to_fabric: ModelChangeFabricRef.current[0] ? ModelChangeFabricRef.current[0] : ModelChangeFabricRef.current.checked,
                           Q3d_fabric_to_model: FabricChangeModelRef.current[0] ? FabricChangeModelRef.current[0] : FabricChangeModelRef.current.checked,
                           Q3d_drape_first_fabric: ModelDrape1stFabricRef.current[0] ? ModelDrape1stFabricRef.current[0] : ModelDrape1stFabricRef.current.checked,
                           Q3d_Upload_Fabrics: UploadFabricRef.current[0] ? UploadFabricRef.current[0] : UploadFabricRef.current.checked,
                           Q3d_Background_Image: BackgroundLogoRef.current[0] ? BackgroundLogoRef.current[0] : BackgroundLogoRef.current.checked,
                           Q3d_Tryon_Visible: TryonVisibleRef.current[0] ? TryonVisibleRef.current[0] : TryonVisibleRef.current.checked,
                           Q3d_is_Show_Product: ShowmodelProductsRef.current[0] ? ShowmodelProductsRef.current[0] : ShowmodelProductsRef.current.checked,
                           Q3d_is_Show_Info: InfoRef.current[0] ? InfoRef.current[0] : InfoRef.current.checked,
                           q3d_is_q3d_lite: Q3dliteRef.current[0] ? Q3dliteRef.current[0] : Q3dliteRef.current.checked,
                           q3d_is_custom_download: CustomDownloadRef.current[0] ? CustomDownloadRef.current[0] : CustomDownloadRef.current.checked,
                           q3d_qr_render_download: QrRenderDownloadRef.current[0] ? QrRenderDownloadRef.current[0] : QrRenderDownloadRef.current.checked
                        }
                        if (Q3dConfigurationRequest.Q3d_IdealTime === "") {
                           Q3dConfigurationRequest.Q3d_IdealTime = 0
                        }
                        if (Q3dConfigurationRequest.Q3d_CookieStore === "") {
                           Q3dConfigurationRequest.Q3d_CookieStore = 0
                        }
                        if (Q3dConfigurationRequest.StartDate === "") {
                           Q3dConfigurationRequest.StartDate = 0
                        }
                        if (ClientLogoRef.current[0] === true) {
                           Q3dConfigurationRequest.q3d_product_order_no = 1
                        }
                        if (ClientLogoRef.current[0] === false) {
                           Q3dConfigurationRequest.q3d_product_order_no = 0
                        }
                        if (Q3dConfiguration !== undefined && Q3dConfiguration !== null && Q3dConfiguration.q3d_Organisation_id !== 0) {
                           Q3dConfigurationRequest.state = 2
                        }
                        validateInput()
                     }}
                  > Save Operations </Button>
               </CardHeader>
               <CardBody className="mt-2">
                  <Row>
                     <Col sm='6'>

                        <div className="row form-group">
                           <Label className="col-form-label col-sm-4 pl-3">Domain Name </Label>
                           <div className='col-sm-7'>
                              <FormGroup className='mb-0 py-0'>
                                 <input
                                    className="form-control "
                                    ref={DomainNameRef}
                                    type="text"
                                    placeholder=""
                                    autoComplete="off"
                                    onChange={(e) => {
                                       DomainNameRef.current.value = [e.target.value]
                                       DomainNameOnChange(e)
                                    }}
                                 ></input>
                                 <div style={{ color: 'red' }} className="error-message" ref={DomainNameErrorRef}></div>
                              </FormGroup>
                           </div>
                        </div>
                        <div className="row form-group">
                           <Label className="col-form-label col-sm-4 pl-3">Server IP </Label>
                           <div className='col-sm-7'>
                              <FormGroup className='mb-0 py-0'>

                                 <input
                                    type="text"
                                    ref={ServerIPRef}
                                    className="form-control "
                                    placeholder=""
                                    autoComplete="off"
                                    onChange={(e) => {
                                       ServerIPRef.current.value = [e.target.value]
                                       ServerIPOnChange(e)
                                    }}
                                 ></input>
                                 <div style={{ color: 'red' }} className="error-message" ref={ServerIPErrorRef}></div>
                              </FormGroup>
                           </div>
                        </div>
                        <div className="row form-group">
                           <Label className="col-form-label col-sm-4 pl-3">Login User ID</Label>
                           <div className='col-sm-7'>
                              <FormGroup className='mb-0 py-0'>

                                 <input
                                    type="text"
                                    Q3d_ip
                                    ref={LoginUserIDRef}
                                    className="form-control "
                                    placeholder=""
                                    autoComplete="off"
                                    onChange={(e) => {
                                       LoginUserIDRef.current.value = [e.target.value]
                                       LoginUserIDOnChange(e)
                                    }}
                                 ></input>
                                 <div style={{ color: 'red' }} className="error-message" ref={LoginUserIDErrorRef}></div>
                              </FormGroup>
                           </div>
                        </div>
                        <div className="row form-group">
                           <Label className="col-form-label col-sm-4 pl-3">Login Password</Label>
                           <div className='col-sm-7'>
                              <FormGroup className='mb-0 py-0'>

                                 <input
                                    type="password"
                                    max="500"
                                    ref={LoginPasswordRef}
                                    className="form-control "
                                    placeholder=""
                                    autoComplete="off"
                                    onChange={(e) => {
                                       LoginPasswordRef.current.value = [e.target.value]
                                       LoginPasswordOnChange(e)
                                    }}
                                 ></input>
                                 <div style={{ color: 'red' }} className="error-message" ref={LoginPasswordErrorRef}></div>
                              </FormGroup>
                           </div>
                        </div>
                        <div className="row form-group">
                           <Label className="col-form-label col-sm-4 pl-3">Full View Display Image</Label>
                           <div className='col-sm-7'>
                              <FormGroup className='mb-0 py-0'>

                                 <input
                                    type="text"
                                    ref={FullViewDisplayimgRef}
                                    className="form-control "
                                    placeholder=""
                                    autoComplete="off"
                                    onChange={(e) => {
                                       FullViewDisplayimgRef.current.value = [e.target.value]
                                       FullViewDisplayimgOnChange(e)
                                    }}
                                 ></input>
                                 <div style={{ color: 'red' }} className="error-message" ref={FullViewDisplayimgErrorRef}></div>
                              </FormGroup>
                           </div>
                        </div>
                        <div className="row form-group">
                           <Label className="col-form-label col-sm-4 pl-3">Min Fabric show</Label>
                           <div className='col-sm-7'>
                              <FormGroup className='mb-0 py-0'>

                                 <input
                                    type="text"
                                    ref={MinFabricshowRef}
                                    className="form-control "
                                    placeholder=""
                                    autoComplete="off"
                                    onChange={(e) => {
                                       MinFabricshowRef.current.value = [e.target.value]
                                       MinFabricshowOnChange(e)
                                    }}
                                 ></input>
                                 <div style={{ color: 'red' }} className="error-message" ref={MinFabricshowErrorRef}></div>
                              </FormGroup>
                           </div>
                        </div>
                        <div className="row form-group">
                           <Label className="col-form-label col-sm-4 pl-3">Draping file</Label>
                           <div className='col-sm-7'>
                              <FormGroup className='mb-0 py-0'>

                                 <input
                                    type="text"
                                    ref={DrapingfileRef}
                                    className="form-control "
                                    placeholder=""
                                    autoComplete="off"
                                    onChange={(e) => {
                                       DrapingfileRef.current.value = [e.target.value]
                                       DrapingfileOnChange(e)
                                    }}
                                 ></input>
                                 <div style={{ color: 'red' }} className="error-message" ref={DrapingfileErrorRef}></div>
                              </FormGroup>
                           </div>
                        </div>
                        <div className="row form-group">
                           <Label className="col-form-label col-sm-4 pl-3">No Of Rendering</Label>
                           <div className='col-sm-7'>
                              <FormGroup className='mb-0 py-0'>

                                 <input
                                    type="text"
                                    ref={NoOfRenderingRef}
                                    className="form-control "
                                    placeholder=""
                                    autoComplete="off"
                                    onChange={(e) => {
                                       NoOfRenderingRef.current.value = [e.target.value]
                                       NoOfRenderingOnChange(e)
                                    }}
                                 ></input>
                                 <div style={{ color: 'red' }} className="error-message" ref={NoOfRenderingErrorRef}></div>
                              </FormGroup>
                           </div>
                        </div>
                        <div className="row form-group">
                           <Label className="col-form-label col-sm-4 pl-3">Same User Muliti Login</Label>
                           <div className='col-sm-7'>
                              <FormGroup className='mb-0 py-0'>

                                 <input
                                    type="text"
                                    ref={SameUserMulitiLoginRef}
                                    className="form-control "
                                    placeholder=""
                                    autoComplete="off"
                                    onChange={(e) => {
                                       SameUserMulitiLoginRef.current.value = [e.target.value]
                                       SameUserMulitiLoginOnChange(e)
                                    }}
                                 ></input>
                                 <div style={{ color: 'red' }} className="error-message" ref={SameUserMulitiLoginErrorRef}></div>
                              </FormGroup>
                           </div>
                        </div>
                        <div className="row form-group">
                           <Label className="col-form-label col-sm-4 pl-3">IdalTime</Label>
                           <div className='col-sm-7'>
                              <FormGroup className='mb-0 py-0'>

                                 <input
                                    type="text"
                                    ref={IdalTimeRef}
                                    className="form-control "
                                    placeholder=""
                                    autoComplete="off"
                                    onChange={(e) => {
                                       IdalTimeRef.current.value = [e.target.value]
                                       IdalTimeOnChange(e)
                                    }}
                                 ></input>
                                 <div style={{ color: 'red' }} className="error-message" ref={IdalTimeErrorRef}></div>
                              </FormGroup>
                           </div>
                        </div>
                        <div className="row form-group">
                           <Label className="col-form-label col-sm-4 pl-3">Cookie Store</Label>
                           <div className='col-sm-7'>
                              <FormGroup className='mb-0 py-0'>

                                 <input
                                    type="text"
                                    ref={CookieStoreRef}
                                    className="form-control "
                                    placeholder=""
                                    autoComplete="off"
                                    onChange={(e) => {
                                       CookieStoreRef.current.value = [e.target.value]
                                       CookieStoreOnChange(e)
                                    }}
                                 ></input>
                                 <div style={{ color: 'red' }} className="error-message" ref={CookieStoreErrorRef}></div>
                              </FormGroup>
                           </div>
                        </div>
                        <div className="row form-group">
                           <Label className="col-form-label col-sm-4 pl-3">Profile Img Size </Label>
                           <div className='col-sm-7'>
                              <FormGroup className='mb-0 py-0'>

                                 <input
                                    type="text"
                                    ref={ProfileImgSizeRef}
                                    className="form-control "
                                    placeholder=""
                                    autoComplete="off"
                                    onChange={(e) => {
                                       ProfileImgSizeRef.current.value = [e.target.value]
                                       ProfileImgSizeOnChange(e)
                                    }}
                                 ></input>
                                 <div style={{ color: 'red' }} className="error-message" ref={ProfileImgSizeErrorRef}></div>
                              </FormGroup>
                           </div>
                        </div>
                         <div className="row form-group">
                           <Label className="col-form-label col-sm-4 pl-3">Feature Name</Label>
                           <div className='col-sm-7'>
                              <FormGroup className='mb-0 py-0'>

                                 <input
                                    type="text"
                                    ref={FeatureNameRef}
                                    className="form-control "
                                    placeholder=""
                                    autoComplete="off"
                                    onChange={(e) => {
                                       FeatureNameRef.current.value = [e.target.value]
                                       FeatureNameOnChange(e)
                                    }}
                                 ></input>
                                 <div style={{ color: 'red' }} className="error-message" ref={FeatureNameErrorRef}></div>
                              </FormGroup>
                           </div>
                        </div>
                         <div className="row form-group">
                           <Label className="col-form-label col-sm-4 pl-3">Tryon Trial Count</Label>
                           <div className='col-sm-7'>
                              <FormGroup className='mb-0 py-0'>

                                 <input
                                    type="text"
                                    ref={TryonTrialCountRef}
                                    className="form-control "
                                    placeholder=""
                                    autoComplete="off"
                                    onChange={(e) => {
                                       TryonTrialCountRef.current.value = [e.target.value]
                                       TryonTrialCountOnChange(e)
                                    }}
                                 ></input>
                                 <div style={{ color: 'red' }} className="error-message" ref={TryonTrialCountErrorRef}></div>
                              </FormGroup>
                           </div>
                        </div>
                        <div className="row form-group">
                           <Label className="col-form-label col-sm-4 pl-3">Display product Name</Label>
                           <div className='col-sm-7'>
                              <FormGroup className='mb-0 py-0'>

                                 <textarea
                                    multiline
                                    maxRows={4}
                                    ref={DispalyproductNameRef}
                                    type="textarea"
                                    className="form-control"
                                    placeholder=""
                                    autoComplete="off"
                                    style={{ Height: "10px" }}
                                    rows={3}
                                    onChange={(e) => {
                                       DispalyproductNameRef.current.value = [e.target.value]
                                       DispalyproductNameOnChange(e)
                                    }}
                                 ></textarea>
                                 <div style={{ color: 'red' }} className="error-message" ref={DispalyproductNameErrorRef}></div>
                              </FormGroup>
                           </div>
                        </div>
                        <div className="row form-group">
                           <Label className="col-form-label col-sm-4 pl-3">Q3D Start Date</Label>
                           <div className='col-sm-7'>
                              <FormGroup className='mb-0 py-0'>
                                 <input
                                    ref={StartDateref}
                                    autoComplete="off"
                                    className='form-control' id="date" type="date" required
                                    onChange={(e) => {
                                       StartDateref.current.value = [e.target.value]
                                       DateOnchange(e)

                                    }}
                                 />
                                 <div style={{ color: 'red' }} className="error-message" ref={StartDateErrorref}></div>
                              </FormGroup>
                           </div>
                        </div>

                     </Col>
                     <Col sm='6'>
                        <div className="row form-group">
                           <div style={{ paddingTop: "0.5rem", paddingRight: "0rem" }}>
                              <input type="checkbox" style={{ width: "22px", height: "22px" }}
                                 ref={RotationWithPanRef}
                                 onClick={(e) => {
                                    // if (e.target.checked) {
                                    // RotationWithPanRef.current = [e.target.checked]
                                    // } else {
                                    //  RotationWithPanRef.current = [e.target.checked]
                                    // }
                                 }}
                              />
                           </div>
                           <Label className="col-form-label col-sm-4 ">Rotation With Pan </Label>
                        </div>
                        <div className="row form-group">
                           <div style={{ paddingTop: "0.5rem", paddingRight: "0rem" }}>
                              <input type="checkbox" style={{ width: "22px", height: "22px" }}
                                 ref={DownloadOptionRef}
                                 onClick={(e) => {
                                    // if (e.target.checked) {
                                    //  DownloadOptionRef.current = [e.target.checked]
                                    // } else {
                                    //    DownloadOptionRef.current = [e.target.checked]
                                    // }
                                 }}
                              />
                           </div>
                           <Label className="col-form-label col-sm-4 ">Download Option </Label>
                        </div>
                        <div className="row form-group">
                           <div style={{ paddingTop: "0.5rem", paddingRight: "0rem" }}>
                              <input type="checkbox" style={{ width: "22px", height: "22px" }}
                                 ref={ShareOptionRef}
                                 onClick={(e) => {
                                    // if (e.target.checked) {
                                    //   ShareOptionRef.current = [e.target.checked]
                                    // } else {
                                    //    ShareOptionRef.current = [e.target.checked]
                                    // }
                                 }}
                              />
                           </div>
                           <Label className="col-form-label col-sm-4 ">Share Option</Label>
                        </div>
                        <div className="row form-group">
                           <div style={{ paddingTop: "0.5rem", paddingRight: "0rem" }}>
                              <input type="checkbox" style={{ width: "22px", height: "22px" }}
                                 ref={DrapeOptionRef}
                                 onClick={(e) => {
                                    // if (e.target.checked) {
                                    //   DrapeOptionRef.current = [e.target.checked]
                                    // } else {
                                    //     DrapeOptionRef.current = [e.target.checked]
                                    // }
                                 }}
                              />
                           </div>
                           <Label className="col-form-label col-sm-4 ">Drape Option </Label>
                        </div>
                        <div className="row form-group">
                           <div style={{ paddingTop: "0.5rem", paddingRight: "0rem" }}>
                              <input type="checkbox" style={{ width: "22px", height: "22px" }}
                                 ref={DoubleClickZoomRef}
                                 onClick={(e) => {
                                    // if (e.target.checked) {
                                    //   DoubleClickZoomRef.current = [e.target.checked]
                                    // } else {
                                    //   DoubleClickZoomRef.current = [e.target.checked]
                                    // }
                                 }}
                              />
                           </div>
                           <Label className="col-form-label col-sm-4 ">Double Click Zoom </Label>
                        </div>
                        <div className="row form-group">
                           <div style={{ paddingTop: "0.5rem", paddingRight: "0rem" }}>
                              <input type="checkbox" style={{ width: "22px", height: "22px" }}
                                 ref={DisplayGroupsRef}
                                 onClick={(e) => {
                                    // if (e.target.checked) {
                                    //    //setDoubleclickZoom(true)
                                    //    DisplayGroupsRef.current = [e.target.checked]
                                    // } else {
                                    //    //setDoubleclickZoom(false)
                                    //    DisplayGroupsRef.current = [e.target.checked]
                                    // }
                                 }}
                              />
                           </div>
                           <Label className="col-form-label col-sm-4 ">Display Groups </Label>
                        </div>
                        <div className="row form-group">
                           <div style={{ paddingTop: "0.5rem", paddingRight: "0rem" }}>
                              <input type="checkbox" style={{ width: "22px", height: "22px" }}
                                 ref={ThreedImage2ndGroupRef}
                                 onClick={(e) => {
                                    // if (e.target.checked) {
                                    //    //setThreedImage2ndGroup(true)
                                    //    ThreedImage2ndGroupRef.current = [e.target.checked]
                                    // } else {
                                    //    //setThreedImage2ndGroup(false)
                                    //    ThreedImage2ndGroupRef.current = [e.target.checked]
                                    // }
                                 }}
                              />
                           </div>
                           <Label className="col-form-label col-sm-4 ">Threed Image 2nd Group Selection  </Label>
                        </div>
                        <div className="row form-group">
                           <div style={{ paddingTop: "0.5rem", paddingRight: "0rem" }}>
                              <input type="checkbox" style={{ width: "22px", height: "22px" }}
                                 ref={ModelChangeFabricRef}
                                 onClick={(e) => {
                                    // if (e.target.checked) {
                                    //    //setModelChangeFabric(true)
                                    //    ModelChangeFabricRef.current = [e.target.checked]
                                    // } else {
                                    //    //setModelChangeFabric(false)
                                    //    ModelChangeFabricRef.current = [e.target.checked]
                                    // }
                                 }}
                              />
                           </div>
                           <Label className="col-form-label col-sm-4 ">On Model Change Fabric Change </Label>
                        </div>
                        <div className="row form-group">
                           <div style={{ paddingTop: "0.5rem", paddingRight: "0rem" }}>
                              <input type="checkbox" style={{ width: "22px", height: "22px" }}
                                 ref={FabricChangeModelRef}
                                 onClick={(e) => {
                                    // if (e.target.checked) {
                                    //    //setFabricChangeModelRef(true)
                                    //    FabricChangeModelRef.current = [e.target.checked]
                                    // } else {
                                    //    //setFabricChangeModelRef(false)
                                    //    FabricChangeModelRef.current = [e.target.checked]
                                    // }
                                 }}
                              />
                           </div>
                           <Label className="col-form-label col-sm-4 ">On Fabric Change Model Change </Label>
                        </div>
                        <div className="row form-group">
                           <div style={{ paddingTop: "0.5rem", paddingRight: "0rem" }}>
                              <input type="checkbox" style={{ width: "22px", height: "22px" }}
                                 ref={ModelDrape1stFabricRef}
                                 onClick={(e) => {
                                    // if (e.target.checked) {
                                    //    //setModelDrape1stFabric(true)
                                    //    ModelDrape1stFabricRef.current = [e.target.checked]
                                    // } else {
                                    //    //setModelDrape1stFabric(false)
                                    //    ModelDrape1stFabricRef.current = [e.target.checked]
                                    // }
                                 }}
                              />
                           </div>
                           <Label className="col-form-label col-sm-4 ">On Model Change Drape 1st Fabric </Label>
                        </div>
                        <div className="row form-group">
                           <div style={{ paddingTop: "0.5rem", paddingRight: "0rem" }}>
                              <input type="checkbox" style={{ width: "22px", height: "22px" }}
                                 ref={UploadFabricRef}
                                 onClick={(e) => {
                                    // if (e.target.checked) {
                                    //    //setUploadFabric(true)
                                    //    UploadFabricRef.current = [e.target.checked]
                                    // } else {
                                    //    //setUploadFabric(false)
                                    //    UploadFabricRef.current = [e.target.checked]
                                    // }
                                 }}
                              />
                           </div>
                           <Label className="col-form-label col-sm-4 ">Upload Fabric </Label>
                        </div>
                        <div className="row form-group">
                           <div style={{ paddingTop: "0.5rem", paddingRight: "0rem" }}>
                              <input type="checkbox" style={{ width: "22px", height: "22px" }}
                                 ref={BackgroundLogoRef}
                                 onClick={(e) => {
                                    // if (e.target.checked) {
                                    //    //setBackgroundLogo(true)
                                    //    BackgroundLogoRef.current = [e.target.checked]
                                    // } else {
                                    //    //setBackgroundLogo(false)
                                    //    BackgroundLogoRef.current = [e.target.checked]
                                    // }
                                 }}
                              />
                           </div>
                           <Label className="col-form-label col-sm-4 ">Background Logo </Label>
                        </div>
                        <div className="row form-group">
                           <div style={{ paddingTop: "0.5rem", paddingRight: "0rem" }}>
                              <input type="checkbox" style={{ width: "22px", height: "22px" }}
                                 ref={TryonVisibleRef}
                                 onClick={(e) => {
                                    // if (e.target.checked) {
                                    //    //setTryonvisible(true)
                                    //    TryonVisibleRef.current = [e.target.checked]
                                    // } else {
                                    //    //setTryonvisible(false)
                                    //    TryonVisibleRef.current = [e.target.checked]
                                    // }
                                 }}
                              />
                           </div>
                           <Label className="col-form-label col-sm-4 ">Tryon Visible</Label>
                        </div>
                        <div className="row form-group">
                           <div style={{ paddingTop: "0.5rem", paddingRight: "0rem" }}>
                              <input type="checkbox" style={{ width: "22px", height: "22px" }}
                                 ref={ClientLogoRef}
                                 onClick={(e) => {
                                    // if (e.target.checked) {
                                    //    //setTryonvisible(true)
                                    //    ClientLogoRef.current = [e.target.checked]
                                    // } else {
                                    //    //setTryonvisible(false)
                                    //    ClientLogoRef.current = [e.target.checked]
                                    // }
                                 }}
                              />
                           </div>
                           <Label className="col-form-label col-sm-4 ">Client Logo</Label>
                        </div>
                        <div className="row form-group">
                           <div style={{ paddingTop: "0.5rem", paddingRight: "0rem" }}>
                              <input type="checkbox" style={{ width: "22px", height: "22px" }}
                                 ref={ShowmodelProductsRef}
                                 onClick={(e) => {
                                    // if (e.target.checked) {
                                    //    //setTryonvisible(true)
                                    //  ShowmodelProductsRef.current = [e.target.checked]
                                    // } else {
                                    //    //setTryonvisible(false)
                                    //   ShowmodelProductsRef.current = [e.target.checked]
                                    // }
                                 }}
                              />
                           </div>
                           <Label className="col-form-label col-sm-4 ">Show Model Products</Label>
                        </div>
                        <div className="row form-group">
                           <div style={{ paddingTop: "0.5rem", paddingRight: "0rem" }}>
                              <input type="checkbox" style={{ width: "22px", height: "22px" }}
                                 ref={InfoRef}
                                 onClick={(e) => {
                                    // if (e.target.checked) {

                                    //  InfoRef.current = [e.target.checked]
                                    // } else {
                                    //    //setTryonvisible(false)
                                    //  InfoRef.current = [e.target.checked]
                                    // }
                                 }}
                              />
                           </div>
                           <Label className="col-form-label col-sm-4 ">Info</Label>
                        </div>
                        <div className="row form-group">
                           <div style={{ paddingTop: "0.5rem", paddingRight: "0rem" }}>
                              <input type="checkbox" style={{ width: "22px", height: "22px" }}
                                 ref={Q3dliteRef}
                                 onClick={(e) => {
                                    // if (e.target.checked) {

                                    //    Q3dliteRef.current = [e.target.checked]
                                    // } else {
                                    //    //setTryonvisible(false)
                                    //    Q3dliteRef.current = [e.target.checked]
                                    // }
                                 }}
                              />
                           </div>
                           <Label className="col-form-label col-sm-4 ">Q3D Lite</Label>
                        </div>
                        <div className="row form-group">
                           <div style={{ paddingTop: "0.5rem", paddingRight: "0rem" }}>
                              <input type="checkbox" style={{ width: "22px", height: "22px" }}
                                 ref={CustomDownloadRef}
                                 onClick={(e) => {
                                    // if (e.target.checked) {

                                    //    CustomDownloadRef.current = [e.target.checked]
                                    // } else {
                                    //    //setTryonvisible(false)
                                    //    CustomDownloadRef.current = [e.target.checked]
                                    // }
                                 }}
                              />
                           </div>
                           <Label className="col-form-label col-sm-4 ">Custom Download</Label>
                        </div>
                         <div className="row form-group">
                           <div style={{ paddingTop: "0.5rem", paddingRight: "0rem" }}>
                              <input type="checkbox" style={{ width: "22px", height: "22px" }}
                                 ref={QrRenderDownloadRef}
                                 onClick={(e) => {
                                    // if (e.target.checked) {

                                    //    CustomDownloadRef.current = [e.target.checked]
                                    // } else {
                                    //    //setTryonvisible(false)
                                    //    CustomDownloadRef.current = [e.target.checked]
                                    // }
                                 }}
                              />
                           </div>
                           <Label className="col-form-label col-sm-4 ">Qr Render Download</Label>
                        </div>
                     </Col>
                  </Row>
               </CardBody>
            </div>
         </Fragment>
      </>
   )
}
export default ConfigurationCheck
