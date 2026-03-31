import { EditDelete } from './popup/UploadDesign'

const DoNothing = () => {
    //**DoNothing */
}

export const imgData = [
    {
        id:1,
        name:'shird_01',
        src:'https://res.cloudinary.com/tdscloudcdn/TEXTRONICS_ARCHIVE_DEMO/ThreeDImages/960032654666/516460461704/c_shirt_003/c_shirt_003t.jpg'
    },
    {
        id:2,
        name:'shirt_02',
        src:'https://res.cloudinary.com/tdscloudcdn/TEXTRONICS_ARCHIVE_DEMO/ThreeDImages/960032654666/516460461704/c_shirt_006/c_shirt_006t.jpg'
    },
    {
        id:3,
        name:'suit_01',
        src:'https://res.cloudinary.com/tdscloudcdn/TEXTRONICS_ARCHIVE_DEMO/ThreeDImages/960032654666/619803595204/jacket_006/jacket_006t.jpg'
    },
    {
        id:4,
        name:'shirt_03',
        src:'https://res.cloudinary.com/tdscloudcdn/TEXTRONICS_ARCHIVE_DEMO/ThreeDImages/960032654666/516460461704/Full_Sleeve_Shirt/Full_Sleeve_Shirtt.jpg'
    },
    {
        id:5,
        name:'suit_04',
        src:'https://res.cloudinary.com/tdscloudcdn/TEXTRONICS_ARCHIVE_DEMO/ThreeDImages/960032654666/619803595204/jacket_007/jacket_007t.jpg'
    },
    {
        id:6,
        name:'suit_05',
        src:'https://res.cloudinary.com/tdscloudcdn/TEXTRONICS_ARCHIVE_DEMO/ThreeDImages/960032654666/619803595204/jacket_008/jacket_008t.jpg'
    },
    {
        id:7,
        name:'trouser_01',
        src:'https://res.cloudinary.com/tdscloudcdn/TEXTRONICS_ARCHIVE_DEMO/ThreeDImages/960032654666/779678272759/bottom_006/bottom_006t.jpg'
    },
    {
        id:8,
        name:'jacket_01',
        src:'https://res.cloudinary.com/tdscloudcdn/TEXTRONICS_ARCHIVE_DEMO/ThreeDImages/960032654666/619803595204/jacket_003/jacket_003t.jpg'
    },
    {
        id:9,
        name:'jacket_02',
        src:'https://res.cloudinary.com/tdscloudcdn/TEXTRONICS_ARCHIVE_DEMO/ThreeDImages/960032654666/619803595204/jacket_004/jacket_004t.jpg'
    },
    {
        id:10,
        name:'jacket_03',
        src:'https://res.cloudinary.com/tdscloudcdn/TEXTRONICS_ARCHIVE_DEMO/ThreeDImages/960032654666/619803595204/jacket_005/jacket_005t.jpg'
    },
    {
        id:11,
        name:'jacket_04',
        src:'https://res.cloudinary.com/tdscloudcdn/TEXTRONICS_ARCHIVE_DEMO/ThreeDImages/960032654666/619803595204/jacket_006/jacket_006t.jpg'
    }
]

export const  ImgColumn = [
    {
        name:'Sr.No',
        selector:'id'
    },
    {
        name:'Model',
        selector:'src',
         cell: row => {
            const src = row.src        
                return <IconImg is={src} />
        }        
    },
    {
        name:'3D Name',
        selector:'name'
    },
    // {
    //     name:'Fabric ID',
    //     selector:'id'
    // },
    {
        name:'Action',
        //selector:'id'
        cell: row => {
            const id = row.name 
                return <EditDelete fibName={row.name} is={id} src={row.src} HovFun={DoNothing} />
        }
        
    }
]

const IconImg = (props) => {
    return <img src={props.is} style={{height:'45px', width:'auto'}} />
}


export const  AddDesignCol = [
    {
        name:'Sr No',
        selector:'id'
    },
    {
        name:'Fabric',
        selector:'Fabric' 
    },
    {
        name:'Design Code',
        selector:'DesignCode'
    },
    {
        name:'Article',
        selector:'Article'
    },
    {
        name:'Design',
        selector:'Design'
    },
    {
        name:'Variant',
        selector:'Variant'
    },
    {
        name:'Season',
        selector:'Season'
    },
    {
        name:'Color',
        selector:'Color'
    },
    {
        name:'Pattern',
        selector:'Pattern'
    },
    {
        name:'Weave',
        selector:'Weave'
    }
]

export const SampleData = [
    {
        id:1,
        Fabric:'Ray2020',
        DesignCode:'Blaze29',
        Article:'MIB',
        Design:'Retro',
        Variant:'TVA',
        Season:'Summer',
        Color:'Black',
        Pattern:'Box',
        Weave:'Yes'
    },
    {
        id:2,
        Fabric:'Ray2020',
        DesignCode:'Blaze29',
        Article:'MIB',
        Design:'Retro',
        Variant:'TVA',
        Season:'Summer',
        Color:'Black',
        Pattern:'Box',
        Weave:'Yes'
    },
    {
        id:3,
        Fabric:'Ray2020',
        DesignCode:'Blaze29',
        Article:'MIB',
        Design:'Retro',
        Variant:'TVA',
        Season:'Summer',
        Color:'Black',
        Pattern:'Box',
        Weave:'Yes'
    }
]
