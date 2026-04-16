using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_VIEWER.Models.DesignSearch
{
    public class SupplierRequestDto
    {
        public long OrgannisationId { get; set; }
        public int Start { get; set; }
        public int End { get; set; }

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
       
        public object profile_Image { get; set; }
        public long roleid { get; set; }
        public string ImageUrl { get; set; }

    }
    public class ConfiguredListSuppliersDto
    {
        public List<SupplierListDto> SupplierListDto { get; set; }
    }
    public class Supplier
    {
        public SupplierListDto supplier { get; set; }
        public int TotalRecords { get; set; }
        public List<SupplierListDto> supplierListDto { get; set; }
    }
    public class ConfiguredSuppliersDto
    {
        public long SupplierId { get; set; }
        public long Sup_Role_Id { get; set; }
        public string SupplierName { get; set; }
        public string? SupplierImageUrl { get; set; }
    }
}
