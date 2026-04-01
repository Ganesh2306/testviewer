using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Management
{
    public class SaveFeatureRequestDto
    {
        public int state { get; set; }
        public long design_Feature_Id { get; set; }
        public long organisation_Id { get; set; }
        public string design_Feature_name { get; set; }
        public string design_Feature_description { get; set; }
        public DateTime created_On { get; set; }
        public long created_By { get; set; }
        public int filter_Control { get; set; }
        public int range_Start { get; set; }
        public int range_Difference { get; set; }
        public int range_End { get; set; }
    }
    public class Root
    {
        public List<SaveFeatureRequestDto> saveFeatureRequestDto { get; set; }
    }
}
