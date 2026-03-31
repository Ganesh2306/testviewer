import Chart from 'react-apexcharts'
import { Card, CardTitle, CardText, CardBody, Row, Col, Input, CardHeader  } from 'reactstrap'
import { useState, useEffect, useRef, useContext } from "react"
import { Heart, MapPin, Eye, ShoppingCart, Layers, Image, Filter } from 'react-feather'
import axios from 'axios'
import { AbilityContext } from '@src/utility/context/Can'
import { addDays } from 'date-fns'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import Graphcard from './Graphcard'

const RectangleCard = () => {
  const ability = useContext(AbilityContext)

  
  return (
    <>
     <Graphcard></Graphcard> 
    </>
    
  )
}

export default RectangleCard
