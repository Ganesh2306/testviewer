import { Card, CardText, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import SpinnerSizes from "./spinner"
import { CheckCircle, Download, Wifi, WifiOff } from "react-feather"
import ProgressLabeled from "./ProgressLabeled"
import { oBjreset } from "../AddDesign"
import { useState } from 'react'
import { ReactInternetSpeedMeter } from 'react-internet-meter'
const ProgressCard = (props) => {
  return (
    <>
      <ProgressLabeled value={props.value} />
      <table className="w-100">
        <tbody className="mx-2">
          {/* <tr>
                  <td colSpan='2'>    <ProgressLabeled value={props.value}/></td>
                </tr> */}
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
          {props.sucessCount > 0 && <tr>
            <td className='font-weight-bold w-70'>Successfully Saved Count</td>
            <td>:&nbsp;&nbsp; {props.sucessCount}</td>
          </tr>}
          {props.failCount > 0 && <tr>
            <td className='font-weight-bold w-70'>Failed Count</td>
            <td>:&nbsp;&nbsp; {props.failCount}</td>
          </tr>}
          {/* {props.Message !== "" && props.Message !== null && props.Message !== undefined && <tr>
            <td className='font-weight-bold w-70'>Message</td>
            <td style={{ whiteSpace: "pre-line" }}>
              :&nbsp;&nbsp; {props.Message}
            </td>
          </tr>} */}
          {/* <tr>
                <Button className="cancel"  onClick={() => {
                    props.toggle()
                    //oBjreset()
                        }}>Cancel</Button>
                </tr> */}
        </tbody>
      </table>
      {props.Message !== "" && props.Message !== null && props.Message !== undefined && (
  <div className="message-wrapper">
    <div className="message-title">Message</div>
    <div className="message-text">
      {props.Message}
    </div>
  </div>
)}
    </>
  )
}

export const ProgressModel = (props) => {
  //ToDO : Add state value for progress bar 
  const [speed, setSpeed] = useState('')
  //ProgressObj
  //percentage
  // console.log(props.ProgressObj)
  return (
    <>
      <div className='basic-modal'>
        <Modal isOpen={props.ProgressModel} toggle={props.ProgressModel} className="progress_model modal-dialog-centered">
          <ModalHeader>Upload Design Status <div className="net_icon"><span>{speed}Mb</span> {parseFloat(speed) === 0 ? <WifiOff /> : <Wifi />}</div></ModalHeader>
          <ModalBody>
            <ProgressCard value={props.ProgressObj.percentage} name={props.ProgressObj.fileName} outOf={props.ProgressObj.totalCount}
              cfileno={props.ProgressObj.outOfCount} fileSize={props.ProgressObj.fileSize}
              sucessCount={props.ProgressObj.sucessCount} failCount={props.ProgressObj.failCount} Message={props.ProgressObj.Message} toggle={props.toggle} />
          </ModalBody>
          <ModalFooter className="justify-content-between">
          {props.ProgressObj.Message !== "" && props.ProgressObj.Message !== null && props.ProgressObj.Message !== undefined &&
            <Button className="btn-download" onClick={() => {
              const blob = new Blob([props.ProgressObj.Message], {
                type: 'text/plain;charset=utf-8'
              })

              const url = URL.createObjectURL(blob)

              const a = document.createElement('a')
              a.href = url
              a.download = `failed-designs.txt`
              document.body.appendChild(a)
              a.click()

              document.body.removeChild(a)
              URL.revokeObjectURL(url)
              //oBjreset()
            }}>
              <Download size={24} style={{ marginRight: "6px" }} />
              Download Message</Button>
          }
          <center><Button className={props.ProgressObj.btnStatus ? "status" : "status_done"} disabled={props.ProgressObj.btnStatus}
            onClick={() => {
              props.ProgressObj.passState()
              oBjreset()
            }} style={{ padding: "1rem" }} >{props.ProgressObj.btnStatus ? "Uploading..." : <CheckCircle />}{props.ProgressObj.btnStatus ? "" : "  Done"}</Button></center><br />
          </ModalFooter>
        </Modal>
      </div>
      {
        props.ProgressModel ? <ReactInternetSpeedMeter
          pingInterval={400} // milliseconds 
          thresholdUnit='megabyte' // "byte" , "kilobyte", "megabyte" 
          threshold={0.5}
          imageUrl="https://tds.designarchive.in/1/Archive/Content/Images/slider/33.jpg"
          downloadSize="1048576"  //bytes
          //callbackFunctionOnNetworkDown={(speedq) => console.log(Internet speed is down ${speedq})}
          callbackFunctionOnNetworkTest={(sp) => setSpeed((sp / 20).toFixed(2))}
        /> : <></>
      }
    </>
  )
}