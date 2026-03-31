using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Management
{
    public class GetDesignGroupByOrgId
    {
        public long design_groups_id { get; set; }
        public long design_configuration_id { get; set; }
        public string design_groups_name { get; set; }
        public object getDesignFeaturesByRoleListDto { get; set; }

    }

    public class Rootgroup
    {
        public List<GetDesignGroupByOrgId> allDesignGroupsByRoles { get; set; }
    }

}
