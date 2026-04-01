using ARCHIVE_DASHBOARD.CustomFilter;
using ARCHIVE_DASHBOARD.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Controllers
{
    public class Organisation
    {
        public long OrganisationId { get; set; }
        public string ClientName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string OrganisationState { get; set; }
        public string Pincode { get; set; }
        public string Country { get; set; }
        public string Phone { get; set; }
        public string FaxNo { get; set; }
        public string Email { get; set; }
        public string Website { get; set; }
        public int License { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsBlocked { get; set; }
        public object ProfileImage { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
    public class OrgData
    {
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string ClientName { get; set; }
        public long RoleId { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public long Key { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsBlocked { get; set; }
    }
    public class Suppliers
    {
        public string Name { get; set; }
        public string Forename { get; set; }
        public string Surname { get; set; }
        public string UserId { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public int License { get; set; }
        public object Key { get; set; }
        public string Email { get; set; }
        public string AddressLine { get; set; }
        public string AddressState { get; set; }
        public int ZipCode { get; set; }
        public string WebSite { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsBlocked { get; set; }
        public string Code { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime CreatedOn { get; set; }
        public string Rolename { get; set; }
        public string Status { get; set; }
    }

    [TypeFilter(typeof(CheckExpiryTime))]
    public class HomeController : Controller
    {
        private IConfiguration configuration;
        private string baseAddress;
        public HomeController(IConfiguration iConfig)
        {
            configuration = iConfig;
            string host = configuration.GetSection("WebAPIConfiguration").GetSection("Host").Value;
            string path = configuration.GetSection("WebAPIConfiguration").GetSection("Path").Value;
            baseAddress = host + path;
        }
        public IActionResult Index()
        {
            //var result = ApiHelper.GetData(baseAddress+"admin/GetQ3dUsers?HttpRequestMessage=1&key=2098678112&role=organisation");
            //List<OrgData> data = JsonConvert.DeserializeObject<List<OrgData>>(result.Result.ToString());
            //return Json(data);
            return Json("");
        }    
    }
}
