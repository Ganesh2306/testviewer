using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.ThreeD
{
    public class TdShowroomConfiguration
    {
        public int state { get; set; }
        public long td_Showroom_Configuration_Id { get; set; }
        public long td_Three_DImage_Id { get; set; }
        public long td_Organisation_Id { get; set; }
        public int td_Order_No { get; set; }
        public int Td_Credit { get; set; }
        public bool Is_Credit_Minus { get; set; }
    }

    public class RootTdShowroomConfiguration
    {
        public List<TdShowroomConfiguration> td_Showroom_Configurations { get; set; }
    }
}
