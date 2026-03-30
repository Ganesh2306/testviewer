import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
//import Carousel from 'react-multi-carousel'
// ** Styles

import DesignThumb from './../../design/designview/DesignThumb'
import '@styles/base/pages/app-ecommerce.scss'
//import 'react-multi-carousel/lib/styles.css'
// ** Related products images

// ** Styles
import 'swiper/swiper-bundle.min.css'
import '../css/bottom.css'

const BottomDesignScrollDivClickCheck = {f:false}

const BottomDesignScroll = (props) => {
    SwiperCore.use([Navigation, Pagination])
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    }
    let slides = []
    //const menu = ['Slide 1', 'Slide 2', 'Slide 3']
    const swiperL = []
    return (
        <div id='AllBottomDesign'>
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}      
            navigation={{
            hideOnClick:true
                /* nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev' */}}
            /* nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev' */
            parallax = {true}
            longSwipes={true}
            clickable ={"true"}
            autoplay={false}
            breakpoints={responsive}
            //autoplayDisableOnInteraction={true}
            allowTouchMove={false}
            //clickableClass={`btn-primary`}
            
            pagination={{ 
                type: 'bullets',
                clickable: true,
                //hideOnClick: true,
                el: '.swiper-pagination',
                renderBullet(index, className) { 
                  
                    //(14/5).toFixed(1).toString().split('.')[1]  == 0
                   /*  const menu = []
                    for (let index = 0; index < props.designMaster.length; index++) {
                        //const element = array[index];
                        menu.push(`${index}-menu`)
                        
                    } */
                    //return <span className={className} id={`${index}-menu`}>{`${index}-menu`}</span>
                    return `<span class=${className}> ${index}-dfdfsdf-sdfsd'</span>`
                }
            }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => ""}
            
        >

                {props.designMaster && props.designMaster.map((e, k) => {
           
                slides.push(
                    <div key={`${k}-z`} id={`BottomDesignThum${k}`} className='BottomDesignThumEmpty' onClick={() => {
                        //BottomDesignScrollDivClickCheck.f = true
                        props.backbuttonRef.current = false
                        try {
                        document.querySelectorAll('#AllBottomDesign .BottomDesignThumEmpty').forEach(e => {
                        e.removeAttribute('style')
                        e.classList.remove("active-Bottom-image-for-fullview")
                        })
                        const elm = document.getElementById(`BottomDesignThum${k}`)   
                        elm.classList.add("active-Bottom-image-for-fullview")
                        //elm.style.border = "thick solid #0000FF"
                        //elm.style.border = "thick solid #0000FF"
                        //elm
                        } catch (error) {
                            
                        } 
                    }} >
                        <DesignThumb key={`${k}-a`} //width={35}
                        srno = {k}
                         isBottom={true}
                          toggalDesignView={props.toggalDesignView}
                            PluginModel={props.PluginModel} View3dPlugin={props.View3dPlugin}
                            currentDesign={e} setActiveImageData={props.setActiveImageData} title={e.designCode}
                            colourWay={e.colorwayDesigns ? e.colorwayDesigns : []}
                            width={e.width ? e.width : ""}
                            stock={e.stock ? e.stock : 0} bgimg={(`${e.imageUrl}`)} src={e.imageUrl}
                            setBoardSelected={props.setBoardSelected} SearchObj={props.SearchObj}
                            searchDesignByPagination={props.searchDesignByPagination}backbuttonRef={props.backbuttonRef}
                            />
                    </div>)
                // if (k > 0 && ((k + 1) % 50 === 0 || k === props.designMaster.length - 1)) {
                //     swiperL.push(<SwiperSlide  key={`${k}-b`} className="grid-view">{slides} </SwiperSlide>)
                //     slides = []
                // }
                if (k === props.designMaster.length - 1) {
                    swiperL.push(<SwiperSlide  key={`${k}-b`} className="grid-view">{slides} </SwiperSlide>)
                    slides = []
                } // will see on 10-23-2024
            })}
            {swiperL}

        </Swiper>
        </div>

    )
}
export default BottomDesignScroll