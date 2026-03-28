import { BrandTitle } from "./brandingComponent/BrandTitle"
import { Logo } from "../BrandingPage/brandingComponent/Logo"
import { ProductTypeCard } from "../BrandingPage/brandingComponent/ProductTypeCard"
import { Row } from 'reactstrap'
import background from "../../assets/images/pages/brand/branding.png"
import '../BrandingPage/brandingComponent/branding.css'
import { useState } from 'react'

const arr = [1, 2, 3, 4]
const BrandingPage = () => {
    const [forget, setforget] = useState(true)
    return ( 
        <div style={{ backgroundImage: `url(${background})` }} className="mybg" >     
            <div className="pinkbg grandparent">
                <div className="parent">
                <div className='match-height grid-view child'>                    
                    {
                        arr.map((e, k) => {
                            return <ProductTypeCard />
                        })
                    }        
                </div>
                </div>
               
            </div>     
        </div>
    )
}

export default BrandingPage