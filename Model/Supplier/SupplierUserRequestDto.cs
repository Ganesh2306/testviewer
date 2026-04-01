using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Supplier
{
    public class SupplierUserRequestDto
    {
        public byte[] org_user_imagebyte { get; set; }
        public string agt_imagebytebase { get; set; }

        public long user_id { get; set; }

        public string first_name { get; set; }

        public string last_name { get; set; }

        public string email { get; set; }

        public string phone { get; set; }

        public string mobile { get; set; }

        public string password_hash { get; set; }

        public string department { get; set; }

        public Boolean is_administrator { get; set; }

        public long org_id { get; set; }

        public int org_type { get; set; }

        public long org_type_id { get; set; }


        public DateTime created_on { get; set; }

        public Boolean is_deleted { get; set; }

        public Boolean is_blocked { get; set; }

        public Boolean is_logged_in { get; set; }



        public string login_id { get; set; }
        public int user_type { get; set; }

        public int state { get; set; }//0.add 1.unchange 2.update 3.del
        // [Required]

        // public byte[] profile_image { get; set; }

    }
}
