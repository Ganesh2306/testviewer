using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Seasonal
{
    public class SeasonalCollection
    {
        public class SeasonalCollectionListRequestDto
        {
            public long OrganisationId { get; set; }
            public long SupplierId { get; set; }
            public int Start { get; set; }
            public int End { get; set; }
        }
        public class GetSeasonMastersListResponseDto
        {
            public IEnumerable<SeasonMastersDto> SeasonMastersList { get; set; }
            public int TotalCount { get; set; }
        }
        public class GetSeasonMastersByIdResponse
        {
            public SeasonMastersDto SeasonMaster { get; set; }
        }
        public class SeasonMastersDto
        {
            public int srNo { get; set; }
            public long Sm_Season_Id { get; set; }
            public string Sm_Season_Name { get; set; }
            public DateTime Sm_Created_On { get; set; }
            public long Sm_Created_By { get; set; }
            public long Sm_Organization_Id { get; set; }
            public int Sm_Order_No { get; set; }
            public int Sm_State { get; set; }
            public long Sm_Supplier_Id { get; set; }
            public byte[] SeasonIamge { get; set; }
        }
        public class GetCollectionListBySeasonIdResponseDto
        {
            public IEnumerable<my_collection> MyCollection { get; set; }
            public int TotalCount { get; set; }
        }
        public class GetCollectionByIdResponseDto
        {
            public my_collection My_Collection { get; set; }
        }
        public class my_collection
        {
            public int srNo { get; set; }
            public long Collection_Id { get; set; }
            public string Collection_Name { get; set; }
            public string Collection_Description { get; set; }
            public long Collection_Customer_Id { get; set; }
            public long Collection_Customer_User_id { get; set; }
            public DateTime Collection_Created_On { get; set; }
            public DateTime? Collection_Modified_On { get; set; }
            public long Collection_Supplier_Id { get; set; }
            public long Collection_Created_By { get; set; }
            public long Sm_Season_Id { get; set; }
            public string CustomerName { get; set; }
            public string UserName { get; set; }
            public int TotalDesign { get; set; }
            public byte[] CollectionIamge { get; set; }


        }

        public class SaveCollectionResponseDto
        {
            public bool IsSave { get; set; }
            public bool IsExist { get; set; }
            public List<CollectionDetailDto> CollectionDetailDto { get; set; }
        }
        
        public class CollectionDetailDto
        {
            public int State { get; set; }
            public long Collection_detail_id { get; set; }
            public long? Collection_id { get; set; }
            public string coll_comments { get; set; }
            public long? Coll_Dm_Id { get; set; }
            public DateTime Coll_Created_On { get; set; }
            public long? Coll_Clz_Collection_Card_id { get; set; }
            public string Coll_collection_name { get; set; }
            public string Coll_CardCode { get; set; }
            public Int16 Coll_Card_Sequence { get; set; }
            public long? Coll_Supplier_Id { get; set; }
            public long Coll_Customer_id { get; set; }
            public long Coll_Customer_User_id { get; set; }
            public long Coll_Created_By { get; set; }
            public long Sm_Season_Id { get; set; }
        }
        public class SaveSeasonMastersRequestDto
        {
            public int State { get; set; }
            public long Sm_Season_Id { get; set; }
            public string Sm_Season_Name { get; set; }
            public DateTime Sm_Created_On { get; set; }
            public long Sm_Created_By { get; set; }
            public long Sm_Organization_Id { get; set; }
            public int Sm_Order_No { get; set; }
            public int Sm_State { get; set; }
            public long Sm_Supplier_Id { get; set; }
            public string? imageiamgebase64 { get; set; }
            public byte[]? SeasonIamge { get; set; }
        }
        public class GetSeasonMastersByIdRequestDto
        {
            public long SeasonId { get; set; }
            public long Organization_Id { get; set; }
        }

        public class SaveResponseDto
        {
            public bool IsSave { get; set; }
            public bool IsExist { get; set; }
        }
        public class GetCollectionDesignBySeasonIdRequestDto
        {
            public long OrganisationId { get; set; }
            public long SeasonId { get; set; }
            public long CollectionId { get; set; }
            public int Start { get; set; }
            public int End { get; set; }
        }

        public class GetDesignSearchResponseDto
        {
            public int TotalCount { get; set; }
            public List<DesignMaster> DesignMaster { get; set; }
        }
        public class DesignMaster
        {
            public string DesignCode { get; set; }
            public string DesignName { get; set; }
            public string Article { get; set; }
            public string Design { get; set; }
            public long FolderId { get; set; }

            public long DesignId { get; set; }
            public Dictionary<string, string> features { get; set; }
            public DateTime Created_On { get; set; }

            public string ImageUrl { get; set; }

            public string State { get; set; }

            public double? Price { get; set; }

            public double? Stock { get; set; }
            public Int16? Rating { get; set; }

            public Int16? Credit { get; set; }

            public string Design_Desc { get; set; }
            public string DesignSize { get; set; }

            public List<DesignMaster> ColorwayDesigns { get; set; }
            public Dictionary<int, string> DesignInfo { get; set; }

            public string Products { get; set; }
            public string BoardName { get; set; }
            public string CartName { get; set; }
            public long? BoardId { get; set; }
            public long? CollectionId { get; set; }

            public long? SupplierId { get; set; }
            public string CollectionName { get; set; }
            public long CustomerId { get; set; }
            public string LocalUrl { get; set; }
            public long Createdby { get; set; }


        }
    }
    public class SaveCollectionRequestDto
    {
        public int State { get; set; }
        //public int Status { get; set; }
        public long Collection_Id { get; set; }
        public string Collection_Name { get; set; }
        //public string Collection_Description { get; set; }
        public long Collection_Customer_Id { get; set; }
        public long Collection_Customer_User_id { get; set; }
        public DateTime Collection_Created_On { get; set; }
        public DateTime Collection_Modified_On { get; set; }
        public long Collection_Supplier_Id { get; set; }//f
        public long Collection_Created_By { get; set; }
        public long Sm_Season_Id { get; set; }
        public byte[]? CollectionIamge { get; set; }
        public long Collection_Organisation_Id { get; set; }
        public string? imageiamgebase64 { get; set; }

    }
    public class SeasonSearchDto
    {

        public long OrganisationId  { get; set; }
        public long SupplierId { get; set; }
        public string SearchString { get; set; }
        public int Start { get; set; }
        public int End { get; set; }
    }

    //long SeasonId, string SearchString, int Start, int End

    public class CollectionsearchDto
    {
        public long SeasonId { get; set; }
        public string SearchString { get; set; }
        public int Start { get; set; }
        public int End { get; set; }
    }

    public class CollectionListRequestDto
    {
        public  long SeasonId { get; set; }
        public int Start { get; set; }
        public int End { get; set; }
    }
    public class CollezioniGetDesignByCollectionIdRequestDto
    {
        public long CollectionId { get; set; }
        public long OrganisationId { get; set; }
        public int Start { get; set; }
        public int End { get; set; }
    }

    public class GetDesignSearchResponseDto
    {
        public int TotalCount { get; set; }
        public List<DesignMaster> DesignMaster { get; set; }
    }
    public class DesignMaster
    {
        public string DesignCode { get; set; }
        public string DesignName { get; set; }
        public string Article { get; set; }
        public string Design { get; set; }
        public long FolderId { get; set; }

        public long DesignId { get; set; }
        public Dictionary<string, string> features { get; set; }
        public DateTime Created_On { get; set; }

        public string ImageUrl { get; set; }

        public string State { get; set; }

        public double? Price { get; set; }

        public double? Stock { get; set; }
        public Int16? Rating { get; set; }

        public Int16? Credit { get; set; }

        public string Design_Desc { get; set; }
        public string DesignSize { get; set; }

        public List<DesignMaster> ColorwayDesigns { get; set; }
        public Dictionary<int, string> DesignInfo { get; set; }

        public string Products { get; set; }
        public string BoardName { get; set; }
        public string CartName { get; set; }
        public long? BoardId { get; set; }
        public long? CollectionId { get; set; }

        public long? SupplierId { get; set; }
        public string CollectionName { get; set; }
        public long CustomerId { get; set; }
        public string LocalUrl { get; set; }
        public long Createdby { get; set; }


    }
}
public class SaveCollectionRequestDto
{
    public int State { get; set; }
    public long Collection_Id { get; set; }
    public string Collection_Name { get; set; }
    public string Collection_Description { get; set; }
    public long Collection_Customer_Id { get; set; }
    public long Collection_Customer_User_id { get; set; }
    public DateTime Collection_Created_On { get; set; }
    public DateTime Collection_Modified_On { get; set; }
    public long Collection_Supplier_Id { get; set; }//f
    public long Collection_Created_By { get; set; }
    public long Sm_Season_Id { get; set; }
    public byte[]? CollectionIamge { get; set; }
    public long Collection_Organisation_Id { get; set; }
    public string? imageiamgebase64 { get; set; }


}
