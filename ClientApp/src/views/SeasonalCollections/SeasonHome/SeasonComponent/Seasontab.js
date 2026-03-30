import { Fragment, useState } from 'react'
import { TabContent, TabPane, Nav, NavItem, Button } from 'reactstrap'
import { SeasonCard } from './SeasonCard'
import stock from '../../../../assets/images/pages/stock.jpg'
import sample from '../../../../assets/images/pages/sample1.jpg'
import nos from '../../../../assets/images/pages/nos1.jpg'
import customercollection from "../../../../assets/images/pages/seasons_fabric.jpg"
import seasonal_collezioni from '../../../../assets/images/pages/collezioni_app.jpg'


const arr = [
    { id: 1, name: "Stock", src: stock },
    { id: 2, name: "Nos", src: nos },
    { id: 3, name: "Samples", src: sample },
    { id: 4, name: "My Collection", src: customercollection },
    { id: 5, name: "Winter", src: seasonal_collezioni },
    { id: 6, name: "Stock", src: stock },
    { id: 7, name: "Nos", src: nos },
    { id: 8, name: "Samples", src: sample },
    { id: 9, name: "My Collection", src: customercollection },
    { id: 10, name: "Winter", src: seasonal_collezioni }
]
const optionsb = [  
    { id: 7, name: "Nos", src: nos },
    { id: 8, name: "Samples", src: sample },
    { id: 9, name: "My Collection", src: customercollection },
    { id: 10, name: "Winter", src: seasonal_collezioni }
]
const optionsc = [  
    { id: 9, name: "My Collection", src: customercollection },
    { id: 10, name: "Winter", src: seasonal_collezioni }
]
const Seasontab = () => {
    const [active, setActive] = useState('1')

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }
    return (
        <Fragment>
            <Nav className='justify-content-center ButtonGroup groupfixed bg-light' tabs>
                <NavItem>                 
                    <Button color='light'  active={active === '1'}
                        onClick={() => {
                            toggle('1')
                        }}>Winter 2022</Button>
            
                </NavItem>
                <NavItem>                 
                    <Button color='light'  active={active === '2'}
                            onClick={() => {
                                toggle('2')
                            }}>Spring 2022</Button>
                   
                </NavItem>              
                <NavItem>                  
                    <Button color='light'  active={active === '3'}
                        onClick={() => {
                            toggle('3')
                        }}>Autumn 2022</Button>
                    
                </NavItem>
            </Nav>
            <TabContent className='py-50 grandparent' activeTab={active}>
                <TabPane tabId='1'>
                    <div className="parent">
                    <div>                            {
                        arr.map((e, k) => {
                            return <SeasonCard titleName={e.name} banner={e.src} />
                        })
                    }
                        </div>
                   </div>
                </TabPane>
                <TabPane tabId='2' >
                    <div className="parent">
                        <div>                            {
                            optionsb.map((e, k) => {
                                return <SeasonCard titleName={e.name} banner={e.src} />
                            })
                        }
                        </div>
                    </div>
                </TabPane>
                <TabPane tabId='3'>
                    <div className="parent">
                        <div>                            {
                            optionsc.map((e, k) => {
                                return <SeasonCard titleName={e.name} banner={e.src} />
                            })
                        }
                        </div>
                    </div>
                </TabPane>
            </TabContent>
        </Fragment>
    )
}
export default Seasontab
