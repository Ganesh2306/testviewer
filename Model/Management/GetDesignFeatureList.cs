using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Management
{
    public class GetDesignFeatureList
    {
        public long design_configuration_id { get; set; }
        public long design_Feature_Id { get; set; }
        public long organisation_Id { get; set; }
        public string design_Feature_Name { get; set; }
        public string design_Feature_Description { get; set; }
        public DateTime created_On { get; set; }
        public object created_By { get; set; }
        public int filter_Control { get; set; }
        public int range_Start { get; set; }
        public int range_Difference { get; set; }
        public int range_End { get; set; }
        public object design_Configurations { get; set; }
        public int state { get; set; }
        public bool selected { get; set; }
        public int srNo { get; set; }
    }

    public class RootDesignFeaturesList
    {
        public List<GetDesignFeatureList> getDesignFeatureList { get; set; }
        public string totalCount { get; set; }
        
    }
}
