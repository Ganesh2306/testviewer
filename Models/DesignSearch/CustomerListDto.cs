using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_VIEWER.Models.DesignSearch
{
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
        public string ImageUrl { get; set; }
        public long Cust_Role_Id { get; set; }
        public long Role_Id { get; set; }

    }
    public class customerListRequest
    {
        public long organnisationId { get; set; }
        public int start { get; set; }
        public int end { get; set; }
    }
    public class customerList
    {
        public List<CustomerListDto> customerListDto { get; set; }
        public int totalRecords { get; set; }
    }
    public class ConfiguredListCustomersDto
    {
        public List<CustomerListDto> customerListDto { get; set; }

    }
    public class ConfiguredCustomersDto
    {
        public long customerId { get; set; }
        public long cust_Role_Id { get; set; }
        public string customerName { get; set; }
        public string? CustomerImageUrl { get; set; }
    }
}
