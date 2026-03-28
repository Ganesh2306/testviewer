using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_VIEWER.Models.Order
{
    public class SaveOrderRequestDto
    {
        public int state { get; set; }
        public long Order_Id { get; set; }
        public long Organization_id { get; set; }
        public long Supplier_id { get; set; }
        public string Order_Code { get; set; }
        public Int16 Order_Number { get; set; }
        public string order_status { get; set; }
        public string Order_Comments { get; set; }
        public double Order_Total_Quantity { get; set; }
        public long Customer_Id { get; set; }
        public long Created_By { get; set; }
        public DateTime Created_On { get; set; }
        public bool Order_is_seasonal { get; set; }
        public string Order_Description { get; set; }
        public string Order_RequestType { get; set; }
        public long Order_BoardId { get; set; }
        public List<SaveOrderDetailsRequestDto> saveOrderDetailsRequestDtos { get; set; }


    }
    public class SaveOrderDetailsRequestDto
    {
        public int state { get; set; }
        public long Od_Id { get; set; }
        public long? Od_Order_Id { get; set; }
        public long? Od_Dm_Id { get; set; }
        public double Od_Quantity { get; set; }
        public string Od_Comments { get; set; }
        public DateTime Od_Delivery_On { get; set; }
        public string Order_request_type { get; set; }
    }

    public class GetMyOrderListRequest
    {
        public long CustomerId { get; set; }
        public string RequestType { get; set; }
        public string Status { get; set; }
        public long SupplierId { get; set; }
        public long organisationId { get; set; }
    }
    public class GetOrderNotificationRequest
    {
        public long customerId { get; set; }
        public string requestType { get; set; }
        public string status { get; set; }
        public long supplierId { get; set; }
        public long organisationId { get; set; }
    }
    public class SearchOrderListRequest
    {
        public long CustomerId { get; set; }
        public string searchString { get; set; }
        public long SupplierId { get; set; }
        public long organisationId { get; set; }
        public int start { get; set; }
        public int end { get; set; }


    }



}


