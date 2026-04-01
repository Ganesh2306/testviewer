using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//using TextronicsProductManagement_WebApi.Models.Request;


namespace ARCHIVE_DASHBOARD.Model.Organisation
{
    public class SaveOrganisationRequestDto
    {
        public OrganisationWithState Organisation { get; set; }

        public UsersRequest Users { get; set; }
        public SaveOrgDataRequest OrgDanisationData { get; set; }

    }
    public class SaveUserRequestDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string CompanyName { get; set; }
        public string Website { get; set; }
        public string Address { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Pincode { get; set; }
        public string Password { get; set; }
        public long OrganisationId { get; set; }
        public long SupplierId { get; set; }
        public long CustomerId { get; set; }
        public Int32 fabric_upload_limit { get; set; }
        public Int32 render_limit { get; set; }
        public Int32 download_limit { get; set; }
        public Int32 model_limit { get; set; }
        public bool is_not_saasuser { get; set; }
    }
}
