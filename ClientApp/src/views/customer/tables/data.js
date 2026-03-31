import { getUser } from '../store/actions'
import { store } from '@store/storeConfig/store'
import { CustomerUserOptions, CustomerOptions } from './tableData/Options'
import AccessControlCustomer from './tableData/OpenAccessControl'

// ** Table CustomerTableColumns
export const CustomerTableColumns = [
    {
        name: 'Sr.No.',
        selector: 'srNo',
        sortable: true,
        maxWidth: '100px',
        cell: row => row.srNo
    }, 
    {
        name: 'Customer Code',
        selector: 'Customer_Code',
        sortable: true,
        minWidth: '180px',
        cell: row => row.customer_Code

    },
    {
        name: 'Customer Name',
        selector: 'Customer_Name',
        sortable: true,
        minWidth: '200px',
        cell: row => row.customer_Name
    },
    {
        name: 'User ID',
        selector: 'UserID',
        sortable: true,
        minWidth: '150px',
        cell: row => row.login_id
    },
    {
        name: 'Email',
        selector: 'Email',
        sortable: true,
        minWidth: '270px',
        cell: row => row.email
    },
    {
        name: 'Contact',
        selector: 'mobile',
        sortable: true,
        minWidth: '130px',
        cell: row => row.mobile
    },
    {
        name: 'Date',
        selector: 'created_On',
        sortable: true,
        minWidth: '200px',
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
        selector: 'Status',
        sortable: true,
        minWidth: '100px',
        cell: row => (row.is_blocked ? 'Blocked' : 'Active')
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
                <CustomerOptions ID={row.customer_Id} userID={row.user_id} cname={row.customer_Name} lgn_id={row.login_id} sDate={row.start_Date} end_Date={row.end_Date}  
                created_On={row.created_On} email={row.email} mobile={row.mobile} buttonName='Edit' />
            )
        }
    },
    {
        name: 'Access Control',
        allowOverflow: true,
        minWidth: '100px',
        cell: row => {
            return (
                <AccessControlCustomer customerData={row} buttonName='Edit' />
            )
        }
    }
]

// ** Table CustomerUserTableColumns

export const CustomerUserTableColumns = [
    {
       
        name: 'Sr.No.',
        selector: 'srNo',
        sortable: true,
        maxWidth: '100px'
    },

    {
        name: 'Username',
        selector: 'username',
        sortable: true,
        minWidth: '200px',
        cell: row => row.first_name

    },
    {
        name: 'Customer Code',
        selector: 'customer',
        sortable: true,
        minWidth: '200px',
        cell: row => row.cus_code
    },
    {
        name: 'Customer Name',
        selector: 'customer',
        sortable: true,
        minWidth: '250px',
        cell: row => row.cus_name
    },
    
    {
        name: 'User ID',
        selector: 'userId',
        sortable: true,
        minWidth: '150px',
        cell: row => row.login_id
    },
    {
        name: 'Email',
        selector: 'email',
        sortable: true,
        minWidth: '250px',
        cell: row => row.email
    },
    {
        name: 'Contact',
        selector: 'Contact',
        sortable: true,
        minWidth: '150px',
        cell: row => row.mobile
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
        name: 'Actions',
        allowOverflow: true,
        minWidth: '100px',
        cell: row => {

            return (
                <CustomerUserOptions ID={row.user_id} isAdmin={row.is_administrator} login_id ={row.login_id } buttonName='Edit' />
            )
        }
    }
]
