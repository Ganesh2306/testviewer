using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.CustomerRes
{
    public class User
    {
        public string agt_imagebytebase { get; set; }
        public byte[] org_user_imagebyte { get; set; }
        public long user_id { get; set; }
        public string login_id { get; set; }
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
        public object profile_image { get; set; }
        public int state { get; set; }
    }

    public class Customer
    {
        public long customer_Id { get; set; }
        public string cus_name { get; set; }
        public string cus_code { get; set; }
        public string cus_email { get; set; }
        public string cus_phone { get; set; }
        public string mobile { get; set; }
        public string cus_address { get; set; }
        public string cus_city { get; set; }
        public string cus_state { get; set; }
        public string cus_country { get; set; }
        public int cus_pincode { get; set; }
        public string cus_website { get; set; }
        public DateTime created_On { get; set; }
        public bool cus_isdeleted { get; set; }
        public bool cus_isblocked { get; set; }
        public object cus_profileimage { get; set; }
        public DateTime start_Date { get; set; }
        public DateTime end_Date { get; set; }
        public object organisation_Customer_Configurations { get; set; }
        public User user { get; set; }
        public int state { get; set; }
        public string rolename { get; set; }
    }

    public class CustomerResponse
    {
        public Customer customer { get; set; }
    }
}
