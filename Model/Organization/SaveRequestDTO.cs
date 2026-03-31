using ARCHIVE_DASHBOARD.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Organization
{
    public class SaveRequestDTO
    {
        public long Registration_Id { get; set; }

        public OrganisationType ROrg_Type { get; set; }
        public DomainObjectState state { get; set; }
        public int ROrg_Supplier_Limit { get; set; }

        public int ROrg_Customer_Limit { get; set; }

        public int ROrg_Agent_Limit { get; set; }

        public int ROrg_User_Limit { get; set; }

        public int ROrg_Design_Limit { get; set; }

        public string RUsr_First_Name { get; set; }

        public string RUsr_Last_Name { get; set; }

        public string RUsr_Mobile { get; set; }

        public string RUsr_Phone { get; set; }

        public string RUsr_Email { get; set; }

        public long ROrg_Organisation_Id { get; set; }

        public string ROrg_Name { get; set; }

        public string ROrg_Website { get; set; }

        public string ROrg_Address { get; set; }

        public string ROrg_Country { get; set; }

        public string ROrg_State { get; set; }

        public string ROrg_City { get; set; }

        public string ROrg_Pincode { get; set; }

        public string ROrg_Phone { get; set; }

        public string ROrg_Email { get; set; }

        public string ROrg_Desciption { get; set; }

        public Boolean Is_Accepted { get; set; }

        public Boolean Is_Deleted { get; set; }

        public DateTime Created_on { get; set; }
    }
}
