import Chart from 'react-apexcharts'
import { MoreVertical, ChevronDown } from 'react-feather'
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    CardText,
    Media,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle
} from 'reactstrap'

import DataTable from 'react-data-table-component'


import { colData, serverSideColumns } from '../data'


const OptionCard = props => {


    const arr = ['Top Selling Design', 'Top Viewed Design', 'Top Customer']
    const style = {
        //margin:'40px 20px 0px 40px '
    }

    const colval = 'Option-Card col-lg-4 col-md-6 col-sm-12 float-left'

    const Tablestyle = {
        //margin:'0px 0px 0px 0px ',
        fontSize: '5px'
    }

    const OCard = (props) => {
        return (
            <div key={props.title} className={colval}>
                <Card style={style} className='mb-1'>
                    <CardHeader>
                        <div>
                            <CardTitle tag='h4' style={{ fontSize: '16px' }}>{props.title}</CardTitle>
                            {/*  <CardText className='font-small-2'>Counter August 2020</CardText> */}
                        </div>
                        <UncontrolledDropdown className='chart-dropdown'>
                            <DropdownToggle color='' className='bg-transparent btn-sm border-0 p-50'>
                                <MoreVertical size={18} className='cursor-pointer' />
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem className='w-100'>Last 28 Days</DropdownItem>
                                <DropdownItem className='w-100'>Last Month</DropdownItem>
                                <DropdownItem className='w-100'>Last Year</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </CardHeader>
                    <CardBody>
                        <DataTable
                            noHeader
                            nopagination
                            nopaginationServer
                            responsive={false}
                            className='react-dataTable'
                            columns={serverSideColumns}
                            sortIcon={<ChevronDown size={10} />}
                            highlightOnHover
                            //paginationComponent={CustomPagination}
                            //data={dataToRender()}
                            data={colData}
                            style={Tablestyle}
                        />
                    </CardBody>
                </Card>
            </div>
        )
    }

    return (
        <>
            {
                arr.map((e, k) => <OCard key={Math.random() * 10000000} title={e} />)
            }
        </>
    )
}

export default OptionCard
