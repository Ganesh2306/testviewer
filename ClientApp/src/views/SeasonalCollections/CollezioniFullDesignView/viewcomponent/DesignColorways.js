import { info } from '../../BookThumnails/SeasonDesignView/Sidebar'
// ** Styles
import  openfullScreenIcon from  "../../../../assets/img/fullview.svg"
import  closefullScreenIcon from  "../../../../assets/img/minimise.svg"
import  show3D from  "../../../../assets/img/3d.svg" 
import nextprevBtn from "../../../../assets/img/prev.svg"
import  addToCart from  "../../../../assets/img/cart.svg"
import  actualLogo from  "../../../../assets/img/actual.svg"
import q3dLogo from "../../../../assets/img/360.svg"
import '@styles/base/pages/app-ecommerce.scss'
import { Check, CheckCircle, UserCheck } from 'react-feather'
import axios from 'axios'

const DesignColorways = ({colorwayDesigns, View3dPlugin, PluginModel}) => {
    const handelOnClick = ({title, dSize, bgimg, isBottom, hideFilterView, 
      PluginModel, View3dPlugin, setActiveImageData, currentDesign, cb = null, colourWay, product}) => {
        const des_Size = dSize ? dSize : "5.927, 5.583" //props.currentDesign.designSize !== null ? props.currentDesign.designSize : "5.927, 5.583"
        const demoData = {
         productName: product ? product.split(',') : 'shirt',
         openfullScreenIcon,
         closefullScreenIcon,
         //q3dLogo,
         show3D,
         //resetLogo,
         nextprevBtn,
         //headerLogoCollezioni,
         //headerBGColleziono,
         //headerLogoArchive,
         //headerBGArchive,
         addToCart,
         q3dLogo,
         //addToCartFilled,
         //addToFavFilled,
         actualLogo,
         pluginFor: 'collezioni', // archive - collezioni
         ScreenDPIX: JSON.parse(localStorage.DeviceDetailsDto).screen_X_DPI,
         ScreenDPIY: JSON.parse(localStorage.DeviceDetailsDto).screen_Y_DPI,
         ScreenDPIXDefault: '96',
         ScreenDPIYDefault: '96',
         DpiUnit: 'inch', // inch or cm
         designWidth: des_Size.split(',')[0]?.trim(), //10.25 - o 4.103 - s 0.77 - 2s 1.54
         designHeight: des_Size.split(',')[1]?.trim(), // 10.37 - o 4.153 - s 0.78 - 2s 1.56
         isaddtoCart: false,
         isaddtoFav: false,
         displayFavCartBtn: true,
         displayNextPreviousBtn: true,
         displayDesignName: false,
         bgImgFor3DImgs: false, //bg img show/hide when suting
         displayDesignInfo: false, // display design info table
         q3d: true, //if false q3d models will not display.
         q3dData: {
             key: '420826895',
             tempkey: '123456789',
             OrganisationId: info.orgid[0], //'1002499214', //'2669559206',
             // 'serviceUrl':  'https://tds.designarchive.in/ArchiveWebApi_Test',
             serviceUrl: info.orgid[1], //'http://172.16.10.194/Archive_New/ProductMgtAPI', //'http://172.16.10.203/New_ProductManagementService',
             skinColorRGB: '223,185,147',
             shoesRGB: '0,0,0'
         },
         watermark: {
             addWatermark: false,
             name: 'Raymond'
         },
         designInfo: {
           Name: title
         },
         displayColorwayImg: false,
         changeColorwayImg: false,
         colorwayList: [],
         galleryImgData: [
           {
           b: bgimg.replaceAll('t.jpg', 'b.jpg').replaceAll('/t/', '/b/'),
           t: bgimg,
           z: bgimg.replaceAll('t.jpg', 'z.jpg').replaceAll('/t/', '/z/'),
           name:title,
           isdesign: true,
           id: 54545,
           altImg_t: bgimg
         }
       ],
         isTotem: false
       }

         if (PluginModel()) {
            PluginModel().changeDesign(demoData)
          
         } else {
            View3dPlugin(demoData)
         }
         if (!isNaN(colourWay)) {
          try {
            setTimeout(() => {
             
              document.querySelectorAll('#colour-way-design-in-fullview .selected_colorway').forEach(e => {
                e.classList.remove('selected_colorway')
                e.firstChild.style.display = 'none'
              })
              //document.getElementById(`colour-way-design-in-fullview-${colourWay}`)
              const element = document.querySelector(`#colour-way-design-in-fullview-${colourWay} span`)
              element.classList.add('selected_colorway')
              element.firstChild.style.display = ''
            }, 10)
          } catch (error) {
            
          }
         }
      }
    return (             
        <>
                <div id='colour-way-design-in-fullview' className='design-color-ways' > 
           { 
          colorwayDesigns ? colorwayDesigns.map((e, k) => {
            
            return <div key={`${k}-colour-way-design-in-fullview`} 
            id={`colour-way-design-in-fullview-${k}`}
            style={{height:`5rem`, width:`5rem`}}
            //style={{background:`url(${e.imageUrl})`}}
            className="FullviewdesignSwatch"
                onClick = {async () => {
                  const FolderId = e.folderId
                  const designstate = e.state
                   const designname = e.designName
                   const str = e.designName
                   const DesignCodeFormater = (str) => {
                     const list = str.split("-")
                     const clone = [...list]
                     const first = clone[0]
                     const last = clone[clone.length - 1]
                     if (list.length === 1) {
                         return {
                             first : undefined,
                             mid:first,
                             last: undefined
                         }
                     } else if (list.length === 2) {
                         return {
                             first:null,
                             mid:list[0],
                             last: list[1]
                         }
                     } else {
                         list.pop()
                         list.shift()
                         return {
                             first,
                             mid:list.join('-'),
                             last
                         }
                     }
                 }
                   const temp = DesignCodeFormater(str.split('.')[0])
                   const Article = temp.first ? temp.first : `0`
                   const Design = temp.mid ? temp.mid : `0`
                   const new_colour = await axios.get(`/DesignSearch/GetDesignsColorways?FolderId=${FolderId}&designname=${designname}&Article=${Article}&Design=${Design}&designstate=${designstate}`)
                   // let new_colour = e.colorwayDesigns.filter((e) => e.designId !== props.design_id)
                   // new_colour = [e, ...new_colour] //new_colour.push(props.currentDesign)
                   // const new_currentDesign = e
                   // new_currentDesign.colorwayDesigns = new_colour
                   e.colorwayDesigns = JSON.parse(new_colour.data)
                    handelOnClick({
                        dSize: e.designSize, 
                        bgimg : e.imageUrl,  
                        PluginModel, 
                        View3dPlugin,
                        title:e.designCode,
                        colourWay: k,
                        product: e.products
                    })
                }}
                        >
                         <span className='selected_colorway'><span style={{display:'none'}}><Check /></span>
                        {<img  className='img-fluid card-img-top' style={{height:`5rem`, width:`5rem`}}
                        src={e.imageUrl} />}
                        
                        </span>
                        </div>
            }) : <></>
            }
                </div>
                </>
    )
}
export default DesignColorways
