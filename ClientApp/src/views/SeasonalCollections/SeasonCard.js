import { Card, CardBody, CardTitle } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { useEffect, useRef } from 'react'
let selection = {}
//className="rounded-0"
export const SeasonCard = (data) => {
   
    const selection_new =  useRef()
    const base64obj = "data: image / png; base64, "
    const history = useHistory()
    const SeasonCardImg = useRef()
    const handleError = () => {
        SeasonCardImg.current.style.backgroundImage = `url("${data.localUrl}")`
    }
    const highlightCollection = (titleName, seasonID) => {
      
       history.push('/SeasonBook', { colName: titleName, sId: seasonID })
        if (selection) {
            selection = {}
            selection[seasonID] = `${seasonID}${titleName}`
        } else {
            selection[seasonID] = `${seasonID}${titleName}`
        }
    } 
    useEffect(() => {
       
        const seasonTitleName = document.getElementById(selection[data.seasonID]) 
        if (seasonTitleName) {
        seasonTitleName.style.border = "1px solid red"
      
    }
    }, [])
    return (
        <>
             {/* style = {{border: "px solid grey"}} */}
            <div className='child' ref={selection_new}>
            <Card id = {`${data.seasonID}${data.titleName}`}  onClick={() =>  highlightCollection(data.titleName, data.seasonID) } >
                    <a ref={SeasonCardImg} className='seasontopimg' style={{ backgroundImage: `url("${data.banner}")` }}>
                    {/* <CardImg top src={data.banner} alt='Card cap' /> */}
                </a>
                <CardBody className="text-center px-0">
                    <CardTitle tag='h4'>{data.titleName}</CardTitle>
                </CardBody>
                </Card>
            </div>
            <img src={data.banner} onError={handleError} style={{ display: 'none' }} />  
            </>
       

    )
}
