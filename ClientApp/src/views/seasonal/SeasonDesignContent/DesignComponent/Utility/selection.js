
const id = JSON.parse(localStorage.getItem('profile')).user_id

export const selection = {
    LIMIT:20,
    userId:  id ? id.toString(16) : (0).toString(16),
    Q3dURL:'',
    slected: {},
    designInfo:{},
    setSelectAll(checked, designList) {
        console.log(designList)
        if (checked) {
            designList.designMaster.forEach((obj) => {
                this.showSelected(
                    { id : obj.designId, 
                      name: obj.designName, 
                      imgUrl: obj.imageUrl,
                      features: obj.features,
                      designSize: obj.designSize,
                      ctrlKey: true
                    })
             })
        } else {
           
            this.reMoveAll()
            this.hideSelectedAll()
        }
       
    },
    setSelected({id, name, imgUrl, features, designSize}) {
        
       //creating url for z image from t 
       imgUrl = imgUrl.replace('//t//', '//z//')
         imgUrl = imgUrl.replace("t.", "z.")
        // console.log(imageUrl)
        this.slected[id] = {name, imgUrl, id, features, designSize}
        
    },
    reMoveSelected(id) {
        delete this.slected[id]
        //this.slected = this.slected.filter((element) => { return element.id !== id })
    },
    reMoveAll() {
        this.slected = {}
    },
    //ToDo : attr Selector 
    showSelected({id, options, name, imgUrl, features, designSize, ctrlKey}) {
        
        try {
            const element =  document.querySelector(`[designid="${id}"]`) 
            
                if (ctrlKey) {

                    if (element.classList.contains('thumbselectDesign')) {
                        this.hideSelected(element)
                        this.reMoveSelected(id)
                     } else {
                        element.classList.add('thumbselectDesign')
                        this.setSelected({id, name, imgUrl, features, designSize})
                     }
                }  else {
                    this.hideSelectedAll()
                    this.reMoveAll()
                    element.classList.add('thumbselectDesign')
                    this.setSelected({id, name, imgUrl, features, designSize})
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
           
        } catch (error) {
            console.log(error)
        }        

    },
    getQrLink(getQ3dUrl) {
        //
        //const { ctxprofile } = useContext(ProfileContext)
        const str = Object.values(this.slected).map(e => e.name).join()
        if (getQ3dUrl) {
            console.log(encodeURI(`${this.Q3dURL}?k=${this.userId}&t=${str}`))
            return encodeURI(`${this.Q3dURL}?k=${this.userId}&t=${str}`)
            
        } else {
            return str
        }
        //https://tds.q3d.in/q3d.php?k=61ffcce8&t=3-1
      
    },
    getQ3dLink(fabName) {
        return encodeURI(`${this.Q3dURL}?k=${this.userId}&t=${fabName}`)
    }
     
}

window.showSelectionObj = () => selection