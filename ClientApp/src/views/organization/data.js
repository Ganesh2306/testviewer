import { UserOptions, OrgOptions } from './tableData/Options'
import EditUser from './tableData/OpenEditUser'
import AccessControl from './tableData/OpenAccessControl'
import { OrgReqOptions } from './organizationRequest/Options'


// ** Table OrgnizationUserTableColumns
export const OrgnizationUserTableColumns = [
    {
        name: 'SR.NO',
        selector: 'srNo',
        sortable: true,
        maxWidth: '100px'

    },
    {
        name: 'Organization',
        selector: 'organisationname',
        sortable: true,
        minWidth: '180px'
    },
    {
        name: 'User Name',
        selector: 'first_name',
        sortable: true,
        minWidth: '180px'
    },
    {
        name: 'User ID',
        selector: 'login_id',
        sortable: true,
        minWidth: '120px'
    },
    {
        name: 'Email',
        selector: 'email',
        sortable: true,
        minWidth: '120px'
    },
    {
        name: 'Contact',
        selector: 'mobile',
        sortable: true,
        minWidth: '120px'
    },
    {
        name: 'Role',
        selector: 'rolename',
        sortable: true,
        minWidth: '180px'
    },
    {
        name: 'Department',
        selector: 'department',
        sortable: true,
        minWidth: '120px'
    },
    {
        name: 'Status',
        selector: 'is_blocked',
        sortable: true,
        minWidth: '120px',
        cell: row => (row.is_blocked ? 'Blocked' : 'Active')

    },
    {
        name: 'Actions',
        allowOverflow: true,
        cell: row => {
            return (
                < UserOptions ID={row.userId} login_id={row.login_id} buttonName='Edit' />

            )
        }
        //cell: row => {
        //    return (
        //        <EditUser buttonName='Edit' />
        //    )
        //}
    },
    {
        name: 'Access Control',
        allowOverflow: true,
        cell: row => {
            return (
                <AccessControl orgUserData={row} buttonName='Save' />
            )
        },
        minWidth: '180px'
    }

    // {
    //   name: 'Actions',
    //   allowOverflow: true,
    //   cell: row => {
    //     return (
    //       <div className='d-flex'>
    //         <UncontrolledDropdown>
    //           <DropdownToggle className='pr-1' tag='span'>
    //             <MoreVertical size={15} />
    //           </DropdownToggle>
    //           <DropdownMenu right>
    //             <StateProvider>
    //               <EditUser buttonName='Edit' />
    //             </StateProvider>
    //             {/* <DropdownItem> */}
    //             <StateProvider>
    //               <AccessControl buttonName='Save' />
    //             </StateProvider>
    //             {/* </DropdownItem> */}
    //           </DropdownMenu>
    //         </UncontrolledDropdown>
    //         <Edit size={15} />
    //       </div>
    //     )
    //   }
    // }
]

// ** Table OrgnizationTableColumns
export const OrgnizationTableColumns = [
    {
        name: 'SR.NO',
        selector: 'srNo',
        sortable: true,
        maxWidth: '100px'

    },
    {
        name: 'Organization',
        selector: 'organization_Name',
        sortable: true,
        minWidth: '250px'
    },

    {
        name: 'Admin User ID',
        selector: 'admin_User_ID',
        sortable: true,
        minWidth: '170px'
    },
    {
        name: 'City',
        selector: 'city',
        sortable: true,
        minWidth: '120px'
    },
    {
        name: 'State',
        selector: 'state',
        sortable: true,
        minWidth: '150px'
    },
    {
        name: 'Country',
        selector: 'country',
        sortable: true,
        minWidth: '120px'
    },
    {
        name: 'Address',
        selector: 'address',
        sortable: true,
        minWidth: '180px'
    },
    {
        name: 'Email',
        selector: 'email',
        sortable: true,
        minWidth: '180px'
    },
    {
        name: 'Website',
        selector: 'website',
        sortable: true,
        minWidth: '180px'
    },
    {
        name: 'SUPPLIER LIMIT',
        selector: 'supplier_Limit',
        sortable: true,
        minWidth: '180px'
    },
    {
        name: 'CUSTOMER LIMIT',
        selector: 'customer_Limit',
        sortable: true,
        minWidth: '180px'
    },
    {
        name: 'AGENT LIMIT',
        selector: 'agent_Limit',
        sortable: true,
        minWidth: '180px'
    },
    {
        name: 'TOTAL USERS LIMIT',
        selector: 'total_User_Limit',
        sortable: true,
        minWidth: '220px'
    },
    {
        name: 'DESIGN LIMIT',
        selector: 'design_Limit',
        sortable: true,
        minWidth: '180px'
    },
    {
        name: 'Status',
        selector: 'status',
        sortable: true,
        minWidth: '150px',
        cell: row => (row.is_blocked ? 'Blocked' : 'Active')
    },
    {
        name: 'Actions',
        allowOverflow: true,
        cell: row => {
            return (
                <OrgOptions ID={row.organisation_id} login_id={row.admin_User_ID} buttonName='Edit' />
            )
        }
    }
]

// ** Table OrgnizationRequestTableColumns
export const OrgnizationRequestTableColumns = [
    {
        name: 'SR.NO',
        selector: 'srNo',
        sortable: true,
        maxWidth: '100px'
    },
    {
        name: 'PLAN TYPE',
        selector: 'rOrg_Type',
        sortable: true,
        minWidth: '150px'
    },
    {
        name: 'FIRST NAME',
        selector: 'rUsr_First_Name',
        sortable: true,
        minWidth: '150px'
    },
    {
        name: 'LAST NAME',
        selector: 'rUsr_Last_Name',
        sortable: true,
        minWidth: '150px'
    },
    {
        name: 'EMAIL',
        selector: 'rUsr_Email',
        sortable: true,
        minWidth: '150px'
    },
    {
        name: 'MOBILE',
        selector: 'rUsr_Mobile',
        sortable: true,
        minWidth: '180px'
    },
    {
        name: 'ORGANIZATION',
        selector: 'rOrg_Name',
        sortable: true,
        minWidth: '180px'
    },
    {
        name: 'WEBSITE',
        selector: 'rOrg_Website',
        sortable: true,
        minWidth: '180px'
    },
    {
        name: 'ADDRESS',
        selector: 'rOrg_Address',
        sortable: true,
        minWidth: '180px'
    },
    {
        name: 'CITY',
        selector: 'rOrg_City',
        sortable: true,
        minWidth: '180px'
    },
    {
        name: 'STATE',
        selector: 'rOrg_State',
        sortable: true,
        minWidth: '180px'
    },
    {
        name: 'COUNTRY',
        selector: 'rOrg_Country',
        sortable: true,
        minWidth: '180px'
    },
    {
        name: 'Org. EMAIL',
        selector: 'rOrg_Email',
        sortable: true,
        minWidth: '180px'
    },
    {
        name: 'Org. PHONE',
        selector: 'rOrg_Phone',
        sortable: true,
        minWidth: '180px'
    },
    {
        name: 'PHONE',
        selector: 'rUsr_Phone',
        sortable: true,
        minWidth: '180px'
    },
    {
        name: 'SUPPLIER LIMIT',
        selector: 'rOrg_Supplier_Limit',
        sortable: true,
        minWidth: '180px'
    },
    {
        name: 'CUSTOMER LIMIT',
        selector: 'rOrg_Customer_Limit',
        sortable: true,
        minWidth: '180px'
    },
    {
        name: 'AGENT LIMIT',
        selector: 'rOrg_Agent_Limit',
        sortable: true,
        minWidth: '180px'
    },
    {
        name: 'TOTAL USERS LIMIT',
        selector: 'rOrg_User_Limit',
        sortable: true,
        minWidth: '200px'
    },
    {
        name: 'DESIGN LIMIT',
        selector: 'rOrg_Design_Limit',
        sortable: true,
        minWidth: '180px'
    },
    {
        name: 'DESCRIPTION',
        selector: 'rOrg_Desciption',
        sortable: true,
        minWidth: '180px'
    },

    {
        name: 'Actions',
        allowOverflow: true,
        cell: row => {
            return (
                <OrgReqOptions obj={row} reqId={row.registration_Id} buttonName='Edit' />

            )
        }
    }
]

