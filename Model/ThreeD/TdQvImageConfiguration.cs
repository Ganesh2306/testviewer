using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.ThreeD
{
    public class TdQvImageConfiguration
    {
        public int state { get; set; }
        public long td_Qv_Image_Configurations_Id { get; set; }
        public long td_Threed_Image_Id { get; set; }
        public long td_Organisation_Id { get; set; }
        public int td_Order_No { get; set; }
        public int Td_Credit { get; set; }
        public bool Is_Credit_Minus { get; set; }
    }

    public class RootTdQvImageConfiguration
    {
        public List<TdQvImageConfiguration> td_Qv_Image_Configurations { get; set; }
    }

    public class OrganisationRequestListDto
    {
        public int Start { get; set; }
        public int End { get; set; }
    }
}
