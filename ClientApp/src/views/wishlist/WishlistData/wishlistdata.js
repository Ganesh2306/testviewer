import { CardText, Card, CardBody } from 'reactstrap'
import '../css/wishlistpage.css'
import WishlistThumb from '../WishlistComponent/WishlistThumb'
// ** Styles
import '@styles/base/pages/app-ecommerce.scss'
import { WishlistColumnA, WishlistColumnB } from './Thumbdata'


export const data = [
    {
      title: 'Autumn 2020',
      content: (   
           <div className="grid-view wishgrid mb-0" >
                {
                  WishlistColumnA.map((e, k) => {
                      return <WishlistThumb src={e.Image} title={e.Design_Name} stock={e.InStock} id={e.id} bgimg={(`${e.Image}`)} />
              })
             }              
          </div> 
      )   
    },
    {
      title: 'Summer 2020',
      content: (
        <div className="grid-view wishgrid mb-0" >
              {
          WishlistColumnB.map((e, k) => {
              return <WishlistThumb src={e.Image} title={e.Design_Name} stock={e.InStock} id={e.id} bgimg={(`${e.Image}`)}/>
            })
         }              
       </div> 
      )     
    }
  ]
