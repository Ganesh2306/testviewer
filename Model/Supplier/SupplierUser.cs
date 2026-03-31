using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Supplier
{
    public class SupplierUser
    {
       
        public string UserId { get; set; }

       
        public string Name { get; set; }

       
        public string Email { get; set; }

       
        public string Phone { get; set; }

        
        public string Mobile { get; set; }

        
        public string CustomerName { get; set; }

        
        public object Key { get; set; }

        
        public bool IsDeleted { get; set; }

        
        public bool IsBlocked { get; set; }

    }
}
