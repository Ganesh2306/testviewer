// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Tables
import TableServerSide from './organizationRequest/OrganizationRequestTable'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

//**Context  */
import StateProvider from './../context/stateContext'

/*<Breadcrumbs breadCrumbTitle='Datatables' breadCrumbParent='Home' breadCrumbActive='Datatables Advance' />*/
const OrganizationRequest = () => {
    console.log("parent")
    return (
        <Fragment>
            <Breadcrumbs breadCrumbTitle='Organization Request' breadCrumbParent='Organization' breadCrumbActive='Organization Request List ' />
            <Row>
                <Col sm='12'>
                    <StateProvider>
                        <TableServerSide />
                    </StateProvider>
                </Col>
            </Row>
        </Fragment>
    )
}

export default OrganizationRequest
