// ** React Imports

import {
  Edit3,
  Trash2
} from 'react-feather'
// ** renders client column

export const SupplierTableColumns = [
  {
    name: 'sr',
    selector: 'sr',
    sortable: true,
    minWidth: '80px'
},
  {
      name: 'Customer',
      selector: 'customer',
      sortable: true,
      minWidth: '100px'
  },
  {
    name: 'Status',
    selector: 'status',
    sortable: true,
    minWidth: '80px'
},
  {
    name: 'Link',
    selector: 'link',
    sortable: true,
    minWidth: '100px'
},
{
  name: 'Supplier User',
  selector: 'SupplierUser',
  sortable: true,
  minWidth: '200px'
},
{
  name: 'Collection',
  selector: 'collection',
  sortable: true,
  minWidth: '100px'
},
{
  name: 'Designs',
  selector: 'designswatches',
  sortable: true,
  minWidth: '100px'
},
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
      minWidth: '100px'
  },
  {
      name: 'Issued Date - End Date',
      selector: 'issued_end_date',
      sortable: true,
      minWidth: '250px'
  },
  {
    name: 'Access',
    selector: 'controls',
    sortable: true,
    minWidth: '100px'
},
  
  {
      name: 'Actions',
      selector: 'actions',
      sortable: true,
      minWidth: '100px'
  }

]

export const StatusReportTableData = [
{
  id:1,
  sr:1,
  customer:'Vishal Wable',
  status:'active',
  link:'abcd',
  SupplierUser:'Manisha D',
  collection:'anonymous',  
  designswatches:100,
  email:'vishalwable555@gmail.com',
  issued_end_date:'24.06.2000 - 25.06.2020',  
  controls:<Edit3/>,
  actions:<Trash2/>
},
{
  id:2,
  sr:2,
  status:'active',
  SupplierUser:'Manisha D',
  collection:'anonymous',
  designswatches:80,
  actions:'edit',
  customer:'Sumit Rajpure',
  link:'pqrs',
  email:'sumitrajpure@gmail.com',
  issued_end_date:'24.06.2000 - 25.06.2020',
  // cell: row => {
  //       return (

  //           <ModalAssignCollection agentData={row} buttonName='Edit' />
  //       )
  //   },
  controls:<Edit3/>,
  actions:<Trash2/>
  
}
]