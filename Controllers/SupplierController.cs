using ARCHIVE_DASHBOARD.CustomFilter;
using ARCHIVE_DASHBOARD.Helper;
using ARCHIVE_DASHBOARD.Model.Common;
using ARCHIVE_DASHBOARD.Model.Supplier;
using ARCHIVE_DASHBOARD.Session;
using Asp.netCoreReactDemo.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Controllers
{
    [TypeFilter(typeof(CheckExpiryTime))]
    public class SupplierController : Controller
    {
        private IConfiguration configuration;
        private string baseAddress;
        public SupplierController(IConfiguration iConfig)
        {
            configuration = iConfig;
            string host = configuration.GetSection("WebAPIConfiguration").GetSection("Host").Value;
            string path = configuration.GetSection("WebAPIConfiguration").GetSection("Path").Value;
            baseAddress = host + path;
        }
        public IActionResult Suppliers([FromBody] Model.Agent.AgentListRequestDto agentListRequestDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            agentListRequestDto.OrgannisationId = agentListRequestDto.OrgannisationId != 0 ? agentListRequestDto.OrgannisationId : myComplexObject.OrganisationId;
            var response = ApiHelper.PostData(baseAddress, "api/Configuration/GetSupplierList", agentListRequestDto, myComplexObject.AccessToken);
            var result = JsonConvert.DeserializeObject<Supplier>(response.ToString());
            int i = 0;
            foreach (var item in result.supplierListDto)
            {
                i++;
                if (agentListRequestDto.Start == 0)
                    item.srNo = agentListRequestDto.Start + i;
                else
                    item.srNo = agentListRequestDto.Start + i;
            }
            return Json(result);
        }
        public IActionResult SearchSupplier([FromBody] SearchDto searchDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            searchDto.organnisationId = myComplexObject.OrganisationId;

            var response = ApiHelper.PostData(baseAddress, "api/Configuration/SearchSupplierList",searchDto, myComplexObject.AccessToken);

            var result = JsonConvert.DeserializeObject<Supplier>(response.ToString());
            int i = 0;
            foreach (var item in result.supplierListDto)
            {
                i++;
                if (searchDto.Start == 0)
                    item.srNo = searchDto.Start + i;
                else
                    item.srNo = searchDto.Start + i;
            }
            return Json(result);

        }
        public IActionResult GetEditSupplier([FromBody] SupplierListDto _Supplier)
        {

            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            //_EditOrg.accessToken = myComplexObject.AccessToken;
            var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetSupplierById?supplierid=" + _Supplier.supplier_id, myComplexObject.AccessToken);
            var data = JsonConvert.DeserializeObject<Supplier>(result.ToString());
            if (data != null)
            {
                if (data.supplier.user.org_user_imagebyte != null)
                    data.supplier.user.agt_imagebytebase = Convert.ToBase64String(data.supplier.user.org_user_imagebyte);
            }
            return Json(data);
        }
        public IActionResult SaveSupplier([FromBody] SupplierListDto _Supplier)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            _Supplier.userRequest.org_id = myComplexObject.OrganisationId;
            if (_Supplier.userRequest.agt_imagebytebase != null)
                _Supplier.userRequest.org_user_imagebyte = Convert.FromBase64String(_Supplier.userRequest.agt_imagebytebase);
            _Supplier.userRequest.agt_imagebytebase = null;
            var result = _Supplier == null ? null : ApiHelper.PostData(baseAddress, "api/Configuration/CreateSupplier", _Supplier, myComplexObject.AccessToken);
            return Json(result);
        }
        public IActionResult SupplierUsers([FromBody] SupplierUserListRequestDto _Supplier)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");

            if (_Supplier.SupplierId == 0)    
            {
                _Supplier.SupplierId = myComplexObject.org_type_id;
            }

            var response = ApiHelper.PostData(baseAddress, "api/Configuration/GetSupplierUserList", _Supplier, myComplexObject.AccessToken);
            var result = JsonConvert.DeserializeObject<Root>(response.ToString());
            int i = 0;
            foreach (var item in result.supplierUserListDto)
            {
                i++;
                if (_Supplier.Start == 0)
                    item.srNo = _Supplier.Start + i;
                else
                    item.srNo = _Supplier.Start + i;
            }
            if (result != null)
                return Json(result);
            else
                return Json(new SupplierUserListDto());

        }
        public IActionResult SearchSupplierUsers([FromBody] SupplierUserListRequestDto searchDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            if(searchDto.SupplierId == 0)
            {
                searchDto.SupplierId = myComplexObject.org_type_id;
            }

            var response = ApiHelper.PostData(baseAddress, "api/Configuration/SearchSupplierUserList",searchDto, myComplexObject.AccessToken);

            var result = JsonConvert.DeserializeObject<Root>(response.ToString());
            int i = 0;
            foreach (var item in result.supplierUserListDto)
            {
                i++;
                if (searchDto.Start == 0)
                    item.srNo = searchDto.Start + i;
                else
                    item.srNo = searchDto.Start + i;
            }
            return Json(result);

        }
        public IActionResult GetEditSupplierUser([FromBody] SupplierUserListDto _SupplierUser)
        {
            //var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");

            //var result = ApiHelper.GetDataNewQS(baseAddress, "api​/Configuration​/GetOrganisationUserById?id=" + _SupplierUser.user_id, myComplexObject.AccessToken);
            //var data = JsonConvert.DeserializeObject<SupplierUserListDto>(result.ToString());

            //return Json(data);
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            //_EditOrg.accessToken = myComplexObject.AccessToken;
            var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetOrganisationUserById?id=" + _SupplierUser.user_id, myComplexObject.AccessToken);
            var data = JsonConvert.DeserializeObject<SupplierUserListDto>(result.ToString());
            if (data != null)
            {
                if (data.profile_image != null)
                    data.agt_imagebytebase = Convert.ToBase64String(data.profile_image);
            }
            return Json(data);
        }
        public IActionResult SaveSupplierUser([FromBody] SupplierUserRequestDto _supplierUserDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");

            if (_supplierUserDto.agt_imagebytebase != null)
                _supplierUserDto.org_user_imagebyte = Convert.FromBase64String(_supplierUserDto.agt_imagebytebase);
            _supplierUserDto.agt_imagebytebase = null;
            //_supplierUserDto.org_type = myComplexObject.org_type;
            _supplierUserDto.org_type_id = _supplierUserDto.org_type_id != 0 ? _supplierUserDto.org_type_id : myComplexObject.org_type_id;//temprory
            _supplierUserDto.org_id = myComplexObject.OrganisationId;
            _supplierUserDto.is_administrator = false;
            _supplierUserDto.user_type = 0;
            //_supplierUserDto.org_type = myComplexObject.org_type;// 2 for supplier
            var result = ApiHelper.PostData(baseAddress, "api/Configuration/CreateOrgUser", _supplierUserDto, myComplexObject.AccessToken);
            return Json(result);
        }
        public IActionResult SaveSupplierCustomerConfiguration([FromBody] SaveSupplierCustomerConfigurationRequestDto _SaveSupplierCustomerConfigurationRequestDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            _SaveSupplierCustomerConfigurationRequestDto.Organisation_Id = myComplexObject.OrganisationId;
            //_SaveSupplierCustomerConfigurationRequestDto.Status = 1;
            var result = ApiHelper.PostData(baseAddress, "api/Configuration/SaveSupplierCustomerConfiguration", _SaveSupplierCustomerConfigurationRequestDto, myComplexObject.AccessToken);
            return Json(result);
        }
        public IActionResult GetUnconfiguredCustomer([FromBody] GetUnconfiguredCustomerListRequestDto getUnconfiguredCustomerListRequestDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            getUnconfiguredCustomerListRequestDto.OrgannisationId = myComplexObject.OrganisationId;
            var response = ApiHelper.PostData(baseAddress, "api/Configuration/GetUnconfiguredCustomerList", getUnconfiguredCustomerListRequestDto, myComplexObject.AccessToken);

            var result = JsonConvert.DeserializeObject<customerList>(response.ToString());
            return Json(result);
        }
        public IActionResult GetConfiguredCustomerList([FromBody] GetSuppliercustomerListRequestDto getsuppliercustomer)
        {

            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetConfiguredCustomersList?OrganisationId=" + myComplexObject.OrganisationId + "&SupplierId=" +getsuppliercustomer.SupplierId + "&Start="+getsuppliercustomer.Start + "&End=" + getsuppliercustomer.End, myComplexObject.AccessToken);
            var data = JsonConvert.DeserializeObject<customerList>(result.ToString());
            int i = 0;
            int start = getsuppliercustomer.Start;
            foreach (var item in data.customerListDto)
            {
                i++;
                if (start == 0)
                    item.srNo = start + i;
                else
                    item.srNo = start + i;
            }
            return Json(data);
        }
        public IActionResult SearchConfiguredCustomersList([FromBody] SuppliercustomerListRequestDto searchDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");

            var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/SearchConfiguredCustomersList?SupplierId=" +searchDto.SupplierId + "&SearchString=" + searchDto.SearchString + "&Start=" + searchDto.Start + "&End=" + searchDto.End + "&OrganisationId=" +myComplexObject.OrganisationId, myComplexObject.AccessToken);

            var data= JsonConvert.DeserializeObject<customerList>(response.ToString());
            int i = 0;
            int start = 0;
            foreach (var item in data.customerListDto)
            {
                i++;
                if (start == 0)
                    item.srNo = start + i;
                else
                    item.srNo = start + i;
            }
            return Json(data);
        }
        public IActionResult GetCollectionList([FromBody] GetCollectionsList getCollectionsList)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            getCollectionsList.OrgannisationId = myComplexObject.OrganisationId;
            string url = "api/Configuration/GetCollectionList?SupplierId=" + getCollectionsList.SupplierId + "&OrgannisationId=" + myComplexObject.OrganisationId;
            var response = ApiHelper.GetDataNewQS(baseAddress, url, myComplexObject.AccessToken);
            return Json(response);
        }
        public IActionResult GetSeasonalCollectionList([FromBody] GetCollectionsList getCollectionsList)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            getCollectionsList.OrgannisationId = myComplexObject.OrganisationId;
            string url = "api/Configuration/GetSeasonalCollectionList?SupplierId=" + getCollectionsList.SupplierId + "&OrgannisationId=" + myComplexObject.OrganisationId;
            var response = ApiHelper.GetDataNewQS(baseAddress, url, myComplexObject.AccessToken);
            return Json(response);
        }
        public IActionResult SaveCustomerShareConfiguration([FromBody] List<Savesharecollection> _savesharecollection)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var response = ApiHelper.PostData(baseAddress, "api/Configuration/SaveCustomerShareConfiguration", _savesharecollection, myComplexObject.AccessToken);
            return Json(response);
        }
        public IActionResult GetCustomerShareConfigurationById([FromBody] GetCustomerShareConfiguration _obj)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            if (_obj == null)
            {
                return Json("null");
            }
            {
                var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetCustomerShareConfigurationById?SupplierId="+ _obj.SupplierId + "&CustomerId="+ _obj.customerId + "&OrgaisationId="+ myComplexObject.OrganisationId + "", myComplexObject.AccessToken);
                return Json(response);
            }  
        }
        public IActionResult GetShareId()
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetShareId?ShareName=", myComplexObject.AccessToken);
            return Json(response);
        }
        public IActionResult ExportStockQty([FromBody] Excelrequest excelrequest)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            excelrequest.OrganisationId = myComplexObject.OrganisationId;
            //string url = "api/Configuration/ExportStockQty?SupplierId=" + excelrequest.SupplierId + "&OrganisationId=" + myComplexObject.OrganisationId;
            //var response = ApiHelper.PostData(baseAddress, url,excelrequest, myComplexObject.AccessToken);
            var response2 = ApiHelper.PostData(baseAddress, "api/Configuration/ExportStockQty?SupplierId=" + excelrequest.SupplierId + "&OrganisationId=" + myComplexObject.OrganisationId, excelrequest, myComplexObject.AccessToken);
            return Json(response2);
        }
        public IActionResult ExportOrderRequest([FromBody] Excelrequest excelrequest)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            excelrequest.OrganisationId = myComplexObject.OrganisationId;
            string url = "api/Configuration/ExportOrderRequest?SupplierId=" + excelrequest.SupplierId + "&OrganisationId=" + myComplexObject.OrganisationId;
            var response = ApiHelper.PostData(baseAddress, url,excelrequest, myComplexObject.AccessToken);
            return Json(response);
        }
        public IActionResult ExportOrderRequestDetails([FromBody] Excelrequest excelrequest)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            excelrequest.OrganisationId = myComplexObject.OrganisationId;
            string url = "api/Configuration/ExportOrderRequestDetails?SupplierId=" + excelrequest.SupplierId + "&OrganisationId=" + myComplexObject.OrganisationId;
            var response = ApiHelper.PostData(baseAddress, url,excelrequest, myComplexObject.AccessToken);
            return Json(response);
        }
        public static byte[] ReadFully(Stream input)
        {
            byte[] buffer = new byte[16 * 1024];
            using (MemoryStream ms = new MemoryStream())
            {
                int read;
                while ((read = input.Read(buffer, 0, buffer.Length)) > 0)
                {
                    ms.Write(buffer, 0, read);
                }
                return ms.ToArray();
            }
        }
        public async Task<IActionResult> ImportStockQty()
        {
            try
            {
                var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");

                var form = Request.Form;

                using (var _httpClient = new HttpClient())
                {
                    _httpClient.Timeout = TimeSpan.FromMinutes(10);
                    GetStockExcelRequestDto request = new GetStockExcelRequestDto();

                    if (form.TryGetValue("alldata", out var someData))
                    {
                        request = JsonConvert.DeserializeObject<GetStockExcelRequestDto>(someData);
                    }
                    _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + myComplexObject.AccessToken);
                    using var form1 = new MultipartFormDataContent();
                    Byte[] b = null;

                    b = ReadFully(form.Files[0].OpenReadStream());
                     using var fileContent = new ByteArrayContent(b);
                    fileContent.Headers.ContentType = MediaTypeHeaderValue.Parse("multipart/form-data");
                    form1.Add(fileContent, "ImportStockExcelFile", form.Files[0].FileName.Split('.')[0]); 
                    form1.Add(new StringContent(request.SupplierId.ToString()), "SupplierId");
                    var requestUri = baseAddress + "api/Configuration/ImportStockQty";
                    var response = await _httpClient.PostAsync(requestUri, form1);
                    var responseContent = response.Content.ReadAsStringAsync();
                    return Json(new { Issaved = responseContent.Result });
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return Json(new { Issaved = false });
            }
            return Json(new { Issaved = false });

        }
        public IActionResult DeleteSupplier([FromQuery] long SupplierId)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/DeleteSupplier?SupplierId=" + SupplierId, myComplexObject.AccessToken);
            return Json(result);
        }
     }
}
