import React, { useState, useEffect } from "react"
import {
    Button,
    Modal,
    ModalBody
} from "reactstrap"
import useWindowSize from "../customHooks/useWindowSize"
import { X } from "react-feather"
import Loader from "../Loader/Loader"
const TableComponent = (props) => {
  const { width } = useWindowSize()
  const [apiData, setApiData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch(`https://apiord.infotex.co.in/api/DsgnStck/?Compid=TXT56962&Design=${props.title}`)
              if (!response.ok) {
                  throw new Error('Network response was not ok')
              }
              const data = await response.json()
              console.log(data, 'data')
              const processedData = Array.isArray(data) ? data[0] : data
              setApiData(processedData)
          } catch (err) {
              setError(err.message)
          } finally {
              setLoading(false)
          }
      }
      
      fetchData()
  }, [props.title])

  if (loading) return <Loader isShow={true} />
  if (error) return <h1 style={{color:'red'}}>Error: {error}</h1>
  if (!apiData) return <div>No data available</div>
  const dataEntries = apiData && typeof apiData === 'object' ? Object.entries(apiData) : []

  return (
      <div style={{ margin: '0 auto' }}>
          <h3>Design Name :- <span style={{color:'#0a66c2'}}>{props.title}</span></h3>
          <table border="1" cellPadding="5" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                  <tr>
                      <th style={{width: `${width / 2}px`}}>Field</th>
                      <th style={{width: `${width / 2}px`}}>Value</th>
                  </tr>
              </thead>
              <tbody>
                  {dataEntries.map(([field, value]) => (
                      <tr key={field}>
                          <td style={{ 
                              borderTop: '1px solid black', 
                              borderBottom: '1px solid black', 
                              borderRight: '1px solid black',
                              padding: '8px'
                          }}>
                              {field}
                          </td>
                          <td style={{ 
                              borderTop: '1px solid black', 
                              borderBottom: '1px solid black', 
                              borderRight: '1px solid black',
                              padding: '8px'
                          }}>
                              {typeof value === 'object' ? JSON.stringify(value) : (value || 'N/A')}
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
  )
}
  
 export default TableComponent

export const ErpInfo = (props) => {    
    const { width, height } = useWindowSize()
    return (
        <>
            <Modal id="erpInfo" isOpen={props.erpInfo} toggle={props.erptoggle} className="modal-lg p-0 m-0" style={{ width: `${width}px`, height:`${height}px`, maxWidth:`${width}px`, overflowY:'hidden', marginTop:'0', position:'fixed'  }}>
              <button type="button" className='d-block close ' onClick={() => props.setErpInfo(false)} style={{position:"absolute", right:'1.5rem', top:'1.5rem', cursor:'pointer', zIndex :'99'}}><X /></button>
            <ModalBody  className="p-0" style={{ width: `${width}px`, height:`${height}px`, maxWidth:`${width}px`}} >
             <div className="col-lg-12 p-0  d-flex flex-column flex-lg-row">
                <div className="col-lg-5 p-0">
                    <div className="imgLeft"  style={{ backgroundImage: `url("${props.imgSrc}")`, height:`${height}px`}} >
                      <label>{props.title}</label>
                    </div>
                </div>
                <div className="infoRight col-lg-7 p-2"  style={{ height:`${height}px`, overflowY: 'auto'}}>
                <TableComponent title={props.title}/>
                </div>
             </div>   
                <center>
                    <Button color="primary"  onClick={() =>  props.setErpInfo(false)} >
                     
                    </Button>
                </center>
            </ModalBody>

          </Modal>
        </>
    )
}
