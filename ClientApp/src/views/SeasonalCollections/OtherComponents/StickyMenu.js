import { useState } from 'react'
import { Button, ButtonGroup } from 'reactstrap'
import { Home, ZoomIn, ZoomOut, Maximize2, Printer, Maximize } from 'react-feather'
import './../css/seasonspage.css'
/*import { PanZoom } from 'react-easy-panzoom'*/

const onHomePage = (book, cardref) => {
    if (book && book.current) {
        book.current.pageFlip().turnToPage(0)
    }
    if (cardref && cardref.current) {
        //console.log('Card')
        cardref.current.swiper.slideTo(0)
    }
}
let name = ""
let cardname = ''
const onZoomIn = (book, cardref, setZoom, setcurrentZoom) => {
   
    
    if (book && book.current) {
        
        const currentZoomVal = (parseFloat(name) || 1) + 0.1
        let newZoomvalue = currentZoomVal.toFixed(1)
        newZoomvalue = newZoomvalue.toString()
        newZoomvalue = newZoomvalue.split('.')
        newZoomvalue[0] = newZoomvalue[0] === "2" ? 2 : 1
        newZoomvalue[1] = newZoomvalue[1] === "0" ? 200 : newZoomvalue[1] * 25
        newZoomvalue = parseInt((newZoomvalue[0] * 50) + parseInt(newZoomvalue[1]))
        if (currentZoomVal >= 1 && currentZoomVal <= 2) {
            book.current.pageFlip().block.parentElement.parentElement.style.transform = `scale(${currentZoomVal})`
            name = currentZoomVal
            setZoom(newZoomvalue)
        }
    }
    if (cardref && cardref.current) {
        const currentZoomVal = (parseFloat(cardname) || 1) + 0.1
        let newZoomvalue = currentZoomVal.toFixed(1)
        newZoomvalue = newZoomvalue.toString()
        newZoomvalue = newZoomvalue.split('.')
        newZoomvalue[0] = newZoomvalue[0] === "2" ? 2 : 1
        newZoomvalue[1] = newZoomvalue[1] === "0" ? 200 : newZoomvalue[1] * 25
        newZoomvalue = parseInt((newZoomvalue[0] * 50) + parseInt(newZoomvalue[1]))
        if (currentZoomVal >= 1 && currentZoomVal <= 2) {
            $(".swiper-slide")[0].style.transform = `scale(${currentZoomVal})`
            cardname = currentZoomVal
            setcurrentZoom(parseFloat(cardname))
            setZoom(newZoomvalue)
        }
    }

}

const onZoomOut = (book, cardref, setZoom, setcurrentZoom) => {
   
    if (book && book.current) {
        const currentZoomVal = (parseFloat(name) || 1) - 0.1
        //book.current.pageFlip().block.style.zoom = currentZoomVal >= 1 ? currentZoomVal : ''
        let newZoomvalue = currentZoomVal.toFixed(1)
        newZoomvalue = newZoomvalue.toString()
        newZoomvalue = newZoomvalue.split('.')
        newZoomvalue[0] = newZoomvalue[0] === "1" ? 1 : 1
        newZoomvalue[1] = newZoomvalue[1] === "0" ? 0 : newZoomvalue[1] * 25
        newZoomvalue = parseInt((parseInt(newZoomvalue[1])) + 50)
        if (currentZoomVal >= 1 && currentZoomVal <= 2) {
            book.current.pageFlip().block.parentElement.parentElement.style.transform = `scale(${currentZoomVal})`
            name = currentZoomVal
            //book.current.pageFlip().block.style.zoom = currentZoomVal
            setZoom(newZoomvalue)
        }
    }
    if (cardref && cardref.current) {
        const currentZoomVal = (parseFloat(cardname) || 1) - 0.1
        //book.current.pageFlip().block.style.zoom = currentZoomVal >= 1 ? currentZoomVal : ''
        let newZoomvalue = currentZoomVal.toFixed(1)
        newZoomvalue = newZoomvalue.toString()
        newZoomvalue = newZoomvalue.split('.')
        newZoomvalue[0] = newZoomvalue[0] === "1" ? 1 : 1
        newZoomvalue[1] = newZoomvalue[1] === "0" ? 0 : newZoomvalue[1] * 25
        newZoomvalue = parseInt((parseInt(newZoomvalue[1])) + 50)
        if (currentZoomVal >= 1 && currentZoomVal <= 2) {
            $(".swiper-slide")[0].style.transform  = `scale(${currentZoomVal})`
            cardname = currentZoomVal
            setcurrentZoom(parseFloat(cardname))
            setZoom(newZoomvalue)
        }
    }
}

const FitToWindow = (book, cardref, setZoom, setcurrentZoom) => {
    
    if (book && book.current) {
        book.current.pageFlip().block.parentElement.parentElement.style.transform = `scale(${1})`
        name = 1
    }
    if (cardref && cardref.current) {
        $(".swiper-slide")[0].style.transform = `scale(${1})`
        cardname = 1
        setcurrentZoom(parseFloat(cardname))
    }
    
    setZoom(50)

}
const onActualSize = (book, ref, setZoom, setcurrentZoom) => {
   
    name = 1.1
    if (book && book.current) {
       // book.current.pageFlip().block.style.zoom = "1.1"
        const currentZoomVal = (parseFloat(name) || 1) + 0.1
        let newZoomvalue = currentZoomVal.toFixed(1)
        newZoomvalue = newZoomvalue.toString()
        newZoomvalue = newZoomvalue.split('.')
        newZoomvalue[0] = newZoomvalue[0] === "2" ? 2 : 1
        newZoomvalue[1] = newZoomvalue[1] === "0" ? 200 : newZoomvalue[1] * 25
        newZoomvalue = parseInt((newZoomvalue[0] * 50) + parseInt(newZoomvalue[1]))
        if (currentZoomVal >= 1 && currentZoomVal <= 1.5) {
            book.current.pageFlip().block.parentElement.parentElement.style.transform  = `scale(${currentZoomVal})`
            name = currentZoomVal
            setZoom(100)
        }
    }
    if (ref && ref.current) {
        cardname = 1.1
        const currentZoomVal = (parseFloat(cardname) || 1) + 0.1
        let newZoomvalue = currentZoomVal.toFixed(1)
        newZoomvalue = newZoomvalue.toString()
        newZoomvalue = newZoomvalue.split('.')
        newZoomvalue[0] = newZoomvalue[0] === "2" ? 2 : 1
        newZoomvalue[1] = newZoomvalue[1] === "0" ? 200 : newZoomvalue[1] * 25
        newZoomvalue = parseInt((newZoomvalue[0] * 50) + parseInt(newZoomvalue[1]))
        if (currentZoomVal >= 1 && currentZoomVal <= 1.5) {
            $(".swiper-slide")[0].style.transform  = `scale(${currentZoomVal})`
            cardname = currentZoomVal
            setcurrentZoom(parseFloat(cardname))
            setZoom(100)
        }

    }
}
let openCloseFlag = true
const openCloseScreen = (book, cardref) => {
   
    
    function openScreen(elem) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen()
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen()
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            elem.webkitRequestFullscreen()
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen()
        }
        openCloseFlag = false
    }
    function closeScreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen()
          } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen()
          } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen()
          } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen()
          }
        openCloseFlag = true
    }

    const elem = document.documentElement
    openCloseFlag ? openScreen(elem) : closeScreen()
}
const print = (book, cardref, totalPage, cloneBook) => {
    
    const new_book = document.querySelectorAll(".book-container .stf__block .page")
    const data = cloneBook
    const hiddenDiv = $('<div/>').hide().appendTo('body')
    hiddenDiv.html(data)
    const element = hiddenDiv.find('.page')
    const width = element.width()
    const height = element.height()
    // console.log('Width: ' + width + ', Height: ' + height)
    hiddenDiv.remove()
    let baseUrl = window.location.href.split('/SeasonBook')[0]
    baseUrl = baseUrl.split('/StockNoss')[0]
    const mywindow = window.open('', 'new div', 'height=10,width=10')
    mywindow.resizeTo(500, 500)
    mywindow.blur()
    window.focus()
    const allPage = $(".w-100").text().split("/")[1]
    let totalPageCount = totalPage
    let isCalledFirst = false
    let interval = null
     //const interval = setInterval(frame, 1000)
    const frame = () => {
        
         totalPageCount = totalPage
         if (totalPageCount < allPage && (!isCalledFirst)) {
             isCalledFirst = true
         } else if (allPage <= totalPageCount) {
             clearInterval(interval)

             mywindow.document.write('<head>')
            const seasonspage = `${baseUrl}/ResponsiveCss/seasonspage.css` //pageflip.scss  card.scss
            const pageFlip = `${baseUrl}/ResponsiveCss/pageflip.scss`
            const pageCard = `${baseUrl}/ResponsiveCss/card.scss`
            const a4Paper = `${baseUrl}/ResponsiveCss/A4Paper.css`
            let margin = 0.1
            if (width < height) {
                margin = 0.1
            }
            const szX = `${(((((width) / 96) * 2.54)) + margin)}cm`
            const szY = `${((((height) / 96) * 2.54) + margin)}cm`
            const css = `page { transform:scale(0.96); size : ${szX}cm ${szY}cm; }`
            const style = document.createElement('style')
            style.type = 'text/css'
            //style.media = 'print'
            if (style.styleSheet) {
                style.styleSheet.cssText = css
            } else {
                style.appendChild(document.createTextNode(css))
            }
            mywindow.document.head.appendChild(style)
            const linkTag = document.createElement("link")
            linkTag.rel = "stylesheet"
            linkTag.href = `${seasonspage}`
            const linkTagB = document.createElement("link")
            linkTagB.rel = "stylesheet"
            linkTagB.href = `${pageFlip}`
            // const linkTagC = document.createElement("link")
            // linkTagC.rel = "stylesheet"
            // linkTagC.href = `${pageCard}`
            // const linkTagD = document.createElement("link")
            // linkTagC.rel = "stylesheet"
            // linkTagC.href = `${a4Paper}`
            mywindow.document.head.appendChild(linkTag)
            mywindow.document.head.appendChild(linkTagB)
            // mywindow.document.head.appendChild(linkTagC)
            // mywindow.document.head.appendChild(linkTagD)
            mywindow.document.write('</head>')
            mywindow.document.write('<body id="pdfBody">')
            const callBks = 0
            let newHtml = ""
            for (let i = 0; i < new_book.length; i++) {
                if (width < height) {
                    if (i === 0 || i === new_book.length - 1) {
                        newHtml = (new_book[i].innerHTML).replace("jpg&quot;);", `jpg&quot;); width: ${width}px; height: ${height}px;`)
                    } else {
                        newHtml = new_book[i].innerHTML
                        newHtml = newHtml.replace("</div> :  <div", "</div><div") 
                        newHtml = newHtml.replaceAll("&quot;);", "&quot;)!important;")
                    }
                    const page = ` <page style="border:1px solid grey; width: ${width}px; height: ${height}px;">  ${newHtml}  </page>`
                    mywindow.document.write(page)
                } else {
                    if (i === 0 || i === new_book.length - 1) {
                        newHtml = (new_book[i].innerHTML).replace("jpg&quot;);", `jpg&quot;); width: ${width}px; height: ${height}px;`)
                    } else {
                        newHtml = new_book[i].innerHTML
                        newHtml = newHtml.replace("</div> :  <div", "</div><div")
                        newHtml = newHtml.replaceAll("&quot;);", "&quot;)!important;")
                    }
                    const page = `<page style="border:1px solid grey; width: ${width}px; height: ${height}px;">  ${newHtml}  </page>`
                    mywindow.document.write(page)
                }
                
               
            }
            mywindow.document.write('</body></html>')
            // setTimeout(function () {

            //     mywindow.resizeTo(1500, 1500)
            //     mywindow.print()
            //     mywindow.close()

            // }, 10000)
        }

     }
     interval = setInterval(frame, 1000)
    // const new_book = document.querySelectorAll(".book-container .stf__block .page .page-content")
    // const pdf = new jsPDF("p", "pt", "a4")
    // for (let i = 0; i < new_book.length; i++) {
     
    //         pdf.html(book.current, {
    //             callback: () => { pdf.save("output.pdf") }})
    //                 // if (i < new_book.length - 1) {
    //                 //     pdf.addPage()
    //                 // }
                 

    //         //pdf.addImage(imgData, 'JPEG', 0, 0)
            

    // }
    // const new_book = document.querySelectorAll(".book-container .stf__block .page .page-content")
    // const pdf = new jsPDF()
    // for (let i = 0; i < new_book.length; i++) {
    //  html2canvas(new_book[i]).then((canvas) => {
    //         const imgData = canvas.toDataURL('image/jpeg')
    //         pdf.addImage(imgData, 'JPEG', 0, 0)
    //         if (i < new_book.length - 1) {
    //         pdf.addPage("a4", "portrait")
    //         }
    //     }).then(() => { (pdf.save("output.pdf")) })
    // }
}

const StickyMenu = (props) => {

    const [zoom, setZoom] = useState(50)
    const { cardref, book, totalPage, setcurrentZoom, cloneBook} = props
    return (
        <div>
            <div className='customizer_menu'>
                <ButtonGroup className='mb-1 customizer-toggle'>
                    <Button className='btn-icon m-0' color='flat-secondary' onClick={() => { onHomePage(book, cardref) }} >
                        <Home size={18} />
                    </Button>
                    <Button className='btn-icon m-0' color='flat-secondary' title='Zoom In' onClick={() => { onZoomIn(book, cardref, setZoom, setcurrentZoom) }}>
                        <ZoomIn size={18} />
                    </Button>
                    <Button className='btn-icon m-0' color='flat-secondary' title='Zoom Out' onClick={() => { onZoomOut(book, cardref, setZoom, setcurrentZoom) }}>
                        <ZoomOut size={18} />
                    </Button>
                    <Button className='btn-icon m-0' color='flat-secondary' title='Actual Scale' onClick={() => { onActualSize(book, cardref, setZoom, setcurrentZoom) }}>
                        <span style={{ position: '', left: '32%', fontSize: '1.2rem', width: '24px', height: '18px' }}>A</span>
                    </Button>
                    <Button className='btn-icon m-0' title='Fit to' color='flat-secondary' onClick={() => { FitToWindow(book, cardref, setZoom, setcurrentZoom) }}>
                        <Maximize size={18} />
                    </Button>
                    <Button className='btn-icon m-0' color='flat-secondary' title='Full Screen' onClick={() => { openCloseScreen(book, cardref) }} >
                        <Maximize2 size={18} />
                    </Button>
                    <Button className='btn-icon m-0' color='flat-secondary' title='print' onClick={() => { print(book, cardref, totalPage, cloneBook) }}>
                        <Printer size={18} />
                    </Button>
                    <Button className='btn-icon m-0' color='flat-secondary' >
                        <span style={{ position: '', left: '32%', fontSize: '.8rem', width: '18px', height: '18px' }}>{zoom}%</span>
                    </Button>
                    <Button className='btn-icon m-0' color='flat-secondary' style={{ fontSize: '.7rem' }} >
                        <small className='w-100'>{props.pageCount}/{props.totalPage}</small>
                        <span style={{ position: '', left: '32%', height: '18px', display: 'block', textAlign: 'center' }}>page</span>
                    </Button>
                    {/*<Button.Ripple className='btn-icon m-0' color='light' >*/}
                    {/*        <span style={{ position: '', left: '32%', fontSize: '.8rem', width: '18px', height: '18px' }}>{1}/{totalPage}</span>*/}
                    {/* </Button.Ripple>*/}
                </ButtonGroup>

            </div>
        </div>
    )
}
export default StickyMenu