// ** Table Server Side Column
import { SeasonalOptions, CollectionOptions } from './tableData/edit/Options'
import { MoreVertical, Download, Edit, Trash, Copy } from 'react-feather'

import { Link } from 'react-router-dom'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
export const SeasonTableColumns = [
    {
      name: 'Sr No.',
      selector: 'srNo',
      sortable: true,
      minWidth: '125px'
    },
    {
      name: 'Seasons',
      selector: 'sm_Season_Name',
      sortable: true,
      minWidth: '150px'
    },  
    // {
    //   name: 'Collections',
    //   selector: 'sm_Season_Id',
    //   sortable: true,
    //   minWidth: '150px'
    // },
    // {
    //   name: 'Created By',
    //   selector: 'sm_Created_By',
    //   sortable: true,
    //   minWidth: '180px'
    // },    
    {
      name: 'Created On',
      selector: 'sm_Created_On',
      sortable: true,
      minWidth: '180px'
    },
    // {
    //   name: 'Assigned to',
    //   selector: 'sm_Organization_Id',
    //   sortable: true,
    //   minWidth: '180px'
    // },    
    {
      name: 'Status',
      selector: 'sm_State',
      sortable: true,
      minWidth: '180px',
      cell: row => (row.sm_State ? 'Active' : 'Blocked')
    },
    {
      name: 'Action',
      allowOverflow: true,    
      sortable: true,
      minWidth: '150px',
      cell: row => (
        <SeasonalOptions seasonData={row} ID={row.sm_Season_Id} buttonName='Edit' />       
      )     
     }    
  ]

  // export const SeasonData = [
  //   {
  //       id:1,
  //       Season_Id:'aaa',      
  //       Collection_Name:'10',
  //       Createdby:'Raymond',
  //       createdate:'10-4-2020',
  //       assigned:'Raymond,jj',      
  //       status:'active'
   
  //   }   
  // ]


// ** Table Server Side Column

export const CollectionTableColumns = [
  {
    name: 'Sr No.',
    selector: 'srNo',
    sortable: true,
    minWidth: '125px'
  },
  // {
  //   name: 'Seasons',
  //   selector: 'season_name',
  //   sortable: true,
  //   minWidth: '180px'
  // },
  {
    name: 'Collection',
    selector: 'collection_Name',
    sortable: true,
    minWidth: '180px'
  },
  // {
  //   name: 'Type',
  //   selector: 'Collection_type',
  //   sortable: true,
  //   minWidth: '180px'
  // },
  // {
  //   name: 'Article',
  //   selector: 'article',
  //   sortable: true,
  //   minWidth: '150px'
  // },
  {
    name: 'Customer',
    selector: 'customerName',
    sortable: true,
    minWidth: '180px'
  },   
  {
    name: 'Design Count',
    selector: 'totalDesign',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'Created By',
      //selector: 'collection_Created_By',
    selector: 'userName',
    sortable: true,
    minWidth: '180px'
  },
  
  {
    name: 'Created On',
    selector: 'collection_Created_On',
    sortable: true,
    minWidth: '180px'
  },  
  // {
  //   name: 'Status',
  //   selector: 'status',
  //   sortable: true,
  //   minWidth: '180px'
  // },
  {
    name: 'Action',
    selector: 'action',
    sortable: true,
    minWidth: '150px',
    cell: row => (
      <CollectionOptions collectionData={row} ID={row.collection_Id} buttonName='Edit' />       
    )   
     
  }     
]
// export const CollectionData = [
//   {
//     id:1,
//     season_name:'Winter-2022',
//     collection_name:'Stripes',
//     Collection_type:'Production',
//     article:'Lion',
//     customer_Name:'Raymond',
//     total_designs:'100',
//     createe:'Ganesh',
//     createdate:'10-4-2020',
//     status:'active'  
// }
// ]