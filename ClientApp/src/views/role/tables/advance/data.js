import { RoleOptions } from "./edit/Options"
function GetOrgType(type) {
    
    let roleType = ''
    switch (type) {
        case 0:
            roleType = 'Organization'   //abhishek 02-03
            break
        case 1:
            roleType = 'Supplier'
            break
        case 2:
            roleType = 'Customer'
            break
        case 3:
            roleType = 'Agent'
            break
        default:
    }
    return roleType

}
export const RoleTableColumns = [
    {
        name: 'SR.NO',
        selector: 'srNo',
        sortable: true,
        maxWidth: '100px'
    },
    {
        name: 'Role Name',
        selector: 'role_Name',
        sortable: true,
        minWidth: '180px'
    },
    {
        name: 'Role Type',
        selector: 'role_Type',
        sortable: true,
        minWidth: '180px',
        cell: row => GetOrgType(row.role_Type)
    },
    {
        name: 'Status',
        selector: 'address',
        sortable: true,
        minWidth: '120px',
        cell: row => (row.is_Deleted ? 'Deleted' : (row.is_Blocked ? 'Blocked' : 'Active'))

    },
    {
        name: 'Actions',
        allowOverflow: true,
        cell: row => {
            return (
                <RoleOptions ID={row.role_Id} buttonName='Edit' />

            )
        }
    }
]
    //,
    //{
    //    name: 'Actions',
    //    allowOverflow: true,
    //    cell: row => {
    //        return (
    //            < UserOptions ID={row.userId} buttonName='Edit' />

    //        )
    //    }
    //    //cell: row => {
    //    //    return (
    //    //        <EditUser buttonName='Edit' />
    //    //    )
    //    //}
    //},
    //{
    //    name: 'Access Control',
    //    allowOverflow: true,
    //    cell: row => {
    //        return (
    //            <AccessControl buttonName='Save' />
    //        )
    //    },
    //    minWidth: '180px'
    //}