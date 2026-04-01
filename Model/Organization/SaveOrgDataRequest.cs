using ARCHIVE_DASHBOARD.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Organisation
{
    public class SaveOrgDataRequest
    {
        public DomainObjectState state { get; set; }
        public long Organisation_Data_Id { get; set; }
        public long Organisation_Id { get; set; }


        public int User_Limit { get; set; }
        public int Supllier_Limit { get; set; }
        public int Customer_Limit { get; set; }
        public int Agent_Limit { get; set; }
        public int Design_Limit { get; set; }
        public int Credit_Limit { get; set; }

        public Boolean Product_Dobby { get; set; }
        public Boolean Product_Archive { get; set; }
        public Boolean Product_Collezioni { get; set; }
        public Boolean Product_Q3d { get; set; }
        public Boolean Product_Showroom { get; set; }


        public string Sql_Data_Source_Name { get; set; }
        public string Sql_User_Id { get; set; }
        public string Sql_Password { get; set; }


        public Boolean Cdn { get; set; }
        public string Cdn_CdnPath { get; set; }
        public string Cdn_Cloud_Name { get; set; }
        public string Cdn_Api_Secret { get; set; }
        public string Cdn_Api_Key { get; set; }


        public Boolean Local { get; set; }
        public string Drive_Path { get; set; }


        public Boolean Ftp_Store { get; set; }
        public string Ftp_Host { get; set; }
        public string Ftp_Port { get; set; }
        public string Ftp_Url_Acces_User_Id { get; set; }
        public string Ftp_Url_Access_Password { get; set; }


        public Boolean Azure_Blob_Storage { get; set; }
        public string Azure_Url_Access { get; set; }
        public string Azure_Url_Access_Id { get; set; }
        public string Azure_Url_Access_Password { get; set; }


        public Boolean Aws_S3_Bucket { get; set; }
        public string Aws_Url_Access { get; set; }
        public string Aws_Url_Access_Id { get; set; }
        public string Aws_Url_Access_Password { get; set; }
    }
}
