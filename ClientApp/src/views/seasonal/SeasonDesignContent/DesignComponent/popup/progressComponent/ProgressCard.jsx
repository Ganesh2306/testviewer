 import { Button, Modal, ModalHeader, ModalBody } from "reactstrap"
import { CheckCircle, Wifi, WifiOff } from "react-feather"
import ProgressLabeled from "./ProgressLabeled"
import { oBjreset } from "../AddDesign"
import { useState } from 'react'
import { ReactInternetSpeedMeter } from 'react-internet-meter'
 const ProgressCard = (props) => {
    return (
      <>
      <ProgressLabeled value={props.value}/>
       <table className= "w-100">
              <tbody className="mx-2">              
                <tr>
                  <td className='font-weight-bold w-70'>Design Name</td>
                  <td>
                    <span>:&nbsp;&nbsp; {props.name}</span>
                  </td>
                </tr>
                <tr>
                  <td className='font-weight-bold w-70'>Design</td>
                  <td>:&nbsp;&nbsp; {`${props.cfileno} Out Of ${props.outOf}`}</td>
                </tr>
                <tr>
                  <td className='font-weight-bold w-70'>Design Size</td>
                  <td>:&nbsp;&nbsp; {parseInt((props.fileSize / (1024 * 1024)).toFixed(2)) === 0 ? `${((props.fileSize / (1024)).toFixed(2))}kb` : `${((props.fileSize / (1024 * 1024)).toFixed(2))}MB`}</td>
                </tr>
                <tr>
                  <td className='font-weight-bold w-70'>Successfully Saved Count</td>
                  <td>:&nbsp;&nbsp; {props.sucessCount}</td>
                </tr>
                <tr>
                  <td className='font-weight-bold w-70'>Failed Count</td>
                  <td>:&nbsp;&nbsp; {props.failCount}</td>
                </tr>
              </tbody>
            </table>
        </>
    )
}

export const ProgressModel = (props) => {
    const [speed, setSpeed] = useState('')   
    return (
        <>
        <div className='basic-modal'>
        <Modal isOpen={props.ProgressModel} toggle={props.ProgressModel} className="progress_model modal-dialog-centered">
        <ModalHeader>Upload Design Status <div className="net_icon"><span>{speed}Mb</span> {parseFloat(speed) === 0 ? <WifiOff/> : <Wifi/>}</div></ModalHeader>
          <ModalBody>        
           <ProgressCard value={props.ProgressObj.percentage} name={props.ProgressObj.fileName}  outOf={props.ProgressObj.totalCount}
                                cfileno={props.ProgressObj.outOfCount}  fileSize={props.ProgressObj.fileSize}
                                sucessCount={props.ProgressObj.sucessCount} failCount={props.ProgressObj.failCount} />          
          </ModalBody>
          
          <center><Button className={props.ProgressObj.btnStatus ? "status" : "status_done"} disabled={props.ProgressObj.btnStatus} onClick={() => {

              props.ProgressObj.passState()
              oBjreset()
          }} style={{padding:"1rem"}} >{props.ProgressObj.btnStatus ? "Uploading..." : <CheckCircle size='18px'/>}{props.ProgressObj.btnStatus ? "" : "  Done"}</Button></center><br />
        </Modal>
        </div>
        {
            props.ProgressModel ? <ReactInternetSpeedMeter  
            pingInterval={400} // milliseconds 
            thresholdUnit='megabyte' // "byte" , "kilobyte", "megabyte" 
            threshold={0.5}
            imageUrl="https://tds.designarchive.in/1/Archive/Content/Images/slider/33.jpg"
            downloadSize="1048576"  //bytes     
            callbackFunctionOnNetworkTest={(sp) => setSpeed((sp / 20).toFixed(2))}
          /> : <></>
        }
        </>
    )
}