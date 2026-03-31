using System.Collections.Generic;

namespace ARCHIVE_DASHBOARD.Model.Organization
{
    public class Organization
    {
        // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse); 

        public int srNo { get; set; }
        public long organisation_id { get; set; }
        public string  Organization_Name { get; set; }
        public string  SQL_Database { get; set; }
        public string  Path { get; set; }
        public string  Admin_User_ID { get; set; }
        public string  Address { get; set; }
        public string  City { get; set; }
        public string  State { get; set; }
        public string  Country { get; set; }
        public string Email { get; set; }
        public string  Website { get; set; }
        public int Supplier_Limit { get; set; }
        public int  Agent_Limit { get; set; }
        public int Customer_Limit { get; set; }
        public int  Total_User_Limit { get; set; }
        public int  Design_Limit { get; set; }
     
    }



    public class RootOrg
    {
        public int TotalRecords { get; set; }
        public List<Organization> allOrgList { get; set; }
    }
    public class EditOrg
    {
  
        public long  id { get; set; }
    }


}

