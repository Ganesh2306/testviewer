using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Management
{
    public class Paging
    {
        public long OrgannisationId { get; set; }
        public string searchString { get; set; }
        public int Start { get; set; }
        public int End { get; set; }
    }
}
