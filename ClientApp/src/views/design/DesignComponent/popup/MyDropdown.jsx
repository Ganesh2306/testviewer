import React from "react"

function MyDropdown({ selectedValue, onChange }) {
  const options = [
    { value: "Saree", label: "Saree" },
    { value: "BedSheet", label: "BedSheet" }
  ]

  const handleChange = (event) => {
    onChange(event.target.value)
  }

  return (
    <select className="dropDown" value={selectedValue} onChange={handleChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default MyDropdown
