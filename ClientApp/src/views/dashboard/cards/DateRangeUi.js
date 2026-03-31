import React, { useState } from 'react'
import { addDays } from 'date-fns'
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file

function DateRangUi() {
 const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ])

  const handleDateRangeChange = (item) => {
    setDateRange([item.selection])
  }

  return (
    <div>
      <DateRangePicker
        style={{border:'1px'}}       
        onChange={handleDateRangeChange}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={1}
        ranges={dateRange}
        direction="vertical"
      />
    </div>
  )
}

export default DateRangUi
