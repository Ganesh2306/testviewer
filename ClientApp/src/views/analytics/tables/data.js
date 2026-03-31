// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import axios from 'axios'
import { MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather'
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Vars
const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary']

const status = {
    1: { title: 'Current', color: 'light-primary' },
    2: { title: 'Professional', color: 'light-success' },
    3: { title: 'Rejected', color: 'light-danger' },
    4: { title: 'Resigned', color: 'light-warning' },
    5: { title: 'Applied', color: 'light-info' }
}

export let data

// ** Get initial Data
axios.get('/api/datatables/initial-data').then(response => {
    data = response.data
})

// ** Table Zero Config Column
export const basicColumns = [
    {
        name: 'ID',
        selector: 'id',
        sortable: true,
        maxWidth: '100px'
    },
    {
        name: 'Name',
        selector: 'full_name',
        sortable: true,
        minWidth: '225px'
    },
    {
        name: 'Email',
        selector: 'email',
        sortable: true,
        minWidth: '310px'
    },
    {
        name: 'Position',
        selector: 'post',
        sortable: true,
        minWidth: '250px'
    },
    {
        name: 'Age',
        selector: 'age',
        sortable: true,
        minWidth: '100px'
    },
    {
        name: 'Salary',
        selector: 'salary',
        sortable: true,
        minWidth: '175px'
    }
]

// ** Expandable table component
const ExpandableTable = ({ data }) => {
    return (
        <div className='expandable-content p-2'>
            <p>
                <span className='font-weight-bold'>City:</span> {data.city}
            </p>
            <p>
                <span className='font-weight-bold'>Experience:</span> {data.experience}
            </p>
            <p className='m-0'>
                <span className='font-weight-bold'>Post:</span> {data.post}
            </p>
        </div>
    )
}

// ** Table Common Column
export const columns = [
    {
        name: 'Name',
        selector: 'full_name',
        sortable: true,
        minWidth: '250px',
        cell: row => (
            <div className='d-flex align-items-center'>
                {row.avatar === '' ? (
                    <Avatar color={`light-${states[row.status]}`} content={row.full_name} initials />
                ) : (
                    <Avatar img={require(`@src/assets/images/portrait/small/avatar-s-${row.avatar}`).default} />
                )}
                <div className='user-info text-truncate ml-1'>
                    <span className='d-block font-weight-bold text-truncate'>{row.full_name}</span>
                    <small>{row.post}</small>
                </div>
            </div>
        )
    },
    {
        name: 'Email',
        selector: 'email',
        sortable: true,
        minWidth: '250px'
    },
    {
        name: 'Date',
        selector: 'start_date',
        sortable: true,
        minWidth: '150px'
    },

    {
        name: 'Salary',
        selector: 'salary',
        sortable: true,
        minWidth: '150px'
    },
    {
        name: 'Age',
        selector: 'age',
        sortable: true,
        minWidth: '100px'
    },
    {
        name: 'Status',
        selector: 'status',
        sortable: true,
        minWidth: '150px',
        cell: row => {
            return (
                <Badge color={status[row.status].color} pill>
                    {status[row.status].title}
                </Badge>
            )
        }
    },
    {
        name: 'Actions',
        allowOverflow: true,
        cell: row => {
            return (
                <div className='d-flex'>
                    <UncontrolledDropdown>
                        <DropdownToggle className='pr-1' tag='span'>
                            <MoreVertical size={15} />
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                                <FileText size={15} />
                                <span className='align-middle ml-50'>Details</span>
                            </DropdownItem>
                            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                                <Archive size={15} />
                                <span className='align-middle ml-50'>Archive</span>
                            </DropdownItem>
                            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                                <Trash size={15} />
                                <span className='align-middle ml-50'>Delete</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <Edit size={15} />
                </div>
            )
        }
    }
]

// ** Table Intl Column
export const multiLingColumns = [
    {
        name: 'Name',
        selector: 'full_name',
        sortable: true,
        minWidth: '200px'
    },
    {
        name: 'Position',
        selector: 'post',
        sortable: true,
        minWidth: '250px'
    },
    {
        name: 'Email',
        selector: 'email',
        sortable: true,
        minWidth: '250px'
    },
    {
        name: 'Date',
        selector: 'start_date',
        sortable: true,
        minWidth: '150px'
    },

    {
        name: 'Salary',
        selector: 'salary',
        sortable: true,
        minWidth: '150px'
    },
    {
        name: 'Status',
        selector: 'status',
        sortable: true,
        minWidth: '150px',
        cell: row => {
            return (
                <Badge color={status[row.status].color} pill>
                    {status[row.status].title}
                </Badge>
            )
        }
    },
    {
        name: 'Actions',
        allowOverflow: true,
        cell: row => {
            return (
                <div className='d-flex'>
                    <UncontrolledDropdown>
                        <DropdownToggle className='pr-1' tag='span'>
                            <MoreVertical size={15} />
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                                <FileText size={15} />
                                <span className='align-middle ml-50'>Details</span>
                            </DropdownItem>
                            <DropdownItem>
                                <Archive size={15} />
                                <span className='align-middle ml-50'>Archive</span>
                            </DropdownItem>
                            <DropdownItem>
                                <Trash size={15} />
                                <span className='align-middle ml-50'>Delete</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <Edit size={15} />
                </div>
            )
        }
    }
]

// ** Table Server Side Column
export const SupplierUserTableColumns = [
    {
        name: 'ID',
        cell: (row, index) => index + 1,
        sortable: true,
        maxWidth: '50px'
    },
    {
        name: 'Name of a User',
        selector: 'name',
        sortable: true,
        minWidth: '125px'
    },
    {
        name: 'Supplier',
        selector: 'userId',
        sortable: true,
        minWidth: '150px'
    },
    {
        name: 'User ID',
        selector: 'userId',
        sortable: true,
        minWidth: '150px'
    },
    {
        name: 'Contact',
        selector: 'phone',
        sortable: true,
        minWidth: '150px'
    },
    {
        name: 'Email Id',
        selector: 'email',
        sortable: true,
        minWidth: '150px'
    },
    {
        name: 'Actions',
        allowOverflow: true,
        cell: row => {
            return (
                <EditSupplierUser buttonName='Edit' />
            )
        }
     }
]
export const AnalyticsTableColumns = [
    {
        name: 'Sr.No',
        cell: (row, index) => index + 1,
        sortable: true,
        maxWidth: '5px'
    },
    {
        name: 'Date & Time',
        selector: 'date_Time',
        sortable: true,
        minWidth: '190px'
    },
    {
        name: 'Company Name',
        selector: 'companyName',
        sortable: true,
        minWidth: '100px'
    },
    {
        name: 'User Id',
        selector: 'userId',
        sortable: true,
        minWidth: '100px'
    },
    {
        name: 'Time Period',
        selector: 'timePeriod',
        sortable: true,
        minWidth: '70px'
    },
    {
        name: 'Region',
        selector: 'region',
        sortable: true,
        minWidth: '100px'
    },
    {
        name: 'Location',
        selector: 'location',
        sortable: true,
        minWidth: '100px'
    },
    {
        name: 'IP',
        selector: 'ip',
        sortable: true,
        minWidth: '100px'
    },
    {
        name: 'View Records',
        selector: 'viewRecords',
        sortable: true,
        minWidth: '100px'
    },
    {
        name: 'Favorite Records',
        selector: 'favoriteRecords',
        sortable: true,
        minWidth: '180px'
    },
    {
        name: 'Cart Records',
        selector: 'cartRecords',
        sortable: true,
        minWidth: '100px'
    },
   {
       name: 'Order Records',
       selector: 'orderRecords',
        sortable: true,
        minWidth: '100px'
    },
    {
        name: 'Order Quantity',
        selector: 'orderQuantity',
         sortable: true,
         minWidth: '100px'
     }

]

export const AnalyticsTableSubHead = [
    {
        name: 'Sr.No',
        cell: (row, index) => index + 1,
        sortable: true,
        maxWidth: '5px'
    }
]

export const DesignPropertyTableColumns = [
    {
        name: 'Sr.No',
        cell: (row, index) => index + 1,
        sortable: true,
        maxWidth: '5px'
    },
    {
        name: 'Date & Time',
        selector: 'date_Time',
        sortable: true,
        minWidth: '190px'
    },
    {
        name: 'Company Name',
        selector: 'companyName',
        sortable: true,
        minWidth: '100px'
    },
    {
        name: 'User Id',
        selector: 'userId',
        sortable: true,
        minWidth: '100px'
    },
    {
        name: 'Region',
        selector: 'region',
        sortable: true,
        minWidth: '100px'
    },
    {
        name: 'Action',
        selector: 'action',
        sortable: true,
        minWidth: '70px'
    },
    {
        name: 'Pattern',
        selector: 'pattern',
        sortable: true,
        minWidth: '100px'
    },
    {
        name: 'Color',
        selector: 'color',
        sortable: true,
        minWidth: '100px'
    },
    {
        name: 'Design Size',
        selector: 'designSize',
        sortable: true,
        minWidth: '100px'
    },
    {
        name: 'Category',
        selector: 'category',
        sortable: true,
        minWidth: '100px'
    },
    {
        name: 'Material',
        selector: 'material',
        sortable: true,
        minWidth: '100px'
    },
   {
       name: 'Washcare',
       selector: 'washcare',
        sortable: true,
        minWidth: '100px'
    },
    {
        name: 'Width',
        selector: 'width',
         sortable: true,
         minWidth: '100px'
     },
     {
         name: 'GSM',
         selector: 'gsm',
         sortable: true,
         minWidth: '100px'
     },
    {
        name: 'Price',
        selector: 'price',
         sortable: true,
         minWidth: '100px'
     },
     {
         name: 'Yarn Count',
         selector: 'yarnCount',
          sortable: true,
          minWidth: '100px'
      },
      {
          name: 'Weave',
          selector: 'weave',
          sortable: true,
          minWidth: '100px'
      },
     {
         name: 'Records',
         selector: 'records',
          sortable: true,
          minWidth: '100px'
      }
]

export const DesignStatasticTableColumns = [
    {
        name: 'Sr.No',
        cell: (row, index) => index + 1,
        sortable: true,
        maxWidth: '5px'
    },
    {
        name: 'Design Code',
        selector: 'design_Code',
        sortable: true,
        minWidth: '150px'
    },
    {
        name: 'Created By',
        selector: 'created_By',
        sortable: true,
        minWidth: '70px'
    },
    {
        name: 'View Records',
        selector: 'view_Records',
        sortable: true,
        minWidth: '40px'
    },
    {
        name: 'Favourite Records',
        selector: 'favourite_Records',
        sortable: true,
        minWidth: '180px'
    },
    {
        name: 'Cart Records',
        selector: 'cart_Records',
        sortable: true,
        minWidth: '80px'
    },
    {
        name: 'Order Records',
        selector: 'order_Records',
        sortable: true,
        minWidth: '100px'
    },
    {
        name: 'Order Quantity',
        selector: 'order_Quantity',
        sortable: true,
        minWidth: '100px'
    }

]
