import { CustomInput, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { MoreVertical, Edit, FileText, Archive, Trash, Shield } from 'react-feather'


// DesignTypedata

export const ColumnRoleDesign = [
    //{
    //    name: 'ID',
    //    cell: (row, index) => index + 1,
    //    Width: '15px'
    //},
    {
        // id: row => row.role_design_configuration_id,
        name: 'SR.NO',
        // selector: 'role_design_configuration_id',
        //  Width: '5px',
        omit: false,
        minWidth: '100px',
        cell: (row, index) => <h6 rdcid={row.role_design_configuration_id}> {(index + 1)}</h6> //row => row.role_design_configuration_id

    },
    {
        // id: row => row.role_design_configuration_id,
        name: 'Feature Name',
        selector: 'Design_Name',
        minWidth: '150px',
        // omit: true,
        cell: row => row.Design_Name

    },
    {
        name: 'Save',
        selector: 'save_check',
        minWidth: '50px'
    },
    {
        name: 'Mandatory',
        selector: 'mand_check',
        minWidth: '50px'
    },
    {
        name: 'Order NO.',
        selector: 'ord_a',
        minWidth: '150px'
    },
    {
        name: 'Label',
        selector: 'label_check',
        minWidth: '150px'
    },
    {
        name: 'Order No.',
        selector: 'ord_b',
        minWidth: '150px'
    },
    {
        name: 'Advance Search',
        selector: 'advance_check',
        minWidth: '200px'
    },
    {
        name: 'Order No.',
        selector: 'inputtext',
        minWidth: '150px'
    },
    {
        name: 'Ai Search',
        selector: 'ai_check',
        Width: '20%'
    },
    {
        name: 'Order No.',
        selector: 'ord_c',
        Width: '20%'
    }
]

export const RoleDesignData = [
    {
        id: 1,
        Design_Name: 'Pattern',
        checkbox: <CustomInput className="access_check text-center" inline type='checkbox' id="c1" />,

        ord_a: <Input type='number' id='c1' bsSize='sm' style={{ width: '80px' }} />,
        label_check: <CustomInput className="access_check text-center" inline type='checkbox' id="c2" />,
        ord_b: <Input type='number' id='2' bsSize='sm' style={{ width: '80px' }} />,
        advance_check: <CustomInput className="access_check text-center" inline type='checkbox' id="c3" />,
        inputtext: <Input type='number' id='a1' bsSize='sm' style={{ width: '80px' }} />,
        ai_check: <CustomInput className="access_check text-center" inline type='checkbox' id="c3" />,
        ord_c: <Input type='number' id='a1' bsSize='sm' style={{ width: '80px' }} />
    }//,
    //  {
    //    id:2,
    //    Design_Name:'Color', 
    //    checkbox: <CustomInput className="access_check text-center" inline type='checkbox' id="c4" />,
    //    ord_a:  <Input type='number' id='ca2' bsSize='sm' style={{width:'80px'}}/>,
    //    label_check:<CustomInput className="access_check text-center" inline type='checkbox' id="c5" />,
    //    ord_b:<Input type='number' id='4' bsSize='sm' style={{width:'80px'}}/>,
    //    advance_check:<CustomInput className="access_check text-center" inline type='checkbox' id="c7" />,
    //    inputtext:<Input type='number' id='a1' bsSize='sm' style={{width:'80px'}}/>
    //},
    //{
    //  id:3,
    //  Design_Name:'Weave', 
    //  checkbox: <CustomInput className="access_check text-center" inline type='checkbox' id="c7" />,
    //  ord_a:  <Input type='number' id='a1' bsSize='sm' style={{width:'80px'}}/>,
    //  label_check:<CustomInput className="access_check text-center" inline type='checkbox' id="c8" />,
    //  ord_b:<Input type='number' id='a1' bsSize='sm' style={{width:'80px'}}/>,
    //  advance_check:<CustomInput className="access_check text-center" inline type='checkbox' id="c9" />,
    //  inputtext:<Input type='number' id='a1' bsSize='sm' style={{width:'80px'}}/>
    //},
    //{
    //id:4,
    //Design_Name:'Blend', 
    //checkbox: <CustomInput className="access_check text-center" inline type='checkbox' id="c10" />,
    //ord_a:  <Input type='number' id='a1' bsSize='sm' style={{width:'80px'}}/>,
    //label_check:<CustomInput className="access_check text-center" inline type='checkbox' id="c11" />,
    //ord_b:<Input type='number' id='a1' bsSize='sm' style={{width:'80px'}}/>,
    //advance_check:<CustomInput className="access_check text-center" inline type='checkbox' id="c12" />,
    //inputtext:<Input type='number' id='a1' bsSize='sm' style={{width:'80px'}}/>
    //},
    //{
    //  id:5,
    //  Design_Name:'Look', 
    //  checkbox: <CustomInput className="access_check text-center" inline type='checkbox' id="c13" />,
    //  ord_a:  <Input type='number' id='a1' bsSize='sm' style={{width:'80px'}}/>,
    //  label_check:<CustomInput className="access_check text-center" inline type='checkbox' id="c14" />,
    //  ord_b:<Input type='number' id='a1' bsSize='sm' style={{width:'80px'}}/>,
    //  advance_check:<CustomInput className="access_check text-center" inline type='checkbox' id="c15" />,
    //  inputtext:<Input type='number' id='a1' bsSize='sm' style={{width:'80px'}}/>
    //},
    //{
    //id:6,
    //Design_Name:'Season', 
    //checkbox: <CustomInput className="access_check text-center" inline type='checkbox' id="c16" />,
    //ord_a:  <Input type='number' id='a1' bsSize='sm' style={{width:'80px'}}/>,
    //label_check:<CustomInput className="access_check text-center" inline type='checkbox' id="c17" />,
    //ord_b:<Input type='number' id='a1' bsSize='sm' style={{width:'80px'}}/>,
    //advance_check:<CustomInput className="access_check text-center" inline type='checkbox' id="c18" />,
    //inputtext:<Input type='number' id='a1' bsSize='sm' style={{width:'80px'}}/>
    //},
    //{
    //  id:7,
    //  Design_Name:'Category', 
    //  checkbox: <CustomInput className="access_check text-center" inline type='checkbox' id="c19" />,
    //  ord_a:  <Input type='number' id='a1' bsSize='sm' style={{width:'80px'}}/>,
    //  label_check:<CustomInput className="access_check text-center" inline type='checkbox' id="c20" />,
    //  ord_b:<Input type='number' id='a1' bsSize='sm' style={{width:'80px'}}/>,
    //  advance_check:<CustomInput className="access_check text-center" inline type='checkbox' id="c21" />,
    //  inputtext:<Input type='number' id='a1' bsSize='sm' style={{width:'80px'}}/>
    //},
    //{
    //id:8,
    //Design_Name:'Price', 
    //checkbox: <CustomInput className="access_check text-center" inline type='checkbox' id="c22" />,
    //ord_a:  <Input type='number' id='a1' bsSize='sm' style={{width:'80px'}}/>,
    //label_check:<CustomInput className="access_check text-center" inline type='checkbox' id="c23" />,
    //ord_b:<Input type='number' id='a1' bsSize='sm' style={{width:'80px'}}/>,
    //advance_check:<CustomInput className="access_check text-center" inline type='checkbox' id="c24" />,
    //inputtext:<Input type='number' id='a1' bsSize='sm' style={{width:'80px'}}/>
    //},
    //{
    //  id:9,
    //  Design_Name:'Stock Qty', 
    //  checkbox: <CustomInput className="access_check text-center" inline type='checkbox' id="c25" />,
    //  ord_a:  <Input type='number' id='a1' bsSize='sm' style={{width:'80px'}}/>,
    //  label_check:<CustomInput className="access_check text-center" inline type='checkbox' id="c26" />,
    //  ord_b:<Input type='number' id='a1' bsSize='sm' style={{width:'80px'}}/>,
    //  advance_check:<CustomInput className="access_check text-center" inline type='checkbox' id="c27" />,
    //  inputtext:<Input type='number' id='a1' bsSize='sm' style={{width:'80px'}}/>
    //}
]

// config data
export const roleData = [
    {
        id: 1,
        name: "Home Furnishing",
        children: [
            { id: 5, name: "Living Room", children: [] },
            {
                id: 6,
                name: "Kitchen",
                children: [
                    { id: 7, name: "Abc", children: [] },
                    { id: 8, name: "Pqr", children: [] }
                ]
            }
        ]
    },
    {
        id: 2,
        name: "Apparel",
        children: [
            { id: 9, name: "Suit", children: [] },
            {
                id: 10,
                name: "Shirt",
                children: [
                    { id: 10, name: "Creative Shirting", children: [] },
                    { id: 11, name: "Category", children: [] }
                ]
            }
        ]
    }
]

const MyList = () => <AppCollapse roleData={roleData} type='margin' accordion />

export default MyList