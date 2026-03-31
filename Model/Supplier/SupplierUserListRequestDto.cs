using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Supplier
{
    public class SupplierUserListRequestDto
    {
        public string SearchVale { get; set; }
        public string searchString { get; set; }
        public long SupplierId { get; set; }
        public int Start { get; set; }
        public int End { get; set; }
    }

    public class SuppliercustomerListRequestDto
    {
        public long OrganisationId { get; set; }
        public string SearchString { get; set; }
        public long SupplierId { get; set; }
        public int Start { get; set; }
        public int End { get; set; }
    }

    public class GetSuppliercustomerListRequestDto
    {
        public long OrganisationId { get; set; }
        public long SupplierId { get; set; }
        public int Start { get; set; }
        public int End { get; set; }
    }


}
