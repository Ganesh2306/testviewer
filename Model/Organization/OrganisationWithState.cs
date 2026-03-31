using ARCHIVE_DASHBOARD.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Organisation
{
    public class OrganisationWithState 
    {

        public DomainObjectState state { get; set; }
        public long Organisation_Id { get; set; }
        public long Req_Registration_Id { get; set; }
        public string Org_Name { get; set; }

        public int Org_Type { get; set; }

        public string Org_Address { get; set; }

        public string Org_Country { get; set; }

        public string Org_State { get; set; }

        public string Org_City { get; set; }

        public string Org_Pincode { get; set; }

        public string Org_Phone { get; set; }

        public string Org_Email { get; set; }

        public string Org_Website { get; set; }

        public bool? Org_IsDeleted { get; set; }

        public bool? Org_IsBlocked { get; set; }

    }
}
