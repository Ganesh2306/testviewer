using ARCHIVE_DASHBOARD.CustomFilter;
using ARCHIVE_DASHBOARD.Helper;
using ARCHIVE_DASHBOARD.Model.Agent;
using ARCHIVE_DASHBOARD.Model.Common;
using ARCHIVE_DASHBOARD.Model.Customer;
using ARCHIVE_DASHBOARD.Model.updateCustomer.Customer;
using ARCHIVE_DASHBOARD.Session;
using Asp.netCoreReactDemo.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Controllers
{
    [TypeFilter(typeof(CheckExpiryTime))]
    public class CustomerController : Controller
    {
        private IConfiguration configuration;
        private string baseAddress;
        public CustomerController(IConfiguration iConfig)
        {
            configuration = iConfig;
            string host = configuration.GetSection("WebAPIConfiguration").GetSection("Host").Value;
            string path = configuration.GetSection("WebAPIConfiguration").GetSection("Path").Value;
            baseAddress = host + path;
        }
        public IActionResult Customers([FromBody] AgentListRequestDto agentListRequestDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            agentListRequestDto.OrgannisationId = myComplexObject.OrganisationId;
            var response = ApiHelper.PostData(baseAddress, "api/Configuration/GetCustomerList", agentListRequestDto, myComplexObject.AccessToken);
           
            var result = JsonConvert.DeserializeObject<CustRoot>(response.ToString());
            int i = 0;
            foreach (var item in result.customerListDto)
            {
                i++;
                if (agentListRequestDto.Start == 0)
                    item.srNo = agentListRequestDto.Start + i;
                else
                    item.srNo = agentListRequestDto.Start + i;
            }
            return Json(result);
           // return RedirectToAction("/dashboard");
        }
        public IActionResult SearchCustomers([FromBody] SearchDto searchDto)
    {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            searchDto.organnisationId = myComplexObject.OrganisationId;

            var response = ApiHelper.PostData(baseAddress, "api/Configuration/SearchCustomerList", searchDto, myComplexObject.AccessToken);

            var result = JsonConvert.DeserializeObject<CustRoot>(response.ToString());
            int i = 0;
            foreach (var item in result.customerListDto)
            {
                i++;
                item.srNo = i;
            }
            return Json(result);
            
        }
        public IActionResult GetEditCustomer([FromBody] Customer _EditCustomer)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            //_EditOrg.accessToken = myComplexObject.AccessToken;
            var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetCustomerById?customerid=" + _EditCustomer.customer_Id, myComplexObject.AccessToken);
            var data = JsonConvert.DeserializeObject<Model.CustomerRes.CustomerResponse>(result.ToString());
            if (data.customer.user.org_user_imagebyte != null)
                data.customer.user.agt_imagebytebase = Convert.ToBase64String(data.customer.user.org_user_imagebyte);
            return Json(data);
        }
        public IActionResult SaveCustomer([FromBody] Customer _Customer)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            _Customer.usersrequest.org_id = myComplexObject != null ? myComplexObject.OrganisationId : 0;
             if (_Customer.usersrequest.agt_imagebytebase != null)
                _Customer.usersrequest.org_user_imagebyte = Convert.FromBase64String(_Customer.usersrequest.agt_imagebytebase);
            _Customer.usersrequest.agt_imagebytebase = null;
            var result = _Customer == null ? null : ApiHelper.PostData(baseAddress, "api/Configuration/CreateCustomer", _Customer, myComplexObject.AccessToken);
            return Json(result);
        }
        public IActionResult ModifyCustomer([FromBody] UpdateCustomer _UpdateCustomer)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");

            var result = _UpdateCustomer == null ? null : ApiHelper.PostData(baseAddress, "api/Configuration/CreateCustomer", _UpdateCustomer, myComplexObject.AccessToken);
            return Json(result);
        }
        public IActionResult CustomerUsers([FromBody] Customer _EditCustomer)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            _EditCustomer.CustomerId = myComplexObject.org_type == 3 ? myComplexObject.org_type_id : _EditCustomer.CustomerId;
            var response = ApiHelper.PostData(baseAddress, "api/Configuration/GetCustomerUserList", _EditCustomer, myComplexObject.AccessToken);
            var result = JsonConvert.DeserializeObject<CustomerUser>(response.ToString());
            int i = 0;
            foreach (var item in result.getCustomerUserList)
            {
                i++;
                if (_EditCustomer.Start == 0)
                    item.srNo = _EditCustomer.Start + i;
                else
                    item.srNo = _EditCustomer.Start + i;
            }
            return Json(result);
        }
        public IActionResult SearchCustomerUSers([FromBody] Customer searchDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");

            var response = ApiHelper.PostData(baseAddress, "api/Configuration/SearchCustomerUserList",searchDto, myComplexObject.AccessToken);
            var result = JsonConvert.DeserializeObject<CustomerUser>(response.ToString());
            int i = 0;
            foreach (var item in result.getCustomerUserList)
            {
                i++;
                item.srNo = i;
            }
            return Json(result);

        }
        public IActionResult GetEditCustomerUser([FromBody] Customer _EditCustomer)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            //_EditOrg.accessToken = myComplexObject.AccessToken;
            var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetOrganisationUserById?id=" + _EditCustomer.customer_Id, myComplexObject.AccessToken);
            var data = JsonConvert.DeserializeObject<GetCustomerUserList>(result.ToString() );
            if (data != null)
            {
                if (data.profile_image != null)
                    data.agt_imagebytebase = Convert.ToBase64String(data.profile_image);
            }
            return Json(data);
        }
        public IActionResult SaveCustomerUser([FromBody] GetCustomerUserList _CustomerUserRequest)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            if (_CustomerUserRequest.agt_imagebytebase != null)
                _CustomerUserRequest.org_user_imagebyte = Convert.FromBase64String(_CustomerUserRequest.agt_imagebytebase);
            _CustomerUserRequest.agt_imagebytebase = null;

            _CustomerUserRequest.org_id = myComplexObject.OrganisationId;
            _CustomerUserRequest.org_type_id = _CustomerUserRequest.org_type_id != 0 ? _CustomerUserRequest.org_type_id : myComplexObject.org_type_id;
            //_CustomerUserRequest.org_type = myComplexObject.org_type;
            _CustomerUserRequest.user_type = 0;

            var result = ApiHelper.PostData(baseAddress, "api/Configuration/CreateOrgUser", _CustomerUserRequest, myComplexObject.AccessToken);
            return Json(new { data = result, req = _CustomerUserRequest });
        }
        public IActionResult DeleteCustomer([FromQuery] long CustomerId)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/DeleteCustomer?CustomerId=" + CustomerId, myComplexObject.AccessToken);
            return Json(result);
        }
    }
}
