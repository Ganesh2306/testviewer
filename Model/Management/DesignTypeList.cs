using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Management
{
    public class DesignTypeList
    {
        public long design_configuration_id { get; set; }
        public long design_Type_Id { get; set; }
        public long organisation_Id { get; set; }
        public string design_Type_Name { get; set; }
        public string design_Type_Description { get; set; }
        public DateTime created_On { get; set; }
        public long created_By { get; set; }
        public long order_No { get; set; }
        public object design_Configurations { get; set; }
        public int state { get; set; }
        public bool selected { get; set; }
    }
    public class TypeRoot
    {
        public List<DesignTypeList> allDesignTypeList { get; set; }
    }
}
