import React, { useState, useEffect, useRef } from "react"
import $ from 'jquery'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Label,
  Col,
  Row,
  Input
} from "reactstrap"
import '../popup/Print.css'
import jsPDF from 'jspdf'
import { Columns } from "react-feather"
import {selection} from '../Utility/selection'
import { getQRbase64 } from '../Utility/Utility'
import { R_Loader } from '../../../loader/loader'
let did = []
let designId = []
let designName = []
let designUrl = []
let designFeatures = []
let designSize = []
let designInfo = []
let d_Size
const DPI = 96
const DPCM = DPI / 2.5
let inputValues = {inch: true, cent: false, design_label:false, Qr_Code:true, Design_Info:false, isheader:false, isfooter:false, column: 5, row: 6}
export const PrintQr = (props) => { 
  const [WithDesign, setWithDesign] = useState(false)
  const [Qr_Code, setQrCode] = useState(inputValues.Qr_Code)
  const [Design_Info, setDesign_Info] = useState(inputValues.Design_Info)
  const [design_label, setdesign_label] = useState(inputValues.design_label)
  const [isheader, setisheader] = useState(inputValues.isheader)
  const [isfooter, setisfooter] = useState(inputValues.isfooter)
//  const [check, setCheck] = useState(false)
  const [inch, setInch] = useState(inputValues.inch)
  const [cent, setCent] = useState(inputValues.cent)
  const [width, setWidth] = useState(((inputValues.width === undefined) && (inputValues.width === "")) ? inputValues.width : (cent === true ? 21.01 : 8.37))//default width in Cm 
  const [height, setHeight] = useState((inputValues.height && inputValues.height !== "") ? inputValues.height : (cent === true ? 29.69 : 11.69))//default height in cm
  const [ColumnValue, SetColumnValue] = useState(inputValues.column ? inputValues.column  : 5)
  const [RowValue, SetRowValue] = useState(inputValues.row ? inputValues.row : 6)
  const [leftValue, SetleftValue] = useState(inputValues.left ? inputValues.left : 0.5)
  const [rightValue, SetRightValue] = useState(inputValues.right ? inputValues.right : 0.5)
  const [TopValue, SetTopValue] = useState(inputValues.top ? inputValues.top : 0)
  const [BottomValue, SetBottomValue] = useState(inputValues.bottom ? inputValues.bottom : 0)
  const [HorizontalValue, SetHorizontalValue] = useState(inputValues.horizontal ? inputValues.horizontal : 0.2)
  const [VerticalValue, SetVerticalValue] = useState(inputValues.vertical ? inputValues.vertical : 0.2)
  const [pdf, setPdf] = useState()
  const loaderRef = useRef(null)

  useEffect(() => {
    inputValues = ({
      inch,
      cent,
      width,
      height,
      Qr_Code,
      Design_Info,
      design_label,
      isheader,
      isfooter,
   //   check,
      column:ColumnValue,
      row:RowValue,
      left:leftValue,
      right:rightValue,
      top:TopValue,
      bottom:BottomValue,
      vertical:VerticalValue,
      horizontal:HorizontalValue
    })
  })
 
  const [unit, setUnit] = useState(inputValues.inch || false) //false = cm true = inch
  let unitfactor = unit === true ? DPI : DPCM
  const preventPropagation = (event) => {
    event.stopPropagation()
  }
  function QrCode() {
      setCheck(false)
      setWithDesign(false)
      SetColumnValue(5)
      SetRowValue(6)
    }
    function DesignInfo() {                              
      setCheck(true)
      setWithDesign(true)
      SetColumnValue(2)
      SetRowValue(2)
    }
  function DrawHeader(docPdf) {
    const date = new Date()
    const today = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    docPdf.setFontSize(15)
    const userName = localStorage.userData.substring(localStorage.userData.indexOf('"userName":"') + 12, localStorage.userData.indexOf('","organisationName":'))
    docPdf.text(10, 10, userName)
    docPdf.text(160, 10, `Date :  ${today} `)
    docPdf.setFillColor(255, 255, 0)

  }
  function DrawFooter(docPdf) { //, noOfPages = 'optional'){
    docPdf.text(8, 288, 'Powered by Textronics')
    docPdf.text(170, 288, `Page No : ${docPdf.page}`)
    docPdf.setFillColor(255, 255, 0)
  }
  const Centimeter = () => {
    setInch(false)
    setCent(true)
    setUnit(false)
  
    const leftval = $("#m_left").val()
    const rightval = $("#m_right").val()
    const topval = $("#m_top").val()
    const bottomval = $("#m_bottom").val()
    const horz = $("#horz").val()
    const vert = $("#vert").val()
    const wpage = $("#widthpage").val()
    const hpage = $("#heightpage").val()
    const left    = (leftval * 2.54).toFixed(1)
    const right   = (rightval * 2.54).toFixed(1)
    const top     = (topval * 2.54).toFixed(1)
    const bottom  = (bottomval * 2.54).toFixed(1)
    const horizontal  = (horz * 2.54).toFixed(1)
    const vertical  = (vert * 2.54).toFixed(1)
    const w_p     = (wpage * 2.54).toFixed(2)
    const h_p     = (hpage * 2.54).toFixed(2)
   
    setWidth(w_p)
    setHeight(h_p)
    SetleftValue(left)
    SetRightValue(right)
    SetTopValue(top)
    SetBottomValue(bottom)
    SetHorizontalValue(horizontal)
    SetVerticalValue(vertical)
  }
  const Inch = (props, e) => {
    setCent(false)
    setInch(true)
    setUnit(true)
    const leftval = $("#m_left").val()
    const rightval = $("#m_right").val()
    const topval = $("#m_top").val()
    const bottomval = $("#m_bottom").val()
    const w_page = $("#widthpage").val()
    const h_page = $("#heightpage").val()
    const horz = $("#horz").val()
    const vert = $("#vert").val()
    const w_p     = (w_page / 2.54).toFixed(2)
    const h_p     = (h_page / 2.54).toFixed(2)
    const left    = (leftval / 2.54).toFixed(2)
    const right   = (rightval / 2.54).toFixed(2)
    const top     = (topval / 2.54).toFixed(2)
    const bottom  = (bottomval / 2.54).toFixed(2)
    const horizontal  = (horz / 2.54).toFixed(2)
    const vertical  = (vert / 2.54).toFixed(2)
    
    setWidth(w_p)
    setHeight(h_p)
    SetleftValue(left)
    SetRightValue(right)
    SetTopValue(top)
    SetBottomValue(bottom)
    SetHorizontalValue(horizontal)
    SetVerticalValue(vertical)
  }

  function PixelToMM(pixel, unit) {
    unitfactor = unit === true ? DPI : DPCM
    if (unit === true) {
      return pixel / unitfactor * 25.4
    } else {
      return pixel / unitfactor * 10
    }
  }
  function capitalizeFirstLetter(string) {
   const str = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    return str
  }
  function getFabricFeatureType(Features) {
    //
    const res = Features 
    return res
  }

   function checkBlankValue() {

    loaderRef.current.style.display = 'block'
    setWidth((inputValues.width !== "") ? inputValues.width : (cent === true ? 21.01 : 8.37))
    setHeight((inputValues.height !== "") ? inputValues.height : (cent === true ? 29.69 : 11.69))
    SetColumnValue((inputValues.column !== "" ? inputValues.column : 5))
    SetRowValue((inputValues.row !== "" ? inputValues.row : 6))
    SetleftValue((inputValues.left !== "" ? inputValues.left : 0.5))
    SetRightValue((inputValues.right !== "" ? inputValues.right : 0.5))
  SetTopValue((inputValues.top !== "") ? inputValues.top : 0)
  SetBottomValue((inputValues.bottom !== "") ? inputValues.bottom : 0)
  SetHorizontalValue((inputValues.horizontal !== "") ? inputValues.horizontal : 0.2)
  SetVerticalValue((inputValues.vertical !== "") ? inputValues.vertical : 0.2)
  GenerateDQR()
  }
   function GenerateDQR() {
   // 
  
   let didCount = 0
   designId = []
   designName = []
   designUrl = []
   designFeatures = []
   designInfo = []
   designSize = []
   
   selection?.selected2.map(function(element, key) {

    didCount++
    designId.push(element.id)
    designName.push(element.name)
    designUrl.push(element.imgUrl)
    designFeatures.push(element.features)
    designInfo.push(element[0] ? element.designInfo[0] : selection.designInfo)
    designSize.push(element.designSize)
    return did.push(designId)
           })
    /* Object.keys(selection.slected).map(function(key) {
      didCount++
      designId.push(selection.slected[key].id)
      designName.push(selection.slected[key].name)
      designUrl.push(selection.slected[key].imgUrl)
      designFeatures.push(selection.slected[key].features)
      designInfo.push(selection.designInfo[0] ? selection.designInfo[0] : selection.designInfo)
      designSize.push(selection.slected[key].designSize)
      return did.push(designId[key])
             }) */
    
   
    GenerateQR(WithDesign)
   }

  async function getAllQrImage(n, h, w, canvaswidthInch, canvasheightInch) {
     const link = selection.getQ3dLink(designName[n])
     d_Size = designSize[n].split(',')
    const d_sizeWidthInch = d_Size[0]
    const d_sizeHeightInch = d_Size[1]
    const designs  = designName[n]
     const features = {} 
       const data = getQRbase64(link)
      const DesignUrl = designUrl[n]
      let designBase64
      const xscale = d_sizeWidthInch / canvaswidthInch * 100 //canvasdpi / imgxDPI * 100.0;
      const yscale = d_sizeHeightInch / canvasheightInch * 100
     
      await getImgFromUrl(n, DesignUrl, w, h, xscale, yscale).then((e) => {
        
        designBase64 = e
    })
    console.log(designInfo[n][n]?.features)
     Object.values(designInfo[n]?.[n]?.designInfo ? designInfo[n]?.[n]?.designInfo : []).forEach((value) => {
                if (Object.keys(designFeatures[n]).includes(value) && designFeatures[n][value]) {
                features[value] = designFeatures[n][value]
              }
          })
const res = getFabricFeatureType(features) 
return [data, designBase64, res]
 }  

 async function getImgFromUrl(k, url, w, h, xscale, yscale) {
  
  return new Promise(function(resolve, reject) {
  
  w = w * (300 / 96) //image is of 'z' type canvasDpi = 300
  h = h * (300 / 96)
const canv = document.getElementById('canvas')
canv.width = w
canv.height = h
const ctx = canv.getContext('2d')
const img = new Image()
img.width = xscale
img.height = yscale
    img.crossOrigin = "anonymous"
   img.onload = () => {
      const pattern = ctx.createPattern(img, "repeat")
      ctx.fillStyle = pattern
      ctx.fillRect(0, 0, w, h)
     const base64 = canv.toDataURL("image/jpeg", 1.0) 
  
    
     resolve(base64)
    }
    img.src = url 
   }) 
  }
  
  function GenerateQR(withDesign) {
   // 
    did = []
  
     const pt = $('#collectionFabLibrary')[0].getAttribute('designtypeid')
     const pg = $("#collectionFabLibrary")[0].getAttribute('designgroupid')
    let goahead = false
    if (!withDesign) {
      const row = parseInt(document.getElementById("row").value)
      const col = parseInt(document.getElementById("col").value)
   
      if (row > 0 && col > 0 && row < 8 && col < 7) {
        goahead = true
      }
    } else {
      const row = parseInt(document.getElementById("row").value)
      const col = parseInt(document.getElementById("col").value)
      if (row > 0 && col > 0 && row < 8 && col < 7) {
        goahead = true
      }
    }
    if (goahead) {
     let didCount = 0 
     Object.keys(selection.selected2).map(function(key) {
      didCount++
      return did.push(selection.selected2[key].id)
        })

     
      if ((didCount > 0)) {
        const totalDesign = didCount
        Generate(totalDesign, withDesign)
      }
    } else {
      if (!withDesign) {
        loaderRef.current.style.display = 'none'
        alert("Row should be between 1 to 7 and Column should be between 1 to 6", "Heads up!", "#f7b84b", "warning")
      } else {
        loaderRef.current.style.display = 'none'
        alert("Row should be between 1 to 7 and Column should be between 1 to 6", "Heads up!", "#f7b84b", "warning")
      }
    
    }
  }

  function getQrimage(n) {
    //
    const fabId = did[n]
    const FabName  = designName[n]
    const link = selection.getQ3dLink(FabName)
    const data = getQRbase64(link)
 

      return [data]
    

  }
  async function Generate(designcount, IsDesign) {
   // 
    //const fab_count = Object.keys(selection.selected2).length// total fabrics selected
    const fab_count = selection?.selected2.length// total fabrics selected
    const qrcount = 0
    //for header footer 
    const isheader = $("#d_head").is(":checked")
    const isfooter = $("#d_foot").is(":checked")
    const design_label = $("#show_label").is(":checked")
    if ($("#isQRCode").is(":checked")) {
      IsDesign = false
      setCheck(false) 
    }
    //default page size is A4   
    unitfactor = unit === true ? DPI : DPCM
    

    let headerheight = DPCM * (2) //height
    let footerheight = DPCM * (2) //height
    if (isheader === false) {
      headerheight = 0
    }

    if (isfooter === false) {
      footerheight = 0
    }
    //for width use page width
    const textheight = 35
    const qrwdsize = 110, qrhtsize = 110
    const qroff = 30
    //Page Width height
    const pageWidth = unitfactor * (parseFloat($("#widthpage").val()))
    const pageHeight = unitfactor * (parseFloat($("#heightpage").val()))

    // const docpageWidth = pageWidth / unitfactor * 10 // cm to mm
    // const docpageHeight = pageHeight / unitfactor * 10// cm to mm

    //Margins 
    const left = unitfactor * (parseFloat($("#m_left").val())) //width  
    const right = unitfactor * (parseFloat($("#m_right").val())) //width
    const bottom = unitfactor * (parseFloat($("#m_bottom").val())) //width
    const top = unitfactor * (parseFloat($("#m_top").val())) //width
   
    //Printable Width Height 
    const printablewidth = (pageWidth - (left + right))
    const printableheight = (pageHeight - (headerheight + footerheight + (top + bottom)))

    // Number of Row Number of coll's 
    const row = (parseInt($("#row").val())) //width shubham changes
    const col = (parseInt($("#col").val()))//width

    // Spacing  
    const horzgap = (unitfactor * (parseFloat($("#horz").val())))
    const vertgap = (unitfactor * (parseFloat($("#vert").val())))
     
    if (pageWidth >= 0 && pageHeight >= 0 && left >= 0 && right >= 0 && bottom >= 0 && top >= 0 && horzgap >= 0 && vertgap >= 0) {

    //Cell Width Height 
    const cellwidth = (printablewidth - ((col - 1) * horzgap)) / col
    const cellheight = (printableheight - ((row - 1) * vertgap)) / row

    const cellwidthInInch = cellwidth / DPI
    const cellheightInINch = cellheight / DPI

   
    //calculate Number of pages 

    const noofpages = Math.ceil(designcount / (col * row))
    // new pdf doc
    let x = 0, y = 0
    let r = 0, b = 0

    let imgdesign, design
    let nCntr = 0

    const docPdf = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: [PixelToMM(pageWidth, unit), PixelToMM(pageHeight, unit)]
    })
    docPdf.page = 1
    for (let page = 0; page < noofpages; page++) {
      //put header
      if (isheader === true) {
        DrawHeader(docPdf)
      }
      if (isfooter === true) {
        DrawFooter(docPdf)
      }
      b = top + headerheight
      //let nCntr = 0;
      for (let i = 0; i < row; i++) {
        r = left
        for (let j = 0; j < col; j++, nCntr++) {
if (nCntr < fab_count) {
            x = r
            y = b
if (IsDesign) {
              //setting the font size for the header and footer
              //check = true
            let res
            await getAllQrImage(nCntr, cellheight, cellwidth, cellwidthInInch, cellheightInINch).then(e => {
               // 
                imgdesign = e[0]
                design =  e[1] 
               res =  e[2]
           }).then(e => console.log('last ', e))

              docPdf.addImage(design, PixelToMM(x, unit), PixelToMM(y, unit), PixelToMM(cellwidth, unit), PixelToMM(cellheight, unit))
             
              const xQr = x + (cellwidth - (qrwdsize + qroff))
              const yQr = y + qroff
    if (design_label) {
               
                let rect_i = 0
                let values_i = 0
                const size = Object.keys(res).length
                docPdf.setFillColor(255, 255, 255)
                docPdf.rect(PixelToMM(xQr - 150, unit), PixelToMM(yQr - 5, unit), PixelToMM(qrwdsize + 150, unit), PixelToMM(qrhtsize + 30, unit), 'F')
                docPdf.addImage(imgdesign, PixelToMM(xQr - 80, unit), PixelToMM(yQr, unit), PixelToMM(qrwdsize, unit), PixelToMM(qrhtsize, unit)) // xQR, yQR, cellwidth, cellheight);
                docPdf.setFillColor(255, 255, 255)
                
                docPdf.setFontSize(9)
                let fabN = designName[nCntr]
                fabN = capitalizeFirstLetter(fabN)
                const Fablength = fabN.length
                docPdf.setFillColor(255, 255, 255)
                if (Fablength > 10) {
                  docPdf.text(PixelToMM(xQr - 72, unit), PixelToMM(yQr + qrhtsize + 12, unit), fabN.substring(0, 13))
                  docPdf.text(PixelToMM(xQr - 72, unit), PixelToMM(yQr + qrhtsize + 25, unit), fabN.substring(13, Fablength))
                } else {
                  docPdf.text(PixelToMM(xQr - 55, unit), PixelToMM(yQr + qrhtsize + 12, unit), fabN.substring(0, 13))
                }
                $.each(res, function (index, value) {
                  docPdf.setFillColor(255, 255, 255)
                  if (size > 2 && size < 5) {
                    rect_i = +rect_i + 10
                    docPdf.rect(PixelToMM(xQr - 150, unit), PixelToMM(yQr + 135, unit), PixelToMM(qrwdsize + 150, unit), PixelToMM(qrhtsize - 50 + rect_i, unit), 'F')
                  } else if (size >= 5) {
                    rect_i = +rect_i + 15
                    docPdf.rect(PixelToMM(xQr - 150, unit), PixelToMM(yQr + 135, unit), PixelToMM(qrwdsize + 150, unit), PixelToMM(qrhtsize - 50 + rect_i, unit), 'F')
                  } else {
                    docPdf.rect(PixelToMM(xQr - 150, unit), PixelToMM(yQr + 135, unit), PixelToMM(qrwdsize + 150, unit), PixelToMM(qrhtsize - 50, unit), 'F')
                  }

                })

              $.each(res, function (index, value) {
                  docPdf.setFontSize(9)
              docPdf.setFillColor(255, 255, 255)
              docPdf.text(PixelToMM(xQr - 135, unit), PixelToMM(yQr + values_i + 150, unit), index)
              docPdf.text(PixelToMM(xQr - 35, unit), PixelToMM(yQr + values_i + 150, unit), ` :  ${value}`)
              values_i = values_i + 18
             }
             )    
               
   } else {
            docPdf.addImage(imgdesign, PixelToMM(xQr, unit), PixelToMM(yQr, unit), PixelToMM(qrwdsize, unit), PixelToMM(qrhtsize, unit)) // xQR, yQR, cellwidth, cellheight);
            docPdf.setFillColor(255, 255, 255)
            docPdf.rect(PixelToMM(xQr, unit), PixelToMM(yQr + qrhtsize, unit), 28.7, 7, 'F')
           docPdf.setFontSize(10)
           let fabN = designName[nCntr]
               
          fabN = capitalizeFirstLetter(fabN)
           const Fablength = fabN.length

                docPdf.setFillColor(255, 255, 255)

                if (Fablength > 26) {
                  
                  docPdf.rect(PixelToMM(xQr, unit), PixelToMM(yQr + qrhtsize, unit), 29.2, 9, 'F')
                  docPdf.text(PixelToMM(xQr + 9, unit), PixelToMM(yQr + qrhtsize + 12, unit), fabN.substring(0, 13))
                  docPdf.text(PixelToMM(xQr + 9, unit), PixelToMM(yQr + qrhtsize + 25, unit), fabN.substring(13, 25))
                  docPdf.text(PixelToMM(xQr + 9, unit), PixelToMM(yQr + qrhtsize + 38, unit), fabN.substring(26, Fablength))
                } else if (Fablength >= 12) {
                  
                  docPdf.text(PixelToMM(xQr + 9, unit), PixelToMM(yQr + qrhtsize + 12, unit), fabN.substring(0, 13))
                  docPdf.text(PixelToMM(xQr + 9, unit), PixelToMM(yQr + qrhtsize + 25, unit), fabN.substring(13, Fablength))
                } else {
                  
                  docPdf.text(PixelToMM(xQr + 9, unit), PixelToMM(yQr + qrhtsize + 12, unit), fabN.substring(0, 13))
                }
          }
  } else {
        const [qrimg] = getQrimage(nCntr)
        const xQR = x + ((cellwidth - qrwdsize) / 2)
         const yQR = y + ((cellheight - qrhtsize) / 2)


              docPdf.addImage(qrimg, PixelToMM(xQR, unit), PixelToMM(yQR, unit), PixelToMM(qrwdsize, unit), PixelToMM(qrhtsize, unit)) // xQR, yQR, cellwidth, cellheight);
             

   //text qr code 
    let fabN = ''
              if ((designName[nCntr]) !== undefined && ((designName[nCntr]) !== "")) {
               // 
                
                fabN = (designName[nCntr])
              } else {
          
                fabN = did[nCntr] 
              }
              docPdf.setFontSize(10)
              // docPdf.text(PixelToMM(xQR,unit), PixelToMM(yQR + qrhtsize + 7,unit)  , fabN)
         if (fabN.length > 26) {
                docPdf.text(PixelToMM(xQR + 6, unit), PixelToMM(yQR + qrhtsize + 12, unit), fabN.substring(0, 13))
                docPdf.text(PixelToMM(xQR + 6, unit), PixelToMM(yQR + qrhtsize + 25, unit), fabN.substring(13, 25))
                docPdf.text(PixelToMM(xQR + 6, unit), PixelToMM(yQR + qrhtsize + 37, unit), fabN.substring(25, fabN.length))
          } else if (fabN.length >= 13) {
                docPdf.text(PixelToMM(xQR + 6, unit), PixelToMM(yQR + qrhtsize + 12, unit), fabN.substring(0, 13))
                docPdf.text(PixelToMM(xQR + 6, unit), PixelToMM(yQR + qrhtsize + 25, unit), fabN.substring(13, fabN.length))
      } else {
                if (fabN.length > 5 && fabN.length <= 8) {
                  docPdf.text(PixelToMM(xQR + 6, unit) + 5, PixelToMM(yQR + qrhtsize + 12, unit), fabN)

                } else if (fabN.length >= 9) {
                        docPdf.text(PixelToMM(xQR + 6, unit) + 2, PixelToMM(yQR + qrhtsize + 15, unit), fabN)
                      } else {
                       docPdf.text(PixelToMM(xQR + 6, unit) + 9, PixelToMM(yQR + qrhtsize + 15, unit), fabN)
                      }
              }
            }
            r = x + cellwidth + horzgap // right
          } else {
            break
          }

        }
        b = y + cellheight + vertgap // bottom

      }
      if (page !== noofpages - 1) {
        docPdf.addPage()
        docPdf.page++
      }
     
    }
    loaderRef.current.style.display = 'none'
    embed(docPdf)
  } else {
    alert("Invalid Input")
  }
  }
   function embed (docPdf) {
    
    
   const url = docPdf.output('bloburl')
   
       setPdf(url)
   }
   
return (

  <Modal backdrop="static" keyboard={false} isOpen={props.printQrModel} toggle={() => {
    props.toggleprint()
  }} className="modal-lg modal-dialog-centered"
    fade={false} onClick={preventPropagation} style={{ userSelect: 'none' }}
  >
    <ModalHeader className='col-lg-12' toggle={() => {
      props.toggleprint()
    }}>Print Design
    </ModalHeader>
      <Row className='m-0' style={{ overflowY: 'hidden', overflowX: 'hidden' }}>

        <div className="col-lg-12 col-md-12 p-0" >
          <ModalBody className="pr-0">
            <div className="row">
              <Col md='7' lg='7' sm='12'>
                <legend style={{ width: '100%', marginTop: '4px', marginBottom: '4px', marginLeft: '10px', fontSize: '1rem' }}>Preview</legend>
                <div class="page_size" id="printDQRDemo">
                  <embed
                    style={{ width: "100%", height: "666px"}}
                    src={pdf}
                    type='application/pdf'
                    title='title'
                      />
                </div>
                <R_Loader loaderRef={loaderRef} />
                <canvas id = 'canvas' style={{ display : 'none'}}></canvas>
              </Col>
              <Col md='5' lg='5' sm='12'>
                <div className="setting_box">
                  <div className="col-md-12">
                    <label className="setup_heading">

                    </label>
                  </div>
                  <div className="setup col-md-12 pl-0"   >
                    <div className="set col-md-6 d-flex"  >
                      <Input type="radio" id="inch" name="Unit" className='mr-50' value={inch} onChange={Inch} checked={inch}  />
                      <label for="inch" className="pl-2">Inch</label>
                    </div>
                    <div className="set col-md-6 d-flex">
                      <Input id="Centimeter" type="radio" name="Unit" value={cent} onChange={Centimeter} checked={cent}/>
                      <label for="Centimeter" className="pl-2">Centimeter</label>
                    </div>
                  </div>
                </div>
              
                <div className="setting_box">
                  <div className="col-md-12">
                    <label className="setup_heading">
                      <span> Options</span>
                    </label>
                  </div>
                  <div className="setup col-md-12 pl-0" >
                    <div className="set col-md-6 d-flex">
                    <Input type="radio" id="isQRCode" name="code" value={Qr_Code} className='mr-50' onChange={QrCode} checked={Qr_Code}/>
                      <label for="isQRCode" className="pl-2" >QR Code Only</label>
                    </div>
                    <div className="set col-md-6 d-flex">
                    <Input id="isDesign" type="radio" name="code" value={Design_Info} className='mr-50' onChange={DesignInfo} checked={Design_Info}/>
                                        <label for="isDesign" className="pl-2">Fabric Swatch + QR Code</label>
                    </div>
                    <div className="set col-md-12">
                    <Input id="show_label" type="checkbox" class="custom-control-input" value={design_label} onChange ={show_label} checked={design_label}disabled={Qr_Code} />
                      <label for="show_label" className="pl-2" style={{ float: 'left' }} >Show Label Info</label>
                    </div>
                  </div>
                </div>
                <div className="setting_box">
                  <div className="col-md-12">
                    <label className="setup_heading">
                      <span> Page Size</span>
                    </label>
                  </div>
                  <div className="setup col-md-12  pl-0">
                    <div className="set col-md-6" >
                      <label for="">Width</label>
                      <div className="">
                        <Input id="widthpage" type="number"  placeholder="Width" value={width} onChange={(event) => setWidth(event.target.value)} style={{ width: '100%' }} />

                      </div>
                    </div>
                    <div className="set col-md-6">
                      <label for="">Height</label>
                      <div className="">
                        <Input id="heightpage" type="number"  placeholder="Height" value={height} onChange={(event) => setHeight(event.target.value)} style={{ width: '100%' }} />
                      </div>
                    </div>

                  </div>
                </div>
                <div className="setting_box">
                  <div className="col-md-12">
                    <label className="setup_heading">
                      <span> Blocks</span>
                    </label>
                  </div>
                  <div className="setup col-md-12  pl-0">
                    <div className="set col-md-6">
                      <label for="">Column</label>
                      <div className="">
                        <Input id="col" type="number" min="1" max="6" value={ColumnValue} placeholder="Column" onChange={(event) => SetColumnValue(event.target.value)} style={{ width: '100%' }} />
                      </div>

                    </div>
                    <div className="set col-md-6">

                      <label for="">Row</label>
                      <div className="">
                        <Input id="row" type="number" min="1" max="4" value={RowValue} placeholder="Row" onChange={(event) => SetRowValue(event.target.value)} style={{ width: '100%' }} />
                      </div>

                    </div>
                  </div>
                </div>
                <div className="setting_box">
                  <div className="setup col-md-12  pl-0">
                    <div className="set col-md-6">
                      <label for="">Left</label>
                      <div className="">
                        <Input id="m_left" type="number" min="1" max="6" placeholder="Left" value={leftValue} onChange={(event) => SetleftValue(event.target.value)} style={{ width: '100%' }} />
                      </div>
                    </div>
                    <div className="set col-md-6  ">
                      <label for="">Right</label>
                      <div className="">
                        <Input id="m_right" type="number" min="1" max="4" placeholder="Right" value={rightValue} onChange={(event) => SetRightValue(event.target.value)} style={{ width: '100%' }} />
                      </div>
                    </div>
                    <div className="set col-md-6 ">

                      <label for="">Top</label>
                      <div ref={top} className="">
                        <Input id="m_top" type="number" min="1" max="6" placeholder="Top" value={TopValue} onChange={(event) => SetTopValue(event.target.value)} style={{ width: '100%' }} />
                      </div>

                    </div>
                    <div className="set col-md-6  ">
                      <label for="">Bottom</label>
                      <div className="">
                        <Input id="m_bottom" type="number" min="1" max="6" placeholder="Bottom" value={BottomValue} onChange={(event) => SetBottomValue(event.target.value)} style={{ width: '100%' }} />
                      </div>

                    </div>
                  </div>

                </div>
                <div className="setting_box">
                  <div className="set col-md-12">
                    <label className="setup_heading">
                      <span>Spacing</span>
                    </label>
                  </div>
                  <div className="setup col-md-12 pl-0">
                    <div className="set col-md-6">

                      <label for="" >Horizontal</label>
                      <div className="">
                        <Input id="horz" type="number"  placeholder="Horizontal" value={HorizontalValue} onChange={(event) => SetHorizontalValue(event.target.value)} style={{ width: '100%' }} />
                      </div>
                    </div>
                    <div className="set col-md-6">

                      <label for="" >Vertical</label>
                      <div className="">
                        <Input id="vert" type="number"  placeholder="Vertical" value={VerticalValue} onChange={(event) => { event.preventDefault(); SetVerticalValue(event.target.value) }} style={{ width: '100%' }} />
                      </div>

                    </div>
                  </div>
                </div>

                <div className="setting_box">
                  <div className="set col-md-12"> <hr /></div>
                  <div className="set col-md-12">
                    <div className="set col-md-6">
                      <div >
                        <Input type="checkbox" id="d_head" class="custom-control-input" value="0" />
                      </div>
                      <label for="d_head" className="pl-2" style={{ marginTop: '0.1rem' }}> Header</label>
                    </div>
                    <div className="set col-md-6">
                      <div >
                        <Input type="checkbox" id="d_foot" class="custom-control-input"  />
                      </div>
                      <label for="d_foot" className="pl-2" style={{ marginTop: '0.1rem' }}> Footer</label>
                    </div>
                  </div>
                </div>
              </Col>
            </div>
          </ModalBody>
        </div>
      </Row>
      <ModalFooter className='d-block'>
        <Button color="primary" className='float-right' onClick={ checkBlankValue} >Generate </Button>
      </ModalFooter>

    </Modal>
  )
}
