using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Role
{
    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse); 
    public class SaveRoleDesignConfiguration
    {
        public int state { get; set; }
        public long role_Design_Configuration_Id { get; set; }
        public long role_Id { get; set; }
        public long design_Configuration_id { get; set; }
        public bool is_Read_Only { get; set; }
        public int order_No { get; set; }
    }

    public class RoleDesignConfiguration
    {
        public List<SaveRoleDesignConfiguration> SaveRoleDesignConfigurations { get; set; }
    }
   
}
