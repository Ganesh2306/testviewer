using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Agent
{
    public class AgentUserListRequestDto
    {
        public string SearchVale { get; set; }
        public string searchString { get; set; }
        public long AgentId { get; set; }
        public int Start { get; set; }
        public int End { get; set; }
    }
}
