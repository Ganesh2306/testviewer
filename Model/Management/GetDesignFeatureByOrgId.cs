using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Management
{
    public class GetDesignFeatureByOrgId
    {
        public long design_features_id { get; set; }
        public string design_features_name { get; set; }
        public long design_configuration_id { get; set; }
        public long role_design_configuration_id { get; set; }
        public object configure_labledesign_feature { get; set; }
        public object configure_savedesign_feature { get; set; }
        public object configure_filterdesign_feature { get; set; }
    }
    public class RootFeature
    {
        public List<GetDesignFeatureByOrgId> allDesignFeatursByRoles { get; set; }
    }
}
