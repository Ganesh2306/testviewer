using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Organisation
{
    public class organisationSave
    {
        public int organisationid { get; set; }
        public string clientname { get; set; }
        public string address { get; set; }
        public string city { get; set; }
        public string organisationstate { get; set; }
        public string pincode { get; set; }
        public string country { get; set; }
        public string phone { get; set; }
        public string mobile { get; set; }
        public string email { get; set; }
        public string website { get; set; }
        public int organisationtype { get; set; }
        public string faxno { get; set; }
        public bool isDeleted { get; set; }
        public bool isBlocked { get; set; }
        public string Profileimage { get; set; }


        public string department { get; set; }

        public string pass { get; set; }

        public string cpass { get; set; }

       public string ZipCode { get; set; }
        public string State { get; set; }
        public string firstName { get; set; }

        public string lastName { get; set; }
        public string orgAdminID { get; set; }

     




    }
    public class OrganistionRoot1
    {
        public string accessToken { get; set; }
        public organisationSave organisation { get; set; }
    }

}
