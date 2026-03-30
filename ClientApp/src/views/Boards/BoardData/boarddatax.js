import '../css/boardspage.css'
import BoardThumb from '../BoardComponent/BoardThumb'
// ** Styles
import '@styles/base/pages/app-ecommerce.scss'
import { BoardColumnA, BoardColumnB } from './Thumbdata'


export const data = [
    {
      title: 'Autumn 2020',
      content: (props) => {   
           <div className="grid-view wishgrid mb-0" >
                {
                  BoardColumnA.map((e, k) => {
                      return <BoardThumb key={k} toggle = {props.toggle} src={e.Image} title={e.Design_Name} stock={e.InStock} id={e.id} bgimg={(`${e.Image}`)} />
              })
             }              
          </div> 
      }   
   
  ]
