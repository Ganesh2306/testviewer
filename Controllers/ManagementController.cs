using ARCHIVE_DASHBOARD.CustomFilter;
using ARCHIVE_DASHBOARD.Helper;
using ARCHIVE_DASHBOARD.Model.Management;
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
    public class ManagementController : Controller
    {
        private IConfiguration configuration;
        private string baseAddress;
        public ManagementController(IConfiguration iConfig)
        {
            configuration = iConfig;
            string host = configuration.GetSection("WebAPIConfiguration").GetSection("Host").Value;
            string path = configuration.GetSection("WebAPIConfiguration").GetSection("Path").Value;
            baseAddress = host + path;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult GetDesignConfigurationByOrganisationID()
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            string url = "api/Configuration/GetDesignConfigurationByOrganisationID?OrganisationId=" + myComplexObject.OrganisationId;
            var response = ApiHelper.GetDataNewQS(baseAddress, url, myComplexObject.AccessToken);
            var result = JsonConvert.DeserializeObject<ConfigureRoot>(response.ToString());
            foreach (var item in result.allDesignTypesByRoles)
            {
                foreach (var group in item.getDesignGroupsByRoleListDto)
                {
                    group.design_type_id = item.design_type_id;
                    foreach (var feature in group.getDesignFeaturesByRoleListDto)
                    {
                        feature.design_type_id = item.design_type_id;
                        feature.design_groups_id = group.design_groups_id;
                    }
                }
            }
            if (result != null)
                return Json(result.allDesignTypesByRoles);
            else
                return Json(new ConfigureRoot());

        }
        public IActionResult GetDesignTypeByOrgId()
        {

            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            string url = "api/Configuration/GetDesignTypeByOrgId?OrganisationId=" + myComplexObject.OrganisationId;
            var response = ApiHelper.GetDataNewQS(baseAddress, url, myComplexObject.AccessToken);
            var result = JsonConvert.DeserializeObject<RootTypeID>(response.ToString());
            var Ctypes = result.allDesignTypesByRoles;
            List<DesignTypeList> types = Gettypes();
            foreach (var item in types)
            {
                item.selected = Ctypes.Any(obj => obj.design_type_id == item.design_Type_Id);
                item.design_configuration_id = Ctypes.Where(obj => obj.design_type_id == item.design_Type_Id).Select(obj => obj.design_configuration_id).FirstOrDefault();
            }

            if (types != null)
                return Json(types);
            else
                return Json(new RootTypeID());

        }
        public IActionResult GetDesignGroupByOrgId([FromBody] inputid inputid)
        {

            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            string url = "api/Configuration/GetDesignGroupByDesignType?DesignTypeId=" + inputid.TypeID + "&OrganisationId=" + myComplexObject.OrganisationId;
            var response = ApiHelper.GetDataNewQS(baseAddress, url, myComplexObject.AccessToken);
            var result = JsonConvert.DeserializeObject<Rootgroup>(response.ToString());
            var cgroups = result.allDesignGroupsByRoles;
            List<DesignGroupList> groups = GetGroups();
            foreach (var item in groups)
            {
                item.selected = cgroups.Any(obj => obj.design_groups_id == item.design_Group_Id);
                item.design_configuration_id = cgroups.Where(obj => obj.design_groups_id == item.design_Group_Id).Select(obj => obj.design_configuration_id).FirstOrDefault();
            }
            if (groups != null)
                return Json(groups);
            else
                return Json(new Rootgroup());

        }
        public IActionResult GetDesignFeatureByOrgId([FromBody] inputid inputid)
        {

            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            string url = "api/Configuration/GetDesignFeatureByDesignTypeDesignGroup?DesignTypeId=" + inputid.GroupId + "&DesignGroupId=" + inputid.TypeID + "&OrganisationId=" + myComplexObject.OrganisationId; 
            var response = ApiHelper.GetDataNewQS(baseAddress, url, myComplexObject.AccessToken);
            var result = JsonConvert.DeserializeObject<RootFeature>(response.ToString());
            var Cfeatures = result.allDesignFeatursByRoles;
            Paging paging = new Paging() { Start = 0, End = 0 };
            List<GetDesignFeatureList> features = GetfeaturefforConfi(paging);
            foreach (var item in features)
            {
                item.selected = Cfeatures.Any(obj => obj.design_features_id == item.design_Feature_Id);
                item.design_configuration_id = Cfeatures.Where(obj => obj.design_features_id == item.design_Feature_Id).Select(obj => obj.design_configuration_id).FirstOrDefault();
            }
            if (features != null)
                return Json(features);
            else
                return Json(new RootFeature());

        }

        //listing method of type group features
        public IActionResult GetDesignTypeList()
        {

            var result = Gettypes();

            if (result != null)
                return Json(result);
            else
                return Json(new TypeRoot());
        }
        [NonAction]
        public List<DesignTypeList> Gettypes()
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetDesignTypeList?OrganisationId="+myComplexObject.OrganisationId, myComplexObject.AccessToken);
            var result = JsonConvert.DeserializeObject<TypeRoot>(response.ToString());
            return result.allDesignTypeList;

        }
        public IActionResult GetDesignGroupList()
        {

            var result = GetGroups();
            if (result != null)
                return Json(result);
            else
                return Json(new GroupRoot());
        }

        [NonAction]
        public List<DesignGroupList> GetGroups()
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetDesignGroupList?OrganisationId=" + myComplexObject.OrganisationId, myComplexObject.AccessToken);
            var result = JsonConvert.DeserializeObject<GroupRoot>(response.ToString());
            return result.allDesignGroupList;

        }
        public IActionResult GetDesignFeatures([FromBody] Paging  paging)
        {

            var result = Getfeature(paging);
            int i = 0;
            foreach (var item in result.getDesignFeatureList)
            {
                i++;
                if (paging.Start == 0)
                    item.srNo = paging.Start + i;
                else
                    item.srNo = paging.Start + i;
            }
            if (result != null)
                return Json(result);
            else
                return Json(new RootDesignFeaturesList());
        }
        public IActionResult DesignFeautreSearch([FromBody] Paging paging)
        {

            var result = Searchfeature(paging);
            if (result != null)
                return Json(result);
            else
                return Json(new RootDesignFeaturesList());
        }
        [NonAction]
        public RootDesignFeaturesList Getfeature(Paging paging)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            paging.OrgannisationId = myComplexObject.OrganisationId;
            var response = ApiHelper.PostData(baseAddress, "api/Configuration/GetDesignFeatureList", paging, myComplexObject.AccessToken);
            var result = JsonConvert.DeserializeObject<RootDesignFeaturesList>(response.ToString());

            int i = 0;
            foreach (var item in result.getDesignFeatureList)
            {
                i++;
                if (paging.Start == 0)
                    item.srNo = paging.Start + i;
                else
                    item.srNo = paging.Start + i;
            }
            return result;

        }
        [NonAction]
        public List<GetDesignFeatureList> GetfeaturefforConfi(Paging paging)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            paging.OrgannisationId = myComplexObject.OrganisationId;
            var response = ApiHelper.PostData(baseAddress, "api/Configuration/GetDesignFeatureList", paging, myComplexObject.AccessToken);
            var result = JsonConvert.DeserializeObject<RootDesignFeaturesList>(response.ToString());

            int i = 0;
            foreach (var item in result.getDesignFeatureList)
            {
                i++;
                if (paging.Start == 0)
                    item.srNo = paging.Start + i;
                else
                    item.srNo = paging.Start + i;
            }
            return result.getDesignFeatureList;

        }
        [NonAction]
        public RootDesignFeaturesList Searchfeature(Paging paging)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            paging.OrgannisationId = myComplexObject.OrganisationId;
            var response = ApiHelper.PostData(baseAddress, "api/Configuration/SearchDesignFeatureList", paging, myComplexObject.AccessToken);
            var result = JsonConvert.DeserializeObject<RootDesignFeaturesList>(response.ToString());

            int i = 0;
            foreach (var item in result.getDesignFeatureList)
            {
                i++;
                if (paging.Start == 0)
                    item.srNo = paging.Start + i;
                else
                    item.srNo = paging.Start + i;
            }
            return result;

        }
        public IActionResult SaveFeature([FromBody] List<SaveFeatureRequestDto> root)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            foreach (var item in root)
            {
                //item.created_By = myComplexObject.org_type == 1 ? myComplexObject.OrganisationId : myComplexObject.org_type_id;
                item.organisation_Id = myComplexObject.OrganisationId;

            }
            var result = ApiHelper.PostData(baseAddress, "api/Configuration/SaveDesignFeature", root, myComplexObject.AccessToken);
            return Json(result);
        }
        public IActionResult SaveDesignConfiguartion([FromBody] List<SaveDesignConfiguartion> root)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            foreach (var item in root)
            {
                item.organisation_id = myComplexObject.OrganisationId;


            }

            var result = ApiHelper.PostData(baseAddress, "api/Configuration/SaveDesignConfiguration", root, myComplexObject.AccessToken);
            return Json(result);
        }
        public IActionResult SaveDesignType([FromBody] List<SaveDesignTypeRequestDto> root)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            foreach (var item in root)
            {
                //item.Created_By = myComplexObject.org_type == 1 ? myComplexObject.OrganisationId : myComplexObject.org_type_id;
                item.Organisation_Id = myComplexObject.OrganisationId;

            }

            var result = ApiHelper.PostData(baseAddress, "api/Configuration/SaveDesignType", root, myComplexObject.AccessToken);
            return Json(result);
        }
        public IActionResult SaveDesignGroup([FromBody] List<SaveDesignGroupRequestDto> root)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            foreach (var item in root)
            {
                //item.Created_By = myComplexObject.org_type;
                item.Organisation_Id = myComplexObject.OrganisationId;

            }
            var result = ApiHelper.PostData(baseAddress, "api/Configuration/SaveDesignGroup", root, myComplexObject.AccessToken);
            return Json(result);
        }
        public IActionResult CheckDesignType([FromBody] List<CheckExist> checkExist)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
           
            var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/CheckDesignType?Type_Name="+ checkExist[0].Type_Name + "&OrganisationId="+ myComplexObject .OrganisationId+ "", myComplexObject.AccessToken);
            return Json(result);
        }
        public IActionResult CheckDesignGroup([FromBody] List<CheckExist> checkExist)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");

            var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/CheckDesignGroup?Group_Name=" + checkExist[0].Group_Name + "&OrganisationId=" + myComplexObject.OrganisationId + "", myComplexObject.AccessToken);
            return Json(result);
        }
        public IActionResult CheckDesignFeature([FromBody] List<CheckExist> checkExist)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");

            var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/CheckDesignFeature?Feature_Name=" + checkExist[0].Feature_Name + "&OrganisationId=" + myComplexObject.OrganisationId + "", myComplexObject.AccessToken);
            return Json(result);
        }
    }
}
