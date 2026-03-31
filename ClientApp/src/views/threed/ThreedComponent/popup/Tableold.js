import { text } from "@fortawesome/fontawesome-svg-core"
import axios from "axios"
const ImageConfiguration = `td_Image_Configuration`

export const threeDImages = [
    {       
        imageUrl: "http://172.16.10.194//ThreedImages//Women_Long_Dress//Women_Long_Dressb.jpg",
        td_threed_image_id: 306836985,
        td_threed_image_name: "Women_Long_Dress",
        td_Image_Configuration: [
          {
            td_Threed_Image_Configuration_Id: 4060703451,
            td_Threed_Image_Id: 306836985,
            td_Productname: null,
            td_Group_Name: "WlDress",
            td_Group_Display_Name: null,
            td_Group_Colour: null,
            td_Group_Product_Name: null,
            td_Group_Order_No: 0,
            td_Credit: 0,
            td_tryon_type : null,
            td_sub_category : null,
            td_images_org_configuration: null,
            state: 0
          },
          {
            td_Threed_Image_Configuration_Id: 4060703451,
            td_Threed_Image_Id: 306836985,
            td_Productname: null,
            td_Group_Name: "WlDress",
            td_Group_Display_Name: null,
            td_Group_Colour: null,
            td_Group_Product_Name: null,
            td_Group_Order_No: 0,
            td_Credit: 0,
            td_tryon_type : null,
            td_sub_category : null,
            td_images_org_configuration: null,
            state: 0
          },
          {
            td_Threed_Image_Configuration_Id: 4060703451,
            td_Threed_Image_Id: 306836985,
            td_Productname: null,
            td_Group_Name: "WlDress",
            td_Group_Display_Name: null,
            td_Group_Colour: null,
            td_Group_Product_Name: null,
            td_Group_Order_No: 0,
            td_Credit: 0,
            td_tryon_type : null,
            td_sub_category : null,
            td_images_org_configuration: null,
            state: 0
          }
        ]
        }
    ]

export let Threedold = [] 
window.getThr = () => Threedold

export const currentselected = {id: null,
                                isDel: false}
window.getCur = currentselected

export const emptyThreedold = (cb) => {
    Threedold = []
    currentselected.id = 0
    if (cb) {
        cb()
    }
}

export const reset = () => {
    Threedold = []
    currentselected.id = 0
    currentselected.isDel = false
}

export const setThreedold = (a, cb) => {
  if (a.length) {
    a[0].td_Organisations = []
  }
    Threedold = [...Threedold, ...a]
    if (cb) {
        cb()
    }
    return Threedold
}

// export const UpdateThreedold = ({identifiers, id, text, pid, cb = null, rootstage}) => {
//    if (rootstage) {
//     Threedold[pid][identifiers] = text
//    } else {
//     Threedold[pid][ImageConfiguration][id][identifiers] = text
//    }
    
//     if (cb) {
//         cb()
//     }
// }

export const UpdateThreedold = ({ identifiers, id, text, pid, cb = null, rootstage }) => {
  if (rootstage) {
    Threedold[pid][identifiers] = text
  } else {
    // Update the selected radio button and other data
    Threedold[pid][ImageConfiguration][id][identifiers] = text

    // Deselect all other radio buttons
    if (identifiers === 'td_is_drapedfabric') {
    Threedold[pid][ImageConfiguration].forEach((config, index) => {
      if (index !== id) {
        config[identifiers] = false
      }
    })
  }
  }

  if (cb) {
    cb()
  }
}


export const DelIndex = async(a, cb = null) => {
  const TdImageName = Threedold[a].td_Threed_Image_Name
  const res = await axios.get(`./ThreeD/RemoveTdImage?TdImageName=${TdImageName}`)
    Threedold = Threedold.filter((e, ind) => {
        return ind !== a
    })
    if (cb) {
        cb(Threedold)
    }
}

export const Push = (a, cb = null) => {
    Threedold.push(a)
    if (cb) {
        cb(Threedold)
    }
}

export const setCurrentselected = (a, cb = null) => {
    try {
        document.getElementById(`mainRow-${currentselected.id}`).style.backgroundColor = ''        
    } catch (error) {
        
    }

    currentselected.id = a
    // if (currentselected.id === null) {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: 'Select 3d Model !'
    //   })
    // }
    document.getElementById(`mainRow-${currentselected.id}`).style.backgroundColor = '#f7f7f7'
    if (cb) {
        cb(a, currentselected)
    }
}

//ToDo:----------------------------------------------Save Image ----------------------------------------------//

/* [
    {
      "state": 0,
      "td_Threed_Image_Configuration_Id": 0,
      "td_Threed_Image_Id": 0,
      "td_Productname": "string",
      "td_Group_Name": "string",
      "td_Group_Display_Name": "string",
      "td_Group_Colour": "string",
      "td_Group_Product_Name": "string",
      "td_Group_Order_No": 0,
      "threedImageOrgConfiguration": "string",
      "td_Credit": 0,
      "saveThreedImageOrgConfiguratioRequestDto": [
        {
          "td_images_org_configuration_id": 0,
          "td_threed_Image_Id": 0,
          "td_Organisation_Id": 0
        }
      ]
    }
  ] 
  ------------------------------------new--------------------------------------
  [
  {
    "state": 0,
    "td_Threed_Image_Id": 0,
    "td_Threed_Image_Name": "string",
    "td_Threed_Image_Display_Name": "string",
    "td_Threed_Image_Type": "string",
    "is_Exclusive": true,
    "td_Order_No": 0,
    "td_Credit": 0,
    "td_Is_Tryon": true,
    "saveTdImageConfigurationsRequestDto": [
      {
        "state": 0,
        "td_Threed_Image_Configuration_Id": 0,
        "td_Threed_Image_Id": 0,
        "td_Productname": "string",
        "td_Group_Name": "string",
        "td_Group_Display_Name": "string",
        "td_Group_Colour": "string",
        "td_Group_Product_Name": "string",
        "td_Group_Order_No": 0
      }
    ],
    "saveThreedImageOrgConfiguratioRequestDto": [
      {
        "td_images_org_configuration_id": 0,
        "td_threed_Image_Id": 0,
        "td_Organisation_Id": 0,
        "td_Organisation_Name": "string"
      }
    ]
  }
]
  
  */
// for 3d image save  send data 
export const priSave = (cb = null) => {
  const Swal = require('sweetalert2')
    if (Threedold.length > 0) {
        const Totalarr = []
        /* {
            "state": 0,
            "td_Threed_Image_Id": 0,
            "td_Threed_Image_Name": "string", 
            "td_Threed_Image_Display_Name": "string",
            "td_Threed_Image_Type": "string",
            "is_Exclusive": true,
            "td_Order_No": 0,
            "td_Credit": 0,
            "td_Is_Tryon": true,
            "saveTdImageConfigurationsRequestDto": [
              {
                "state": 0,
                "td_Threed_Image_Configuration_Id": 0,
                "td_Threed_Image_Id": 0,
                "td_Productname": "string",
                "td_Group_Name": "string",
                "td_Group_Display_Name": "string",
                "td_Group_Colour": "string",
                "td_Group_Product_Name": "string",
                "td_Group_Order_No": 0
              }
            ],
            "saveThreedImageOrgConfiguratioRequestDto": [
              {
                "td_images_org_configuration_id": 0,
                "td_threed_Image_Id": 0,
                "td_Organisation_Id": 0,
                "td_Organisation_Name": "string"
              }
            ]
          }
        ] */
       /*  const arr1 = [] */
       //f.td_Tryon_type[0].td_TryonType  + "," +f.td_Tryon_type[1].td_TryonType
       //f.td_Tryon_type[2]?.td_TryonType ? f.td_Tryon_type[2].td_TryonType : "@@@@@@@" 
        Threedold.forEach((f) => {

           if (f.state === 0) {
            const obj = {}
            obj.state = f.state
            obj.td_Threed_Image_Id = f.td_Threed_Image_Id
            obj.isimageupdate = false
            obj.td_Threed_Image_Name = f.td_Threed_Image_Name
            obj.td_Threed_Image_Display_Name = f.td_Threed_Image_Display_Name
            obj.td_Threed_Image_Type = f.td_Threed_Image_Type
            obj.is_Exclusive = f.is_Exclusive
            obj.td_Order_No = f.td_Order_No
            obj.td_Credit = f.td_Credit
            obj.td_Is_Tryon = f.td_Is_Tryon
            obj.td_is_combo = f.td_Is_combo
        obj.saveThreedImageOrgConfiguratioRequestDto = f.td_Organisations.map((e) => {
          return {
            state : f.state,
            td_images_org_configuration_id: 0,
            td_Threed_Image_Id : f.td_Threed_Image_Id,
            td_Organisation_Name : e.td_Organisation_Name,
            td_Organisation_Id : e.td_Organisation_Id 
        }
        })
       
          obj.saveTdImageConfigurationsRequestDto = 
            {
              state: f.state,
              td_Threed_Image_Configuration_Id: f.td_Threed_Image_Configuration_Id,
              td_Threed_Image_Id: f.td_Threed_Image_Id,
              td_ProductNameLists :  f.Td_Productname.map((e) => {
                return { 
                  td_Productname:e.td_Productname,
                  td_Threed_Image_Configuration_Id: 0,     // 0 for saving only
                 state : f.state
                }
              }),
              tdGroupNameLists : f.td_Image_Configuration.map((group) => {
              const tdGroupProductNameLists = group.td_Group_Products.map((e) => {
                  return {
                    Td_Group_Product_Name : e.td_Group_Product_Name,
                    Td_Threed_Image_Configuration_Id: group.td_Threed_Image_Configuration_Id,
                    td_Group_Order_No: group.td_Group_Order_No,
                    state : f.state
                  }
                })

                return  {
                  td_Group_Name: group.td_Group_Name,
                  td_Group_Display_Name: group.td_Group_Display_Name,
                  td_Group_Colour: group.td_Group_Colour,
                  Td_Group_Display_Order_No :group.Td_Group_Display_Order_No,
                  td_is_drapedfabric : group.td_is_drapedfabric,
                  tdGroupProductNameLists
                 }
              }) 
            }
            if (f.Td_Tryon_type === undefined) {
              obj.Td_Tryon_type = null 
            } else {
              obj.Td_Tryon_type = f.Td_Tryon_type[0].td_TryonType
            }

            if (Threedold[0].Td_Sub_Category === undefined) {
              obj.Td_Sub_Category = null
            } else {
              obj.Td_Sub_Category = f.Td_Sub_Category
            }

            if (f.Td_Tryon_Gender === undefined) {
              obj.Td_Tryon_Gender = null
            } else {
              obj.Td_Tryon_Gender = f.Td_Tryon_Gender[0].td_Gender  
            }
            Totalarr.push(obj)
           } else {
            const obj = {}
            obj.state = f.state
            obj.td_Threed_Image_Id = f.td_Threed_Image_Id
            obj.isimageupdate = false
            obj.td_Threed_Image_Name = f.td_Threed_Image_Name
            obj.td_Threed_Image_Display_Name = f.td_Threed_Image_Display_Name
            obj.td_Threed_Image_Type = f.td_Threed_Image_Type
            obj.is_Exclusive = f.is_Exclusive
            obj.td_Order_No = f.td_Order_No
            obj.td_Credit = f.td_Credit
            obj.td_Is_Tryon = f.td_Is_Tryon
            obj.td_is_combo = f.td_Is_combo
          
            if (f.td_images_org_configuration.length > 0) {
              obj.saveThreedImageOrgConfiguratioRequestDto = f.td_Organisations.map((e) => {
                return {
                  state : f.state,
                  td_images_org_configuration_id: f.td_images_org_configuration_id,
                  td_Threed_Image_Id : f.td_Threed_Image_Id,
                  td_Organisation_Name : e.td_Organisation_Name,
                  td_Organisation_Id : e.td_Organisation_Id 
              }
              }) 
            } else {
           obj.saveThreedImageOrgConfiguratioRequestDto = f.td_Organisations.map((e) => {
          return {
            state : f.state,
            td_images_org_configuration_id: 0,
            td_Threed_Image_Id : f.td_Threed_Image_Id,
            td_Organisation_Name : e.td_Organisation_Name,
            td_Organisation_Id : e.td_Organisation_Id 
        }
        })
      }

         obj.saveTdImageConfigurationsRequestDto = 
            {
              state: f.state,
              td_Threed_Image_Configuration_Id: f.td_Threed_Image_Configuration_Id,
              td_Threed_Image_Id: f.td_Threed_Image_Id,
              td_ProductNameLists :  f.Td_Productname.map((e) => {
                return { 
                  td_Productname:e.td_Productname,
                  td_Threed_Image_Configuration_Id: f.td_Threed_Image_Configuration_Id,     // 0 for saving only
                 state : f.state
                }
              }),
              tdGroupNameLists : f.td_Image_Configuration.map((group) => {
              const tdGroupProductNameLists = group.td_Group_Products.map((e) => {
                  return {
                    Td_Group_Product_Name : e.td_Group_Product_Name,
                    Td_Threed_Image_Configuration_Id: group.td_Threed_Image_Configuration_Id,
                    td_Group_Order_No: group.td_Group_Order_No,
                    state : f.state
                  }
                })

                return  {
                  td_Group_Name: group.td_Group_Name,
                  td_Group_Display_Name: group.td_Group_Display_Name,
                  td_Group_Colour: group.td_Group_Colour,
                  Td_Group_Display_Order_No :group.Td_Group_Display_Order_No,
                  td_is_drapedfabric : group.td_is_drapedfabric,
                  tdGroupProductNameLists
                }
              }) 
            }
            if (f.Td_Tryon_type) {
              obj.Td_Tryon_type = f.Td_Tryon_type[0].td_TryonType
            } else {
              obj.Td_Tryon_type = f.td_Tryon_Type
            }

            if (Threedold[0].Td_Sub_Category === undefined) {
              obj.Td_Sub_Category = f.td_Sub_Category
            } else {
              obj.Td_Sub_Category = f.Td_Sub_Category
            }
            if (f.Td_Tryon_Gender) {
             obj.Td_Tryon_Gender = f.Td_Tryon_Gender[0].td_Gender  
            } else {
              obj.Td_Tryon_Gender = f.td_Tryon_Gender
            }
            Totalarr.push(obj)
           }
            // Totalarr.push(obj)
        })
     if (cb) {
            //! use arr flat methord with depth 1
            return cb(Totalarr)
        }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Exist',
        text: 'Please Add 3d Images !'
    })
    }
}

window.getSave = priSave

export const saveThreedImage = async (_Data, cb) => {
    return axios.post(`./ThreeD/TdSaveImageConfigurations`, _Data)
    //await axios.post(`URL`, )
   //await axios.post(`./ThreeD/SaveTdImages`, _Data)
}/* 
priSave((el) => {
    saveThreedImage(el).then(e => {
        console.log(e.data)
    })
}).then(e => {

}).catch((e) => {

}) */