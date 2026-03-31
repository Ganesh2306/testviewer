import { CustomInput, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Col, Label } from 'reactstrap'
import { MoreVertical, Edit, FileText, Archive, Trash, Shield } from 'react-feather'

// DesignTypedata

export const ColumnRoleDesign = [
  {
    name: 'ID',
    selector: 'id',
    Width: '50px'
  },
  {
    name: 'Feature Name',
    selector: 'Design_Name',
    Width: '20%'
  },
  {
    name: 'Save Mandatory',
    selector: 'checkbox',
    Width: '20%'
  },
  {
    name: 'Order NO.',
    selector: 'ord_a',
    Width: '20%'
  },
  {
    name: 'Label',
    selector: 'label_check',
    Width: '20%'
  },
  {
    name: 'Order No.',
    selector: 'ord_b',
    Width: '20%'
  },
  {
    name: 'Advance Search',
    selector: 'advance_check',
    Width: '20%'
  },
  {
    name: 'Order No.',
    selector: 'inputtext',
    Width: '20%'
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
    ai_check: <CustomInput className="access_check text-center" inline type='checkbox' id="c4" />,
    ord_c: <Input type='number' id='a1' bsSize='sm' style={{ width: '80px' }} />
  },  
  {
    id: 2,
    Design_Name: 'Color',
    checkbox: <CustomInput className="access_check text-center" inline type='checkbox' id="c5" />,
    ord_a: <Input type='number' id='ca2' bsSize='sm' style={{ width: '80px' }} />,
    label_check: <CustomInput className="access_check text-center" inline type='checkbox' id="c6" />,
    ord_b: <Input type='number' id='4' bsSize='sm' style={{ width: '80px' }} />,
    advance_check: <CustomInput className="access_check text-center" inline type='checkbox' id="c7" />,
    inputtext: <Input type='number' id='a1' bsSize='sm' style={{ width: '80px' }} />,
    ai_check: <CustomInput className="access_check text-center" inline type='checkbox' id="c8" />,
    ord_c: <Input type='number' id='a1' bsSize='sm' style={{ width: '80px' }} />
  },
  {
    id: 3,
    Design_Name: 'Weave',
    checkbox: <CustomInput className="access_check text-center" inline type='checkbox' id="c9" />,
    ord_a: <Input type='number' id='a1' bsSize='sm' style={{ width: '80px' }} />,
    label_check: <CustomInput className="access_check text-center" inline type='checkbox' id="c10" />,
    ord_b: <Input type='number' id='a1' bsSize='sm' style={{ width: '80px' }} />,
    advance_check: <CustomInput className="access_check text-center" inline type='checkbox' id="c11" />,
    inputtext: <Input type='number' id='a1' bsSize='sm' style={{ width: '80px' }} />,
    ai_check: <CustomInput className="access_check text-center" inline type='checkbox' id="c12" />,
    ord_c: <Input type='number' id='a1' bsSize='sm' style={{ width: '80px' }} />
  },
  {
    id: 4,
    Design_Name: 'Blend',
    checkbox: <CustomInput className="access_check text-center" inline type='checkbox' id="c13" />,
    ord_a: <Input type='number' id='a1' bsSize='sm' style={{ width: '80px' }} />,
    label_check: <CustomInput className="access_check text-center" inline type='checkbox' id="c14" />,
    ord_b: <Input type='number' id='a1' bsSize='sm' style={{ width: '80px' }} />,
    advance_check: <CustomInput className="access_check text-center" inline type='checkbox' id="c15" />,
    inputtext: <Input type='number' id='a1' bsSize='sm' style={{ width: '80px' }} />,
    ai_check: <CustomInput className="access_check text-center" inline type='checkbox' id="c16" />,
    ord_c: <Input type='number' id='a1' bsSize='sm' style={{ width: '80px' }} />
  },
  {
    id: 5,
    Design_Name: 'Look',
    checkbox: <CustomInput className="access_check text-center" inline type='checkbox' id="c17" />,
    ord_a: <Input type='number' id='a1' bsSize='sm' style={{ width: '80px' }} />,
    label_check: <CustomInput className="access_check text-center" inline type='checkbox' id="c18" />,
    ord_b: <Input type='number' id='a1' bsSize='sm' style={{ width: '80px' }} />,
    advance_check: <CustomInput className="access_check text-center" inline type='checkbox' id="c19" />,
    inputtext: <Input type='number' id='a1' bsSize='sm' style={{ width: '80px' }} />,
    ai_check: <CustomInput className="access_check text-center" inline type='checkbox' id="c20" />,
    ord_c: <Input type='number' id='a1' bsSize='sm' style={{ width: '80px' }} />
  },
  {
    id: 6,
    Design_Name: 'Season',
    checkbox: <CustomInput className="access_check text-center" inline type='checkbox' id="c21" />,
    ord_a: <Input type='number' id='a1' bsSize='sm' style={{ width: '80px' }} />,
    label_check: <CustomInput className="access_check text-center" inline type='checkbox' id="c22" />,
    ord_b: <Input type='number' id='a1' bsSize='sm' style={{ width: '80px' }} />,
    advance_check: <CustomInput className="access_check text-center" inline type='checkbox' id="c23" />,
    inputtext: <Input type='number' id='a1' bsSize='sm' style={{ width: '80px' }} />,
    ai_check: <CustomInput className="access_check text-center" inline type='checkbox' id="c24" />,
    ord_c: <Input type='number' id='a1' bsSize='sm' style={{ width: '80px' }} />
  },
  {
    id: 7,
    Design_Name: 'Category',
    checkbox: <CustomInput className="access_check text-center" inline type='checkbox' id="c25" />,
    ord_a: <Input type='number' id='a1' bsSize='sm' style={{ width: '80px' }} />,
    label_check: <CustomInput className="access_check text-center" inline type='checkbox' id="c26" />,
    ord_b: <Input type='number' id='a1' bsSize='sm' style={{ width: '80px' }} />,
    advance_check: <CustomInput className="access_check text-center" inline type='checkbox' id="c27" />,
    inputtext: <Input type='number' id='a1' bsSize='sm' style={{ width: '80px' }} />,
    ai_check: <CustomInput className="access_check text-center" inline type='checkbox' id="c28" />,
    ord_c: <Input type='number' id='a1' bsSize='sm' style={{ width: '80px' }} />
  },
  {
    id: 8,
    Design_Name: 'Price',
    checkbox: <CustomInput className="access_check text-center" inline type='checkbox' id="c29" />,
    ord_a: <Input type='number' id='a1' bsSize='sm' style={{ width: '80px' }} />,
    label_check: <CustomInput className="access_check text-center" inline type='checkbox' id="c30" />,
    ord_b: <Input type='number' id='a1' bsSize='sm' style={{ width: '80px' }} />,
    advance_check: <CustomInput className="access_check text-center" inline type='checkbox' id="c31" />,
    inputtext: <Input type='number' id='a1' bsSize='sm' style={{ width: '80px' }} />,
    ai_check: <CustomInput className="access_check text-center" inline type='checkbox' id="c32" />,
    ord_c: <Input type='number' id='a1' bsSize='sm' style={{ width: '80px' }} />
  },
  {
    id: 9,
    Design_Name: 'Stock Qty',
    checkbox: <CustomInput className="access_check text-center" inline type='checkbox' id="c33" />,
    ord_a: <Input type='number' id='a1' bsSize='sm' style={{ width: '80px' }} />,
    label_check: <CustomInput className="access_check text-center" inline type='checkbox' id="c34" />,
    ord_b: <Input type='number' id='a1' bsSize='sm' style={{ width: '80px' }} />,
    advance_check: <CustomInput className="access_check text-center" inline type='checkbox' id="c35" />,
    inputtext: <Input type='number' id='a1' bsSize='sm' style={{ width: '80px' }} />,
    ai_check: <CustomInput className="access_check text-center" inline type='checkbox' id="c36" />,
    ord_c: <Input type='number' id='a1' bsSize='sm' style={{ width: '80px' }} />
  }
]

// config data
export const roleData = [

  {
    id: 1,
    name: "Collections",

    id: 6,
    name: "Collections",
    children: [
      { id: 7, name: "Collection 1", children: [] },
      { id: 8, name: "Collection 2", children: [] }
    ]

  },
  {
    id: 2,
    name: "Seasonal Collection",
    children: [

      {
        id: 10,
        name: "SS-22",
        children: [
          { id: 10, name: "Classic Royal", children: [] },
          { id: 11, name: "Instration", children: [] },
          { id: 14, name: "Invigorate", children: [] },
          { id: 15, name: "The Outdoor Era", children: [] },
          { id: 16, name: "Grounding Blue", children: [] }
        ]
      }
    ]
  }
  //   { 

  //       id: 12,
  //       name: "AW-22",
  //       children: [
  //         // { id: 10, name: "Creative Shirting", children: [] },
  //         { id: 13, name: "Classic Royal", children: [] }

  //   ] 
  // }

]

const MyList = () => <AppCollapse roleData={roleData} type='margin' accordion />

export default MyList