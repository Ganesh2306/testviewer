import {Input} from 'reactstrap'
export const ProductTableColumns = [
    {
        name: 'SR.NO',
        selector: 'id',
        sortable: true,
        maxWidth: '100px'
    },
    {
        name: 'Product Name',
        selector: 'q3d_product_name',
        sortable: true,
        maxWidth: '350px'
    },
    {
        name: 'Order Number',
        selector: 'q3dorder_no',
        sortable: true,
        minWidth: '180px'
    }
]
  
  export const ProductThreeDTypeData = [
    {
        id:1,
        Product_Name:'Shrit',        
        Order_Name: <Input type='number' bsSize='sm' style={{ width: '80px' }} /> 
    },
    {
      id:2,
      Product_Name:'Suit',        
      Order_Name:<Input type='number' bsSize='sm' style={{ width: '80px' }} />    
    },
    {
      id:3,
      Product_Name:'jacket',        
      Order_Name:<Input type='number' bsSize='sm' style={{ width: '80px' }} />    
    },
    {
       id:4,
       Product_Name:'trouser',        
       Order_Name:<Input type='number' bsSize='sm' style={{ width: '80px' }} />    
    },
    {
      id:5,
      Product_Name:'sherwani',        
      Order_Name:<Input type='number' bsSize='sm' style={{ width: '80px' }} />    
    },
    {
      id:6,
      Product_Name:'womendress',        
      Order_Name:<Input type='number' bsSize='sm' style={{ width: '80px' }} />    
    }
  ]

  export const ColumnRoleDesign = [
    {
      name: 'SR.NO',
      selector: 'id',
      sortable: true,
      maxWidth: '100px'

    },
    {
      name: 'Product Name',
      selector: 'q3d_product_name',
      sortable: true,
      maxWidth: '350px'

    },
    {
        name: 'Order NO.',
        selector: 'q3dorder_no',
        minWidth: '180px'
    }
]
