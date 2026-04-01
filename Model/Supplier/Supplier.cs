using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Supplier
{
    public class UserRequest
    {
        public int state { get; set; }
        public long user_id { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public string mobile { get; set; }
        public string password_hash { get; set; }
        public string department { get; set; }
        public bool is_administrator { get; set; }
        public long org_id { get; set; }
        public int org_type { get; set; }
        public long org_type_id { get; set; }
        public DateTime created_on { get; set; }
        public bool is_deleted { get; set; }
        public bool is_blocked { get; set; }
        public bool is_logged_in { get; set; }
        public string login_id { get; set; }
        public string agt_imagebytebase { get; set; }
        public byte[] org_user_imagebyte { get; set; }

    }

    public class User
    {
        public long user_id { get; set; }
        public string login_id { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string email { get; set; }
        public object phone { get; set; }
        public string mobile { get; set; }
        public string password_hash { get; set; }
        public object department { get; set; }
        public bool is_administrator { get; set; }
        public long org_id { get; set; }
        public int org_type { get; set; }
        public long org_type_id { get; set; }
        public DateTime created_on { get; set; }
        public bool is_deleted { get; set; }
        public bool is_blocked { get; set; }
        public bool is_logged_in { get; set; }
        public object profile_image { get; set; }
        public int state { get; set; }
        public byte[] org_user_imagebyte { get; set; }
        public string agt_imagebytebase { get; set; }

    }

    public class SupplierListDto
    {
        public int srNo { get; set; }
        public string sup_code { get; set; }
        public string rolename { get; set; }
        public string sup_name { get; set; }
        public long user_id { get; set; }
        public string login_id { get; set; }
        public string sup_email { get; set; }
        public string sup_phone { get; set; }
        public DateTime created_On { get; set; }
        public DateTime start_Date { get; set; }
        public DateTime end_Date { get; set; }
        public long supplier_id { get; set; }
        public bool sup_isdeleted { get; set; }
        public bool sup_isblocked { get; set; }
        public int state { get; set; }
        public string sup_address { get; set; }
        public string sup_city { get; set; }
        public string sup_state { get; set; }
        public string sup_website { get; set; }
        public int sup_pincode { get; set; }
        public string sup_country { get; set; }
        public UserRequest userRequest { get; set; }
        public object profile_Image { get; set; }
        public User user { get; set; }
        public bool is_blocked { get; set; }
        public long roleid { get; set; }
        public long Sup_Role_Id { get; set; }
        public string ImageUrl { get; set; }
    }

    public class Supplier
    {
        public SupplierListDto supplier { get; set; }
        public int TotalRecords { get; set; }
        public List<SupplierListDto> supplierListDto { get; set; }
    }


}

