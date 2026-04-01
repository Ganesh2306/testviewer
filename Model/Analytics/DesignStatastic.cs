using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace ARCHIVE_DASHBOARD.Model.Analytics {
// This will be serialized into a JSON Address object
public class DesignStatastic
{
   // This will be serialized into a JSON Address object
    public string Design_Code{ get; set; }
    public string Created_By{ get; set; }
    public string View_Records{ get; set; }
    public string Favourite_Records { get; set; }   
    public string Cart_Records{ get; set; } 
    public string Order_Records { get; set; }
    public string Order_Quantity { get; set; }
  
}
  

}