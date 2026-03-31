using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.ThreeD
{
    public class SaveProductConfig
    {
        public int state { get; set; }
        public long q3d_organisation_id { get; set; }
        public string q3d_product_name { get; set; }
        public int q3d_order_no { get; set; }
    }

    public class SaveQ3dProductConfiguration
    {

        public List<SaveProductConfig> saveProductConfig { get; set; }
    }

    public class SaveQ3dConfig { 

    public List<SaveProductConfig> saveProductConfigs { get; set; }
}

    public class GetQ3DProducts
    {
        public long organisationId { get; set; }
    }

    public class OrderProducts
    {
       public List<long> ids { get; set; }
    }

}