using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Agent
{
    public class AgentListRequestDto
    {
        
        public long OrgannisationId { get; set; }
        public int Start { get; set; }
        public int End { get; set; }

    }
}
