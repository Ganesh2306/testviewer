using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.ThreeD
{

    public class Value
    {
        public string imageUrl { get; set; }
        public long td_threed_image_id { get; set; }
        public string td_threed_image_name { get; set; }
        public string td_Threed_Image_Display_Name { get; set; }
        public List<TdImageConfiguration> td_Image_Configuration { get; set; }
    }

    public class TdImageConfiguration
    {
        public long td_Threed_Image_Configuration_Id { get; set; }
        public long td_Threed_Image_Id { get; set; }
        public string td_Productname { get; set; }
        public string td_Group_Name { get; set; }
        public string td_Group_Display_Name { get; set; }
        public string td_Group_Colour { get; set; }
        public string td_Group_Product_Name { get; set; }
        public int td_Group_Order_No { get; set; }
        public int td_Credit { get; set; }
        public string td_images_org_configuration { get; set; }
        public int state { get; set; }
    }

    public class RootTdImageConfig
    {
        //public List<Value> value { get; set; }
        public List<Value> value { get; set; }
        public List<object> formatters { get; set; }
        public List<object> contentTypes { get; set; }
        public object declaredType { get; set; }
        public int statusCode { get; set; }

    }

    public class Tdimgid
    {
    public long TdImageId { get; set; }
    }


}
