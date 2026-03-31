using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.ThreeD
{
    public class ThreeDImage
    {
        public int state { get; set; }
        public int td_Threed_Image_Id { get; set; }
        public string td_Threed_Image_Name { get; set; }
        public string td_Threed_Image_Display_Name { get; set; }
        public string td_Threed_Image_Type { get; set; }
        public string td_Exclusive_Organization { get; set; }
        public int td_Order_No { get; set; }
        public int td_Credit { get; set; }
        public string td_sub_category { get; set; }
        public string td_tryon_type { get; set; }
    }

    public class RootThreeDImage
    {
        public List<ThreeDImage> ThreeDImages { get; set; }
    }
}
