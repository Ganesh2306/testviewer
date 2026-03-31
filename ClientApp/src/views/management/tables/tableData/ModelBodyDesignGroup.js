import { useState, useEffect } from 'react'
import Repeater from '@components/repeater'
import { Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Label, Input, Button, CardTitle } from 'reactstrap'
import { X, Plus } from 'react-feather'
import { empty } from 'dom7'
import axios from 'axios'
let obj = []
let flag = false

const ModelBodyDesignGroup = () => {
  
    const Swal = require('sweetalert2')
    const [IsExist, setExist] = useState(false)
    const [count, setCount] = useState(0)
    const [item, setItem] = useState()
    const [desc, setDesc] = useState()
    const [att, setAtt] = useState()
    const [TypesData, setTypesData] = useState([])
    const [design_state1, setDesignState] = useState(obj)
    const [flg, setFlg] = useState(flag)

    const Data = (response) => {
        response.data.map((user, i) => {
            obj.push(true)
        })
        setCount(response.data.length)
        setTypesData(response.data)
    }

    const GetAllTypes = () => {
        obj = []
        
        setItem("")
        setDesc("")
        setAtt("")
        // dispatch(ShowLoader(true))
        axios.get('./Management/GetDesignGroupList').then(response => {
            //  dispatch(ShowLoader(false))
            Data(response)
        })

    }

    const deleteForm = e => {
        e.preventDefault()
        if (e.target.id === '') {
            setCount(count => count - 1)
        } else {
            const types = []
            const obj = new Object()
            obj.state = 3
            obj.design_Group_Id = event.target.id === '' ? event.target.lastElementChild.id : event.target.id

            types.push(obj)

            Swal.fire({
                title: 'Are you sure?',
                text: "You want to delete this ?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post('./Management/SaveDesignGroup', types).then(response => {
                        //abhishek start 10/03
                        if (JSON.parse(response.data).isSave) {
                            //dispatch(ShowLoader(false))
                            GetAllTypes()
                            Swal.fire(
                                'Deleted!',
                                'Your design group has been deleted.',
                                'success'
                            )
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Role',
                                text: JSON.parse(response.data).message
                            })
                        }
                        //abhishek end 10/03
                    })

                }
            })

        }
        ///e.target.closest('form').remove()
    }

    const SaveIndividualType = (event, i) => {
        if (IsExist) {
            Swal.fire({
                icon: 'error',
                title: 'Exist...',
                text: 'Design group already exist !'
            })
            return
        }

        let Isblank = false
        if (event.target.innerHTML === "Edit" || event.target.innerHTML === "<span>Edit</span>") return
        const types = []
        const obj = new Object()
        const id = event.target.innerHTML === "Apply" ? event.target.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.querySelector(".form-control").id : event.target.parentElement.parentElement.parentElement.querySelector(".form-control").id
        const name = (event.target.innerHTML === "Apply" ? event.target.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.querySelector(".form-control").value : event.target.parentElement.parentElement.parentElement.querySelector(".form-control").value).trim()
        const desc = (event.target.innerHTML === "Apply" ? event.target.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.querySelector(".form-control").value : event.target.parentElement.parentElement.parentElement.querySelector(".form-control").value).trim()
        if (name === "" && desc === "") {
            Isblank = true
            Swal.fire({
                icon: 'error',
                title: 'Blank...',
                text: 'Please Enter Design group and description!'
            })
            return
        } else if (name === "") {
            Swal.fire({
                icon: 'error',
                title: 'Blank...',
                text: 'Please Enter Design group!'
            })
            return
        } else if (desc === "") {
            Isblank = true
            Swal.fire({
                icon: 'error',
                title: 'Blank...',
                text: 'Please Enter description !'
            })
            return
        }
        if (Isblank === false) {
            
            if (id !== '') obj.state = 2
            else obj.state = 0
            obj[i] = !obj[i]
            setDesignState(obj)
            flag = !flag
            setFlg(flag)
            obj.design_Group_Id = id === '' ? 0 : id
            obj.design_Group_Name = name
            obj.desgin_Group_Description = desc
            types.push(obj)


            axios.post('./Management/SaveDesignGroup', types).then(response => {
                //dispatch(ShowLoader(false))
                GetAllTypes()
                if (id !== '') {
                    Swal.fire(
                        'Success!',
                        'Design group Updated successfully!!',
                        'success'
                    )
                    GetAllTypes()
                } else {
                    Swal.fire(
                        'Success!',
                        'Design group saved successfully!!',
                        'success'
                    )
                    GetAllTypes()
                }
            })
            GetAllTypes()
        }
    }

    const increaseCount = () => {
        setCount(count => count + 1)
        obj.push(false)
        setItem("newitemtype")
        setDesc("newitemtdescription")
        setAtt("newrow")
    }

    useEffect(() => {
        obj = []
        //  setDesignState([])
       
        GetAllTypes()

    }, [])

    useEffect(() => {
       
        setDesignState(obj)
        console.log(design_state1)
    }, [flg])

    const CheckDesignGroup = (e) => {
        
        const types = []
        const obj = new Object()
        obj.Group_Name = e.target.value
        types.push(obj)

        axios.post('./Management/CheckDesignGroup', types).then(response => {
            if (JSON.parse(response.data).designGroupIsExisting) {
                //e.target.nextElementSibling.classList.add("d-block")
                e.target.parentElement.parentElement.parentElement.childNodes[5].children[0].classList.add('d-block')
                setExist(true)
            } else {
                setExist(false)
                //e.target.nextElementSibling.classList.remove("d-block")
                e.target.parentElement.parentElement.parentElement.childNodes[5].children[0].classList.remove("d-block")
            }
        })
    }
    const SaveType = () => {
        
        //dispatch(ShowLoader(true))
        const row = document.getElementsByClassName("newrow")
        const types = []
        for (let i = 0; i < row.length; i++) {
            if (row[i].querySelector(".newitemtype ").value === "" || row[i].querySelector(".newitemtdescription ").value === "") {

                Swal.fire({
                    icon: 'error',
                    title: 'Blank...',
                    text: 'Please Enter the Deatils !'
                })
                return
            }
            const obj = new Object()
            if (row[i].querySelector(".newitemtype ").id !== '') continue
            obj.design_Group_Name = row[i].querySelector(".newitemtype ").value
            obj.desgin_Group_Description = row[i].querySelector(".newitemtdescription ").value
            types.push(obj)

        }
        if (row.length > 0) {
        axios.post('./Management/SaveDesignGroup', types).then(response => {
            //dispatch(ShowLoader(false))
            GetAllTypes()
            Swal.fire(
                'Success!',
                'Design Typed saved successfully!!',
                'success'
            )
        })
     } else {
        Swal.fire({
            icon: 'error',
            title: 'Blank...',
            text: 'Please Enter the Deatils !'
        })
    }
     }
     return (
        <Card>

            <CardHeader className='border-bottom'>
                <CardTitle tag='h4'>Design Group</CardTitle>
            </CardHeader>
            <Row className='mx-0 mt-1 mb-50 justify-content-between align-items-center'>
                <Col md={1}>
                    <Label >Sr.No.</Label>
                </Col>
                <Col md={8}>
                </Col>
                <Col md={3}>
                    <FormGroup className='d-flex mb-0 justify-content-end'>
                        <Button.Ripple className='mr-2' color='primary' onClick={increaseCount}>
                            <Plus size={14} />
                            <span className=' ml-25'>Add</span>
                        </Button.Ripple>
                        <Button.Ripple color='primary' >
                            <span onClick={SaveType} className=' ml-25'>Save</span>
                        </Button.Ripple>
                    </FormGroup>
                </Col>
                <Col sm={12}>
                    <hr />
                </Col>
            </Row>
            <CardBody>
                <Repeater count={count}>
                    {i => (
                        <Form key={i}>
                            <Row className={`justify-content-between align-items-center ${att}`}>
                                <Col md={1}>
                                    <Label >{i + 1}</Label>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        {
                                            console.log(TypesData[i])
                                        }
                                        <Label for={`item-name-${i}`}>Design Group Name</Label>
                                        <Input
                                            onChange={(e) => {
                                                CheckDesignGroup(e)
                                            }}
                                            className={item}
                                            defaultValue={TypesData[i] === undefined ? "" : TypesData[i].design_Group_Name}
                                            disabled={obj[i]}
                                            type='text'
                                            id={TypesData[i] === undefined ? "" : TypesData[i].design_Group_Id}
                                            placeholder='Design Group Name' />
                                        {/*<span className="invalid-feedback">Design group already exist in database! </span>*/}

                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        <Label for={`item-name-${i}`}>Description</Label>
                                        <Input type='text'
                                            className={desc}
                                            defaultValue={TypesData[i] === undefined ? "" : TypesData[i].desgin_Group_Description}
                                            disabled={obj[i]}
                                            id={TypesData[i] === undefined ? "" : TypesData[i].design_Group_Id} placeholder='Description' />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                </Col>
                                <Col md={4}>
                                    <FormGroup newrow={att} className='d-flex mb-0'>
                                        <Button.Ripple color='primary' className='text-nowrap mr-2'
                                            onClick={(e) => {

                                                if (e.currentTarget.innerText === "Edit") {
                                                    obj[i] = !obj[i]
                                                    setDesignState(obj)
                                                    flag = !flag
                                                    setFlg(flag)
                                                } else SaveIndividualType(e, i)
                                            }
                                            }
                                            outline>
                                            <span  >{obj[i] ? 'Edit' : 'Apply'}</span>
                                        </Button.Ripple>
                                        <Button.Ripple color='danger' id={TypesData[i] === undefined ? "" : TypesData[i].design_Group_Id} className='text-nowrap px-1' onClick={(e) => {
                                            deleteForm(e)

                                        }} outline>
                                            <X id={TypesData[i] === undefined ? "" : TypesData[i].design_Group_Id} size={14} className='mr-50' />
                                            <span id={TypesData[i] === undefined ? "" : TypesData[i].design_Group_Id} >Delete</span>
                                        </Button.Ripple>
                                    </FormGroup>
                                </Col>
                                <Col md={4} className='offset-md-1 col-md-4'>
                                    <span className="invalid-feedback" >Design group already exist</span>
                                </Col>
                                <Col sm={12}>
                                    <hr />
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Repeater>
            </CardBody>
        </Card>
    )
}

export default ModelBodyDesignGroup
