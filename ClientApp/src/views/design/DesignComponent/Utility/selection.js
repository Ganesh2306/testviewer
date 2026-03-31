//import { useContext } from 'react'
//import { ProfileContext } from '../../../context/ProfileContext'
//import { ProfileContext } from "../context/ProfileContext"
// ToDo :  -->  [{}, {}, {}] ; { id , name } || id: { name }

import { faBatteryThreeQuarters } from "@fortawesome/free-solid-svg-icons"

// let designCount = 0 
//const id = () => JSON.parse(localStorage.getItem('profile')).user_id
const id = () => JSON.parse(localStorage.getItem('profile')).org_type_id
//const id = () => JSON.parse(localStorage.userData).userid 
/* eslint-disable */

export var selection = {
    //id:id(),
    LIMIT: 20,
    userId: () => id() ? id().toString(16) : (0).toString(16),
    Q3dURL: '',
    slected: {},
    selected2: [],
    selected3: [],
    designInfo: {},
    setSelectAll(checked, designList) {
        //console.log(designList)
        if (checked === true) {
            designList.designMaster.forEach((obj) => {
                const element = document.querySelector(`[designid="${obj.designId}"] input`) //3538014938
                if (element) {
                    if (element.checked === false) {
                        element.click()
                    }
                }

                /* this.showSelected(
                    { id : obj.designId, 
                      name: obj.designName, 
                      imgUrl: obj.imageUrl,
                      features: obj.features,
                      designSize: obj.designSize,
                      ctrlKey: true
                    }) */
            })
        } else {
            this.removepage(designList)
            //this.reMoveAll()
            this.hideSelectedAll()
        }

    },

    removepage(designList) {
        designList.designMaster.forEach((obj) => {
            const element = document.querySelector(`[designid="${obj.designId}"] input`) //3538014938
            if (element) {
                if (element.checked === true) {
                    element.click()
                }
            }
        })
    },

    setSelected({ id, name, imgUrl, features, designSize, designCode }) {
        //creating url for z image from t 
        imgUrl = imgUrl.replace('/t/', '/z/').replace('//t//', '//z//')
        // imgUrl = imgUrl.replace("t.", "z.")
        imgUrl = imgUrl.replace(/t\.jpg/, "z.jpg")
        //console.log(imageUrl)
        this.slected[id] = { name, imgUrl, id, features, designSize, designCode }
        this.selected2.push({ name, imgUrl, id, features, designSize, designCode })
        const ele = document.getElementById('count');
        ele.innerText = this.selected2.length
        //console.log(this.selected2.length)
        const count = this.selected2.length
        // console.log(count)
        if (count > 0) {
            const elements = document.getElementsByClassName('fields');
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.visibility = 'visible';
            }
        }
        // console.log(this.selected2.length)
    },
    reMoveSelected(id) {
        const element = document.querySelector(`[designid="${id}"]`)
        delete this.slected[id]
        this.selected2 = this.selected2.filter((element) => { return element.id !== id })
        element.classList.remove('thumbselectDesign')
        const ele = document.getElementById('count');
        ele.innerText = this.selected2.length
        const count = this.selected2.length
        // console.log(count)
        if (count <= 0) {
            const elements = document.getElementsByClassName('fields');
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.visibility = 'hidden';
            }
        }
    },
    reMoveAll() {
        this.slected = {}
        this.selected2 = []
        const ele = document.getElementById('count');
        ele.innerText = this.selected2.length
    },
    AllCheckBox() {
        const element = document.querySelectorAll('[designid] input')

        for (let i = 0; i < element.length; i++) {
            const elementc = element[i];

            if (!elementc.checked) {
                if (document.querySelector('#page')) {
                    document.querySelector('#page').checked = false
                }
                // document.getElementById('page').checked = false

                return
            }

        }

        document.getElementById('page').checked = true
    },
    //ToDo : attr Selector 
    showSelected({ id, options, name, imgUrl, features, designSize, designCode, ctrlKey, frombtn }) {
        try {
            const element = document.querySelector(`[designid="${id}"]`)

            if (ctrlKey) {
                //  if (element.classList.contains('thumbselectDesign')) {
                //     selection.hideSelected(element)
                //     selection.reMoveSelected(id)
                //     document.querySelector(`[designid="${id}"] input`).checked = false
                //   } else
                if (element.classList.contains('thumbselectDesign') && document.querySelector(`[designid="${id}"] input`).checked === false) {
                    // this.hideSelected(element)
                    // this.reMoveSelected(id)
                    // if (document.getElementById('page').checked === false) {
                    //     document.querySelector(`[designid="${id}"] input`).checked = false
                    //     }
                    //if (document.querySelector(`[designid="${id}"] input`).checked === false) {
                    document.querySelector(`[designid="${id}"] input`).checked = false
                    //}
                    const ele = document.getElementById('count');
                    ele.innerText = this.selected2.length
                } else if (element.classList.contains('thumbselectDesign') && document.querySelector(`[designid="${id}"] input`).checked === true) {
                    //  this.hideSelected(element)
                    //  this.reMoveSelected(id)
                    element.classList.add('thumbselectDesign')
                    this.setSelected({ id, name, imgUrl, features, designSize, designCode })
                    document.querySelector(`[designid="${id}"] input`).checked = true

                } else {
                    element.classList.add('thumbselectDesign')
                    this.setSelected({ id, name, imgUrl, features, designSize, designCode })
                    //document.querySelector("#design-thum-0 input").checked
                    document.querySelector(`[designid="${id}"] input`).checked = true
                    const ele = document.getElementById('count');
                    ele.innerText = this.selected2.length
                }
            }
        
            //ToDo : ShowSelected  // reMoveSelected Working 
        } catch (error) {
            console.error(error)
        }
    },
    getAllSelected({ id, options, name, imgUrl, features, designSize, designCode, ctrlKey }) {
        try {
            const element = document.querySelector(`[designid="${id}"]`)

            if (ctrlKey) {
                element.classList.add('thumbselectDesign')
                this.setSelected({ id, name, imgUrl, features, designSize, designCode })
                //document.querySelector("#design-thum-0 input").checked
                document.querySelector(`[designid="${id}"] input`).checked = true
                const ele = document.getElementById('count')
                ele.innerText = this.selected2.length
            }

            //ToDo : ShowSelected  // reMoveSelected Working 
        } catch (error) {
            console.error(error)
        }
    },
    hideSelected(element) {
        element.classList.remove('thumbselectDesign')
    },
    hideSelectedAll() {
        try {
            const element = document.querySelectorAll('[designid].thumbselectDesign')
            element.forEach(e => {
                e.classList.remove('thumbselectDesign')
            })

            const element1 = document.querySelectorAll('[designid] input')

            element1.forEach(e => {
                e.checked = false
            })
        } catch (error) {
            console.log(error)
        }

    },
    getQrLink(getQ3dUrl, fabName) {
        const str = Object.values(this.selected2).map(e => e.name).join() ? Object.values(this.selected2).map(e => e.name).join() : fabName
        if (getQ3dUrl) {
            // if ((JSON.parse(localStorage.getItem('profile'))?.org_type_id) !== null && (JSON.parse(localStorage.getItem('profile'))?.org_type_id)) {
            //     return encodeURI(`${this.Q3dURL}?k=${(JSON.parse(localStorage.getItem('profile'))?.org_type_id).toString(16)}&t=${str}`)
            // }
          return  window.location.host === 'getznertech-admin.q3d.in' ? encodeURI(`${this.Q3dURL}?k=${(JSON.parse(localStorage.getItem('profile'))?.org_type_id).toString(16)}&t=${str}&p=ecom`) : encodeURI(`${this.Q3dURL}?k=${(JSON.parse(localStorage.getItem('profile'))?.org_type_id).toString(16)}&t=${str}`)

        } else {
            return str
        }

    },
    getCustQrLink(getQ3dUrl, fabName, supid) {
        const str = Object.values(this.selected2).map(e => e.name).join() ? Object.values(this.selected2).map(e => e.name).join() : fabName
        if (getQ3dUrl) {
            if ((supid.current.value !== null) && (supid.current.value)) {
                return encodeURI(`${this.Q3dURL}?k=${JSON.parse(supid.current.value).toString(16)}&t=${str}`)
            }

        } else {
            return str
        }

    },
    getQ3dLink(fabName) {
        return encodeURI(`${this.Q3dURL}?k=${(JSON.parse(localStorage.getItem('profile')).org_type_id).toString(16)}&t=${fabName}`)

    }


}

window.showSelectionObj = () => selection