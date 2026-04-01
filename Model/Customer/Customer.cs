using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Customer
{

    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse); 
    public class Usersrequest
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

    public class Customer

    {
        public string SearchVale { get; set; }
        public string searchString { get; set; }
        public int srNo { get; set; }
    public string rolename { get; set; }
        public string login_id { get; set; }
        public int Start { get; set; }
        public int End { get; set; }
        public long user_id { get; set; }
        public int state { get; set; }
        public long customer_Id { get; set; }
        
        public long CustomerId { get; set; }
        public string customer_Name { get; set; }
        public string customer_Code { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public string mobile { get; set; }
        public string address { get; set; }
        public string city { get; set; }
        public string customerState { get; set; }
        public string country { get; set; }
        public int pincode { get; set; }
        public string website { get; set; }
        public DateTime created_On { get; set; }
        public bool isDeleted { get; set; }
        public bool is_blocked { get; set; }
        public DateTime start_Date { get; set; }
        public DateTime end_Date { get; set; }
        public Usersrequest usersrequest { get; set; }
        public long cust_Role_Id { get; set; }
        public long role_Id { get; set; }
        
    }

    public class CustRoot
    {
        public int TotalRecords { get; set; }
        public List<Customer> customerListDto { get; set; }
    }
}
