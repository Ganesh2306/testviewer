using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.ThreeD
{
    //public class SaveThreedImageOrgConfiguratioRequestDto
    //{
    //    public long Td_images_org_configuration_id { get; set; }
    //    public long Td_threed_Image_Id { get; set; }
    //    public long Td_Organisation_Id { get; set; }
    //    public string Td_Organisation_Name { get; set; }

    //}
    public class ThreedImageConfiguration
    {
        public int state { get; set; }
        public int td_Threed_Image_Configuration_Id { get; set; }
        public int td_Threed_Image_Id { get; set; }
        public string td_Productname { get; set; }
        public string td_Group_Name { get; set; }
        public string td_Group_Display_Name { get; set; }
        public string td_Group_Colour { get; set; }
        public string td_Group_Product_Name { get; set; }
        public int td_Group_Order_No { get; set; }
        public string ThreedImageOrgConfiguration { get; set; }
        public int Td_Credit { get; set; }

        public SaveThreedImageOrgConfiguratioRequestDto saveThreedImageOrgConfiguratioRequestDto { get; set; }
    }

    public class RootThreedImageConfiguration
    {
        public List<ThreedImageConfiguration> Threed_Image_Configurations { get; set; }
    }

    //public class SaveTdImageConfigurationsRequestDto
    //{
    //    public int state { get; set; }
    //    public long? Td_Threed_Image_Configuration_Id { get; set; }
    //    public long? Td_Threed_Image_Id { get; set; }
    //    public string? Td_Productname { get; set; }
    //    public string Td_Group_Name { get; set; }
    //    public string? Td_Group_Display_Name { get; set; }
    //    public string? Td_Group_Colour { get; set; }
    //    public string? Td_Group_Product_Name { get; set; }
    //    public long? Td_Group_Order_No { get; set; }

    //    public string? ThreedImageOrgConfiguration { get; set; }
    //    public int? Td_Credit { get; set; }

    //    public List<SaveThreedImageOrgConfiguratioRequestDto> saveThreedImageOrgConfiguratioRequestDto { get; set; }
    //}

    public class SaveTdImageConfigurationsListRequestDto
    {

        public List<SaveTdImageConfigurationsRequestDto> saveTdImageConfigurationsRequestDtos { get; set; }
    }

    //public class SaveTdImagesRequestDto 
    //{
    //    public int state { get; set; }
    //    public long Td_Threed_Image_Id { get; set; }
    //    public string Td_Threed_Image_Name { get; set; }
    //    public string Td_Threed_Image_Display_Name { get; set; }
    //    public string Td_Threed_Image_Type { get; set; }
    //    public bool Is_Exclusive { get; set; }
    //    public int Td_Order_No { get; set; }
    //    public int Td_Credit { get; set; }
    //    public bool Td_Is_Tryon { get; set; }
    //    public List<SaveTdImageConfigurationsRequestDto> SaveTdImageConfigurationsRequestDto { get; set; }
    //    public List<SaveThreedImageOrgConfiguratioRequestDto> saveThreedImageOrgConfiguratioRequestDto { get; set; }
    //}

    public class SaveTdImagesRequestDto
    {
        public int state { get; set; }
        public long Td_Threed_Image_Id { get; set; }
        public string Td_Threed_Image_Name { get; set; }
        public string Td_Threed_Image_Display_Name { get; set; }
        public string Td_Threed_Image_Type { get; set; }
        public bool Is_Exclusive { get; set; }
        public int Td_Order_No { get; set; }
        public int Td_Credit { get; set; }
        public bool Td_Is_Tryon { get; set; }
        public bool Td_Is_combo { get; set; }
        public string Td_Sub_Category { get; set; }
        public string Td_Tryon_type { get; set; }
        public string Td_Tryon_Gender { get; set; }
        public bool isdeletefinal { get; set; }
        public bool isimageupdate { get; set; }
        public List<SaveThreedImageOrgConfiguratioRequestDto> saveThreedImageOrgConfiguratioRequestDto { get; set; }
        public SaveTdImageConfigurationsRequestDto SaveTdImageConfigurationsRequestDto { get; set; }
    }
    public class SaveThreedImageOrgConfiguratioRequestDto
    {
        public int state { get; set; }
        public long Td_images_org_configuration_id { get; set; }
        public long Td_threed_Image_Id { get; set; }
        public long Td_Organisation_Id { get; set; }
        public string Td_Organisation_Name { get; set; }
    }
    public class SaveTdImageConfigurationsRequestDto
    {
        public long Td_Threed_Image_Configuration_Id { get; set; }
        public long Td_Threed_Image_Id { get; set; }
        public List<td_ProductNameLists> td_ProductNameLists { get; set; }
        public List<tdGroupNameLists> tdGroupNameLists { get; set; }

    }
    public class td_ProductNameLists
    {
        public int state { get; set; }
        public long Td_Threed_Image_Configuration_Id { get; set; }
        public string Td_Productname { get; set; }
    }
    public class tdGroupNameLists
    {
        public string td_Group_Name { get; set; }
        public string td_Group_Display_Name { get; set; }
        public string td_Group_Colour { get; set; }
        public int td_Group_Display_Order_No { get; set; }
        public Boolean td_is_drapedfabric { get; set; }
        public List<tdGroupProductNameLists> tdGroupProductNameLists { get; set; }

    }
    public class tdGroupProductNameLists
    {
        public int state { get; set; }
        public long Td_Threed_Image_Configuration_Id { get; set; }
        public string Td_Group_Product_Name { get; set; }
        public long td_Group_Order_No { get; set; }
    }
}
