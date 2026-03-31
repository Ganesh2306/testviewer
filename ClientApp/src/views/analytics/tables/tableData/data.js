import SelectOption from './Select/SelectOption'

// ** AnalyticLogColumn
export const AnalyticLogColumn = [
    {
      name: 'Sr No.',
      selector: 'id',   
      allowOverflow: true,  
      minWidth: '100px'  
    },
    {
      name: 'Date & Time',
      selector: 'Date',         
      allowOverflow: true,  
      minWidth: '170px'       
    },    
    {
      name: 'Company Name',
      selector: 'company',
      allowOverflow: true,
      minWidth: '160px'       
    },
    {
      name: 'User ID',
      selector: 'user_id', 
      allowOverflow: true,
      minWidth: '120px'      
    },
    {
      name: 'Time Period',
      selector: 'time', 
      allowOverflow: true,
      minWidth: '150px'   
    },
    {
      name: 'Region',
      selector: 'region',  
      allowOverflow: true,
      minWidth: '150px'     
    },
    {
      name: 'Location',
      selector: 'location',
      minWidth: '10%',
      allowOverflow: true,
      minWidth: '150px'     
    },
    {
      name: 'IP',
      selector: 'ip',
      minWidth: '10%',
      allowOverflow: true,
      minWidth: '130px'     
    },
    {
        name: 'View Records',
        selector: 'viewrecord',    
        allowOverflow: true,
        minWidth: '150px'     
      },
      {
        name: 'Favourite Records',
        selector: 'favrecord',
        allowOverflow: true,
        minWidth: '200px'     
      },
      {
        name: 'Cart Records',
        selector: 'cartrecord',   
        allowOverflow: true,
        minWidth: '150px'     
      },
      {
        name: 'Order Records',
        selector: 'orderrecord', 
        minWidth: '10%',  
        allowOverflow: true,
        minWidth: '180px'     
      },
      {
        name: 'Order Qty',
        selector: 'orderquantity',   
        allowOverflow: true,
        minWidth: '140px'     
      }
  ]

export const LogData = [
    {
        id:'',    
        Date:'', 
        company:<SelectOption/>,
        user_id:<SelectOption/>,
        time:<SelectOption/>,
        region:<SelectOption/>,
        location:<SelectOption/>, 
        ip:'',   
        viewrecord:<SelectOption/>,    
        favrecord:<SelectOption/>,
        cartrecord:<SelectOption/>, 
        orderrecord:<SelectOption/>,
        orderquantity:<SelectOption/>          
    },
    {
        id:1,
        Date:'Dec 14, 2017, 5:17 AM',        
        company:'Raymond',
        user_id:'Ray123',
        time:'8.00 AM',
        region:'Maharashtra',
        location:'Mumbai',
        ip:'17.16.1.59',
        viewrecord:40,
        favrecord:50,
        cartrecord:50, 
        orderrecord:100,
        orderquantity:10084   
    },
    {
        id:2,
        Date:'Dec 14, 2017, 5:17 AM',             
        company:'Morarji',
        user_id:'morarji12',
        time:'9.00 AM',
        region:'Maharashtra',
        location:'Mumbai',
        ip:'17.16.1.42',
        viewrecord:40,
        favrecord:50,
        cartrecord:50, 
        orderrecord:100,
        orderquantity:10084   
    },
    {
        id:3,
        Date:'Dec 14, 2017, 5:17 AM',            
        company:'Oswald',
        user_id:'Oswald-b',
        time:'6.00 PM',
        region:'Maharashtra',
        location:'Mumbai',
        ip:'17.16.1.51',
        viewrecord:40,
        favrecord:50,
        cartrecord:50, 
        orderrecord:100,
        orderquantity:10084   
    }
]

// ** AnalyticPropertyColumn
export const AnalyticPropertyColumn = [
  {
    name: 'Sr No.',
    selector: 'id',   
    allowOverflow: true,  
    minWidth: '50px'  
  },
  {
    name: 'Date & Time',
    selector: 'Date',         
    allowOverflow: true,  
    minWidth: '150px'       
  },    
  {
    name: 'Company Name',
    selector: 'company',
    allowOverflow: true,
    minWidth: '160px'       
  },
  {
    name: 'User ID',
    selector: 'user_id', 
    allowOverflow: true,
    minWidth: '120px'      
  },
  {
    name: 'Region',
    selector: 'region',  
    allowOverflow: true,
    minWidth: '150px'     
  },
  {
    name: 'Action',
    selector: 'actiontake', 
    allowOverflow: true,
    minWidth: '150px'   
  },
 
  {
    name: 'Pattern',
    selector: 'patternselect',
    minWidth: '10%',
    allowOverflow: true,
    minWidth: '150px'     
  },
  {
    name: 'Color',
    selector: 'colorselect',
    minWidth: '10%',
    allowOverflow: true,
    minWidth: '130px'     
  },
  {
      name: 'Design Size',
      selector: 'size',    
      allowOverflow: true,
      minWidth: '150px'     
    },
    {
      name: 'Category',
      selector: 'sel_category',
      allowOverflow: true,
      minWidth: '190px'     
    },
    {
      name: 'Material',
      selector: 'design_material',   
      allowOverflow: true,
      minWidth: '150px'     
    },
    {
      name: 'Width',
      selector: 'designwidth', 
      minWidth: '10%',  
      allowOverflow: true,
      minWidth: '180px'     
    },
    {
      name: 'GSM',
      selector: 'design_gsm',   
      allowOverflow: true,
      minWidth: '140px'     
    },
    {
      name: 'Price',
      selector: 'viewprice',   
      allowOverflow: true,
      minWidth: '140px'     
    },
    {
      name: 'Yarn Count',
      selector: 'count',   
      allowOverflow: true,
      minWidth: '140px'     
    },
    {
      name: 'Weave',
      selector: 'weavetype',   
      allowOverflow: true,
      minWidth: '250px'     
    },
    {
      name: 'Records',
      selector: 'records',   
      allowOverflow: true,
      minWidth: '140px'     
    }

]

export const PropertyData = [
  {
      id:'',    
      Date:'', 
      company:<SelectOption/>,
      user_id:<SelectOption/>,
      region:<SelectOption/>,
      actiontake:<SelectOption/>, 
      patternselect:<SelectOption/>, 
      colorselect:<SelectOption/>,    
      size:<SelectOption/>,
      sel_category:<SelectOption/>, 
      design_material:<SelectOption/>,
      designwidth:<SelectOption/>,
      design_gsm:<SelectOption/>, 
      viewprice:<SelectOption/>,
      count:<SelectOption/>,
      weavetype:<SelectOption/>,
      records:<SelectOption/>                      
  },
  {
      id:1,
      Date:'Dec 14, 2017, 5:17 AM',        
      company:'Textronics',
      user_id:'KapilTds',
      region:'Mumbai',
      actiontake:'All',
      patternselect:'Checks,Stripes,solid',
      colorselect:'Red,Green,Blue',
      size:'17.16.1.59',
      sel_category:'Casual,Business,Formal',
      design_material:'Cotton,Giza,Cotton',
      designwidth:150, 
      design_gsm:122,
      viewprice:400,
      count:'1/40 x 2/80',
      weavetype:'Self Dobby, Plain, Twill, Dobby',
      records:'150'     
  },
  {
    id:2,
    Date:'Dec 14, 2017, 5:17 AM',        
    company:'Textronics',
    user_id:'KapilTds',
    region:'Mumbai',
    actiontake:'All',
    patternselect:'Checks,Stripes,solid',
    colorselect:'Red,Green,Blue',
    size:'17.16.1.59',
    sel_category:'Casual,Business,Formal',
    design_material:'Cotton,Giza,Cotton',
    designwidth:150, 
    design_gsm:122,
    viewprice:400,
    count:'1/40 x 2/80',
    weavetype:'Self Dobby, Plain, Twill, Dobby',
    records:'150'        
}
  
]

// ** StatisticColumn
export const StatisticColumn = [
  {
    name: 'Sr No.',
    selector: 'id',   
    allowOverflow: true,  
    minWidth: '100px'  
  },
  {
    name: 'Design Code',
    selector: 'designcode',         
    allowOverflow: true,  
    minWidth: '170px'       
  },    
  {
    name: 'Created By',
    selector: 'createdperson',
    allowOverflow: true,
    minWidth: '160px'       
  },  
  {
      name: 'View Records',
      selector: 'viewrecord',    
      allowOverflow: true,
      minWidth: '150px'     
    },
    {
      name: 'Favourite Records',
      selector: 'favrecord',
      allowOverflow: true,
      minWidth: '200px'     
    },
    {
      name: 'Cart Records',
      selector: 'cartrecord',   
      allowOverflow: true,
      minWidth: '150px'     
    },
    {
      name: 'Order Records',
      selector: 'orderrecord', 
      minWidth: '10%',  
      allowOverflow: true,
      minWidth: '180px'     
    },
    {
      name: 'Order Qty',
      selector: 'orderquantity',   
      allowOverflow: true,
      minWidth: '140px'     
    }
]

export const StatisticData = [
  {
      id:'',    
      designcode:<SelectOption/>, 
      createdperson:<SelectOption/>,     
      viewrecord:<SelectOption/>,    
      favrecord:<SelectOption/>,
      cartrecord:<SelectOption/>, 
      orderrecord:<SelectOption/>,
      orderquantity:<SelectOption/>          
  },
  {
      id:1,
      designcode:'Des#585413826',        
      createdperson:'designer1',
      viewrecord:40,
      favrecord:50,
      cartrecord:50, 
      orderrecord:100,
      orderquantity:10084   
  },
  {
      id:2,
      designcode:'Des#585413444',             
      createdperson:'designer2',  
      viewrecord:40,
      favrecord:50,
      cartrecord:50, 
      orderrecord:100,
      orderquantity:10084   
  },
  {
      id:3,
      designcode:'Des#5854138111',            
      createdperson:'designer3',      
      viewrecord:40,
      favrecord:50,
      cartrecord:50, 
      orderrecord:100,
      orderquantity:10084   
  }
]