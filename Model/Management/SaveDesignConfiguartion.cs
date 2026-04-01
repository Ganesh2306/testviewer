using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Management
{
    public class SaveDesignConfiguartion
    {
        public int state { get; set; }
        public long design_Configuration_Id { get; set; }
        public long? design_Type_Id { get; set; }
        public long? design_Group_Id { get; set; }
        public long? design_Feature_Id { get; set; }
        public long organisation_id { get; set; }
        public long order_No { get; set; }
    }

}
