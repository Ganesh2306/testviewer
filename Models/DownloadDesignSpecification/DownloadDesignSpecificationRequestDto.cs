using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_VIEWER.Models.DownloadDesignSpecification
{
    public class DownloadDesignSpecificationRequestDto
    {
        public long folderId { get; set; }

        public long organisation_id { get; set; }
    }

    public class DesignDetailsDto
    {

        public string designCode { get; set; }
        public string designName { get; set; }
        public string article { get; set; }
        public string design { get; set; }
        public long folderId { get; set; }

        public long designId { get; set; }
        public long createdby { get; set; }

        public Dictionary<string, string> features { get; set; }
        public DateTime created_On { get; set; }
        public string state { get; set; }

        public double? price { get; set; }

        public double? stock { get; set; }
        public long? rating { get; set; }

        public string? design_Desc { get; set; }
        public string? designSize { get; set; }

        public string? products { get; set; }
        public string? boardName { get; set; }
        public string? cartName { get; set; }

    }

    public class BoardDetailDto
    {
        public long board_detail_id { get; set; }
        public long Board_id { get; set; }
        public string bd_Comments { get; set; }
        public long? bd_Dm_Id { get; set; }

        public DateTime Bd_Created_On { get; set; }

        public long? BD_Collection_Card_id { get; set; }
        public string Bd_collection_name { get; set; }
        public string Bd_CardCode { get; set; }
        public Int16 Bd_Card_Sequence { get; set; }
        public long? Bd_Supplier_Id { get; set; }
        public long Bd_Customer_id { get; set; }
        public long Bd_Customer_User_id { get; set; }
        public long Bd_Created_By { get; set; }
        public long State { get; set; }
    }

    public class SaveBoarddto
    {
        public int state { get; set; }
        public long board_id { get; set; }
        public string board_name { get; set; }
        public long board_customer_id { get; set; }
        public long board_customer_user_id { get; set; }
        public DateTime board_created_on { get; set; }
        public DateTime board_modified_on { get; set; }
        public long board_supplier_id { get; set; }
        public long? bd_Dm_Id { get; set; }
        public long board_created_by { get; set; }

    }


    public class Savecollectiondto
    {
        public int state { get; set; }
        public long collection_Id { get; set; }
        public string collection_Name { get; set; }
        public string collection_Description { get; set; }
        public int collection_Customer_Id { get; set; }
        public int collection_Customer_User_id { get; set; }
        public DateTime collection_Created_On { get; set; }
        public DateTime collection_Modified_On { get; set; }
        public long collection_Supplier_Id { get; set; }
        /*Added By : Vijay Pansande, Add On : 13-03-2023, Purpose : Save Design After creating new collection or board*/
        public DesignDetailsDto designDetailsDto { get; set; }
    }

    public class CollectionDetailDto
    {
        public long Collection_Id { get; set; }
        public string Collection_Name { get; set; }
        public string Collection_Description { get; set; }

        public long Collection_Customer_Id { get; set; }
        public long Collection_Customer_User_id { get; set; }

        public DateTime Collection_Created_On { get; set; }
        public DateTime Collection_Modified_On { get; set; }
        public long Coll_Supplier_Id { get; set; }
        public long? Coll_Dm_Id { get; set; }
        public long State { get; set; }

    }
    public class SaveDesignToBoardDto
    {
        public BoardDetailDto boardDetailDto { get; set; }
        public DesignDetailsDto designDetailsDto { get; set; }
        public CollectionDetailDto collectionDetailDto { get; set; }
    }

    public class GetListQueryDto
    {
        public long userid { get; set; }
        public long id { get; set; }
        public long start { get; set; }
        public long end { get; set; }
    }
    public class PdfBoardRequest
    {
        public long supplierid { get; set; }
        public long SupplierUserId { get; set; }
        public long customerid { get; set; }
        public long OrgannisationId { get; set; }
        public long BoardId { get; set; }
        public int start { get; set; }
        public int End { get; set; }
        public string DesignName { get; set; }
    }
    public class PdfCollectionRequest
    {
        public long supplierid { get; set; }
        public long SupplierUserId { get; set; }
        public long OrgannisationId { get; set; }
        public string DesignName { get; set; }
        public long CollectionId { get; set; }
        public int start { get; set; }
        public int End { get; set; }
    }
    public class GetSupCustConfigurationRequestDto
    {
        public long SupRoleId { get; set; }
        public long CustRoleId { get; set; }
        public long OrganisationId { get; set; }
        public long SupplierId { get; set; }
        public long CustomerId { get; set; }
    }
    public class GetSupCustConfiguration_AIRequestDto
    {
        public long SupRoleId { get; set; }
        public long CustRoleId { get; set; }
        public long OrganisationId { get; set; }
        public long SupplierId { get; set; }
        public long CustomerId { get; set; }
    }
}