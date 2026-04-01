using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Role
{

    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse); 
    public class SaveConfigureSaveDesignFeatureRequestDto
    {
        public int state { get; set; }
        public long configure_SaveDesign_Feature_Id { get; set; }
        public long csF_Role_Design_Configuration_Id { get; set; }
        public bool csF_Is_Save { get; set; }
        public bool csF_Is_Mandatory { get; set; }
        public int csF_Order_No { get; set; }
    }

    public class SaveConfigureLableDesignFeatureRequestDto
    {
        public int state { get; set; }
        public long configure_LableDesign_Feature_Id { get; set; }
        public long clF_Role_Design_Configuration_Id { get; set; }
        public bool clF_Is_Lable { get; set; }
        public int clF_Order_No { get; set; }
    }

    public class SaveConfigureFilterDesignFeatureRequestDto
    {
        public int state { get; set; }
        public long configure_FilterDesign_Feature_Id { get; set; }
        public long cfF_Role_Design_Configuration_Id { get; set; }
        public bool cfF_Is_Filter_Search { get; set; }
        public int cfF_Order_No { get; set; }
    }

    public class SaveConfigureAISearchFeatureRequestDto
    {
        public int state { get; set; }
        public long Configure_AISearch_Feature_Id { get; set; }
        public long CAIF_Role_Design_Configuration_Id { get; set; }
        public bool CAIF_Is_AI { get; set; }
        public int CAIF_Order_No { get; set; }
    }

    public class RoleDesignAccess
    {
        public List<SaveConfigureSaveDesignFeatureRequestDto> saveConfigureSaveDesignFeatureRequestDtos { get; set; }
        public List<SaveConfigureLableDesignFeatureRequestDto> saveConfigureLableDesignFeatureRequestDtos { get; set; }
        public List<SaveConfigureFilterDesignFeatureRequestDto> saveConfigureFilterDesignFeatureRequestDtos { get; set; }
        public List<SaveConfigureAISearchFeatureRequestDto> saveConfigureAISearchFeatureRequestDtos { get; set; }

    }

}
