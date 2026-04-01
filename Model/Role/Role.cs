using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Role
{
    public class Role
    {
        public int state { get; set; }
        public long role_Id { get; set; }
        public string role_Name { get; set; }
        public string role_Description { get; set; }
        public bool is_Deleted { get; set; }
        public bool is_Blocked { get; set; }
        public int role_Type { get; set; }
        public long created_By { get; set; }
        public DateTime created_On { get; set; }
        public long designTypeId { get; set; }
        public long designGroupeId { get; set; }
        public long designFeatureId { get; set; }
        public int srNo { get; set; }
    }

    public class RolesList
    {
        public Role roles { get; set; }
        public int TotalCount { get; set; }
        public List<Role> allRolesList { get; set; }
    }
}
