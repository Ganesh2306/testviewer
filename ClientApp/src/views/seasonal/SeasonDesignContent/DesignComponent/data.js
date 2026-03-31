import { EditDelete } from './popup/UploadDesign'
import { getState } from '../Design'

const DoNothing = () => {
    //**DoNothing */
}

// export const imgData = [
//     {
//         id:1,
//         name:'Fab1',
//         src:'http://res.cloudinary.com/tdscloudcdn/TEXTRONICS_ARCHIVE_DEMO/689455444042/304681266431//SR55900-034t.jpg'
//     },
//     {
//         id:2,
//         name:'Fab2',
//         src:'http://res.cloudinary.com/tdscloudcdn/TEXTRONICS_ARCHIVE_DEMO/689455444042/304681266431//SR55900-034t.jpg'
//     },
//     {
//         id:3,
//         name:'Fab3',
//         src:'http://res.cloudinary.com/tdscloudcdn/TEXTRONICS_ARCHIVE_DEMO/689455444042/304681266431//SR55900-034t.jpg'
//     },
//     {
//         id:4,
//         name:'Fab4',
//         src:'http://res.cloudinary.com/tdscloudcdn/TEXTRONICS_ARCHIVE_DEMO/689455444042/304681266431//SR55900-034t.jpg'
//     },
//     {
//         id:5,
//         name:'Fab5',
//         src:'http://res.cloudinary.com/tdscloudcdn/TEXTRONICS_ARCHIVE_DEMO/689455444042/304681266431//SR55900-034t.jpg'
//     },
//     {
//         id:6,
//         name:'Fab6',
//         src:'http://res.cloudinary.com/tdscloudcdn/TEXTRONICS_ARCHIVE_DEMO/689455444042/304681266431//SR55900-034t.jpg'
//     },
//     {
//         id:7,
//         name:'Fab7',
//         src:'http://res.cloudinary.com/tdscloudcdn/TEXTRONICS_ARCHIVE_DEMO/689455444042/304681266431//SR55900-034t.jpg'
//     },
//     {
//         id:8,
//         name:'Fab8',
//         src:'http://res.cloudinary.com/tdscloudcdn/TEXTRONICS_ARCHIVE_DEMO/689455444042/304681266431//SR55900-034t.jpg'
//     },
//     {
//         id:9,
//         name:'Fab9',
//         src:'http://res.cloudinary.com/tdscloudcdn/TEXTRONICS_ARCHIVE_DEMO/689455444042/304681266431//SR55900-034t.jpg'
//     },
//     {
//         id:10,
//         name:'Fab10',
//         src:'http://res.cloudinary.com/tdscloudcdn/TEXTRONICS_ARCHIVE_DEMO/689455444042/304681266431//SR55900-034t.jpg'
//     },
//     {
//         id:11,
//         name:'Fab11',
//         src:'http://res.cloudinary.com/tdscloudcdn/TEXTRONICS_ARCHIVE_DEMO/689455444042/304681266431//SR55900-034t.jpg'
//     }
// ]

export const  ImgColumn = [
    {
        name:'Sr.No',
        selector: 'id',
        maxWidth: '50px'
    },
    {
        name:'Fabric',
        selector: 'src',
        maxWidth: '150px',
         cell: row => {
            const src = row.src        
                return <IconImg is={src} />
        }        
    },
    {
        name:'Fabric Name',
        selector: 'name',
        maxWidth: '400px'
    },
    /* {
        name:'Fabric ID',
        selector:'id'
    }, */
    {
        name:'Action',
        //selector:'id'
        cell: row => {
            
            const id = row.name 
                return <><EditDelete key={id} fibName={row.name} is={id} uid={row.uid} src={row.src} HovFun={DoNothing} 
                features={ JSON.parse(row.features)} setreRender={getState()[1]}  reRender={getState()[0]}  //getState={getState}
                /> </>
        }
    },
    {
        //id:'ft',
        name:'ft',
        selector:'features',
        style:'display:none',
        width:'0',
        hide:(window.screen.width)
        
    },
    {
        //id:'uidh',
        name:'uid',
        selector:'uid',
        style:'display:none',
        width:'0',
        hide:(window.screen.width)
    }
]

const IconImg = (props) => {
    return <img src={props.is} style={{height:'90px', width:'90px'}} />
}

export const  AddDesignCol = [
    {
        name:'Sr No',
        selector: 'id',
        maxWidth: '100px'
    },
    {
        name:'Fabric',
        selector: 'Fabric'
       
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