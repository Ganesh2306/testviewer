using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_VIEWER.Models.RequestManagement
{
    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse); 
    public class Request
    {
        public int state { get; set; }
        public int registration_Id { get; set; }
        public int rOrg_Type { get; set; }
        public int rOrg_Supplier_Limit { get; set; }
        public int rOrg_Customer_Limit { get; set; }
        public int rOrg_Agent_Limit { get; set; }
        public int rOrg_User_Limit { get; set; }
        public int rOrg_Design_Limit { get; set; }
        public string rUsr_First_Name { get; set; }
        public string rUsr_Last_Name { get; set; }
        public string rUsr_Mobile { get; set; }
        public string rUsr_Phone { get; set; }
        public string rUsr_Email { get; set; }
        public int rOrg_Organisation_Id { get; set; }
        public string rOrg_Name { get; set; }
        public string rOrg_Website { get; set; }
        public string rOrg_Address { get; set; }
        public string rOrg_Country { get; set; }
        public string rOrg_State { get; set; }
        public string rOrg_City { get; set; }
        public string rOrg_Pincode { get; set; }
        public string rOrg_Phone { get; set; }
        public string rOrg_Email { get; set; }
        public string rOrg_Desciption { get; set; }
        public bool is_Accepted { get; set; }
        public bool is_Deleted { get; set; }
        public DateTime created_on { get; set; }
    }

}
