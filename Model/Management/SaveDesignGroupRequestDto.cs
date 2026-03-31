using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Management
{
    public class SaveDesignGroupRequestDto
    {
        public int state { get; set; }
        public long Design_Group_Id { get; set; }

        public long Organisation_Id { get; set; }

        public string Design_Group_Name { get; set; }

        public string Desgin_Group_Description { get; set; }

        public DateTime Created_On { get; set; }

        public long Created_By { get; set; }

        public int Order_On { get; set; }
    }
}
