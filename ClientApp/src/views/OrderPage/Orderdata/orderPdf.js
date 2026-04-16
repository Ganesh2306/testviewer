 /* eslint-disable */
 import JsBarcode from "jsbarcode"
 import axios from 'axios'
 import { useState, useEffect, useContext } from "react"
 import { useBarcode } from '@createnextapp/react-barcode'
 import homelogo from '../../../assets/images/logo/design_archive_logo.png'
 import { Key } from "react-feather"
 import Barcode from "react-barcode"
import { data } from "jquery"

const html2pdf = require('html-to-pdf-js')

const getProxyUrl = (url) => {
     try {
       const parsed = new URL(url, window.location.origin)
       if (
         parsed.host.toLowerCase() === "s3.ap-south-1.amazonaws.com" &&
         parsed.pathname.toLowerCase().startsWith("/aws.tds/")
       ) {
         return `/api/image-proxy?url=${encodeURIComponent(parsed.href)}`
       }
     } catch (e) {
       // ignore parse errors and fall back to original url
     }
     return url
   }

const toDataUrl = async function (url, callback) { 
     //Convert to base64
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
       xhr.open("GET", getProxyUrl(url));
       xhr.responseType = "blob";
       xhr.send();
     });
   };

//TODO: LOOP
 //console.log(html2pdf)
        
 const orderPdf = async(Data, setLoaderCallback) => {
  
 function GenerateBarcodeForReport1(ele, barText) {
  // console.log('3')
     JsBarcode(ele, barText, {
         format: 'CODE128',
         displayValue: false,
         fontSize: 35,
         lineColor: '#000',
         width: 2,
         height: 100
     })
    //  console.log(ele)
  }
      const timestamp = Date.now()
      let logoUrl = await toDataUrl(`${Data.logoUrl}?v=${timestamp}`)
      let OrderNo = Data.generateOrderReportDto.orderNo  
      let OrderCode = Data.generateOrderReportDto.orderCode 
      let OrderDate = Data.generateOrderReportDto.orderDate 
      let customerName = Data.generateOrderReportDto.customerName 
      let UserName = Data.generateOrderReportDto.userName 
      const options = {
        filename: `OrderNo_`+`${OrderNo}`+`.`+`pdf`
      }
    //   let boardname = null
       function Formatedate(date) {
       const d = new Date(date)
       return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
       }
      let Design = Data.generateOrderReportDto.designs 
      const SupplierName = Data.generateOrderReportDto.supplierName
      let userEmail = Data.generateOrderReportDto.userEmail 
      let TotalQuantity = null
      const RequestType = Data.generateOrderReportDto.requestType 
      const description = Data.generateOrderReportDto.description 
      const img = document.createElement('img')
      img.height = 90
      img.width = 150
      let designDetails = ''
      let a = Data.designOrderReportDto 

      for (let i = 0; i < a.length; i++) {
        
       let key = i;
       const e = a[i];
       TotalQuantity += e.orderQuantity
       let requestType = e.requestType
       let orderQuantity = e.orderQuantity
       let comment = e.comment
       let designname = e.designName;
    // let details = e.designInfo;
       let features = e.fieatureDic;
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
         "<td style='border: 0px solid black;border-top:none; border-bottom:none; border-right:none; font-size:14px;padding-left:4px; color:black;'>" +
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
         "<td style='border-top:none; border-bottom:none; border-right:none; padding:20px 10px 0px 10px;'>" +
         img.outerHTML +
         "</td>" +
         "</tr>" +
           "<tr>" +
            " <td style='color:#000'; margin-top:-10px; padding-top:0px;'>"+ designname +"</td>" +
           " </tr>" +
         "</tbody></table>" +
         "</td>" +
         " <td style='border: 1px solid black;border-top:none; border-bottom:none;padding-left:10px; padding-top:0px;'>" +
         " <table class='fab_property' cellspacing='10px' cellpadding='2px' style='border-collapse: collapse; width: 100%; text-align: center; font-size:14px;padding-left:4px;'>" +
         "<tbody><ul style ='padding:0px; margin:0px 0px 0px 0px;'>" +
         Object.entries(features).map(([key, value])  => {
             return `<li style ='list-style: none; padding:0px; margin:0px; text-align: left; color:black;'> <label style ='width: 30%;font-weight: 700; font-style: bold; padding:0px; margin:0px; color:black'><b> ${key} </b></label> <span padding:0px; margin:0px; color:#000;>: ${value ? value : ""}</span> </li>`;
           })
           .join("") +
         "</ul> </tbody></table>" +
         "</td>" +
         " <td style='border: 1px solid black; border-top:none; border-left:none; border-bottom:none; font-size:14px;padding-left:0px; color:black;'>" +
         "<p style='text-align: center;'>" + requestType + "</p>"+
         " </td>" +
         "</td>" +
         " <td style='border: 1px solid black; border-top:none; border-left:none; border-bottom:none; font-size:10px;padding-left:0px; color:black;'>" +
         "<p style='text-align: center;'>"+comment+"</p>"+
         " </td>" +
         "</td>" +
         " <td style='border: 1px solid black; border-top:none; border-left:none; border-bottom:none; font-size:14px;padding-left:0px; color:black; '>" +
         "<p style='text-align: center;'>"+orderQuantity+"</p>"+
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
   
     const reportName =  "<p style='position: absolute; top:40px; left:300px; padding-top: 3px;margin-top: 8px;color: #615d5d;font-size: 22px;font-weight: 00;font-family:Myriad Pro, Arial, Helvetica, sans-serif !important;'> Request Report </p>";
    //  if (isBoard) {
    //    reportName =
    //      "<p style='padding-top: 3px;margin-top: 8px;color: #615d5d;font-size: 20px;font-weight: 00;font-family:Myriad Pro, Arial, Helvetica, sans-serif !important;'> Order Request Report</p>";
    //  } else {
    //    reportName =
    //      "<p style='padding-top: 3px;margin-top: 8px;color: #615d5d;font-size: 20px;font-weight: 00;font-family:Myriad Pro, Arial, Helvetica, sans-serif !important;'> Collection Report</p>";
    //  }
     const header =  "<table cellspacing='10px' cellpadding='4px' style='border: 1px solid black; border-collapse: collapse; width: 95%; margin-left:19px; text-align: left; margin-top: 10px;  margin-bottom: 10px;font-size: 13px;font-family:Myriad Pro, Arial, Helvetica, sans-serif !important; color:black;'>" +
            "<tbody><tr style='border: 0px solid black;'>" +
            "<th style='border: 0px solid black;width: 15%;'> Request No</th><td style='border-left: 1px solid black;   width: 22%'>&nbsp;" +
            OrderNo +
            " </td>" +
            "<th style='border-left: 1px solid black; width: 5%'> Request Code</th><td style='border-left: 1px solid black; width: 20%'>&nbsp;" +
            OrderCode +
            " </td>" +
            "<th style='border-left: 1px solid black;  width: 5%'> Request Date</th>" +
            "<td style='border-left: 1px solid black;  width: 15%'>  &nbsp;" +
            Formatedate(OrderDate) +
            " </td>" +
            "</tr>  <tr style='border: 0px solid black;'>" +
            "<th style='border: 1px solid black; border-right:none; border-left:none; border-bottom: none; width: 15%; border-right:none;'>Customer Name</th><td style='border: 1px solid black; border-right:none; border-bottom: none; width: 22%'>&nbsp;" +
            customerName +
            "</td>" +
            "<th style='border: 1px solid black; border-right:none; border-bottom: none; width: 5%'> User Name</th><td style='border: 1px solid black; border-right:none; border-bottom: none; width: 20%'> &nbsp;" +
            UserName +
            "</td></td>" +
            "<th style='border: 1px solid black; border-right:none; border-bottom: none; width: 5%'> Designs </th><td style='border: 1px solid black; border-right:none; border-bottom: none; width: 15%'> &nbsp;" +
            Design +
            "</td></td></tr>" +
            "</tr>  <tr style='border: 0px solid black;'>" +
            "<th style='border: 1px solid black; border-right:none; border-bottom:none; border-left:none; border-bottom: none; width: 15%;'>Supplier Name</th><td style='border: 1px solid black; border-right:none; border-bottom:none; border-bottom: none; width: 22%'>&nbsp;" +
            SupplierName +
            "</td>" +
            "<th style='border: 1px solid black; border-right:none; border-bottom:none; border-bottom: none; width: 5%'> User Email</th><td style='border: 1px solid black; border-bottom:none; border-right:none; border-bottom: none; width: 20%'> &nbsp;" +
            userEmail +
            "</td></td>" +
            "<th style='border: 1px solid black; border-right:none; border-bottom:none; width: 5%'> Total Quantity </th><td style='border: 1px solid black; border-right:none; border-bottom:none; width: 15%'> &nbsp;" +
            TotalQuantity +
            "</td></td></tr>" +
            "</tr>  <tr style='border: 1px solid black; border-left: none; border-bottom: none; border-right: none;'>" +
            "<th style='border: 0px solid black; width: 15%'> Request Type </th><td style='border-left: 1px solid black; width: 22%'>&nbsp;" +
            RequestType +
            "</td>" +
            "<th style='border-left: 1px solid black; width: 5%'> Description </th><td style='border-left: 1px solid black; width: 20%'> &nbsp;" +
            description +
            //"</td>
            "</td>"+
            //"</tr>" + 
            // "<th style='border: 1px solid black;width: 5%'> Designs </th><td style='border: 1px solid black;width: 15%'> &nbsp;" +
            // Design +
            // "</td></td>
            // "</tr>" +
            orgCUSTDATA +
            "</tbody></table>";
   let pdfContent =
     "<table width='95%' cellspacing='0' cellpadding='0' border-spacing='0' style='border: 1px solid #fff;margin-top: 35px; margin-left:18px;  margin-bottom: 3px;font-family:Myriad Pro, Arial, Helvetica, sans-serif !important;'>" +
     "<tbody>" +
     "<tr style='border: 1px solid #fff;'>" +
     "<td style='width:15px; display:inline;'> <img src= " +
     logoUrl +
     " style= 'margin-top:-38px; width:100px'; 'height:auto'; alt=''> </td>" + //akash chnages in width
    //  "<td style='width:70%; text-align: center;padding-left:0px;font-weight: normal;padding-right:30%'><b style='font-weight:500;font-size: 14px;color: black;font-family:  Myriad Pro, Arial, Helvetica, sans-serif !important;'>" +
    //  address +
     "</b>" +
     reportName +
     //  "<p style='padding-top: 3px;margin-top: 8px;color: #615d5d;font-size: 20px;font-weight: 00;font-family:Myriad Pro, Arial, Helvetica, sans-serif !important;'> Board Report</p>" +
     "</td>" +
     "</tr>" +
     "</tbody>" +
     "</table>" +
     header +
     "<table cellspacing='10px' cellpadding='2px' style='border: 1px solid #fff; border-collapse: collapse; width: 95%; margin-left:19px; text-align: left;font-size: 13px;font-family:Myriad Pro, Arial, Helvetica, sans-serif !important '><thead style='display: table-header-group;'> <tr >" +
     "<td style='border: 1px solid black ; border-right:none;  background-color:  #e0e0e0; color: black;width: 4%;text-align: left;font-weight: 600;height:30px; '>No.</td>" +
     "<td style='border: 1px solid black ; border-right:none;  background-color:  #e0e0e0; color: black;width: 8%;text-align: left;font-weight: 600;padding-left:4px;height:30px; '>Reference </td>" +
     "<td style='border: 1px solid black ; border-right:none;  background-color:  #e0e0e0; color: black;width: 8%;text-align: left;font-weight: 600;padding-left:4px;height:30px;'>Design Code </td>" +
     "<td style='border: 1px solid black ; background-color:  #e0e0e0; color: black;width: 45%;text-align: left;font-weight: 600;padding-left:4px; height:30px;'> Details </td>" +
     "<td style='border: 1px solid black ; border-left:none;  background-color:  #e0e0e0; color: black;width: 8%;text-align: left;font-weight: 600;padding-left:4px;height:30px;'>Request Type </td>" +
     "<td style='border: 1px solid black ; border-left:none;  background-color:  #e0e0e0; color: black;width: 8%;text-align: left;font-weight: 600;padding-left:4px;height:30px;'>Comments </td>" +
     "<td style='border: 1px solid black ; border-left:none;  background-color:  #e0e0e0; color: black;width: 35%;;text-align: left;font-weight: 600;padding-left:4px;height:30px; '> Request Quantity </td>" +
     "</tr><thead>" +
     "<tbody>" +
     designDetails +
     "</tr></thead>" +
    //  "<tr>" +
    //  "<th colspan='5' style='border: 1px solid black; border-top:none; width: 25%'> Total Designs :" +
    //  totalQuantity +
    //  "</th>" +
    //  "</tr>" +
     "</tbody></table> ";
 
   /* var printContents = '<div> <page  width: 21cm; height: 29.7cm; class="page" style="width:21cm; height:29.7cm;">  <table >' +
                  '<tbody><tr> <td></td>  <td> </td></tr></tbody> </table><div  style ="padding:1rem">'+ pdfContent+ ' </div></page></div>'; */
 
   let printContents = '<div  style ="padding:1rem">' + pdfContent + " </div>";
  await html2pdf().set(options).from(printContents).save();
   setLoaderCallback()
   //return printContents
 };
 
 export default orderPdf;
 