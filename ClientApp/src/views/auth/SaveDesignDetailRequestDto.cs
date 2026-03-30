using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TextronicsProductManagement_WebApi.Request
{
    public class SaveDesignDetailRequestDto
    {
        public long dd_details_id { get; set; }//f
        public long dd_dm_id { get; set; }
        public long dd_feature_id { get; set; }
        public string dd_feature_name { get; set; }
        public long dd_feature_type_id { get; set; }

        public string dd_feature_type_name { get; set; }
        public long dd_design_configuration_id { get; set; }
    }
}
