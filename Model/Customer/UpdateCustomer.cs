using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.updateCustomer.Customer
{

    public class Usersrequest
    {
        public int state { get; set; }
        public int org_type { get; set; }
        public string user_id { get; set; }
        public string first_name { get; set; }
        public string email { get; set; }
        public string last_name { get; set; }
        public string mobile { get; set; }
        public string login_id { get; set; }
        public string password_hash { get; set; }
        public bool is_administrator { get; set; }
        public string org_type_id { get; set; }
    }

    public class UpdateCustomer
    {
        public int state { get; set; }
        public string customer_Id { get; set; }
        public string customer_Name { get; set; }
        public string customer_Code { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public string mobile { get; set; }
        public string address { get; set; }
        public string city { get; set; }
        public string customerState { get; set; }
        public string country { get; set; }
        public string pincode { get; set; }
        public string website { get; set; }
        public bool isBlocked { get; set; }
        public DateTime start_Date { get; set; }
        public DateTime end_Date { get; set; }
        public Usersrequest usersrequest { get; set; }
    }
    
}
