import { useContext  } from "react"
import { ProductTypeCard } from "../BrandingPage/brandingComponent/ProductTypeCard"
import '../BrandingPage/brandingComponent/branding.css'
// ** Styles
import '@styles/base/pages/app-ecommerce.scss'
import { accessContext } from "../context/accessContext"
import stock from '../../assets/images/pages/stock.jpg'
import sample from '../../assets/images/pages/sample1.jpg'
import noos from '../../assets/images/pages/nos1.jpg'
import customercollection from "../../assets/images/pages/seasons_fabric.jpg"
import seasonal_collezioni from '../../assets/images/pages/collezioni_app.jpg'
import { useHistory } from 'react-router-dom'
import Swal from "sweetalert2"

//333339 : warehouse category
const arr = [
    { id: 218889, name: "Stock", src: stock, path: '/design' },
    { id: 228889, name: "Noos", src: noos, path: '/design' },
    { id: 238889, name: "Sample", src: sample, path: '/design' },
    { id: 248889, name: "Collections", src: customercollection, path: '/collection' },
    { id: 258889, name: "Seasonal", src: seasonal_collezioni, path: '/SeasonHome' }
]

const BrandingPage = (props) => {
    const { access, SelectesUseraccess, selectedUser } = useContext(accessContext)
    const history = useHistory()
    const myarr = []
     if (selectedUser === false) {
        arr.forEach((e) => {
       
            if (access["333339"] && access["333339"][e.id]) {
                
                myarr.push(e)
            }
        })   
     } else { 
        const access1Keys = Object.keys(SelectesUseraccess[333339] || {})
        const accessKeys = Object.keys(access[333339] || {})
        const commonKeys = access1Keys.filter(key => accessKeys.includes(key))
        const result = {}
        commonKeys.forEach(key => {
        result[key] = true
        })
        if (commonKeys.length > 0) {
        arr.forEach((e) => {
        if (result && result[e.id]) {
            
            myarr.push(e)
        }
        }) 
        } else {
            Swal.fire({
                title: 'Configuration Issue',
                text: 'Configuration is not proper',
                icon: 'error',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    history.goBack()
                }
            })
         }
     }

    const SetDataForAllSearch = (list) => {
        let tempstr = 'All'
        list.forEach((e, k) => {
            if (e.name !== 'Seasonal' && e.name !== 'Collections') {
                tempstr = `${tempstr},${e.name}`
            }
             
        })
        return tempstr
    }
    localStorage.setItem('ForAllSearch', SetDataForAllSearch(myarr))

    let profileData = null

    if (localStorage.profile !== 'undefined' && localStorage.profile !== undefined && localStorage.profile !== null) {
        profileData = JSON.parse(localStorage.profile)      
    }
    return (    
         <>
         <div className="brandingInner">
            <div className="banner_branding" >
                <h1 className="text-black ">   {!selectedUser ? profileData !== null ? 'The Textile Library'  : 'The Textile Library' :  selectedUser.label}</h1>
                <p className="text-black d-sm-none d-md-block d-none"> Explore Textile Designs by Selecting Your Preferences!</p>
              
            </div>   
           
            <div>     
                <div className="pinkbg" id="Category">
                    <div className="grandparent">
                    <div className="parent">          
                            <div className="inner_div">                           
                            {
                                myarr.map((e, k) => {      
                                    if (myarr.length === 1) {
                                        localStorage.setItem('IsSingleCategory', 'true')
                                        localStorage.setItem('warehouse', e.name.toLowerCase())
                                        history.push(e.path)
                                    } else {
                                        localStorage.setItem('IsSingleCategory', 'false')
                                        return <ProductTypeCard key={k} titleName={e.name} banner={e.src} link={e.path}/>
                                    }         
                                    })
                                }
                            </div>
                    </div>
                    </div>
                </div>     
            </div>
        </div>
        </>
    )
}

export default BrandingPage