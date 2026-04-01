using ARCHIVE_DASHBOARD.CustomFilter;
using ARCHIVE_DASHBOARD.Helper;
using ARCHIVE_DASHBOARD.Session;
using Asp.netCoreReactDemo.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ARCHIVE_DASHBOARD.Model.Seasonal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static ARCHIVE_DASHBOARD.Model.Seasonal.SeasonalCollection;
using Newtonsoft.Json;
using ARCHIVE_DASHBOARD.Model.Design;

namespace ARCHIVE_DASHBOARD.Controllers
{
    [TypeFilter(typeof(CheckExpiryTime))]
    public class SeasonalController : Controller
    {
        private IConfiguration configuration;
        private string baseAddress;
        public SeasonalController(IConfiguration iConfig)
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
        public IActionResult GetSeasonMastersList([FromBody] SeasonalCollectionListRequestDto seasonalCollectionListRequestDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            string url = "api/Configuration/CollezioniGetSeasonMastersList?OrganisationId="+ myComplexObject.OrganisationId + "&SupplierId="+ myComplexObject.org_type_id + "&Start="+seasonalCollectionListRequestDto.Start + "&End="+seasonalCollectionListRequestDto.End;
            var response = ApiHelper.GetDataNewQS(baseAddress, url, myComplexObject.AccessToken);
            var result = JsonConvert.DeserializeObject<GetSeasonMastersListResponseDto>(response.ToString());
            int i = 0;
            foreach (var item in result.SeasonMastersList)
            {
                i++;
                if (seasonalCollectionListRequestDto.Start == 0)
                    item.srNo = seasonalCollectionListRequestDto.Start + i;
                else
                    item.srNo = seasonalCollectionListRequestDto.Start + i;
            }
            return Json(result);
        }
        public IActionResult SaveCollectionDetailsOnSeasonID([FromBody] List<CollectionDetailDto> collectionDetailDto) //List<CollectionDetailDto> 
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            //collectionDetailDto.Coll_Supplier_Id = myComplexObject.org_type_id;
            //collectionDetailDto.Coll_Created_By = myComplexObject.Userid;
            foreach (var item in collectionDetailDto)
            {
                item.Coll_Supplier_Id = myComplexObject.org_type_id;
                item.Coll_Created_By = myComplexObject.Userid;
            }

            var response = ApiHelper.PostData(baseAddress, "api/Configuration/SaveCollectionDetailsOnSeasonID", collectionDetailDto, myComplexObject.AccessToken);
            var result = JsonConvert.DeserializeObject<SaveCollectionResponseDto>(response.ToString());
            return Json(result);
        }
        public IActionResult CollezioniSaveSeasonMasters([FromBody] SaveSeasonMastersRequestDto saveSeasonMastersRequestDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            saveSeasonMastersRequestDto.Sm_Organization_Id = myComplexObject.OrganisationId;
            saveSeasonMastersRequestDto.Sm_Created_By = myComplexObject.Userid;
            saveSeasonMastersRequestDto.Sm_Supplier_Id = myComplexObject.org_type_id;
            if (saveSeasonMastersRequestDto.imageiamgebase64 != null)
            {
                saveSeasonMastersRequestDto.SeasonIamge = System.Convert.FromBase64String(saveSeasonMastersRequestDto.imageiamgebase64);
            }
            //if (saveSeasonMastersRequestDto.State == 0)
            //{
            //    saveSeasonMastersRequestDto.SeasonIamge = System.Convert.FromBase64String(saveSeasonMastersRequestDto.imageiamgebase64);
            //}
            //saveSeasonMastersRequestDto.SeasonIamge = System.Convert.FromBase64String(saveSeasonMastersRequestDto.imageiamgebase64);
            var response = ApiHelper.PostData(baseAddress, "api/Configuration/CollezioniSaveSeasonMasters", saveSeasonMastersRequestDto, myComplexObject.AccessToken);
            //var result = JsonConvert.DeserializeObject<SaveSeasonMastersRequestDto>(response.ToString());
            return Json(response);
        }
        public IActionResult GetCollectionDesignBySeasonId([FromBody] GetCollectionDesignBySeasonIdRequestDto getCollectionDesignBySeasonIdRequestDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            getCollectionDesignBySeasonIdRequestDto.OrganisationId = myComplexObject.OrganisationId;
            var result2 = ApiHelper.PostData(baseAddress, "api/Configuration/GetCollectionDesignBySeasonId", getCollectionDesignBySeasonIdRequestDto, myComplexObject.AccessToken);
            return Json(result2);
        }
        public IActionResult CollezioniSearchSeasonMastersList([FromBody] SeasonSearchDto seasonSearchDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            //api/Configuration/CollezioniSearchSeasonMastersList?OrganisationId=1&SupplierId=2&SearchString=3&Start=4&End=5
            var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/CollezioniSearchSeasonMastersList?OrganisationId=" + myComplexObject.OrganisationId + "&SupplierId=" + myComplexObject.org_type_id + "&SearchString=" + seasonSearchDto.SearchString + "&Start="+seasonSearchDto.Start + "&End="+seasonSearchDto.End, myComplexObject.AccessToken);
            var result = JsonConvert.DeserializeObject<GetSeasonMastersListResponseDto>(response.ToString());
            int i = 0;
            int start = 0;
            foreach (var item in result.SeasonMastersList)
            {
                i++;
                if (start == 0)
                    item.srNo = start + i;
                else
                    item.srNo = start + i;
            }
            return Json(result);
        }
        public IActionResult CollezioniGetSeasonMastersById(long SeasonId)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            GetSeasonMastersByIdRequestDto getSeasonMastersByIdRequestDto = new GetSeasonMastersByIdRequestDto();
            getSeasonMastersByIdRequestDto.SeasonId = SeasonId;
            getSeasonMastersByIdRequestDto.Organization_Id = myComplexObject.OrganisationId;

            var result = ApiHelper.PostData(baseAddress, "api/Configuration/CollezioniGetSeasonMastersById", getSeasonMastersByIdRequestDto, myComplexObject.AccessToken);
            var data = JsonConvert.DeserializeObject<GetSeasonMastersByIdResponse>(result.ToString());
            return Json(data);


            ////var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            //var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/CollezioniGetSeasonMastersById?SeasonId=" + SeasonId, myComplexObject.AccessToken);
            //var data = JsonConvert.DeserializeObject<GetSeasonMastersByIdResponse>(result.ToString());
            //return Json(data);
        }
        public IActionResult GetCollectionListBySeasonId([FromBody] CollectionListRequestDto collectionListRequestDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            string url = "api/Configuration/GetCollectionListBySeasonId?SeasonId=" + collectionListRequestDto.SeasonId + "&Start=" + collectionListRequestDto.Start + "&End=" + collectionListRequestDto.End;
            var response = ApiHelper.GetDataNewQS(baseAddress, url, myComplexObject.AccessToken);
            var result = JsonConvert.DeserializeObject<GetCollectionListBySeasonIdResponseDto>(response.ToString());
            int i = 0;
            //int start = collectionListRequestDto.Start;
            //int start = 0;
            foreach (var item in result.MyCollection)
            {
                i++;
                if (collectionListRequestDto.Start == 0)
                    item.srNo = collectionListRequestDto.Start + i;
                else
                    item.srNo = collectionListRequestDto.Start + i;
            }
            return Json(result);
        }
        public IActionResult SaveCollectionBySeasonId([FromBody] SaveCollectionRequestDto saveCollectionRequestDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            saveCollectionRequestDto.Collection_Organisation_Id = myComplexObject.OrganisationId;
            saveCollectionRequestDto.Collection_Created_By = myComplexObject.Userid;
            saveCollectionRequestDto.Collection_Supplier_Id = myComplexObject.org_type_id;
            //saveCollectionRequestDto.Collection_Customer_Id = myComplexObject.Userid;
            if (saveCollectionRequestDto.imageiamgebase64 != null)
            {
                saveCollectionRequestDto.CollectionIamge = System.Convert.FromBase64String(saveCollectionRequestDto.imageiamgebase64);
            }
            var response = ApiHelper.PostData(baseAddress, "api/Configuration/SaveCollectionBySeasonId", saveCollectionRequestDto, myComplexObject.AccessToken);
            return Json(response);
        }
        public IActionResult SearchCollectionListBySeasonId([FromBody] CollectionsearchDto collectionsearchDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/SearchCollectionListBySeasonId?SeasonId=" + collectionsearchDto.SeasonId + "&SearchString=" + collectionsearchDto.SearchString + "&Start=" + collectionsearchDto.Start + "&End=" + collectionsearchDto.End, myComplexObject.AccessToken);
            var result = JsonConvert.DeserializeObject<GetCollectionListBySeasonIdResponseDto>(response.ToString());
            int i = 0;
            int start = 0;
            foreach (var item in result.MyCollection)
            {
                i++;
                if (start == 0)
                    item.srNo = start + i;
                else
                    item.srNo = start + i;
            }
            return Json(result);
        }
        public IActionResult GetCollectionById(long CollectionId)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetCollectionById?CollectionId=" + CollectionId, myComplexObject.AccessToken);
            var data = JsonConvert.DeserializeObject<GetCollectionByIdResponseDto>(result.ToString());
            return Json(data);
        }
        public IActionResult GetConfiguredCustomerList()
        {

            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetConfiguredCustomersList?OrganisationId=" + myComplexObject.OrganisationId + "&SupplierId=" + myComplexObject.org_type_id, myComplexObject.AccessToken);
            var data = JsonConvert.DeserializeObject<customerList>(result.ToString());
            return Json(data);
        }
        public IActionResult CollezioniGetDesignByCollectionId([FromBody] CollezioniGetDesignByCollectionIdRequestDto cllezioniGetDesignByCollectionIdRequestDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            cllezioniGetDesignByCollectionIdRequestDto.OrganisationId = myComplexObject.OrganisationId;
            var result2 = ApiHelper.PostData(baseAddress, "api/Configuration/CollezioniGetDesignByCollectionId", cllezioniGetDesignByCollectionIdRequestDto, myComplexObject.AccessToken);
            return Json(result2);
        }
    }
}
