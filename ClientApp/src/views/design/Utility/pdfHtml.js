 /* eslint-disable */
 import JsBarcode from "jsbarcode"

 const html2pdf = require('html-to-pdf-js')
 
 const toDataUrl = async function (url, callback) {
     return new Promise((resolve, reject) => {
       var xhr = new XMLHttpRequest();
       xhr.onload = function () {
         var reader = new FileReader();
         reader.onloadend = function () {
           resolve(reader.result);
         };
         reader.readAsDataURL(xhr.response);
       };
       xhr.onerror = () => {
         reject({
             f:true,
           status: xhr.status,
           statusText: xhr.statusText,
         });
       };
       xhr.open("GET", url);
       xhr.responseType = "blob";
       xhr.send();
     });
   };
//TODO: LOOP
        
const pdfHtml = async (Data, totalQuantity, selectedindex, isBoard, isLoginUser, forboard, LogoUrl, Customer, supplier, name, setLoaderCallback) => {
     function GenerateBarcodeForReport1(ele, barText) {
     JsBarcode(ele, barText, {
         format: 'CODE128',
         displayValue: false,
         fontSize: 35,
         lineColor: '#000',
         width: 2,
         height: 100
     })
  }
      const timestamp = Date.now()
      let logoUrl = await toDataUrl(`${LogoUrl}?v=${timestamp}`)
      let customerCode = null
      let customerWho = null
      let email = null
      let Board_Name = null
      let boardname = null
      let Collection = null
      let Collection_Name = null
      const address = supplier.sup_address
      const SupplierName = supplier.sup_name
      if(isBoard) {
        if (isLoginUser) {
           customerCode = Customer.cus_code
           customerWho =  Customer.cus_name  
           email = Customer.cus_email
           Board_Name = JSON.parse(localStorage.getItem("selectUserBoard"))
           boardname = name
        } else {
           customerCode = Customer.cus_code
           customerWho =  Customer.cus_name  
           email = Customer.cus_email
           Board_Name = forboard
           boardname = name
        }
           
       } else {
        if(isLoginUser) {
          Collection = name
        } else {
          Collection = name
        }
  
       }
      const cdate = new Date()
      let date = cdate. getDate() + '-' + parseInt(cdate. getMonth() + 1) + '-' + cdate. getFullYear()
     const img = document.createElement('img')
      img.height = 90
      img.width = 150
      let designDetails = ''
      const arc_FavoriteDetailsDtos =''
      
      const options = {
        filename: isBoard ? `${name}`+`_Board.`+`pdf` : `${name}`+`_Collection.`+`pdf`
      }
      for (let i = 0; i < Data.length; i++) {
       let key = i;
       const e = Data[i];
   
       let designname = e.designName;
       let details = e.designInfo || {} //vaibhavimore
       let features = e.features;
       GenerateBarcodeForReport1(img, e.designName);
       let url = await toDataUrl(
        `${e.imageUrl}?v=${timestamp}`
           .replace(/\'/gi, "")
           .replace(/\(/g, "%28")
           .replace(/\)/g, "%29")
           .replace(/ /g, "%20")
       );
       let backurl =
         "style =background:url('" +
         url +
         "')repeat;width:80px;height:80px;padding:4px";
       designDetails +=
         "<tr style='border: 1px solid black; border-top:none;page-break-inside: avoid;'>" +
         "<td style='border: 0px solid black;border-top:none; border-bottom:none; border-right:none; font-size:14px;padding-left:4px; color:#000;'>" +
         (key += 1) +
         "</td>" +
         "<td style='border: 1px solid black;border-top:none; border-bottom:none; border-right:none; font-size:14px;padding-left:4px;'>" +
         "<table style='margin:  auto;'>" +
         "<tbody>" +
         " <tr>" +
         "<td style='border: 0px solid black;border-top:none; border-bottom:none; border-right:none;'> <div " +
         backurl +
         "> </div></td>" +
         "</tr> </tbody></table> </td>" +
         "<td style='border: 1px solid black;border-top:none; border-bottom:none; border-right:none; font-size:14px;padding-left:4px;'>" +
         " <table class='' cellspacing='10px' cellpadding='2px' style='border-collapse: collapse; width: 100%; text-align: center; font-size:14px;padding-left:4px;'>" +
         "<tbody><tr>" +
         "<td style='border: 0px solid #fff;border-top:none; border-bottom:none; border-right:none; padding:20px 10px 10px 10px;'>" +
         img.outerHTML +
         "</td>" +
         "</tr>" +
          "<tr>" +
           " <td style='border:1px solid #fff; color:#000; margin-top:0px; padding-top:0px;'>"+ designname +"</td>" +
          " </tr>" +
         "</tbody></table>" +
         "</td>" +
         " <td style='border: 1px solid black;border-top:none; border-bottom:none;padding-left:10px; padding-top:0px;'>" +
         " <table class='fab_property' cellspacing='10px' cellpadding='2px' style='border-collapse: collapse; width: 100%; text-align: center; font-size:14px;padding-left:4px;'>" +
         "<tbody><ul style ='padding:0px; margin:0px 0px 0px 0px;'>" +
         Object.values(details)
           .map((el) => {
             const key = el;
             return `<li style ='list-style: none; padding:0px; margin:0px; text-align: left; color:#000;'> <label style ='width: 30%;font-weight: 700; font-style: bold; padding:0px; margin:0px; color:#000; '><b> ${key} </b></label> <span padding:0px; margin:0px; color:#000;>: ${features[key] ? features[key] : ""}</span> </li>`;
           })
           .join("")
            +
         "</ul> </tbody></table>" +
         "</td>" +
         " <td style='border: 0px solid black;font-size:14px;padding-left:4px;'>" +
         " </td>" +
         " </tr>";
     }
   
     let style =
       "<style type='text/css'>" +
       " body {background:#5e5e5e;font-family:arial;font-size:12px;color:#252525;}" +
       "* { box-sizing: inherit; -moz-box-sizing: border-box;}" +
       " .page {background:red; display:block;margin:0 auto;   margin-bottom:0.5cm;  box-shadow:0 0 0.5cm rgba(0,0,0,0.5);  padding-left:5px; padding-right: 5px; width: 21cm; min-height: 29.7cm;height: auto;}" +
       "ul li {display: inline; font-size: 12px;list-style-type: none!important;}" +
       "ul#i { position: absolute; top: -5px; width: 183px; right: 0;  display: inline-block;}" +
       "#i li { padding: 5px 10px; background-color: #989898; border-bottom-right-radius: 5px;  border-bottom-left-radius: 5px;" +
       "color: white; margin-top: 0px;  transition: all 500ms;font-weight: normal; display: inline-block;float: left;}" +
       "#i li:hover { background-color: #e6004c !important;  color: #fff !important; cursor: pointer;}" +
       ".fab_property td:before { content: ':'; padding-left: 1em; padding-right: 1em;}" +
       "canvas{  background: #fff !important; background-color: #fff !important margin: 0;}" +
       "table {border-collapse:collapse;}" +
       "@page {size: A4; margin: 0;}" +
       "@media print { body, page {margin: 0;box-shadow: 0; } }</style>";
     let orgCUSTDATA = "";
   
     let reportName = null;
     if (isBoard) {
       reportName =
         "<p style='padding-top: 3px;margin-top: 8px;color: #615d5d;font-size: 20px;font-weight: 00;font-family:Myriad Pro, Arial, Helvetica, sans-serif !important;'> Board Report</p>";
     } else {
       reportName =
         "<p style='padding-top: 3px;margin-top: 8px;color: #615d5d;font-size: 20px;font-weight: 00;font-family:Myriad Pro, Arial, Helvetica, sans-serif !important;'> Collection Report</p>";
     }
     let header = null;
   if (isBoard) {
     header =
       "<table cellspacing='10px' cellpadding='4px' style='border-collapse: collapse; width: 95%; margin-left:19px; text-align: left; margin-top: 10px;  margin-bottom: 10px;font-size: 14px;font-family:Myriad Pro, Arial, Helvetica, sans-serif !important'>" +
       "<tbody><tr style='border: 0px solid black;font-size: 13px;'>" +
       "<th style='border: 1px solid #000; width: 15%; color:#000; border-bottom:none; border-right:none; font-weight: bold'> Supplier Name </th><td style='border: 1px solid black;width: 22%; color:#000; border-bottom:none; border-right:none;'>&nbsp;" +
       SupplierName +
       " </td>" +
       "<th style='border: 1px solid black;width: 5%; color:#000; border-bottom:none; border-right:none; font-weight: bold'> Board</th><td style='border: 1px solid black;width: 20%; color:#000; border-bottom:none; border-right:none;'>&nbsp;" +
       boardname +
       " </td>" +
       "<th style='border: 1px solid black;width: 5%; color:#000; border-bottom:none; border-right:none; font-weight: bold'> Date</th>" +
       "<td style='border: 1px solid black;width: 15%; color:#000;  border-bottom:none;'>  &nbsp;" +
       date +
       " </td>" +
       "</tr>  <tr style='border: 0px solid black; font-size: 13px;'>" +
       "<th style='border: 1px solid #000;width: 15%; color:#000; border-right:none; font-weight: bold;'>Customer </th><td style='border: 1px solid black;width: 22%; color:#000; border-right:none;'>&nbsp;" +
       customerWho +
       "</td>" +
       "<th style='border: 1px solid black;width: 5%; color:#000; border-right:none; font-weight: bold;'> Code </th><td style='border: 1px solid black;width: 20%; color:#000; border-right:none;'> &nbsp;" +
       customerCode +
       "</td></td>" +
       "<th style='border: 1px solid black;width: 5%; color:#000;border-right:none; font-weight: bold;'> Email </th><td style='border: 1px solid black;width: 15%; color:#000;'> &nbsp;" +
       email +
       "</td></td></tr>" +
       orgCUSTDATA +
       "</tbody></table>";
   } else {
     header =
       "<table cellspacing='10px' cellpadding='4px' style='border: 0px solid #fff; border-collapse: collapse; width: 95%; margin-left:19px; text-align: left; margin-top: 10px;  margin-bottom: 10px;font-size: 14px;font-family:Myriad Pro, Arial, Helvetica, sans-serif !important; color:#000;'>" +
       "<tbody><tr style='border: 0px solid black;font-size: 13px;'>" +
       "<th style='border: 0.0625rem solid black;width: 15.7%; border-right:none; color:#000;'> Supplier Name </th><td style='border: 0.0625rem solid black;width: 23.5%;border-right:none; color:#000;'>&nbsp;" +
       SupplierName +
       " </td>" +
       "<th style='border:0.0625rem solid black;width: 10%; border-right:none; color:#000;'> Collection</th><td style='border: 0.0625rem solid black;width: 23%; border-right:none; color:#000;'>&nbsp;" +
       Collection +
       " </td>" +
       "<th style='border: 0.0625rem solid black;width: 10%; border-right:none; color:#000;'> Date</th>" +
       "<td style='border: 0.0625rem solid black;width: 15%; color:#000;'>  &nbsp;" +
       date +
       " </td></tr>" +
       orgCUSTDATA +
       "</tbody></table>";
   }
   let pdfContent =
     "<table width='95%' cellspacing='0' cellpadding='0' border-spacing='0' style='border: 1px solid #fff;margin-top: 35px; margin-left:18px;  margin-bottom: 3px;font-family:Myriad Pro, Arial, Helvetica, sans-serif !important;'>" +
     "<tbody>" +
     "<tr style='border: 1px solid #fff;'>" +
     "<td style='width:15px'> <img src= " +
     logoUrl +
    //  "crossorigin='anonymous'"
     " style= ' margin-top:-38px; width:160px'; 'height:auto'; alt=''> </td>" + //akash chnages in width
     "<td style='width:70%; text-align: center;padding-left:0px;font-weight: normal;padding-right:30%'><b style='font-weight:500;font-size: 14px;color: black;font-family:  Myriad Pro, Arial, Helvetica, sans-serif !important;'>" +
     address +
     "</b>" +
     reportName +
     //  "<p style='padding-top: 3px;margin-top: 8px;color: #615d5d;font-size: 20px;font-weight: 00;font-family:Myriad Pro, Arial, Helvetica, sans-serif !important;'> Board Report</p>" +
     "</td>" +
     "</tr>" +
     "</tbody>" +
     "</table>" +
     header +
     "<table cellspacing='10px' cellpadding='2px' style='border: 1px solid #fff; border-collapse: collapse; width: 95%; margin-left:19px; text-align: left;font-size: 14px;font-family:Myriad Pro, Arial, Helvetica, sans-serif !important '><thead style='display: table-header-group;'> <tr >" +
     "<td style='border: 1px solid black ; border-right:none;  background-color:  #e0e0e0; color: black;width: 4%;text-align: left;font-weight: 600;height:30px; '>No.</td>" +
     "<td style='border: 1px solid black ; border-right:none;  background-color:  #e0e0e0; color: black;width: 8%;text-align: left;font-weight: 600;padding-left:4px;height:30px; '>Reference </td>" +
     "<td style='border: 1px solid black ; border-right:none;  background-color:  #e0e0e0; color: black;width: 8%;text-align: left;font-weight: 600;padding-left:4px;height:30px;'>Design Code </td>" +
     "<td style='border: 1px solid black ; border-right:none;  background-color:  #e0e0e0; color: black;width: 45%;text-align: left;font-weight: 600;padding-left:4px; height:30px;'> Details </td>" +
     "<td style='border: 1px solid black ; background-color:  #e0e0e0; color: black;width: 35%;;text-align: left;font-weight: 600;padding-left:4px;height:30px; '> Remark </td>" +
     "</tr><thead>" +
     "<tbody>" +
     designDetails +
     "</tr></thead>" +
     "<tr>" +
     "<th colspan='5' style='border: 1px solid black; border-top:none; width: 25%; color:#000;'> Total Designs :" +
     totalQuantity +
     "</th>" +
     "</tr>" +
     "</tbody></table> ";
 
   let printContents = '<div  style ="padding:1rem">' + pdfContent + " </div>";
 
    html2pdf().set(options).from(printContents).save();
    setLoaderCallback()
 };
 
 export default pdfHtml;
 