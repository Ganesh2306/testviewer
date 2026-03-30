import React, { useState, useEffect } from "react"

// ** Styles
import '@styles/base/pages/app-ecommerce.scss'
import OrderTable from "./OrderTable"
import loder from "../../assets/images/fabicon/loaderTds.gif"

const ViewOrderList = (props) => {
    const [loading, setLoading] = useState(true)
    // const disabled = true
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false) // Set loading to false after a delay (simulating data loading)
        }, 1000)
        return () => clearTimeout(timer)

    }, [])

    return (
        <>
            {loading ? <div className="loder"><img src={loder} height={80} width={80} /></div> : (
                <div className='viewcol_boardpanel orderstable'>
                    <OrderTable />
                </div>
            )}
        </>
    )
}

export default ViewOrderList
//  {loading ? <div className="loder"><img src={loder} height={80} width={80} /></div> : ''}
