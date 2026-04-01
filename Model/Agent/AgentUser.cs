using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Agent
{
    public class AgentUser
    {
        public int srNo { get; set; }
        public string first_name { get; set; }
        public string agt_name { get; set; }
        public string login_id { get; set; }
        public string mobile { get; set; }
        public string email { get; set; }
        public string agt_code { get; set; }
        public long agent_id { get; set; }
        public long user_id { get; set; }
        public bool is_deleted { get; set; }
        public bool is_blocked { get; set; }
        public bool is_administrator { get; set; }
        public string rolename { get; set; }
    }
    public class RootAgentUser
    {
        public List<AgentUser> agentUserListDto { get; set; }
        public int TotalRecords { get; set; }
    }
}
