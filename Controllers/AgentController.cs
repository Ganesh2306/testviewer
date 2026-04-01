using ARCHIVE_DASHBOARD.CustomFilter;
using ARCHIVE_DASHBOARD.Helper;
using ARCHIVE_DASHBOARD.Model.Agent;
using ARCHIVE_DASHBOARD.Model.Common;
using ARCHIVE_DASHBOARD.Model.Organization;
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
    public class AgentController : Controller
    {
        private IConfiguration configuration;
        private string baseAddress;
        public AgentController(IConfiguration iConfig)
        {
            configuration = iConfig;
            string host = configuration.GetSection("WebAPIConfiguration").GetSection("Host").Value;
            string path = configuration.GetSection("WebAPIConfiguration").GetSection("Path").Value;
            baseAddress = host +path;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Agents([FromBody] AgentListRequestDto agentListRequestDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            agentListRequestDto.OrgannisationId = myComplexObject.OrganisationId;
            var response = ApiHelper.PostData(baseAddress, "api/Configuration/GetAgentList", agentListRequestDto, myComplexObject.AccessToken);
            Root1 result = JsonConvert.DeserializeObject<Root1>(response.ToString());
            int i = 0;
            foreach (var item in result.agentListDto)
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
                return Json(new AgentListDto());
        }
        public IActionResult SearchAgent([FromBody] SearchDto searchDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            searchDto.organnisationId = myComplexObject.OrganisationId;
            var response = ApiHelper.PostData(baseAddress, "api/Configuration/SearchAgentList",searchDto, myComplexObject.AccessToken);

            Root1 result = JsonConvert.DeserializeObject<Root1>(response.ToString());
            int i = 0;
            foreach (var item in result.agentListDto)
            {
                i++;
                item.srNo = i;
            }
            return Json(result);

        }
        public IActionResult AgentUsers([FromBody] AgentUserListRequestDto  agentUserListRequestDto)
        {

            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            if (agentUserListRequestDto.AgentId == 0)
            {
                agentUserListRequestDto.AgentId = myComplexObject.org_type_id;
            }
            var response = ApiHelper.PostData(baseAddress, "api/Configuration/GetAgentUserList", agentUserListRequestDto, myComplexObject.AccessToken);
            RootAgentUser result = JsonConvert.DeserializeObject<RootAgentUser>(response.ToString());
            int i = 0;
            foreach (var item in result.agentUserListDto)
            {
                i++;
                if (agentUserListRequestDto.Start == 0)
                    item.srNo = agentUserListRequestDto.Start + i;
                else
                    item.srNo = agentUserListRequestDto.Start + i;
            }
            if (result != null)
                return Json(result);
            else
                return Json(new RootAgentUser());
        }
        public IActionResult SearchAgentUsers([FromBody] AgentUserListRequestDto searchDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");

            var response = ApiHelper.PostData(baseAddress, "api/Configuration/SearchAgentUserList", searchDto, myComplexObject.AccessToken);

            RootAgentUser result = JsonConvert.DeserializeObject<RootAgentUser>(response.ToString());
            int i = 0;
            foreach (var item in result.agentUserListDto)
            {
                i++;
                item.srNo = i;
            }
            return Json(result);

        }
        public IActionResult SaveAgent([FromBody] AgentDto _AgentDto)
        
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            _AgentDto.userRequest.org_id = myComplexObject.OrganisationId;
            if (_AgentDto.userRequest.agt_imagebytebase != null)
                _AgentDto.userRequest.org_user_imagebyte = Convert.FromBase64String(_AgentDto.userRequest.agt_imagebytebase);
            var result = ApiHelper.PostData(baseAddress, "api/Configuration/CreateAgent", _AgentDto, myComplexObject.AccessToken);
            return Json(result);
        }
        public IActionResult SaveAgentUser([FromBody] OrganisationUserListDto _OrganisationUsersRequest)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            if (_OrganisationUsersRequest.agt_imagebytebase != null)
                _OrganisationUsersRequest.org_user_imagebyte = Convert.FromBase64String(_OrganisationUsersRequest.agt_imagebytebase);
            _OrganisationUsersRequest.agt_imagebytebase = null;
            //_OrganisationUsersRequest.org_type = myComplexObject.org_type;
            _OrganisationUsersRequest.org_type_id = _OrganisationUsersRequest.org_type_id != 0 ? _OrganisationUsersRequest.org_type_id : myComplexObject.org_type_id;
            _OrganisationUsersRequest.org_id = myComplexObject.OrganisationId;
            _OrganisationUsersRequest.user_type = 0;
            var result = ApiHelper.PostData(baseAddress, "api/Configuration/CreateOrgUser", _OrganisationUsersRequest, myComplexObject.AccessToken);
            return Json(new { data = result, req = _OrganisationUsersRequest });
        }
        public IActionResult GetAgentById([FromBody] EditAgent _EditAgent)
        {
            string url = "api/Configuration/GetAgentById?agentid=" + _EditAgent.id;
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var response = ApiHelper.GetDataNewQS(baseAddress, url, myComplexObject.AccessToken);
            var result = JsonConvert.DeserializeObject<Root>(response.ToString());
            if (result != null)
            {
                if (result.agent.userRequest.org_user_imagebyte != null)
                    result.agent.userRequest.agt_imagebytebase = Convert.ToBase64String(result.agent.userRequest.org_user_imagebyte);
                return Json(result.agent);
            }
            else
                return Json(new Root());

        }
        public IActionResult getEditAgentUSer([FromBody] OrganisationUserListDto _EditOrgUser)
        {

            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");

            var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetOrganisationUserById?id=" + _EditOrgUser.id, myComplexObject.AccessToken);
            var data = JsonConvert.DeserializeObject<OrganisationUserListDto>(result.ToString());
            if (data != null)
            {
                if (data.profile_image != null)
                    data.agt_imagebytebase = Convert.ToBase64String(data.profile_image);
            }

            return Json(data);

        }
        public IActionResult GetEditOrgUser([FromBody] OrganisationUserListDto _EditOrgUser)
        {

            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            //_EditOrg.accessToken = myComplexObject.AccessToken;
            var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetOrganisationUserById?id=" + _EditOrgUser.id, myComplexObject.AccessToken);
            var data = JsonConvert.DeserializeObject<OrganisationUserListDto>(result.ToString());

            return Json(data);
        }
    }
}
