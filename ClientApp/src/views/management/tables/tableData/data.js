import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { MoreVertical, Edit, FileText, Archive, Trash, Shield } from 'react-feather'
import EditDesign from './edit/EditDesign'
import EditGroup from './edit/EditGroup'
import EditFeature from './edit/EditFeature'
import DeleteRecord from './edit/DeleteRecord'
import { Options } from './Options'
// ** Table Server Side Column
export const serverSideColumnsDesign = [
    {
      name: 'Sr No.',
      selector: 'id',
      sortable: true,
      minWidth: '10%'
    },
    {
      name: 'Design Type Name',
      selector: 'Design_Name',
      sortable: true,
      minWidth: '60%'
    },    
    {
      name: 'Action',
      selector: 'Edit',
      sortable: true,
      minWidth: '150px',
      allowOverflow: true,
      cell: row => {
        return (
          <div color="secondary" pill className ="d-block" role = "button"> 
            <UncontrolledDropdown className='chart-dropdown'>
          <DropdownToggle color='' className='bg-transparent btn-sm border-0 p-50'>
            <MoreVertical size={18} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu right>
            <EditDesign />     
            <DeleteRecord/>        
          </DropdownMenu>
        </UncontrolledDropdown>             
          </div>
        )
      }
    }
  ]

export const ProductDesignData = [
    {
        id:1,
        Design_Name:'Std user',        
        Edit:'dgwduug'   
    },
    {
        id:2,
        Design_Name:'Std user', 
        Edit:'sk'
    },
    {
        id:3,
        Design_Name:'Std user',    
        Edit:'TT'
    },
    {
        id:4,
        Design_Name:'Std user',      
        Edit:'PP'
    }
]
  
// DesignTypedata

export const ColumnsDesignType = [
  {
    name: 'Sr No.',
    selector: 'id',
    sortable: true,
    minWidth: '10%'
  },
  {
    name: 'Design Group Name',
    selector: 'Design_Name',
    sortable: true,
    minWidth: '60%'
  },    
  {
    name: 'Action',
    selector: 'Edit',
    sortable: true,
    minWidth: '150px',
    allowOverflow: true,
    cell: row => {
      return (
        <div color="secondary" className ="d-block" role = "button"> 
         <UncontrolledDropdown className='chart-dropdown'>
          <DropdownToggle color='' className='bg-transparent btn-sm border-0 p-50'>
            <MoreVertical size={18} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu right>
            <EditGroup />     
            <DeleteRecord/>        
          </DropdownMenu>
        </UncontrolledDropdown>          
        </div>
      )
    }
  }
]

export const ProductDesignTypeData = [
  {
      id:1,
      Design_Name:'Std user',        
      Edit:'dgwduug'   
  },
  {
      id:2,
      Design_Name:'Std user', 
      Edit:'sk'
  },
  {
      id:3,
      Design_Name:'Std user',    
      Edit:'TT'
  },
  {
      id:4,
      Design_Name:'Std user',      
      Edit:'PP'
  }
]

// DesignFeaturedata

export const ColumnsDesignFeature = [
    {
        name: 'SR.NO',
        selector: 'srNo',
        sortable: true,
        maxWidth: '100px'

    },
  {
    name: 'Design feature Name',
      selector: 'design_Feature_Name',
      sortable: true,
      minWidth: '300px'
  },  
  {
    name: 'Control Type',
      selector: 'filter_Control',
      sortable: true,
      minWidth: '200px',
      cell: row => (row.filter_Control === 0 ? 'Editbox' : (row.filter_Control === 1 ? 'Textdropdown' : (row.filter_Control === 2 ? 'Mulitselect Textdropdown' : (row.filter_Control === 3 ? 'Color Dropdown' : (row.filter_Control === 4 ? 'Color Multiselect Dropdown' : (row.filter_Control === 5 ? 'Color Textdropdown' : (row.filter_Control === 6 ? 'Color Multiselect Textdropdown' : (row.filter_Control === 7 ? 'Range Combobox' : "Range Slider"))))))))
  },
  {
    name: 'Range Start  ',
      selector: 'range_Start',
      sortable: true,
      minWidth: '200px' 
    },
    {
        name: 'Range End  ',
        selector: 'range_End',
        sortable: true,
        minWidth: '200px'
    },
  {
      name: 'Range Difference',
      selector: 'range_Difference',
      sortable: true,
      minWidth: '200px'
  },      
  {
    name: 'Action',
    selector: 'Edit',
    sortable: true,
    minWidth: '150px',
    allowOverflow: true,
    cell: row => {
      return (
       
          < Options obj={row} buttonName='Edit' />
      )
    }
  }
]

export const ProductDesignFeatureData = [
  {
      id:1,
      Design_Name:'Std user',
      Control_Type:'abc',  
      Start_Range:'2000', 
      difference:'600',            
      Edit:''   
  },
  {
      id:2,
      Design_Name:'Std user', 
      Control_Type:'abc',  
      Start_Range:'2000', 
      difference:'600',            
      Edit:''   
  },
  {
      id:3,
      Design_Name:'Std user',
      Design_Name:'Std user',    
      Control_Type:'abc',  
      Start_Range:'2000', 
      difference:'600',            
      Edit:''   
  },
  {
      id:4,
      Design_Name:'Std user',
      Control_Type:'abc',  
      Start_Range:'2000', 
      difference:'600',            
      Edit:''   
  }
]
// config data
export const menuData = [
  {
    id: 1,
    name: "Home Furnishing", 
    children: [
      { id: 5, name: "Living Room", children: [] },
      {
        id: 6,        
        name: "Kitchen",
        children: [
          { id: 7, name: "Abc", children: [] },
          { id: 8, name: "Pqr", children: [] }
        ]
      }
    ]
  },
  { id: 2, 
  name: "Apparel", 
  children: [
    { id: 9, name: "Suit", children: [] },  
    {
      id: 10,
      name: "Shirt",
      children: [
        { id: 10, name: "Creative Shirting", children: [] },
        { id: 11, name: "Category", children: [] }
      ]
    }
  ] 
}
]

const MyList = () => <AppCollapse menuData={menuData} type='margin' accordion />

export default MyList