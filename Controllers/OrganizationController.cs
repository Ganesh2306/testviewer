using ARCHIVE_DASHBOARD.CustomFilter;
using ARCHIVE_DASHBOARD.Helper;
using ARCHIVE_DASHBOARD.Model.Common;
using ARCHIVE_DASHBOARD.Model.Organisation;
using ARCHIVE_DASHBOARD.Model.Organization;
using ARCHIVE_DASHBOARD.Model.OrganizationUser;
using ARCHIVE_DASHBOARD.Session;
using Asp.netCoreReactDemo.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Controllers
{
    public class OrganizationController : Controller
    {
        private IConfiguration configuration;
        private string baseAddress;
        public OrganizationController(IConfiguration iConfig)
        {
            configuration = iConfig;
            string host = configuration.GetSection("WebAPIConfiguration").GetSection("Host").Value;
            string path = configuration.GetSection("WebAPIConfiguration").GetSection("Path").Value;
            baseAddress = host + path;
        }

        [TypeFilter(typeof(CheckExpiryTime))]
        public IActionResult OrganizationUser([FromBody] OrganisationLIstRequestDto  organisationLIstRequestDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            organisationLIstRequestDto.orgid = myComplexObject.OrganisationId;
            if (myComplexObject != null && myComplexObject.AccessToken != null)
            {
                var response = ApiHelper.PostData(baseAddress, "api/Configuration/GetOrganisationUserList", organisationLIstRequestDto, myComplexObject.AccessToken);
                var result = JsonConvert.DeserializeObject<UserListRoot>(response.ToString());
                int i = 0;
                foreach (var item in result.organisationUserListDto)
                {
                    i++;
                    if (organisationLIstRequestDto.Start == 0)
                        item.srNo = organisationLIstRequestDto.Start + i;
                    else
                        item.srNo = organisationLIstRequestDto.Start + i;
                }
                
                return Json(result);

            }


            return null;
        }
        [TypeFilter(typeof(CheckExpiryTime))]
        public IActionResult SearchOrganisationUsers([FromBody] OrganisationLIstRequestDto searchDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            searchDto.organnisationId = myComplexObject.OrganisationId;
            var response = ApiHelper.PostData(baseAddress, "api/Configuration/SearchOrganisationUserList", searchDto, myComplexObject.AccessToken);

            var result = JsonConvert.DeserializeObject<UserListRoot>(response.ToString());
            int i = 0;
            foreach (var item in result.organisationUserListDto)
            {
                i++;
                if (searchDto.Start == 0)
                    item.srNo = searchDto.Start + i;
                else
                    item.srNo = searchDto.Start + i;
            }
            return Json(result);

        }
        [TypeFilter(typeof(CheckExpiryTime))]
        public IActionResult SaveOrganisationUser([FromBody] OrganisationUserListDto _OrganisationUsersRequest)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            if (_OrganisationUsersRequest.agt_imagebytebase != null)
                _OrganisationUsersRequest.org_user_imagebyte = Convert.FromBase64String(_OrganisationUsersRequest.agt_imagebytebase);
            _OrganisationUsersRequest.agt_imagebytebase = null;
            _OrganisationUsersRequest.org_id = myComplexObject.OrganisationId;
            // _OrganisationUsersRequest.org_type = myComplexObject.org_type;
            _OrganisationUsersRequest.org_type_id = myComplexObject.org_type_id;
            _OrganisationUsersRequest.user_type = 0;
            var result = ApiHelper.PostData(baseAddress, "api/Configuration/CreateOrgUser", _OrganisationUsersRequest, myComplexObject.AccessToken);
            return Json(result);
        }
        [TypeFilter(typeof(CheckExpiryTime))]
        public IActionResult GetEditOrgUser([FromBody] OrganisationUserListDto _EditOrgUser)
        {

            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            //_EditOrg.accessToken = myComplexObject.AccessToken;
            var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetOrganisationUserById?id=" + _EditOrgUser.id, myComplexObject.AccessToken);
            var data = JsonConvert.DeserializeObject<OrganisationUserListDto>(result.ToString());
            if (data != null)
            {
                if (data.profile_image != null)
                    data.agt_imagebytebase = Convert.ToBase64String(data.profile_image);
            }
            return Json(data);
        }
        
        [TypeFilter(typeof(AdminExpiryTime))]
        public IActionResult Organization([FromBody] Model.Agent.AgentListRequestDto agentListRequestDto)
        {

            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var response = ApiHelper.PostData(baseAddress, "api/LicenseManager/GetOrgList", agentListRequestDto, myComplexObject.AccessToken);
            RootOrg result = JsonConvert.DeserializeObject<RootOrg>(response.ToString());
            int i = 0;
            foreach (var item in result.allOrgList)
            {
                i++;
                if (agentListRequestDto.Start == 0)
                    item.srNo = agentListRequestDto.Start + i;
                else
                    item.srNo = agentListRequestDto.Start + i;
            }
            if (result != null)
                return Json(result);
            else
                return Json(new RootOrg());
        }
        [TypeFilter(typeof(AdminExpiryTime))]
        public IActionResult SearchOrganisation([FromBody] SearchDto searchDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");

            var response = ApiHelper.PostData(baseAddress, "api/LicenseManager/SearchOrgList",searchDto , myComplexObject.AccessToken);

            RootOrg result = JsonConvert.DeserializeObject<RootOrg>(response.ToString());
            int i = 0;
            foreach (var item in result.allOrgList)
            {
                i++;
                if (searchDto.Start == 0)
                    item.srNo = searchDto.Start + i;
                else
                    item.srNo = searchDto.Start + i;
            }
            return Json(result);

        }

        [TypeFilter(typeof(AdminExpiryTime))]
        public IActionResult OrganizationRequest([FromBody] SearchDto searchDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var response = ApiHelper.PostData(baseAddress, "api/LicenseManager/GetRequestList", searchDto, myComplexObject.AccessToken);
            var result = JsonConvert.DeserializeObject<Rootreq>(response.ToString());
            int i = 0;
            foreach (var item in result.allRequestList)
            {
                i++;
                if (searchDto.Start == 0)
                    item.srNo = searchDto.Start + i;
                else
                    item.srNo = searchDto.Start + i;
            }
            if (result != null)
                return Json(result);
            else
                return Json(new OrgRequest());
            // return Json(orgRequest);
        }
        [TypeFilter(typeof(AdminExpiryTime))]
        public IActionResult SearchOrganisationRequest([FromBody] SearchDto searchDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");

            var response = ApiHelper.PostData(baseAddress, "api/LicenseManager/SearchRequestList",searchDto, myComplexObject.AccessToken);

            var result = JsonConvert.DeserializeObject<Rootreq>(response.ToString());
            int i = 0;
            foreach (var item in result.allRequestList)
            {
                i++;
                if (searchDto.Start == 0)
                    item.srNo = searchDto.Start + i;
                else
                    item.srNo = searchDto.Start + i;
            }
            return Json(result);

        }

        [TypeFilter(typeof(AdminExpiryTime))]
        public IActionResult SaveOrganisation([FromBody] SaveOrganisationRequestDto _Organisation)
        {

            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            if (_Organisation.Users.agt_imagebytebase != null)
                _Organisation.Users.org_user_imagebyte = Convert.FromBase64String(_Organisation.Users.agt_imagebytebase);
            if(_Organisation.Users.agt_imagebytebase == null )
            {
                _Organisation.OrgDanisationData.Product_Archive = true;
            }
            //_Organisation.OrgDanisationData.Product_Archive = true;
            var result = ApiHelper.PostData(baseAddress, "api/LicenseManager/SaveOrganisation", _Organisation, myComplexObject.AccessToken);
            return Json(result);
        }

        [TypeFilter(typeof(AdminExpiryTime))]
        public IActionResult DatabaseMigration([FromBody] SaveOrganisationRequestDto _Organisation)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var result = ApiHelper.PostData(baseAddress, "api/LicenseManager/DatabaseMigration", _Organisation, myComplexObject.AccessToken);
            return Json(result);
        }

        [TypeFilter(typeof(AdminExpiryTime))]
        public IActionResult GetEditOrg([FromBody] EditOrg _EditOrg)
        {

            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var result = ApiHelper.PostData(baseAddress, "api/LicenseManager/GetOrganisationById", _EditOrg, myComplexObject.AccessToken);
            var data = JsonConvert.DeserializeObject<SaveOrganisationRequestDto>(result.ToString());
            if (data != null)
            {
                if (data.Users.org_user_imagebyte != null)
                    data.Users.agt_imagebytebase = Convert.ToBase64String(data.Users.org_user_imagebyte);
            }
            return Json(data);
        }

         [TypeFilter(typeof(AdminExpiryTime))]
        public IActionResult GetConfigureOrg([FromBody] EditOrg _EditOrg)
        {
            string url = "api/LicenseManager/GetOrganisationDataByLMOrg_id?org_id=" + _EditOrg.id;
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var response = ApiHelper.GetDataNewQS(baseAddress, url, myComplexObject.AccessToken);
            var result = JsonConvert.DeserializeObject<SaveOrgDataRequest>(response.ToString());
            return Json(result);
        }
        [TypeFilter(typeof(AdminExpiryTime))]
        public IActionResult RejectRequest([FromBody] SaveRequestDTO _OrganisationReq)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var result = ApiHelper.PostData(baseAddress, "api/LicenseManager/ModifiedRequest", _OrganisationReq, myComplexObject.AccessToken);
            return Json(result);
        }

        [TypeFilter(typeof(AdminExpiryTime))]
        public IActionResult SaveEmailConfigurations([FromBody] SaveEmailConfigurationsRequestDto _emailConfig)
        {

            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            //_emailConfig.Em_Organisation_Id = myComplexObject.OrganisationId;

            var result = ApiHelper.PostData(baseAddress, "api/LicenseManager/SaveEmailConfigurations", _emailConfig, myComplexObject.AccessToken);
            return Json(result);
        }

        [TypeFilter(typeof(AdminExpiryTime))]
        public IActionResult getEmailConfigurationsById([FromBody] EditOrg _EditOrg)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");

            var response = ApiHelper.GetDataNewQS(baseAddress, "api/LicenseManager/GetEmailConfigurationsById?OrganisationId=" + _EditOrg.id, myComplexObject.AccessToken);
            var result = JsonConvert.DeserializeObject<RootEmail>(response.ToString());
            return Json(result.emailConfigurations);
        }
        [TypeFilter(typeof(AdminExpiryTime))]
        public IActionResult SendTestMail([FromBody] SaveEmailConfigurationsRequestDto _emailConfig)
        {

            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            //_emailConfig.Em_Organisation_Id = myComplexObject.OrganisationId;

            var result = ApiHelper.PostData(baseAddress, "api/LicenseManager/SendTestMail", _emailConfig, myComplexObject.AccessToken);
           
            return Json(result);
        }
        public IActionResult DeleteOrganisation([FromQuery] long OrganisationId)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/DeleteOrganisation?OrganisationId=" + OrganisationId, myComplexObject.AccessToken);
            return Json(result);
        }
        public IActionResult SaveSaasConfigurations([FromBody] SaveUserRequestDto _Organisation)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var result = ApiHelper.PostData(baseAddress, "api/Configuration/SaveSaasConfigurations", _Organisation, myComplexObject.AccessToken);
            return Json(result);
        }
        public IActionResult SaveCloneSupplier([FromBody] SaveUserRequestDto _Organisation)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var result = ApiHelper.PostData(baseAddress, "api/Configuration/SaveCloneSupplier", _Organisation, myComplexObject.AccessToken);
            return Json(result);
        }
        public IActionResult SaveCloneCustomer([FromBody] SaveUserRequestDto _Organisation)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var result = ApiHelper.PostData(baseAddress, "api/Configuration/SaveCloneCustomer", _Organisation, myComplexObject.AccessToken);
            return Json(result);
        }
        public IActionResult GetUserType([FromQuery] long OrganisationId)
        {
            string url = "api/Configuration/GetUserType?OrganisationId=" + OrganisationId;
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var response = ApiHelper.GetDataNewQS(baseAddress, url, myComplexObject.AccessToken);
            return Json(response);
        }
    }
}
