// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Tables
import EditAgentUser from './OpenEditAgentUser'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const UsersList = () => {
     return (
              <EditAgentUser  buttonName='Edit' />
          )
}

export default UsersList
