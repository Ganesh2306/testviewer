using ARCHIVE_DASHBOARD.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;


namespace ARCHIVE_DASHBOARD.Model.Organisation
{
    public class SaveFolderStructureRequest
    {
        
        public long Folder_Id { get; set; }

        public DomainObjectState state { get; set; }
        public long Design_Type_Id { get; set; }
        

        public long Design_Group_Id { get; set; }
        
        public string Folder_Drive { get; set; }
        

        public Int16 hosttype { get; set; }
        
        public string LocalPath { get; set; }
        
        public string FtpServerUrl { get; set; }
        

        public string FtpUsername { get; set; }
        
        public string FtpPassword { get; set; }
        
        public long OrgId { get; set; }
        
        public string Cdn_CDNPath { get; set; }
        
        public string Cdn_CloudName { get; set; }
        
        public string Cdn_APIKey { get; set; }
        
        public string Cdn_APISecret { get; set; }

    }
}
