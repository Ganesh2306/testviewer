import { useEffect, useState } from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2'
import 'chartjs-plugin-labels'

import axios from 'axios'
import { Bold } from 'react-feather'

function Chartgraph(props) {
 //props.Daydate()
  const [chartData, setChartData] = useState([])
  const chartType = props.option_val
   const labels_data = props.range_val
   let time_name = props.time_range
   let first_date = props.s_range
   let last_date = props.e_range
  // const custom_labels = props.custom_time
  const event_Name = props.selectedOption
  let event_Name1 = ""
  if (event_Name === "fabric_render") {
    event_Name1   = "['fabric_render']"  
  } else if (event_Name === "fabricDrape_Qr") {
    event_Name1   = "['fabricDrape_Qr']"
  }

   if (time_name === 'custom') {
    // console.log("custom")
    time_name = props.customNew_range
   }
   if (time_name === 'sixmonth') {
    // console.log("sixmonth")
    time_name = 'year'
   }

  if (first_date === null) {
    // console.log("values is null")
    const date_formater = (f_Date) => {
      const dd = String(f_Date.getDate()).padStart(2, '0')
      const mm = String(f_Date.getMonth() + 1).padStart(2, '0')
      const yy = f_Date.getFullYear()
      const new_date = `${yy}-${mm}-${dd}`
      return new_date
    }
    const D_startDate = new Date()
    D_startDate.setDate(D_startDate.getDate() - 1)
    const D_endDate = new Date()
    D_endDate.setDate(D_endDate.getDate() - 1)
    const  initial_date =  date_formater(D_startDate)
    const today_date = initial_date.toString()  
    // console.log(today_date)
    first_date = today_date
    last_date = today_date
   }
   // data sorting by date
   function fillMissingDatesWithZero(startDate, endDate, data) {
    const resultObject = {}
    
    const currentDate = new Date(startDate)
    const lastDate = new Date(endDate)

    while (currentDate <= lastDate) {
        const currentDateStr = currentDate.toISOString().split('T')[0]

        if (data[currentDateStr] !== undefined) {
            resultObject[currentDateStr] = data[currentDateStr]
        } else {
            resultObject[currentDateStr] = 0
        }

        currentDate.setDate(currentDate.getDate() + 1)
    }

    return resultObject
}

function formateyeardate(renderData, startDateStr, endDateStr) {
  const startDate = new Date(startDateStr)
  const endDate = new Date(endDateStr)

  const resultArray = []

  const currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    const yearMonth = currentDate.toISOString().slice(0, 7)
    const value = renderData[yearMonth] || 0 
    resultArray.push(value)

    currentDate.setMonth(currentDate.getMonth() + 1)
    currentDate.setDate(1) 
  }

  return resultArray
}

 // data sorting by month
 function monthdates(obj) {
  // Extract values from the object
  const values = Object.values(obj)

  // Create a new array with the first value as it is
  const resultArray = [values[0]]

  // Add every 3 elements starting from the 1 index
  for (let i = 1; i < values.length; i += 3) {
    let sum = 0
    for (let j = i; j < i + 3 && j < values.length; j++) {
      sum += values[j]
    }
    resultArray.push(sum)
  }

  return resultArray
}

  
    const showSeperateResult = (data, state) => {
      switch (state) {
        case "day":
          data = seperateDayWise(data)
          break
          case "week":
            data = seperateweekWise(data)
            break
            case "month":
              data = seperatemonthWise(data)
              break
              case "year":
                data = seperateyearWise(data)
                break
        default:
         
      }
      return data
    }

  const seperateDayWise = (dataObject) => {
   let resultArray = []
    if (!dataObject) {
      resultArray = []
    } else {
     resultArray = [dataObject["0"] || 0]

    for (let hour = 1; hour <= 24; hour += 3) {
      let aggregatedValue = 0
  
      for (let i = 0; i < 3; i++) {
        aggregatedValue += dataObject[hour + i] || 0
      }
  
      resultArray.push(aggregatedValue)
    }  
  }
  return resultArray   
}

const seperateweekWise = (dataObject) => {
  let resultArray = []
  if (!dataObject) {
    resultArray = [] 
  } else {
    // resultArray = Object.values(dataObject) 
     resultArray = fillMissingDatesWithZero(first_date, last_date, dataObject)
  }
  return resultArray 
}

const seperatemonthWise = (dataObject) => {
  let resultArray = []
  if (!dataObject) {
    resultArray = [] 
  } else {
    const date_value  = fillMissingDatesWithZero(first_date, last_date, dataObject)
    // console.log(date_value)
    resultArray = monthdates(date_value)
    // console.log(resultArray)
  }
  return resultArray 
}

const seperateyearWise = (dataObject) => {
  let resultArray = []
  if (!dataObject) {
    resultArray = [] 
  } else {
    resultArray = formateyeardate(dataObject, first_date, last_date)
    // console.log("year")
  }
  return resultArray 
}
const RenderCount = (arr) => {
  return arr.reduce((total, current) => total + current, 0)
}

   useEffect(() => {
    const fetchData = async () => {

      const labelsb = labels_data
      try {
        const gaResponse = await axios('https://analytics.dam3d.in/getdata', {
            method:"POST",
            headers: {
              'Access-Control-Allow-Origin': '*'
            },
            data:{
              start_date: first_date,
              end_date: last_date,
              // start_date: "2023-12-26",
              // end_date: "2023-12-26",
              time: time_name,
              event_names: event_Name1
            }
          })

           const gaData = gaResponse.data
           const eventdata = event_Name === "fabric_render" ? gaData.fabric_render : gaData.fabricDrape_Qr
           const seperated_Data = showSeperateResult(eventdata, time_name)
           const labels = labelsb
            const values = Object.values(seperated_Data)
            const count = RenderCount(values)
            props.setcount(count)
            event_Name === "fabric_render" ? props.sete_name("Render Count") : props.sete_name("QR Count")
            props.sets_date(first_date)
            props.sete_date(last_date)
            // onDataFromChild(count)
           // const count = RenderCount(seperated_Data)
            // const values = Object.values(gaData)
           // const values = [0, 2, 0, 0, 0, 2, 15, 0, 0]

            const chartData = {
              labels,
              datasets: [
                {
                  label: 'reder count',
                  backgroundColor: 'rgba(75,192,192,0.2)',
                  borderColor: 'rgba(75,192,192,1)',
                  borderWidth: 1,
                  hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                  hoverBorderColor: 'rgba(75,192,192,1)',
                  data: values
                }
              ]
            }
  
            setChartData(chartData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [labels_data, event_Name1])

  const ChartComponentType = () => {
    switch (chartType) {
        case 'bar':
            return <Bar data={chartData} options={{ ...options, plugins: { labels: { render: 'value' } } }}/>
        case 'line':
            return <Line data={chartData} options={options} />
        case 'pie':
            return <Pie data={chartData} options={{ ...options, plugins: { labels: { render: 'value' } } }}/>
        default:
          return <Bar data={chartData} options={{ ...options, plugins: { labels: { render: 'value' } } }} />
    }
}

const options = {
  tooltips: {
    enabled: true
  },
  hover: {
    animationDuration: 1
  },
  animation: {
    duration: 1,
    onComplete() {
      const chartInstance = this.chart
      const ctx = chartInstance.ctx

      if (['line'].includes(chartInstance.config.type)) {
        ctx.textAlign = 'center'
        ctx.fillStyle = 'rgba(0, 0, 0, 1)'
        ctx.textBaseline = 'bottom'
        ctx.font = '700 12px Arial'

        this.data.datasets.forEach((dataset, i) => {
          const meta = chartInstance.controller.getDatasetMeta(i)
          meta.data.forEach((bar, index) => {
            const data = dataset.data[index]
            ctx.fillText(data, bar._model.x, bar._model.y - 5)
          })
        })
      }
    }
  },
  legend: {
    labels: {
      display: false
    },
    display: false
  },
  elements: {
    rectangle: {
      borderWidth: 0
    }
  },
  scales: {
    x: {
      ticks: {
        min: 0
      }
    }
  },
  plugins: {
    labels: {
      render: 'value', // Display actual data values
      fontColor: 'rgba(0, 0, 0)',
      fontSize: 12,
      // Set font weight to 700
      fontWeight: Bold,
      fontWeight: 700
    }
  }
}


  return (
    <>
      <div className='app'>
        <div className='chart' style={{marginTop: '10px' }}>
          {ChartComponentType()}
        </div>
      </div>
    </>
  )

}

export default Chartgraph

