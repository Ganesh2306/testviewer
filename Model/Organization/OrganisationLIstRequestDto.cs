using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Organization
{
    public class OrganisationLIstRequestDto
    {
        public string searchString { get; set; }
        
            public long orgid { get; set; }
        public long organnisationId { get; set; }
        public int Start { get; set; }
        public int End { get; set; }
    }
}
