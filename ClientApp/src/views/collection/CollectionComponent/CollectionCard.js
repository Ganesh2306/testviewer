// ** Third Party Components
import CollectionThumb from './CollectionThumb'
import '../css/collection.css'
import sustain from '../../../assets/images/collections/a.jpg'
import well from '../../../assets/images/collections/b.jpg'
import harvest from '../../../assets/images/collections/c.jpg'
const defaultcoll = [
    { id: 1, collname: "Sustainbility", src: sustain},
    { id: 2, collname: "All is Well", src: well },
    { id: 3, collname: "Grow Harvest", src: harvest }
]


const CollectionCard = (props) => {

    return (
        <div className='content-detached content-right'>
            <div className='content-body collectionbody' id="collectionbody">
                <div className="grid-view">
                    {
                        defaultcoll.map((e, k) => {
                            return <CollectionThumb title={e.collname} bannerimg={e.src}/>
                        })
                    }

                </div>
            </div>
        </div>
      )   
    }
 export default CollectionCard