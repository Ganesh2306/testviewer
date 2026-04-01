using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Management
{
    public class GetDesignFeaturesByRoleListDto
    {
        public long design_groups_id { get; set; }
        public long design_type_id { get; set; }
        public long design_features_id { get; set; }
        public string design_features_name { get; set; }
        public long design_configuration_id { get; set; }
        public bool is_Mandatory { get; set; }
        public long role_design_configuration_id { get; set; }
        public object configure_labledesign_feature { get; set; }
        public object configure_savedesign_feature { get; set; }
        public object configure_filterdesign_feature { get; set; }
    }

    public class GetDesignGroupsByRoleListDto
    {
        public long design_groups_id { get; set; }
        public long design_type_id { get; set; }
        public string design_groups_name { get; set; }
        public long design_Configuration_Id { get; set; }
       

        public long role_design_configuration_id { get; set; }
        
        public List<GetDesignFeaturesByRoleListDto> getDesignFeaturesByRoleListDto { get; set; }
    }

    public class AllDesignTypesByRole
    {
        public long design_type_id { get; set; }
        public string design_type_name { get; set; }
        public long design_Configuration_Id { get; set; }
        public long role_design_configuration_id { get; set; }
        public List<GetDesignGroupsByRoleListDto> getDesignGroupsByRoleListDto { get; set; }
    }

    public class ConfigureRoot
    {
        public List<AllDesignTypesByRole> allDesignTypesByRoles { get; set; }
    }

}
