using ARCHIVE_DASHBOARD.CustomFilter;
using ARCHIVE_DASHBOARD.Helper;
using ARCHIVE_DASHBOARD.Model.Common;
using ARCHIVE_DASHBOARD.Model.Role;
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
    public class RoleController : Controller
    {
        private IConfiguration configuration;
        private string baseAddress;
        public RoleController(IConfiguration iConfig)
        {
            configuration = iConfig;
            string host = configuration.GetSection("WebAPIConfiguration").GetSection("Host").Value;
            string path = configuration.GetSection("WebAPIConfiguration").GetSection("Path").Value;
            baseAddress = host + path;
        }

        #region Role
        public IActionResult Roles([FromBody] SearchDto searchDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            searchDto.organnisationId = myComplexObject.OrganisationId;
                 var response = ApiHelper.PostData(baseAddress, "api/Configuration/GetRolesList", searchDto, myComplexObject.AccessToken);
            var result = JsonConvert.DeserializeObject<RolesList>(response.ToString());
            int i = 0;
            foreach (var item in result.allRolesList)
            {
                i++;
                if (searchDto.Start == 0)
                    item.srNo = searchDto.Start + i;
                else
                    item.srNo = searchDto.Start + i;
            }
            return Json(result);
        }
        public IActionResult SearchRoles([FromBody] SearchDto searchDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            searchDto.organnisationId = myComplexObject.OrganisationId;
            var response = ApiHelper.PostData(baseAddress, "api/Configuration/SearchRolesList", searchDto, myComplexObject.AccessToken);
            var result = JsonConvert.DeserializeObject<RolesList>(response.ToString());
            int i = 0;
            foreach (var item in result.allRolesList)
            {
                i++;
                if (searchDto.Start == 0)
                    item.srNo = searchDto.Start + i;
                else
                    item.srNo = searchDto.Start + i;
            }
            return Json(result);
        }
        public IActionResult GetEditRole([FromBody] Role _Role)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetRolesById?id=" + _Role.role_Id, myComplexObject.AccessToken);
            var data = JsonConvert.DeserializeObject<RolesList>(result.ToString());
            return Json(data);
        }
        public IActionResult SaveRole([FromBody] Role _Role)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            _Role.created_By = myComplexObject.OrganisationId;
            var result = _Role == null ? null : ApiHelper.PostData(baseAddress, "api/Configuration/CreateRoles", _Role, myComplexObject.AccessToken);
            return Json(result);
        }
        #endregion Role

        #region DesignAccess
        public IActionResult getRoleByRoleType([FromBody] Role _Role)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetRoleByRoleType?RoleType=" + _Role.role_Type+ "&OrganisationId="+myComplexObject.OrganisationId, myComplexObject.AccessToken);
            var data = JsonConvert.DeserializeObject<RolesList>(result.ToString());
            return Json(data);
        }
        public IActionResult getDesignTypesByRole([FromBody] Role _Role)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetDesignTypesByRole?id=" + _Role.role_Id, myComplexObject.AccessToken);
            var data = JsonConvert.DeserializeObject<DesignTypes>(result.ToString());
            return Json(data);
        }
        public IActionResult getDesignGroupsByRole([FromBody] Role _Role)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetDesignGroupsByRole?RoleId=" + _Role.role_Id + "&DesignTypeId=" + _Role.designTypeId, myComplexObject.AccessToken);
            var data = JsonConvert.DeserializeObject<DesignGroups>(result.ToString());
            return Json(data);
        }
        public IActionResult getDesignFeaturesByRole([FromBody] Role _Role)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetDesignFeaturesByRole?RoleId=" + _Role.role_Id + "&DesignTypeId=" + _Role.designTypeId + "&DesignGroupId=" + _Role.designGroupeId, myComplexObject.AccessToken);
            var data = JsonConvert.DeserializeObject<DesignFeatures>(result.ToString());

            return Json(data);
        }
        public IActionResult SaveDesignAccess([FromBody] RoleDesignAccess _RoleDesignAccess)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var result = _RoleDesignAccess == null ? null : ApiHelper.PostData(baseAddress, "api/Configuration/SaveRoleDesignAccess", _RoleDesignAccess, myComplexObject.AccessToken);
            return Json(result);
        }
        #endregion DesignAccess

        #region RoleDesignConfiguration
        public IActionResult GetRoleDesignConfigurationByRole([FromQuery] long RoleId)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetAllConfiguredRoleDesignConfiguration?RoleId=" + RoleId + "&OrganisationId=" + myComplexObject.OrganisationId, myComplexObject.AccessToken);
            var result = JsonConvert.DeserializeObject<Model.Management.ConfigureRoot>(response.ToString());
            return Json(result);
        }

        public IActionResult SaveRoleDesignConfiguration([FromBody] RoleDesignConfiguration _RoleDesignConfiguration)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var result = _RoleDesignConfiguration == null ? null : ApiHelper.PostData(baseAddress, "api/Configuration/SaveRoleDesignConfiguration", _RoleDesignConfiguration.SaveRoleDesignConfigurations, myComplexObject.AccessToken);
            return Json(result);
        }
        #endregion RoleDesignConfiguration

        #region Role Assignments
        public IActionResult SaveRoleAssignments([FromBody] RoleAssignment _RoleAssignment)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            _RoleAssignment.organisation_Id = myComplexObject.OrganisationId;
            var result = _RoleAssignment == null ? null : ApiHelper.PostData(baseAddress, "api/Configuration/SaveRoleAssignments", _RoleAssignment, myComplexObject.AccessToken);
            return Json(result.ToString());
        }

        public IActionResult GetRoleAssignmentByUserId([FromQuery] long userId)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetRoleAssignmentByUserId?UserId=" + userId, myComplexObject.AccessToken);
            var result = JsonConvert.DeserializeObject<Model.Role.RootRoleAssignment>(response.ToString());
            return Json(result);
        }
        #endregion Role Assignments

        #region RoleTasks
        public IActionResult SaveRoleTasks([FromBody] TaskOperation _TaskOperation)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            _TaskOperation.RoleTasks.ForEach(x => x.organisation_Id = myComplexObject.OrganisationId);
            var result = _TaskOperation == null ? null : ApiHelper.PostData(baseAddress, "api/Configuration/SaveRoleTask", _TaskOperation.RoleTasks, myComplexObject.AccessToken);
            return Json(result.ToString());
        }

        public IActionResult GetRoleTasks([FromQuery] long roleId)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetAllConfiguredRoleTaskByRoleID?RoleId=" + roleId + "&OrganisationId=" + myComplexObject.OrganisationId, myComplexObject.AccessToken);
            var result = JsonConvert.DeserializeObject<Model.Role.RoleTask>(response.ToString());
            return Json(result);
        }
        #endregion

    }

}
