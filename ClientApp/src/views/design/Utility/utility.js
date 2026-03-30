
export const rmselected = (cb = null) => {
    document.querySelectorAll('#AllBottomDesign .BottomDesignThumEmpty.active-Bottom-image-for-fullview').forEach(e => {
        e.removeAttribute('style')
        e.classList.remove("active-Bottom-image-for-fullview")
    })
}

export const setselected = (srno) => {
    setTimeout(() => {
        const element = document.getElementById(`BottomDesignThum${srno}`)
        element.classList.add("active-Bottom-image-for-fullview")
        if (element) {
            const elementTop = element.getBoundingClientRect()
            if (elementTop.top > 0 || element.bottom < window.innerHeight || elementTop.bottom < 0) { element.scrollIntoView({ behavior: 'smooth' }) }
        }
    }, 2000)
}

export const goTonext = (csrno, last, ref) => {
    last = document.querySelectorAll('#AllBottomDesign .BottomDesignThumEmpty').length
    csrno = document.querySelectorAll('#AllBottomDesign .BottomDesignThumEmpty.active-Bottom-image-for-fullview')[0]
    csrno = parseInt(csrno.getAttribute('id').replace('BottomDesignThum', ''))
    if (csrno !== last) {
        document.querySelectorAll(`#BottomDesignThum${csrno + 1} .bottom-img-click`)[0].click()
              //added below code by manisha to show design to top on arrow
              const showDesignTop = document.querySelectorAll('#AllBottomDesign .BottomDesignThumEmpty.active-Bottom-image-for-fullview')[0]
              if (showDesignTop) {
                  const gocsrno = showDesignTop.getBoundingClientRect()
                  if (gocsrno.top > 0 || gocsrno.bottom < window.innerHeight) {
                      showDesignTop.scrollIntoView({behaviour: 'smooth'})    
                  }
              }
              //added above code by manisha to show design to top on arrow
        if ((csrno + 1) % 5 === 0) {
             document.getElementsByClassName("swiper-button-next")[0].click()
        }
    }
    
}

export const goTopriv = (csrno, first) => { 
    first = document.querySelectorAll('#AllBottomDesign .BottomDesignThumEmpty').length
    csrno = document.querySelectorAll('#AllBottomDesign .BottomDesignThumEmpty.active-Bottom-image-for-fullview')[0]
    csrno = parseInt(csrno.getAttribute('id').replace('BottomDesignThum', ''))

    if (csrno !== first) {
        csrno = csrno === 0 ? 1 : csrno
        document.querySelectorAll(`#BottomDesignThum${csrno - 1} .bottom-img-click`)[0].click()
        const showDesignTop = document.querySelectorAll('#AllBottomDesign .BottomDesignThumEmpty.active-Bottom-image-for-fullview')[0]
        if (showDesignTop) {
            const gocsrno = showDesignTop.getBoundingClientRect()
            if (gocsrno.top > 0 || gocsrno.bottom < window.innerHeight) {
                showDesignTop.scrollIntoView({ behaviour: 'smooth' })
            }
        }
        if ((csrno - 1) % 5 === 4) {
            document.getElementsByClassName("swiper-button-prev")[0].click()
        }
    }

}