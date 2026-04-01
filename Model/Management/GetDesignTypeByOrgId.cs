using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Management
{
    public class GetDesignTypeByOrgId
    {
        public long design_type_id { get; set; }
        public long design_configuration_id { get; set; }
        public string design_type_name { get; set; }
        public object getDesignGroupsByRoleListDto { get; set; }
    }
    public class RootTypeID
    {
        public List<GetDesignTypeByOrgId> allDesignTypesByRoles { get; set; }
    }
}
