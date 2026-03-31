// ** Custom Components
import Avatar from '@components/avatar'
// ** Third Party Components
import axios from 'axios'
import { MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather'
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import AccessControlSupplier from './tableData/OpenAccessControl'
import AccessControlSupplierCustomer from './tableData/OpenAccessCustomerControl'
import { SupplierOptions, SupplierUserOptions, SupplierCustomerOptions  } from './tableData/Options'

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
// axios.get('/api/datatables/initial-data').then(response => {
//     data = response.data
// })

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
export const serverSideColumns = [
    {
        name: 'Full Name',
        selector: 'full_name',
        sortable: true,
        minWidth: '225px'
    },
    {
        name: 'Email',
        selector: 'email',
        sortable: true,
        minWidth: '250px'
    },
    {
        name: 'Position',
        selector: 'post',
        sortable: true,
        minWidth: '250px'
    },
    {
        name: 'Office',
        selector: 'city',
        sortable: true,
        minWidth: '150px'
    },
    {
        name: 'Start Date',
        selector: 'start_date',
        sortable: true,
        minWidth: '150px'
    },
    {
        name: 'Salary',
        selector: 'salary',
        sortable: true,
        minWidth: '150px'
    }
]

// ** Table Adv Search Column
export const advSearchColumns = [
    {
        name: 'Name',
        selector: 'full_name',
        sortable: true,
        minWidth: '200px'
    },
    {
        name: 'Email',
        selector: 'email',
        sortable: true,
        minWidth: '250px'
    },
    {
        name: 'Post',
        selector: 'post',
        sortable: true,
        minWidth: '250px'
    },
    {
        name: 'City',
        selector: 'city',
        sortable: true,
        minWidth: '150px'
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
        minWidth: '100px'
    }
]

export default ExpandableTable


//export const SupplierUserTableColumns = [
//    {
//        name: 'Sr.No',
//        cell: (row, index) => index + 1,
//        sortable: true,
//        maxWidth: '50px'
//    },
//    {
//        name: 'Name of a User',
//        selector: 'name',
//        sortable: true,
//        minWidth: '125px'
//    },
//    {
//        name: 'Supplier',
//        selector: 'userId',
//        sortable: true,
//        minWidth: '150px'
//    },
//    {
//        name: 'User ID',
//        selector: 'userId',
//        sortable: true,
//        minWidth: '150px'
//    },
//    {
//        name: 'Contact',
//        selector: 'phone',
//        sortable: true,
//        minWidth: '150px'
//    },
//    {
//        name: 'Email Id',
//        selector: 'email',
//        sortable: true,
//        minWidth: '150px'
//    },
//    {
//        name: 'Actions',
//        allowOverflow: true,
//        cell: row => {
//            return (
//                <SupplierUserOptions buttonName='Edit' ID={row.user_id} />
//            )
//        }
//     }
//]
export const SupplierCustomerTableColumns = [

    {
        name: 'SR.NO',
        selector: 'srNo',
        sortable: true,
        maxWidth: '100px'
       
    },
    {
        name: 'Customer Name',
        selector: 'customer_Name',
        sortable: true,
        minWidth: '125px'
    },
    {
        name: 'Customer Role',
        selector: 'rolename',
        sortable: true,
        minWidth: '150px'
    },
   
    {
        name: 'Status',
        selector: 'cus_isblocked',
        sortable: true,
        minWidth: '120px',
        cell: row => (row.cus_isblocked ? 'Blocked' : 'Active')

    },
    {
        name: 'From',
        selector: 'start_Date',
        sortable: true,
        minWidth: '200px',
        cell: row => row.start_Date
    },
    {
        name: 'To',
        selector: 'end_Date',
        sortable: true,
        minWidth: '200px',
        cell: row => row.end_Date
    },
    {
        name: 'Actions',
        allowOverflow: true,
        minWidth: '100px',
        cell: row => {
            return (
                <SupplierCustomerOptions CID={row.customerId} Crd={row.cust_Role_Id} ID={row.supplierCustomerConfigurationId} buttonName='Edit' isAdmin={row.is_administrator} />
            )
        }
    }
   
    // {
    //     name: 'Access Control',
    //     allowOverflow: true,
    //     minWidth: '100px',
    //     cell: row => {
    //         return (
    //             <AccessControlSupplierCustomer supplierData={row} buttonName='Edit' />
    //         )
    //     }
    // }
]

export const SupplierUserTableColumns = [
    {
        name: 'SR.NO',
        selector: 'srNo',
        sortable: true,
        maxWidth: '100px'
       
    },
    {
        name: 'User Name',
        selector: 'first_name',
        sortable: true,
        minWidth: '150px'
    },
    {
        name: 'Supplier',
        selector: 'sup_name',
        sortable: true,
        minWidth: '150px'
    },
    {
        name: 'User ID',
        selector: 'login_id',
        sortable: true,
        minWidth: '150px'
    },
    {
        name: 'Contact',
        selector: 'mobile',
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
        name: 'Role',
        selector: 'rolename',
        sortable: true,
        minWidth: '150px'
       
    },
    {
        name: 'Status',
        selector: 'status',
        sortable: true,
        minWidth: '120px',
        cell: row => (row.is_blocked ? 'Blocked' : 'Active')

    },
    {
        name: 'Actions',
        allowOverflow: true,
        cell: row => {

            return (
                <SupplierUserOptions ID={row.user_id} buttonName='Edit' isAdmin={row.is_administrator} login_id={row.login_id} />
            )
        }
    }
]

export const SupplierTableColumns = [
    {
        name: 'SR.NO',
        selector: 'srNo',
        sortable: true,
        maxWidth: '100px'
        
    },
    {
        name: 'Supplier Code',
        selector: 'forename',
        sortable: true,
        minWidth: '200px',
        cell: row => row.sup_code
    },
    {
        name: 'Supplier Name',
        selector: 'forename',
        sortable: true,
        minWidth: '200px',
        cell: row => row.sup_name
    },
    {
        name: 'User Id',
        selector: 'userId',
        sortable: true,
        minWidth: '200px',
        cell: row => row.login_id
    },
    {
        name: 'Email Id',
        selector: 'email',
        sortable: true,
        minWidth: '300px',
        cell: row => row.sup_email
    },
    {
        name: 'Contact',
        selector: 'phone',
        sortable: true,
        minWidth: '140px',
        cell: row => row.sup_phone
    },
    {
        name: 'Date',
        selector: 'createdOn',
        sortable: true,
        minWidth: '180px',
        cell: row => row.created_On
    },
    {
        name: 'Role',
        selector: 'rolename',
        sortable: true,
        minWidth: '150px',
        cell: row => row.rolename
    },
    {
        name: 'Status',
        selector: 'status',
        sortable: true,
        minWidth: '100px',
        cell: row => (row.is_blocked ? 'Blocked' : 'Active')
    },
    {
        name: 'From',
        selector: 'startDate',
        sortable: true,
        minWidth: '200px',
        cell: row => row.start_Date
    },
    {
        name: 'To',
        selector: 'endDate',
        sortable: true,
        minWidth: '200px',
        cell: row => row.end_Date
    },
    {
        name: 'Actions',
        allowOverflow: true,
        cell: row => {
            return (
                <SupplierOptions buttonName='Edit' ID={row.supplier_id} ADMIN_ID={row.user_id} login_id={row.login_id} />
            )
        }
    },
    {
        name: 'Access Control',
        allowOverflow: true,
        minWidth: '100px',
        cell: row => {
            return (
                <AccessControlSupplier supplierData={row} buttonName='Edit' />
            )
        }
    }

]