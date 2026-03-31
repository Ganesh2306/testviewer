using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.ThreeD.Query
{
    
    public class ThreeDGroup
    {
        public string td_group_name { get; set; }
        public string td_group_display_name { get; set; }
        public string td_group_colour { get; set; }
        public string td_group_product_name { get; set; }
    }
    public class ThreeDImage
    {
        public string ImageUrl { get; set; }
        public string td_productname { get; set; }
        public long td_threed_image_id { get; set; }
        public long td_threed_image_configuration_id { get; set; }
        public List<ThreeDGroup> ThreeDGroups { get; set; }
        public int td_group_order_no { get; set; }
    }

    public class ThreeDImgConfig
    {
        public List<ThreeDImage> ThreeDImages { get; set; }
    }
}
