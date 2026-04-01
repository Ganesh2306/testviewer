using ARCHIVE_DASHBOARD.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Agent
{
    public class AgentDto
    {
        public DomainObjectState state { get; set; }
        public long agent_id { get; set; }
        public string agt_name { get; set; }
        public string agt_code { get; set; }
        public string agt_address { get; set; }
        public string agt_city { get; set; }
        public string agt_state { get; set; }
        public int agt_pincode { get; set; }
        public string agt_country { get; set; }
        public string agt_phone { get; set; }
        public string agt_email { get; set; }
        public string agt_website { get; set; }
        public bool agt_isdeleted { get; set; }
        public bool agt_isblocked { get; set; }
        public DateTime created_On { get; set; }
        public DateTime start_Date { get; set; }
        public DateTime end_Date { get; set; }
        public UserRequest userRequest { get; set; }
       
        public UserRequest user { get; set; }
    }


    
    public class UserRequest
    {
        public DomainObjectState state { get; set; }
        public long user_id { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string email { get;  set; }
        public string phone { get; set;}
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

    public class EditAgent
    {

        public long id { get; set; }
    }

    public class Root
    {
        public AgentDto agent { get; set; }
    }



}
