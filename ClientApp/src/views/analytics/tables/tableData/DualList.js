import 'react-dual-listbox/lib/react-dual-listbox.css'
import {useState, React} from 'react'
import DualListBox from 'react-dual-listbox'

export const DualList = () => {
    const options = [
        { value: 'Red', label: 'Red' },
        { value: 'Green', label: 'Green' },
        { value: 'Blue', label: 'Blue' },
        { value: 'Checks', label: 'Checks' },
        { value: 'Stripes', label: 'Stripes' }
    ]
  
    return (
       <DualListBox style={{height:'350px'}}
                options={options}
                icons={{
                    moveLeft: <span className="fa fa-chevron-left" />,
                    moveAllLeft: [
                        <span key={0} className="fa fa-chevron-left" />,
                        <span key={1} className="fa fa-chevron-left" />
                    ],
                    moveRight: <span className="fa fa-chevron-right" />,
                    moveAllRight: [
                        <span key={0} className="fa fa-chevron-right" />,
                        <span key={1} className="fa fa-chevron-right" />
                    ],
                    moveDown: <span className="fa fa-chevron-down" />,
                    moveUp: <span className="fa fa-chevron-up" />,
                    moveTop: <span className="fa fa-double-angle-up" />,
                    moveBottom: <span className="fa fa-double-angle-down" />
                }}
            />
    )
}
