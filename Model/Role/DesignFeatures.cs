using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Role
{
    public class ConfigureLabledesignFeature
    {
        public long configure_LableDesign_Feature_Id { get; set; }
        public long clF_Role_Design_Configuration_Id { get; set; }
        public bool clF_Is_Lable { get; set; }
        public int clF_Order_No { get; set; }
        public int state { get; set; }
    }

    public class ConfigureSavedesignFeature
    {
        public long configure_SaveDesign_Feature_Id { get; set; }
        public long csF_Role_Design_Configuration_Id { get; set; }
        public bool csF_Is_Save { get; set; }
        public bool csF_Is_Mandatory { get; set; }
        public int csF_Order_No { get; set; }
        public int state { get; set; }
    }

    public class ConfigureFilterdesignFeature
    {
        public long configure_FilterDesign_Feature_Id { get; set; }
        public long cfF_Role_Design_Configuration_Id { get; set; }
        public bool cfF_Is_Filter_Search { get; set; }
        public int cfF_Order_No { get; set; }
        public int state { get; set; }
    }
    public class Configure_AISearch_Feature
    {
        public long Configure_AIsearch_Feature_Id { get; set; }
        public long CAIF_Role_Design_Configuration_Id { get; set; }
        public Boolean CAIF_Is_AI { get; set; }
        public int CAIF_Order_No { get; set; }
        public int state { get; set; }
    }

    public class AllDesignFeatursByRole
    {
        public long design_features_id { get; set; }
        public string design_features_name { get; set; }
        public long design_configuration_id { get; set; }
        public long role_design_configuration_id { get; set; }
        
        public ConfigureLabledesignFeature configure_labledesign_feature { get; set; }
        public ConfigureSavedesignFeature configure_savedesign_feature { get; set; }
        public ConfigureFilterdesignFeature configure_filterdesign_feature { get; set; }
        public Configure_AISearch_Feature configure_AISearch_Feature { get; set; }
    }

    public class DesignFeatures
    {
        public List<AllDesignFeatursByRole> allDesignFeatursByRoles { get; set; }
    }
  
}
