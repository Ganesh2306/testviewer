using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Role
{
    public class AllDesignGroupsByRole
    {
        public long design_groups_id { get; set; }
        public string design_groups_name { get; set; }
        public object getDesignFeaturesByRoleListDto { get; set; }
    }

    public class DesignGroups
    {
        public List<AllDesignGroupsByRole> allDesignGroupsByRoles { get; set; }
    }

   
}
