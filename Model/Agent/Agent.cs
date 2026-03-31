using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Agent
{
    public class Agent
    {
        public long ID { get; set; }
        public string agent_Code { get; set; }
        public string agent_Name { get; set; }
        public string UserId { get; set; }

        public string Email { get; set; }
        public long Contact { get; set; }
        public string Date { get; set; }
        public string Role { get; set; }
        public string Status { get; set; }
        public string From { get; set; }
        public string To { get; set; }
    }
}
