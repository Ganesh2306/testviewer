import { useState, useEffect } from 'react'
import Repeater from '@components/repeater'
import { GetDesignTypeList } from '../store/actions/index'
import { Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Label, Input, Button, CardTitle } from 'reactstrap'
import { X, Plus } from 'react-feather'
import { ShowLoader } from '../../../../redux/actions/loader/index'
import { useDispatch, useSelector } from 'react-redux'
import { empty } from 'dom7'
import axios from 'axios'



const RowData = () => {

}

export default RowData