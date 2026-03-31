import EditAgent from './tableData/OpenEditAgent'
import AccessControlAgent from './tableData/OpenAccessControl'
import { Options, AgentOptions } from './tableData/Options'

// ** Table AgentTableColumns
export const AgentTableColumns = [
    {
        name: 'SR.NO',
        selector: 'srNo',
        sortable: true,
        maxWidth: '100px',
        cell: row => row.srNo
    },

    {
        name: 'Agent Code',
        selector: 'agt_code',
        sortable: true,
        minWidth: '150px',
        cell: row => row.agt_code

    },
    {
        name: 'Agent Name',
        selector: 'agt_name',
        sortable: true,
        minWidth: '150px',
        cell: row => row.agt_name
    },
    {
        name: 'User ID',
        selector: 'login_id',
        sortable: true,
        minWidth: '150px',
        cell: row => row.login_id
    },
    {
        name: 'Email',
        selector: 'agt_email',
        sortable: true,
        minWidth: '250px',
        cell: row => row.agt_email
    },
    {
        name: 'Contact',
        selector: 'agt_phone',
        sortable: true,
        minWidth: '130px',
        cell: row => row.agt_phone
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
        minWidth: '100px',
        cell: row => row.rolename
    },
    {
        name: 'Status',
        selector: 'agt_isblocked',
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
                <AgentOptions ID={row.agent_id} buttonName='Edit' login_id={row.login_id}/>

            )
        }
    },
    {
        name: 'Access Control',
        allowOverflow: true,
        minWidth: '100px',
        cell: row => {
            return (

                <AccessControlAgent agentData={row} buttonName='Edit' />
            )
        }
    }
]

// ** Table AgentUserTableColumns
export const AgentUserTableColumns = [

    {
        name: 'SR.NO',
        selector: 'srNo',
        sortable: true,
        maxWidth: '100px',
        cell: row => row.srNo
    },
    {
        name: 'First Name',
        selector: 'first_name',
        sortable: true,
        minWidth: '150px',
        cell: row => row.first_name

    },
    {
        name: 'User ID',
        selector: 'login_id',
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
        selector: 'mobile',
        sortable: true,
        minWidth: '150px',
        cell: row => row.mobile
    },
    {
        name: 'Role',
        selector: 'rolename',
        sortable: true,
        minWidth: '100px',
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
                < Options ID={row.user_id} buttonName='Edit' login_id={row.login_id} />
            )
        }
    }
]
