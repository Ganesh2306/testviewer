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

import { colourOptions, categoryOptions, PatternOptions } from './ChartOption'

import DataTable from 'react-data-table-component'

import { colData, serverSideColumns } from '../data'


const ChartCard = props => {
    
    const forChart = {
        options: {},
        series: [44, 55, 41],
        labels: ['A', 'B', 'C', 'D', 'E']
      }
  
            // 'Top Colors', 'Top Pattern', 'Top Category'
    const arr = [
        { hedding:'Top Colors',
            data:colourOptions,
            val:[53, 16, 31]
        },
        { hedding:'Top Pattern',
            data:PatternOptions,
            val:[50, 21, 47, 26, 47]
        },
        { hedding:'Top Category',
            data:categoryOptions,
            val:[24, 48, 14, 26]
        }
            ]
    const style = {
       // margin:'40px 20px 0px 40px '
      }

    const OCard = (props) => {
        
        return (
            <Card className='Option-Card col-4' style={style} >
      <CardHeader>
        <div>
          <CardTitle tag='h4'>{props.title}</CardTitle>
          {/*  <CardText className='font-small-2'>Counter August 2020</CardText> */ }
        </div>
        <UncontrolledDropdown className='chart-dropdown'>
          <DropdownToggle color='' className='bg-transparent btn-sm border-0 p-50'>
            <MoreVertical size={18} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem className='w-100'>Category</DropdownItem>
            <DropdownItem className='w-100'>Color</DropdownItem>
            <DropdownItem className='w-100'>Pattern </DropdownItem>
            <DropdownItem className='w-100'>Style </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </CardHeader>
      <CardBody>
      
        <Chart options={props.data} series={props.val} type="donut" width="100%"   />
      
      </CardBody>
    </Card>
        )
    }

  return (
    <>
    {
        arr.map((e, k) => {
            
            //console.log(options.plotOptions.pie.donut.labels.total.label)
            return <OCard title={e.hedding} data={e.data} val={e.val}/>
        })
    }
    </>
  )
}

export default ChartCard
