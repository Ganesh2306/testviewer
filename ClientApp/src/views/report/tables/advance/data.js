import OrderInvoiceButton from './TableData/OrderInvoiceButton'

// ** Table Server Side Column

export const serverSideColumns = [
    {
      name: 'Sr No.',
      selector: 'id',
      sortable: true,
      minWidth: '125px'
    },
    {
      name: 'Order ID',
      selector: 'Order_Id',
      sortable: true,
      minWidth: '150px',
      cell: row => {
        return (  
          <>   
         <OrderInvoiceButton/>  
         </>        
        )
      }
    },
    {
      name: 'Cust. Code',
      selector: 'Customer_Code',
      sortable: true,
      minWidth: '150px'
    },
    {
      name: 'Cust. Name',
      selector: 'Customer_Name',
      sortable: true,
      minWidth: '180px'
    },
    {
      name: 'Org. Name',
      selector: 'Organization_Name',
      sortable: true,
      minWidth: '180px'
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
      minWidth: '180px'
    },
    {
      name: 'Contact',
      selector: 'contact',
      sortable: true,
      minWidth: '180px'
    },
    {
      name: 'Date',
      selector: 'date',
      sortable: true,
      minWidth: '180px'
    },
    {
      name: 'Comments',
      selector: 'comments',
      sortable: true,
      minWidth: '180px'
    },
    {
      name: 'Order Len.',
      selector: 'Order_Length',
      sortable: true,
      minWidth: '150px'
    }    
  ]

export const OrderData = [
    {
        id:1,
        Order_Id:'view',
        Customer_Code:'ab00',
        Customer_Name:'Amit',
        Organization_Name:'Raymond',
        email:'test@gmail.com',
        contact:'415565545',
        date:'10-4-2020',
        comments:'sdfsdfl',
        Order_Length:30
    },
    {
        id:2,
        Order_Id:'5485',
        Customer_Code:'ab00',
        Customer_Name:'Amit',
        Organization_Name:'Raymond',
        email:'test@gmail.com',
        contact:'415565545',
        date:'10-4-2020',
        comments:'sdfsdfl',
        Order_Length:30
    },
    {
        id:3,
        Order_Id:'5485',
        Customer_Code:'ab00',
        Customer_Name:'Amit',
        Organization_Name:'Raymond',
        email:'test@gmail.com',
        contact:'415565545',
        date:'10-4-2020',
        comments:'sdfsdfl',
        Order_Length:30
    },
    {
        id:4,
        Order_Id:'5485',
        Customer_Code:'ab00',
        Customer_Name:'Amit',
        Organization_Name:'Raymond',
        email:'test@gmail.com',
        contact:'415565545',
        date:'10-4-2020',
        comments:'sdfsdfl',
        Order_Length:30
    }
]

export const CartData = [
  {
      id:1,
      Order_Id:'view',
      Customer_Code:'ab00',
      Customer_Name:'Amit',
      Organization_Name:'Raymond',
      email:'test@gmail.com',
      contact:'415565545',
      date:'10-4-2020',
      comments:'sdfsdfl',
      Order_Length:30
  },
  {
      id:2,
      Order_Id:'5485',
      Customer_Code:'ab00',
      Customer_Name:'Amit',
      Organization_Name:'Raymond',
      email:'test@gmail.com',
      contact:'415565545',
      date:'10-4-2020',
      comments:'sdfsdfl',
      Order_Length:30
  },
  {
      id:3,
      Order_Id:'5485',
      Customer_Code:'ab00',
      Customer_Name:'Amit',
      Organization_Name:'Raymond',
      email:'test@gmail.com',
      contact:'415565545',
      date:'10-4-2020',
      comments:'sdfsdfl',
      Order_Length:30
  },
  {
      id:4,
      Order_Id:'5485',
      Customer_Code:'ab00',
      Customer_Name:'Amit',
      Organization_Name:'Raymond',
      email:'test@gmail.com',
      contact:'415565545',
      date:'10-4-2020',
      comments:'sdfsdfl',
      Order_Length:30
  }
]


export const serverSideColumnsCart = [
  {
    name: 'Sr No.',
    selector: 'id',
    sortable: true,
    minWidth: '125px'
  },
  {
    name: 'Order ID',
    selector: 'Order_Id',
    sortable: true,
    minWidth: '150px',
    cell: row => {
      return (  
        <>   
       <OrderInvoiceButton/>  
       </>        
      )
    }
  },
  {
    name: 'Cust. Code',
    selector: 'Customer_Code',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'Cust. Name',
    selector: 'Customer_Name',
    sortable: true,
    minWidth: '180px'
  },
  {
    name: 'Org. Name',
    selector: 'Organization_Name',
    sortable: true,
    minWidth: '180px'
  },
  {
    name: 'Email',
    selector: 'email',
    sortable: true,
    minWidth: '180px'
  },
  {
    name: 'Contact',
    selector: 'contact',
    sortable: true,
    minWidth: '180px'
  },
  {
    name: 'Date',
    selector: 'date',
    sortable: true,
    minWidth: '180px'
  },
  {
    name: 'Comments',
    selector: 'comments',
    sortable: true,
    minWidth: '180px'
  },
  {
    name: 'Order Len.',
    selector: 'Order_Length',
    sortable: true,
    minWidth: '150px'
  }    
]

export const FavouriteData = [
  {
      id:1,
      Order_Id:'view',
      Customer_Code:'ab00',
      Customer_Name:'Amit',
      Organization_Name:'Raymond',
      email:'test@gmail.com',
      contact:'415565545',
      date:'10-4-2020',
      comments:'sdfsdfl',
      Order_Length:30
  },
  {
      id:2,
      Order_Id:'5485',
      Customer_Code:'ab00',
      Customer_Name:'Amit',
      Organization_Name:'Raymond',
      email:'test@gmail.com',
      contact:'415565545',
      date:'10-4-2020',
      comments:'sdfsdfl',
      Order_Length:30
  },
  {
      id:3,
      Order_Id:'5485',
      Customer_Code:'ab00',
      Customer_Name:'Amit',
      Organization_Name:'Raymond',
      email:'test@gmail.com',
      contact:'415565545',
      date:'10-4-2020',
      comments:'sdfsdfl',
      Order_Length:30
  },
  {
      id:4,
      Order_Id:'5485',
      Customer_Code:'ab00',
      Customer_Name:'Amit',
      Organization_Name:'Raymond',
      email:'test@gmail.com',
      contact:'415565545',
      date:'10-4-2020',
      comments:'sdfsdfl',
      Order_Length:30
  }
]

export const serverSideColumnsFavourite = [
  {
    name: 'Sr No.',
    selector: 'id',
    sortable: true,
    minWidth: '125px'
  },
  {
    name: 'Order ID',
    selector: 'Order_Id',
    sortable: true,
    minWidth: '150px',
    cell: row => {
      return (  
        <>   
       <OrderInvoiceButton/>  
       </>        
      )
    }
  },
  {
    name: 'Cust. Code',
    selector: 'Customer_Code',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'Cust. Name',
    selector: 'Customer_Name',
    sortable: true,
    minWidth: '180px'
  },
  {
    name: 'Org. Name',
    selector: 'Organization_Name',
    sortable: true,
    minWidth: '180px'
  },
  {
    name: 'Email',
    selector: 'email',
    sortable: true,
    minWidth: '180px'
  },
  {
    name: 'Contact',
    selector: 'contact',
    sortable: true,
    minWidth: '180px'
  },
  {
    name: 'Date',
    selector: 'date',
    sortable: true,
    minWidth: '180px'
  },
  {
    name: 'Comments',
    selector: 'comments',
    sortable: true,
    minWidth: '180px'
  },
  {
    name: 'Order Len.',
    selector: 'Order_Length',
    sortable: true,
    minWidth: '150px'
  }    
]
