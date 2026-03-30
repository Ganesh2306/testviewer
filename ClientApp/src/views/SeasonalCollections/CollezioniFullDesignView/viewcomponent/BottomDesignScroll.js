import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
// ** Styles

import DesignThumb from './../../BookThumnails/SeasonDesignView/DesignThumb'

import '@styles/base/pages/app-ecommerce.scss'


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
   /*  useEffect(() => {
        try {
            if (BottomDesignScrollDivClickCheck.f) {
                BottomDesignScrollDivClickCheck.f = false
                const doc = document.getElementsByClassName("swiper-button-next")
                console.log(doc)
            }
            
        } catch (error) {
            
        }
      
    //swiper-button-next
      return () => {
        
      }
    }, [props.selectedImgDataForDetail]) */
    
    return (
        <div id='AllBottomDesignB'>
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
            //autoplayDisableOnInteraction={true}
            allowTouchMove={false}
            //clickableClass={`btn-primary`}
            pagination={{ 
                type: 'bullets',
                clickable: true,
                //hideOnClick: true,
                el: '.swiper-pagination',
                renderBullet(index, className) { 
                                     return `<span class=${className}> ${index}-dfdfsdf-sdfsd'</span>`
                }
            }}
            // onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => ""}
            
        >

                {props.designMaster ? props.designMaster.map((e, k) => {
           
                slides.push(
                    <div key={`${k}-z`} id={`BottomDesignThumColl${k}`} className='BottomDesignThumEmpty' onClick={() => {
                        //BottomDesignScrollDivClickCheck.f = true
                        try {
                        document.querySelectorAll('#AllBottomDesignB .BottomDesignThumEmpty').forEach(e => {
                        e.removeAttribute('style')
                        e.classList.remove("active-Bottom-image-for-fullview")
                        })
                        const elm = document.getElementById(`BottomDesignThumColl${k}`)   
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
                            stock={e.stock ? e.stock : 0} bgimg={(`${e.imageUrl}`)} src={e.imageUrl}

                            
                            />
                    </div>)
                if (k > 0 && ((k + 1) % 50 === 0 || k === props.designMaster.length - 1)) {
                    swiperL.push(<SwiperSlide  key={`${k}-b`} className="grid-view">{slides} </SwiperSlide>)
                    slides = []
                }
            }) : ""}
            {swiperL}

        </Swiper>
        </div>

    )
}
export default BottomDesignScroll