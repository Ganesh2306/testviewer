using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Organization
{
    public class SaveEmailConfigurationsRequestDto
    {
        public int State { get; set; }
        public long Em_Configuration_Id { get; set; }
        public long Em_Organisation_Id { get; set; } 
        public string em_User { get; set; }
        public string Em_Address { get; set; }
        public string Em_Password { get; set; }
        public string Em_SMTP { get; set; }
        public string Em_SMTP_Port { get; set; }
        public string Em_Account_Type { get; set; }
        public string Em_bcc { get; set; }
        public string Em_CC { get; set; }
        public DateTime Em_Created_On { get; set; }
    }
    public class EmailConfigurations
    {
        public long em_Configuration_Id { get; set; }
        public long em_Organisation_Id { get; set; }
        public string em_User { get; set; }
        public string em_Address { get; set; }
        public string em_Password { get; set; }
        public string em_SMTP { get; set; }
        public string em_SMTP_Port { get; set; }
        public string em_Account_Type { get; set; }
        public string em_bcc { get; set; }
        public string em_CC { get; set; }
        public DateTime em_Created_On { get; set; }
        public int state { get; set; }
    }

    public class RootEmail
    {
        public EmailConfigurations emailConfigurations { get; set; }
    }
}
