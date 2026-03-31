using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Management
{
    public class DesignGroupList
    {
        public long design_configuration_id { get; set; }
        public long design_Group_Id { get; set; }
        public long organisation_Id { get; set; }
        public string design_Group_Name { get; set; }
        public string desgin_Group_Description { get; set; }
        public DateTime created_On { get; set; }
        public long created_By { get; set; }
        public long order_On { get; set; }
        public object design_Configurations { get; set; }
        public int state { get; set; }
        public bool selected { get; set; }
    }

    public class GroupRoot
    {
        public List<DesignGroupList> allDesignGroupList { get; set; }
    }
}
