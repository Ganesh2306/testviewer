using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Role
{
    public class RoleAssignment
    {
        public int state { get; set; }
        public long role_Assignment_Id { get; set; }
        public long organisation_Id { get; set; }
        public long user_Id { get; set; }
        public long role_Id { get; set; }
        public bool is_Role_Admin { get; set; }
    }

    public class RoleAssignments
    {
        public int state { get; set; }
        public long role_Assignment_Id { get; set; }
        public long organisation_Id { get; set; }
        public long user_Id { get; set; }
        public long role_Id { get; set; }
        public bool is_Role_Admin { get; set; }
    }
    public class RootRoleAssignment
    {
        public RoleAssignments role_Assignments { get; set; }
    }
}
