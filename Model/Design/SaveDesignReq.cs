using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Design
{

    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse); 
    public class SaveDesignMasterRequetDto
    {
        public DesignMasterDto designmasterDto { get; set; }
      //  public IFormFile File { get; set; }

    }

    public class SaveExclusiveDesignRequestDto
    {
        public long De_Exclusive_Id { get; set; }

        public long? De_Design_Id { get; set; }//f

        public long De_Customer_Id { get; set; }

        public Boolean De_Is_Removed { get; set; }

        public long? De_Removed_By { get; set; }

        public DateTime? De_Removed_On { get; set; }

    }

    public class SaveInventoryDesignRequestDto
    {
        public string Di_Tailori_Type { get; set; }
        public long Di_Inventory_Id { get; set; }

        public long? Di_Design_Id { get; set; }//f

        public string Di_Design_Code { get; set; }


        public DateTime Di_Design_Start_Date { get; set; }


        public Boolean Di_Is_Hide { get; set; }


        public string Di_State { get; set; }


        public double? Di_Stock { get; set; }


        public double? Di_Price { get; set; }
        public Int16? Di_Credit { get; set; }

        public Int16? Di_Rating { get; set; }


        public string? Di_Product { get; set; }

        public DateTime? Di_Modified_On { get; set; }


        public long? Di_Modified_By { get; set; }
        public int Product_OrderNo { get; set; }
    }
    public class DesignMasterDto
    {
        public int State { get; set; }
        public string DesigIds { get; set; } //Abhishek 
        public long CollectionId { get; set; } //Abhishek
        public long SeasonId { get; set; }  //Abhishek
        public Boolean IsImageUpdate { get; set; }
        public long Dm_Id { get; set; }
        public string Dm_Design_Name { get; set; }
        public string Dm_DesignType { get; set; }
        public string Dm_Design_Code { get; set; }
        public string Dm_Design_Description { get; set; }
        public long? Dm_Article_Id { get; set; }//f
        public string Dm_Article { get; set; }
        public long? Dm_Design_Id { get; set; }//f

        public string Dm_Design { get; set; }
        public long? Dm_Variant_Id { get; set; }//f
        public string Dm_Variant { get; set; }
        public int Dm_Variant_Index { get; set; }
        public int Dm_Variant_Count { get; set; }
        public int Dm_Version { get; set; }
        public Boolean Dm_Is_Latest { get; set; }
        public long Dm_Supplier_Id { get; set; }
        public long Dm_Created_By { get; set; }
        public bool is_combo { get; set; }
        public bool is_saasuser { get; set; }
        public DateTime Dm_Created_On { get; set; }


        public long Dm_Modified_By { get; set; }


        public DateTime Dm_Modified_On { get; set; }


        public Boolean Dm_Is_Deleted { get; set; }

        public Boolean Dm_IsSample { get; set; }


        public long Dm_Deleted_By { get; set; }


        public DateTime Dm_Deleted_On { get; set; }

        public long Dm_Last_Reference_Dm_Id { get; set; }
        public long? Dm_Source_Id { get; set; }
        public long Dm_Folder_Master_Id { get; set; }
        public long Dm_DesignType_Id { get; set; }
        public long Dm_Design_Group_Id { get; set; }
        public long Dm_Organisation_Id { get; set; }
        public Boolean Is_override { get; set; }
        public bool is_single_repeat { get; set; }
        public bool is_ai { get; set; }
        public SaveArticleMasterRequestDto SaveArticleMaster { get; set; }

        public SaveDesignRequestDto SaveDesign { get; set; }

        public List<SaveDesignDetailRequestDto> SaveDesignDetail { get; set; }

        public SaveVarientMasterRequestDto SaveVarientMaster { get; set; }
        public SaveSourceRequestDto SaveSourceRequest { get; set; }

        //public string ProductFeatures { get; set; }
        public string FeatureList { get; set; }

        public string Features_Dic { get; set; }

        //public Dictionary<string, string> prod { get; set; }

        public SaveExclusiveDesignRequestDto saveExclusiveDesignRequestDto { get; set; }
        public SaveInventoryDesignRequestDto SaveInventoryDesignRequestDto { get; set; }
        public string? designBase64 { get; set; }
        public string? designsize { get; set; }

    }
    public class GetDesignCountMasterExcelRequestD // vaibhavi more tds
    {
        public DateTime endDate { get; set; }
        public long organisationId { get; set; }
        public long suppplierid { get; set; }
        public DateTime startDate { get; set; }
    }
    public class GetProductCountMasterExcelRequestD //vaibhavi more tds
    {
        public DateTime endDate { get; set; }
        public long organisationId { get; set; }
        public long SuppplierId { get; set; }
        public DateTime startDate { get; set; }
    }


    //public class DesignMaster
    //{
    //    public int DesignId { get; set; }
    //    public string DsignName { get; set; }
    //    public int FolderId { get; set; }
    //    public int Createdby { get; set; }
    //}

    public class SaveArticleMasterRequestDto
    {
        public int da_artical_id { get; set; }
        public string da_artical { get; set; }
        public string da_description { get; set; }
        public int da_supplier_id { get; set; }
        public DateTime da_created_on { get; set; }
        public int da_created_by { get; set; }
    }

    public class SaveDesignRequestDto
    {
        public int dd_design_id { get; set; }
        public string dd_design { get; set; }
        public int dd_article_id { get; set; }
        public string dd_article { get; set; }
        public int da_supplier_id { get; set; }
    }

    public class SaveDesignDetailRequestDto
    {
        public int dd_details_id { get; set; }
        public int dd_dm_id { get; set; }
        public int dd_feature_id { get; set; }
        public int dd_feature_type_id { get; set; }
        public string dd_feature_type_name { get; set; }
        public int dd_design_configuration_id { get; set; }
        public string Dm_Design_Name { get; set; }
    }

    public class SaveVarientMasterRequestDto
    {
        public int dv_variant_id { get; set; }
        public string dv_variant { get; set; }
        public int dv_design_id { get; set; }
        public int dv_variant_index { get; set; }
        public int da_supplier_id { get; set; }
    }

    public class SaveSourceRequestDto
    {
        public int? ds_source_id { get; set; }
        public string ds_file_name { get; set; }
        public string ds_mac_address { get; set; }
        public int da_supplier_id { get; set; }
    }

   
    public class CustomerListDto
    {
        public string customer_Code { get; set; }
        public string customer_Name { get; set; }
        public long user_id { get; set; }
        public string rolename { get; set; }
        public string login_id { get; set; }
        public string email { get; set; }
        public string mobile { get; set; }
        public DateTime created_On { get; set; }
        public DateTime start_Date { get; set; }
        public DateTime end_Date { get; set; }
        public object customer_id { get; set; }
        public bool cus_isdeleted { get; set; }
        public bool cus_isblocked { get; set; }
    }

    public class customerList
    {
        public List<CustomerListDto> customerListDto { get; set; }
        public int totalRecords { get; set; }
    }
 
    public class customerListRequest
    {
        public long organnisationId { get; set; }
        public int start { get; set; }
        public int end { get; set; }
    }

    public class FilterSearchRequestDto
    {
        public long FolderId { get; set; }
        public Dictionary<string, string> features { get; set; }

        public bool IsAnd { get; set; }
    }
    public class DesignMaster
    {
        public string DsignName { get; set; }
        public long FolderId { get; set; }
        public long DesignId { get; set; }
        public long Createdby { get; set; }

        public Dictionary<string, string> features { get; set; }
        public Int16? Rating { get; set; }

        public DateTime Created_On { get; set; }

        public string ImageUrl { get; set; }

    }
    public class GetDesignSearchRequestDto
    {
        public string DesignTypeIdGroupId { get; set; }
        
        public List<DesignMaster> DesignMaster { get; set; }

        public string FolderId { get; set; }
        public string DesignName { get; set; }

        public bool IsText { get; set; }

        public bool IsUserAdmin { get; set; }

        public string CreatedBy { get; set; }

        public FilterSearchRequestDto FilterSearchRequestDto { get; set; }

        public int Start { get; set; }

        public int End { get; set; }

        public bool IsName { get; set; }

        public bool IsRating { get; set; }

        public bool Iswearhouse { get; set; }

        public string designstate { get; set; }

        public Dictionary<string, string> Range { get; set; }

        public int Difference { get; set; }
        public long SupplierId { get; set; }
        public long roleidtemp { get; set; }
        public bool isSmart { get; set; }
        public long id { get; set; }
        public long collectionId { get; set; }
        public long boardId { get; set; }
        public long userid { get; set; }
        //public bool IsLatest { get; set; }
        public bool IsBoard { get; set; }
        public string BoardName { get; set; }
        public bool IsCollection { get; set; }
        public List<DesignMaster> ColorwayDesigns { get; set; }
        public long CustomerId { get; set; }
    }
    public class folderIdDto
    {
        public long folderId { get; set; }
    }

    public class GetDesignMasterExcelRequest
    {
        public DateTime endDate { get; set; }
        public long folderId { get; set; }
        public long designTypeId { get; set; }
        public long designGroupId { get; set; }
        public long organisationId { get; set; }
        public string drivePath { get; set; }
        public DateTime startDate { get; set; }
    }
    public class GetDesignMasterExcelRequestDto
    {       
        public long folderId { get; set; }
        public long designTypeId { get; set; }
        public long designGroupId { get; set; }
        public long organisationId { get; set; } 
        public long roleId { get; set; }
    }
    public class SupplierListDto
    {
        public int srNo { get; set; }
        public string sup_code { get; set; }
        public string rolename { get; set; }
        public string sup_name { get; set; }
        public long user_id { get; set; }
        public string login_id { get; set; }
        public string sup_email { get; set; }
        public string sup_phone { get; set; }
        public DateTime created_On { get; set; }
        public DateTime start_Date { get; set; }
        public DateTime end_Date { get; set; }
        public long supplier_id { get; set; }
        public bool sup_isdeleted { get; set; }
        public bool sup_isblocked { get; set; }
        public int state { get; set; }
        public string sup_address { get; set; }
        public string sup_city { get; set; }
        public string sup_state { get; set; }
        public string sup_website { get; set; }
        public int sup_pincode { get; set; }
        public string sup_country { get; set; }
       // public UserRequest userRequest { get; set; }
        public object profile_Image { get; set; }
        //public User user { get; set; }
        public bool is_blocked { get; set; }
        public long sup_Role_Id { get; set; }
    }

    public class Supplier
    {
        public SupplierListDto supplier { get; set; }
        public int TotalRecords { get; set; }
        public List<SupplierListDto> supplierListDto { get; set; }
    }

    public class GetRenderCount
    {
        public long OrganisationId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }

    public class GetorgRenderCount
    {
        public long organisationId { get; set; }
        public DateTime? startDate { get; set; }
        public DateTime? endDate { get; set; }
    }

    public class AiImageRequestDto
    {
        public string Base64Image { get; set; }
        public bool is_ai { get; set; }
    }

}
