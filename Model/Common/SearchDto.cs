using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Common
{
    public class SearchDto
    {
        
            public long organnisationId { get; set; }
        public string searchString { get; set; }
        public string SearchVale { get; set; }
        public int Start { get; set; }
        public int End { get; set; }
    }
}
