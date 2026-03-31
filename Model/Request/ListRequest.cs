using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Request
{
    public class ListRequest
    {
        public long orgid { get; set; }
        public long organnisationId { get; set; }
        public long customerId { get; set; }
        public long agenId { get; set; }

        public long supplierId { get; set; }
        public int start { get; set; }
        public int end { get; set; }
    }
}
