using ARCHIVE_VIEWER.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_VIEWER.Models.Login
{
    public class OrganisationUserListDto
    {
        public long id { get; set; }
        public byte[] org_user_imagebyte { get; set; }
        public string agt_imagebytebase { get; set; }
        public int srNo { get; set; }
        public long orgid { get; set; }
        public string organisationname { get; set; }
        public byte[] profile_image { get; set; }
        public string rolename { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public string mobile { get; set; }
        public string zipcode { get; set; }
        public string department { get; set; }
        public string login_id { get; set; }
        public DomainObjectState state { get; set; }
        public long user_id { get; set; }
        public string password_hash { get; set; }
        public bool is_administrator { get; set; }
        public long org_id { get; set; }
        public int org_type { get; set; }
        public long org_type_id { get; set; }

        public DateTime created_on { get; set; }
        public bool is_deleted { get; set; }
        public bool is_blocked { get; set; }
        public bool is_logged_in { get; set; }
        public long userId { get; set; }
    }

    public class UserListRoot
    {
        public int TotalRecords { get; set; }
        public List<OrganisationUserListDto> organisationUserListDto { get; set; }
    }
    public class OrganizationUserProfile
    {
        public int user_id { get; set; }
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
        public int org_type_id { get; set; }
        public bool is_logged_in { get; set; }
        public DateTime created_on { get; set; }
        public bool is_deleted { get; set; }
        public bool is_blocked { get; set; }
        public string login_id { get; set; }
        public string profile_image { get; set; }
    }
}
