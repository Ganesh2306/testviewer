using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Supplier
{
    public class GetUnconfiguredCustomerListRequestDto
    {
        public long OrgannisationId { get; set; }
        public long SupplierId { get; set; }
    }

    public class SaveSupplierCustomerConfigurationRequestDto
    {
        public int State { get; set; }
        public long Supplier_Customer_ConfigurationId { get; set; }
        public long Organisation_Id { get; set; }
        public long Supplier_Id { get; set; }
        public long Supplier_Role_Id { get; set; }
        public long Customer_Id { get; set; }
        public long Customer_Role_Id { get; set; }
        public int Status { get; set; }
        public DateTime Created_On { get; set; }
    }

    public class customerList
    {
        public List<CustomerListDto> customerListDto { get; set; }
        public int totalRecords { get; set; }
    }

    public class CustomerListDto
    {
        public string customer_Code { get; set; }
        public string customer_Name { get; set; }
        public int srNo { get; set; }
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
        public long role_Id { get; set; }

        public long cust_Role_Id { get; set; }
        public long SupplierCustomerConfigurationId { get; set; }
    }
}
