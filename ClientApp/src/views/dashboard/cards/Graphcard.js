import Chart from 'react-apexcharts'
import { Card, CardTitle, CardText, CardBody, Row, Col, Input, CardHeader  } from 'reactstrap'
import { useState, useEffect, useRef, useContext } from "react"
import { Heart, MapPin, Eye, ShoppingCart, Layers, Image, Filter } from 'react-feather'
import axios from 'axios'
import { Bar } from 'react-chartjs-2'
import { AbilityContext } from '@src/utility/context/Can'
import {Icon} from '@iconify/react'
import Avatar from '@components/avatar'
import Swal from 'sweetalert2'
import DateRangUi from './DateRangeUi'
import { DateRangePicker } from 'react-date-range'
import { addDays } from 'date-fns'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import Chartgraph from './Chartgraph'
// import Charoptions from './Chartoptions'
// import OutsideClickHandler from 'react-outside-click-handler'

const Graphcard = ({ success }) => {
  const [showCalendar, setShowCalendar] = useState(false)
  const [count, setcount] = useState(0)
  const [e_name, sete_name] = useState("Render Count")
  // const StartDate = useRef(null)
  // const EndDate = useRef(null)
  // const StartDateErrorRef = useRef(null)
  // const EndDateErrorRef = useRef(null)
  // const validatedateErrorRef = useRef(null)
  // const [PrOrList, setPrOrList] = useState(null)
  // const ability = useContext(AbilityContext)
  const [isLoading, setLoading] = useState(false)
  const orgidref = useRef(null)
  const DateRangePickerRef = useRef(null)
  // const chartRef = useRef(null)
  // const [chartData, setChartData] = useState([])
  // let PrOr = [null, null]
  // const [selectedValue, setSelectedValue] = useState('')
  const [activerange, setactiverange] = useState('day')
//   const [time, settime] = useState()
  const [selectedOption, setSelectedOption] = useState("fabric_render")
  const [chartType, setChartType] = useState('bar')
  // const [R_count, setR_count] = useState(0)
  // const [d_hours, setd_hours] = useState([])
  // const [Googledata, setData] = useState({})
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ])
  const [start, startset] = useState(null)
  const [end, endset] = useState(null)
  const [r_date, setr_date] = useState()
  const [s_date, sets_date] = useState()
  const [e_date, sete_date] = useState()
 // const [custom_labels, setcustom_labels] = useState(null)
 // const [date_obj, setdate_obj] = useState()  //start date end date state

    const [y_labels, sety_labels] = useState(["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00", "24:00"])
  const rangedate = (start) => {
    // console.log(start)
    const startdate = start.StartDate
    startset(startdate)
    const enddate = start.EndDate
    endset(enddate)
  }

  const handleSelectChange = (e) => {
   // console.log(e.target.value)
    setSelectedValue(e.target.value)
  }

  const handleButtonClick = (option) => {
    setSelectedOption(option)
  //  console.log(`${option} + clicked`)
  }
  const handleDataFromChild = (data) => {
    setcount(data)
  }
  const handleBodyClick = (event) => {
    // if (
    //   showCalendar &&
    //   event.target !== document.getElementById('custom_c') &&
    //   !document.getElementById('calendar').contains(event.target)
    // ) {
    //   // Hide the component
    //   setShowCalendar(false)
    // }
  }
  //document.body.addEventListener('click', handleBodyClick)

  const datediffernce = (s_date, e_date) => {
  //  console.log(obj)
    const date1 = new Date(s_date)
    const date2 = new Date(e_date)
    const differenceInMilliseconds = date2 - date1
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24)
    const s_differenceInDays = differenceInDays.toString()
    // console.log(s_differenceInDays)
    return s_differenceInDays
  }
  const handlerange = () => {
    const obj = {
      StartDate : formatDateString(dateRange[0].startDate),
      EndDate : formatDateString(dateRange[0].endDate) 
    }
    const day_differ = datediffernce(obj.StartDate, obj.EndDate)
    if (day_differ === "0") {
    //  console.log("day")
     const D_labels = ["03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00", "24:00"]
     sety_labels(D_labels)
     startset(obj.StartDate)
     endset(obj.EndDate)
     const custom_labels = "day"
     setr_date(custom_labels)
    } else if (day_differ > 0 && day_differ <= 6) {
      //  console.log("week")
       function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0')
        const month = date.toLocaleString('default', { month: 'short' })
        return `${day} ${month}`
      }
      
      function DayLabels(start, end) {
        const datesArray = []
        const currentDate = new Date(start)
      
        while (currentDate <= end) {
          datesArray.push(formatDate(currentDate))
          currentDate.setDate(currentDate.getDate() + 1)
        }
      
        return datesArray
      }
         const w_labels = DayLabels(dateRange[0].startDate, dateRange[0].endDate)
         //const w_labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        sety_labels(w_labels)
        startset(obj.StartDate)
        endset(obj.EndDate)
        const custom_labels = "week"
        setr_date(custom_labels)
    } else if (day_differ > 6 && day_differ <= 30) {
      // console.log("month")
      function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0')
        const month = date.toLocaleString('default', { month: 'short' })
        return `${day} ${month}`
      }
      
      function monthlabel(start, end) {
        const datesArray = []
        const currentDate = new Date(start)
      
        while (currentDate <= end) {
          datesArray.push(formatDate(currentDate))
          currentDate.setDate(currentDate.getDate() + 3)
        }
      
        // Add the last day of the array to fill in remaining elements
        const lastDay = formatDate(end)
        if (!datesArray.includes(lastDay)) {
          datesArray.push(lastDay)
        }
      
        return datesArray
      }
      const m_labels = monthlabel(dateRange[0].startDate, dateRange[0].endDate)
     // const m_labels = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30]
      sety_labels(m_labels)
      startset(obj.StartDate)
      endset(obj.EndDate)
      const custom_labels = "month"
      setr_date(custom_labels)

    } else if (day_differ > 30 && day_differ <= 365) {
      // console.log("year")
      const c_date = new Date()
      c_date.setDate(c_date.getDate() - 1)
      const yearago = new Date(c_date)
      yearago.setDate(c_date.getDate() - 365)
    //  rangeoptions(c_date, yearago)
   const year_labels = yearlabels(dateRange[0].startDate, dateRange[0].endDate)
   //  const year_labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      sety_labels(year_labels)
      startset(obj.StartDate)
      endset(obj.EndDate)
      const custom_labels = "year"
      setr_date(custom_labels)
    }
   }
   
  const handleChartTypeChange = (event) => {
    setChartType(event.target.value)
    // console.log(event.target.value)
  }
 
  //Function for Formatting of Date 
  const formatDateString = (da) => {
    let newDateObj = `${da.getFullYear()}-${da.getMonth() + 1}-${da.getDate()}` 
    if (da.getMonth() + 1 < 10 && da.getDate() < 10) {
      newDateObj = `${da.getFullYear()}-0${da.getMonth() + 1}-0${da.getDate()}`
      }
      if (da.getMonth() + 1 > 10 && da.getDate() >= 10) {
        newDateObj = `${da.getFullYear()}-${da.getMonth() + 1}-${da.getDate()}`
      }
      if (da.getMonth() + 1 < 10 && da.getDate() >= 10) {
        newDateObj = `${da.getFullYear()}-0${da.getMonth() + 1}-${da.getDate()}`
      }
      if (da.getMonth() + 1 > 10 && da.getDate() < 10) {
        newDateObj = `${da.getFullYear()}-${da.getMonth() + 1}-0${da.getDate()}`
      }
      if (da.getMonth() + 1 === 10 && da.getDate() === 10) {
        newDateObj = `${da.getFullYear()}-${da.getMonth() + 1}-${da.getDate()}`
       }
       if (da.getMonth() + 1 === 10 && da.getDate() > 10) {
        newDateObj = `${da.getFullYear()}-${da.getMonth() + 1}-${da.getDate()}`
       }
       if (da.getMonth() + 1 === 10 && da.getDate() < 10) {
        newDateObj = `${da.getFullYear()}-${da.getMonth() + 1}-0${da.getDate()}`
       }
    return newDateObj
  }
  //Function for Filter Organisation list in Ascending Order
  const FilterList = (Data) => {
      if (Data === null || Data === undefined || Data instanceof Error || Data === false || Data === "") {
          return []
      }
      const orgnizationlist = Data?.allOrgList.sort(function(a, b) {
       
        const nameA = a.organization_Name.toLowerCase() 
        const nameB = b.organization_Name.toLowerCase() 
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }
        return 0
      })
      return orgnizationlist 
  }
  //Function for set Default Count of Year
  const Yearly = async () => {
    const da = new Date()
    let cdate = ""
    let fdate = ""
   
    if (da.getMonth() + 1 < 10 && da.getDate() < 10) {
    cdate = `${da.getFullYear()}-0${da.getMonth() + 1}-0${da.getDate()}`
    }
    if (da.getMonth() + 1 > 10 && da.getDate() >= 10) {
     cdate = `${da.getFullYear()}-${da.getMonth() + 1}-${da.getDate()}`
    }
    if (da.getMonth() + 1 < 10 && da.getDate() >= 10) {
    cdate = `${da.getFullYear()}-0${da.getMonth() + 1}-${da.getDate()}`
    }
    if (da.getMonth() + 1 > 10 && da.getDate() < 10) {
     cdate = `${da.getFullYear()}-${da.getMonth() + 1}-0${da.getDate()}`
    }
    if (da.getMonth() + 1 === 10 && da.getDate() === 10) {
      cdate = `${da.getFullYear()}-${da.getMonth() + 1}-${da.getDate()}`
     }
     if (da.getMonth() + 1 === 10 && da.getDate() > 10) {
      cdate = `${da.getFullYear()}-${da.getMonth() + 1}-${da.getDate()}`
     }
     if (da.getMonth() + 1 === 10 && da.getDate() < 10) {
      cdate = `${da.getFullYear()}-${da.getMonth() + 1}-0${da.getDate()}`
     }
    fdate = `${da.getFullYear()}-0${1}-0${1}`
    const obj = {
      StartDate : fdate,
      EndDate : cdate
    }
    obj.OrganisationId = orgidref.current?.value ? orgidref.current.value : 0
    setDateRange([
      {
        startDate:  new Date(da.getFullYear(), 0, 1),
        endDate: da,
        key: 'selection'
      }
    ])
  //   selectionRange = [
  //     {
  //     startDate:  new Date(da.getFullYear(), 0, 1),
  //     endDate: da,
  //     key: 'selection'
  //   }
  // ]
    const obj2 = {
      startDate : fdate,
      endDate : cdate
    }
    obj2.organisationId = orgidref.current?.value ? orgidref.current.value : 0

    if (orgidref?.current !== undefined && orgidref?.current !== null) {
    //  await axios.post(`./Design/GetOrgRenderCount`, obj2).then(response => {
    //    const data = JSON.parse(response.data).value.totalDrapeCount 
    //    setcount(data)
//     }) 
    } else {
 // await axios.post(`./Design/GetRenderCount`, obj).then(response => {
     // const data = JSON.parse(response.data).totalDrapeCount 
      //setcount(data)
  // }) 
  } 
  }
  useEffect(async () => {
    try {
       //await axios.get(`./ThreeD/GetProductList`).then(async(productList) => {
        //  await axios.get(`./ThreeD/GetOrganisationList`).then((orgList) => {
            
        //     setPrOrList({
        //       //ProductList: JSON.parse(productList.data),
        //       OrgList:FilterList(orgList.data && JSON.parse(orgList.data))
        //   })
        //   setLoading(false)
         
        //   })

    } catch (error) {
        PrOr = [null, null]
    }
   await Yearly()
 //  fetchData()
}, [])

    if (isLoading) {
    return <div className="App">Loading...</div>
    }
  const style = {
    height:'100%',
    minHeight:'510px', //550px
    position:'relative' 
  }
  const style1 = {
    display:'none'
  }
  
  const colval = 'rectangle-card col-sm-12 float-left h-100  p-0 col-md-12 col-lg-6'

  const pstyle = {
    margin : '0px 0px 15px 0px'
  }
  
    const sideViewStyle = {
    // margin : '0px px 0px 120px'
    }
    const handleDateRangeChange = async (ranges) => {
      setDateRange([ranges.selection])
      //selectionRange = ranges.selection
    }

    const handleDateClick = (types) => {
      setactiverange(types)

        // console.log(types)
         switch (types) {
          case 'day':
          Daydate()
          break
         case 'week':
         lastweek()
         break
         case 'month':
         lastmonth()
         break
         case 'sixmonth':
          lastsixmonth()
          break
         case 'year':
          lastyear()
          break
          case 'custom':
           // handlerange()
          break
          default:
            console.log('check the handleDateClick')
           
      }
    }
    const date_formater = (f_Date) => {
      const dd = f_Date.getDate()
      const mm = f_Date.getMonth() + 1
      const yy = f_Date.getFullYear()
      const new_date = `${yy}-${mm}-${dd}`
      return new_date
    }

    const Daydate = () => {
         const D_startDate = new Date()
         D_startDate.setDate(D_startDate.getDate() - 1)
         const D_endDate = new Date()
         D_endDate.setDate(D_endDate.getDate() - 1)
        // rangeoptions(D_startDate, D_endDate)
        const D_labels = ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00", "24:00"]
        sety_labels(D_labels)
        const obj = {
            StartDate : formatDateString(D_startDate),
            EndDate : formatDateString(D_endDate) 
          }
          rangedate(obj)
    }
   
    const lastweek = () => {
      const c_date = new Date()
      c_date.setDate(c_date.getDate() - 1)
      const sevenDaysAgo = new Date(c_date)
      sevenDaysAgo.setDate(c_date.getDate() - 6)

     function formatDate(date) {
      const day = String(date.getDate()).padStart(2, '0')
      const month = date.toLocaleString('default', { month: 'short' })
      return `${day} ${month}`
    }
    
    function DayLabels(start, end) {
      const datesArray = []
      const currentDate = new Date(start)
    
      while (currentDate <= end) {
        datesArray.push(formatDate(currentDate))
        currentDate.setDate(currentDate.getDate() + 1)
      }
    
      return datesArray
    }
       const w_labels = DayLabels(sevenDaysAgo, c_date)
       //const w_labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      sety_labels(w_labels)
      const obj = {
        StartDate : formatDateString(sevenDaysAgo),
        EndDate : formatDateString(c_date) 
      }
      rangedate(obj) 

    }
    

    const lastmonth = () => {
      const c_date = new Date()
      c_date.setDate(c_date.getDate() - 1)
      const monthago = new Date(c_date)
      monthago.setDate(c_date.getDate() - 30)
    //  rangeoptions(currentDate, monthago)
    function formatDate(date) {
      const day = String(date.getDate()).padStart(2, '0')
      const month = date.toLocaleString('default', { month: 'short' })
      return `${day} ${month}`
    }
    function monthlabel(start, end) {
      const datesArray = []
      const currentDate = new Date(start)
    
      while (currentDate <= end) {
        datesArray.push(formatDate(currentDate))
        currentDate.setDate(currentDate.getDate() + 3)
      }
    
      return datesArray
    }
    const m_labels = monthlabel(monthago, c_date)
   // const m_labels = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30]
    sety_labels(m_labels)
    const obj = {
        StartDate : formatDateString(monthago),
        EndDate : formatDateString(c_date) 
      }
      rangedate(obj) 
    }

    const lastsixmonth = () => {
      // console.log("six")
      const c_date = new Date()
      c_date.setDate(c_date.getDate() - 1)
      const sixmonthago = new Date(c_date)
      sixmonthago.setDate(c_date.getDate() - 182)
 
    const sixmonth_labels = yearlabels(sixmonthago, c_date)
   //  const sixmonth_labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      sety_labels(sixmonth_labels)
      const obj = {
        StartDate : formatDateString(sixmonthago),
        EndDate : formatDateString(c_date) 
      }
      rangedate(obj)
    }

   const lastyear = () => {
      const c_date = new Date()
      c_date.setDate(c_date.getDate() - 1)
      const yearago = new Date(c_date)
      yearago.setDate(c_date.getDate() - 365)

      function yearlabels(start, end) {
        const monthsArray = []
        const currentDate = new Date(start)
      
        while (currentDate <= end) {
          const month = currentDate.toLocaleString('default', { month: 'short' })
          const year = currentDate.getFullYear().toString().slice(2)
      
          monthsArray.push(`${month} ${year}`)
      
          currentDate.setMonth(currentDate.getMonth() + 1)
        }
      
        return monthsArray
      }
   const year_labels = yearlabels(yearago, c_date)
   //  const year_labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      sety_labels(year_labels)
      const obj = {
        StartDate : formatDateString(yearago),
        EndDate : formatDateString(c_date) 
      }
      rangedate(obj) 
   }

   function yearlabels(startDate, endDate) {
    const result = []
    const currentDate = new Date(startDate)
  
    while (currentDate <= endDate) {
      const month = currentDate.toLocaleString('default', { month: 'short' })
      const year = currentDate.getFullYear().toString().slice(2)
      const formattedDate = `${month} ${year}`
    
      result.push(formattedDate)
  
      currentDate.setMonth(currentDate.getMonth() + 1)
  
      currentDate.setDate(1)
    }
  
    return result
  }
  
  return (
    <>
    <div className={colval}>

    <Card style={style} className="mb-1 col-md-12 col-sm-12 home">
          <CardHeader className="pb-1" tyle={{ paddingLeft: "1rem", paddingBottom: "1rem"}}>
            <div classname="col-md-6 col-sm-6 col-lg-6 flex-column-reverse" style={{ display: "flex", flexDirection: 'column' }}>
              <h5 style={{ marginTop: '2px' }} className="">
              {e_name} : <span style={{fontWeight:'700'}}>{count}</span>{" "}
              </h5>
              <div classname= "row">
                <div className='col-md-6'></div>
                 <div className='col-md-6'></div>
              </div>
            </div>
            {/* <div classname="col-md-6 col-sm-6 col-lg-6 flex-column-reverse" style={{ display: "flex", flexDirection: 'column' }}>
              <h5 style={{ marginTop: '2px' }} className="">
                Start Date : <span style={{fontWeight:'700'}}>{s_date}</span>{" "}
                </h5>
                <h5 style={{ marginTop: '2px' }} className="">
                End Date : <span style={{fontWeight:'700'}}>{e_date}</span>{" "}
              </h5>
            </div> */}
            {/* <Charoptions></Charoptions> */}
            <div classname="col-md-6 d-flex flex-row-reverse col-sm-12">
                 <form className="form-inline flex-nowrap selec col-md-12 col-lg-12 pr-0"  style={{justifyContent:'end'}}>
        <label for="graphType" style={{marginRight: '0.4rem', color: '#2a2e30'}}>Graph:</label>
        <select id="graphType" name="graphType" value={chartType} onChange={handleChartTypeChange} className="col-md-8 col-lg-8 col-md-6 col-sm-4 form-control float-left">
            <option selected value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="pie">Pie</option>
        </select>
    </form>
            </div>
            {/* </Row> */}
          </CardHeader>
          <CardBody style={{ padding: "1rem", paddingTop:'0rem' }}>
            <Row>
              <div id="S_buttons" className="col-md-6 col-sm-12 d-grid gap-2 d-md-block">
        <label className={`button btn-light ${selectedOption === 'fabric_render' ? 'selected' : ''}`}>
        <input
          type="radio"
          name="options"
          value="fabric_render"
          checked={selectedOption === 'fabric_render'}
          onChange={() => handleButtonClick('fabric_render')}
        />
         All
      </label>

      <label className={`button btn-light ${selectedOption === 'fabricDrape_Qr' ? 'selected' : ''}`}>
        <input
          type="radio"
          name="options"
          value="fabricDrape_Qr"
          checked={selectedOption === 'fabricDrape_Qr'}
          onChange={() => handleButtonClick('fabricDrape_Qr')}
        />
        Qr
      </label>
              </div>
              <div className='col-md-6 col-sm-12 d-flex flex-row-reverse'>
              <div className="btn-group" id='d_range' role="group">
                <button type="button" className={`btn r_btn btn-light ${activerange === 'day' ? 'active' : ''}`} style={{padding: "0rem 1.1rem 0rem 1.1rem "}} onClick={() => handleDateClick('day')}>
                  1D
                </button>
                <button type="button" className={`btn r_btn btn-light ${activerange === 'week' ? 'active' : ''}`} style={{padding: "0rem 1.1rem 0rem 1.1rem "}} onClick={() => handleDateClick('week')}>
                  1W
                </button>
                <button type="button" className={`btn r_btn btn-light ${activerange === 'month' ? 'active' : ''}`} style={{padding: "0rem 1.1rem 0rem 1.1rem "}} onClick={() => handleDateClick('month')}>
                  1M
                </button>
                <button type="button" className={`btn r_btn btn-light ${activerange === 'sixmonth' ? 'active' : ''}`} style={{padding: "0rem 1.1rem 0rem 1.1rem "}} onClick={() => handleDateClick('sixmonth')}>
                  6M
                </button>
                <button type="button" className={`btn  r_btn btn-light ${activerange === 'year' ? 'active' : ''}`} style={{padding: "0rem 1.1rem 0rem 1.1rem "}} onClick={() => handleDateClick('year')}>
                  1Y
                </button>
                <button type="button" id='custom_c' className={`btn r_btn btn-light ${activerange === 'custom' ? 'active' : ''}`} style={{padding: "0rem 0.5rem 0rem 0.5rem "}} onClick={() =>  handleDateClick('custom', setShowCalendar(!showCalendar))}>
                  Date
                </button>
              </div>
              <div id='calendar' className='position-absolute' style={{zIndex:'99999', right:'0', background:'#fff', top: '41px'}}> 
                        { showCalendar && 
                       <div className='showcalendar' >
                        <DateRangePicker
                         ref={DateRangePickerRef}
                         style={{border:'1px'}}       
                         onChange={handleDateRangeChange}
                         showSelectionPreview={true}
                         moveRangeOnFirstSelection={false}
                         months={1}
                         ranges={dateRange}
                         direction="vertical"
                       />
                       <button type="button" role="button" class="bg-light text-white px-3 btn btn-secondary show"
                          onClick ={
                             () => {
                          handlerange()
                          setShowCalendar(!showCalendar)
                          }}
                       >SHOW</button>  
                       </div>
                       }                                     
                </div>
              </div>
              <div className='col-md-12 col-sm-12 mt-1'>
                <Chartgraph
                option_val={chartType}
                range_val={y_labels}
                s_range={start}
                e_range={end}
                time_range={activerange}
               customNew_range={r_date}
               onDataFromChild={handleDataFromChild}
               setcount={setcount}
               sets_date={sets_date}
               sete_date={sete_date}
               selectedOption={selectedOption}
               sete_name={sete_name}          
               />
              </div>
            </Row>
            {/* <canvas ref={chartRef} id="myChart" /> */}
          </CardBody>
        </Card>

    </div>
    <div>
  </div>
 
    </>
    
  )
}

export default Graphcard

