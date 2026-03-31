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

      const Tablestyle = {
        //margin:'0px 0px 0px 0px ',
        fontSize : '5px'
      }

    const OCard = (props) => {
        return (
            <Card className='Option-Card col-4' style={style}>
      <CardHeader>
        <div>
          <CardTitle tag='h4' style={{fontSize:'16px'}}>{props.title}</CardTitle>
          {/*  <CardText className='font-small-2'>Counter August 2020</CardText> */ }
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
        )
    }

  return (
    <>
    {
        arr.map((e, k) => <OCard title={e} />)
    }
    </>
  )
}

export default OptionCard
