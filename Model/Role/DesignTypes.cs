using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Role
{
    public class AllDesignTypesByRole
    {
        public long design_type_id { get; set; }
        public string design_type_name { get; set; }
        public object getDesignGroupsByRoleListDto { get; set; }
    }

    public class DesignTypes
    {
        public List<AllDesignTypesByRole> allDesignTypesByRoles { get; set; }
    }
   
}
