using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Supplier
{
    public class GetCollectionsList
    {
        public long SupplierId { get; set; }
        public long OrgannisationId { get; set; }
    }

    public class Savesharecollection
    {
        public int state { get; set; }
        public long customer_share_configuration_id { get; set; }
        public long Organisation_Id { get; set; }
        public long Supplier_Id { get; set; }
        public long Customer_Id { get; set; }
        public long Cust_Share_Id { get; set; }
        public Boolean Is_list_seasonal_collection { get; set; }
        public long Season_Id { get; set; }
        public long SeasonalCollection_Id { get; set; }
        public long Collection_Id { get; set; }
    }

    public class Excelrequest
    {
        public long SupplierId { get; set; }
        public long OrganisationId { get; set; }

    }

    public class GetStockExcelRequestDto
    {
        public long SupplierId { get; set; }
    }
        
    public class GetCustomerShareConfiguration
    {
        public long SupplierId { get; set; }
        public long customerId { get; set; }
    }
}
class CustomerShareConfiguration
{
    
    public long seasonalCollection_Id { get; set; }
    public long collection_id { get; set; }
    public long customer_share_configuration_id { get; set; }
}

public class GetOperationIdOperationNameRoleTaskIdResponseDto
{
    public string operation_Name { get; set; }
}

public class Detail
{
    public List<GetOperationIdOperationNameRoleTaskIdResponseDto> getOperationIdOperationNameRoleTaskIdResponseDtos { get; set; }
}

public class RootObject
{
    public List<Detail> allDetails { get; set; }
}
