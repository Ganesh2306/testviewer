using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Agent
{
    public class AgentListDto
    {
        public int srNo { get; set; }

        public string agt_code { get; set; }

        public string agt_name { get; set; }

        public string login_id { get; set; }

        public string agt_email { get; set; }

        public string agt_phone { get; set; }

        public DateTime Created_On { get; set; }

        public DateTime Start_Date { get; set; }

        public DateTime End_Date { get; set; }

        public long User_id { get; set; }

        public long agent_id { get; set; }

        public bool agt_isdeleted { get; set; }

        public bool agt_isblocked { get; set; }
        public bool is_blocked { get; set; }
        
        public string rolename { get; set; }

    }

    public class Root1
    {
        public List<AgentListDto> agentListDto { get; set; }
        public int TotalRecords { get; set; }
    }
}
