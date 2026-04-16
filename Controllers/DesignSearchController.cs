using ARCHIVE_DASHBOARD.CustomFilter;
using ARCHIVE_DASHBOARD.Helper;
using ARCHIVE_DASHBOARD.Session;
using ARCHIVE_VIEWER.Models.DesignSearch;
using ARCHIVE_VIEWER.Models.DownloadDesignSpecification;
using ARCHIVE_VIEWER.Models.AccessRoleTask;
using Asp.netCoreReactDemo.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ARCHIVE_VIEWER.Models.SeasonalCollection;


namespace ARCHIVE_VIEWER.Controllers
{
    [TypeFilter(typeof(CheckExpiryTime))]
    public class DesignSearchController : Controller
    {
        private IConfiguration configuration;
        private string baseAddress;

        public DesignSearchController(IConfiguration iConfig)
        {
            configuration = iConfig;
            string host = configuration.GetSection("WebAPIConfiguration").GetSection("Host").Value;
            string path = configuration.GetSection("WebAPIConfiguration").GetSection("Path").Value;
            baseAddress = host + path;
        }

        public IActionResult GetRoleDesignConfigurationByRole([FromQuery] long RoleId, bool IsAI)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetRoleDesignConfigurationByRole?RoleId=" + (RoleId == 0 ? myComplexObject.RoleId : RoleId) + "&IsAI=" + IsAI, myComplexObject.AccessToken);
            //var result = JsonConvert.DeserializeObject<ConfigureRoot>(response.ToString());
            return Json(response);
        }
//         {
//     Console.ReadLine(IsAI);
//     var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
//     var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetRoleDesignConfigurationByRole?RoleId=" + (RoleId == 0 ? myComplexObject.RoleId : RoleId) + "&IsAI=" + IsAI, myComplexObject.AccessToken);
//     //var result = JsonConvert.DeserializeObject<ConfigureRoot>(response.ToString());
//     return Json(response);
// }

        public IActionResult DownloadDesignSpecification([FromBody] folderIdDto fdt)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            fdt.organisation_id = myComplexObject.OrganisationId;
            var response = ApiHelper.PostData(baseAddress, "api/Configuration/DownloadDesignSpecification", fdt, myComplexObject.AccessToken);
            //var result = JsonConvert.DeserializeObject<ConfigureRoot>(response.ToString());
            return Json(response);
        }

        public IActionResult GetFeatureTypeList([FromQuery] string PTPG)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");

            string[] designTypeIdGroupId = PTPG.Split('-');
            //var roleid = designTypeIdGroupId[4].ToString().Trim();
            //var id = (myComplexObject.org_type == 2) ? Convert.ToInt64(designTypeIdGroupId[designTypeIdGroupId.Length - 1]) : myComplexObject.org_type_id;
            var supid = (myComplexObject.org_type == 3) ? Convert.ToInt64(designTypeIdGroupId[designTypeIdGroupId.Length - 1]) : myComplexObject.org_type_id;
            // : myComplexObject.org_type_id; 
            var result1 = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetFolderIdByDesTypeIdDesSupId?DesignTypeId=" + designTypeIdGroupId[0].ToString().Trim() + "&DesignGroupId=" + designTypeIdGroupId[1].ToString().Trim() + "&OrgId=" + myComplexObject.OrganisationId + "&DesignSupplierId=" + supid, myComplexObject.AccessToken);
            // getDesignSearchRequestDto
            var result2 = JsonConvert.DeserializeObject<folderIdDto>(result1.ToString());

            //var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetFeatureTypeList?FolderId=" + result2.folderId, myComplexObject.AccessToken);
            var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetFeatureTypeList?FolderId=" + result2.folderId + "&RoleId=" + myComplexObject.RoleId, myComplexObject.AccessToken);

            var result = JsonConvert.DeserializeObject<List<Feature>>(response.ToString());
            return Json(result);
        }

        public IActionResult GetOrganisationId()
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var mylist = new List<string>();
            mylist.Add(myComplexObject.OrganisationId.ToString());
            mylist.Add(baseAddress.Remove(baseAddress.Length - 1, 1));
            return Json(mylist);
        }

        public IActionResult GetDesignSearchByfolderId([FromBody] GetDesignSearchRequestDto getDesignSearchRequestDto)
        {
            // Console.WriteLine(getDesignSearchRequestDto.DesignTypeIdGroupId);

            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            if (myComplexObject.org_type == 2)
            {
                getDesignSearchRequestDto.SupplierId = myComplexObject.org_type_id;
            }
            if (myComplexObject.org_type == 3)
            {
                getDesignSearchRequestDto.CustomerId = myComplexObject.org_type_id;
            }


            if (getDesignSearchRequestDto.IsBoard)
            {
                var data1 = JsonConvert.SerializeObject(getDesignSearchRequestDto);
                var result11 = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetBoardDetailsByBoard?SupplierId=" + (getDesignSearchRequestDto.userid == 0 ? myComplexObject.userid : getDesignSearchRequestDto.userid) + "&BoardId=" + getDesignSearchRequestDto.id + "&start=" + getDesignSearchRequestDto.Start + "&End=" + getDesignSearchRequestDto.End + "&difference=" + getDesignSearchRequestDto.Difference + "&DesignName=" + getDesignSearchRequestDto.DesignName + "&OrgId=" + myComplexObject.OrganisationId, myComplexObject.AccessToken); //&DesignName=
                return Json(result11);
            }
            else if (getDesignSearchRequestDto.IsCollection)  //isCollection
            {
                var data2 = JsonConvert.SerializeObject(getDesignSearchRequestDto);
                //var result22 = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetCollectionByCollection?SupplierId=" + (getDesignSearchRequestDto.userid == 0 ? myComplexObject.userid : getDesignSearchRequestDto.userid) + "&CollectionId=" + getDesignSearchRequestDto.id + "&start=" + getDesignSearchRequestDto.Start + "&End=" + getDesignSearchRequestDto.End + "&DesignName=" + getDesignSearchRequestDto.DesignName, myComplexObject.AccessToken); //&DesignName=
                //Added By : Vijay Pansande, Added On : 21-01-2023, Purpose Added Designs in broad from collection
                var result22 = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetCollectionByCollection?SupplierId=" + (getDesignSearchRequestDto.userid == 0 ? myComplexObject.userid : getDesignSearchRequestDto.userid) + "&CollectionId=" + getDesignSearchRequestDto.id + "&BoardId=" + getDesignSearchRequestDto.boardId + "&start=" + getDesignSearchRequestDto.Start + "&End=" + getDesignSearchRequestDto.End + "&DesignName=" + getDesignSearchRequestDto.DesignName + "&OrgId=" + myComplexObject.OrganisationId, myComplexObject.AccessToken); //&DesignName=
                return Json(result22);
            }
            string[] designTypeIdGroupId = getDesignSearchRequestDto.DesignTypeIdGroupId.Split('-');
            var result1 = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetFolderIdByDesTypeIdDesSupId?DesignTypeId=" + designTypeIdGroupId[0].ToString().Trim() + "&DesignGroupId=" + designTypeIdGroupId[1].ToString().Trim() + "&OrgId=" + myComplexObject.OrganisationId + "&DesignSupplierId=" + (getDesignSearchRequestDto.roleidtemp == 0 ? myComplexObject.org_type_id : getDesignSearchRequestDto.roleidtemp), myComplexObject.AccessToken);
            // getDesignSearchRequestDto
            var result = JsonConvert.DeserializeObject<folderIdDto>(result1.ToString());
            getDesignSearchRequestDto.FilterSearchRequestDto.FolderId = result.folderId;
            getDesignSearchRequestDto.FolderId = result.folderId.ToString();
            //getDesignSearchRequestDto.FilterSearchRequestDto.features = new Dictionary<string, string>();
            //getDesignSearchRequestDto.Range = new Dictionary<string, string>();
            var data = JsonConvert.SerializeObject(getDesignSearchRequestDto);
            //getDesignSearchRequestDto.collectionId = getDesignSearchRequestDto.id;
            var result2 = ApiHelper.PostData(baseAddress, "api/Configuration/GetDesignSearch", getDesignSearchRequestDto, myComplexObject.AccessToken);
            if (result2 == null)
            {
                result2 = new
                {
                    totalCount = 0,
                    designMaster = new List<Object>()
                };
            }
            return Json(result2);
        }

        //public IActionResult RoleAccessToElement()
        //{
        //    var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
        //    var result1 = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetRoleTaskByRoleID?RoleId=" + myComplexObject.RoleId, myComplexObject.AccessToken);
        //    return Json(result1);
        //}
        public IActionResult RoleAccessToElement([FromQuery] long RoleId)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var result1 = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetRoleTaskByRoleID?RoleId=" + (RoleId == 0 ? myComplexObject.RoleId : RoleId), myComplexObject.AccessToken);
            return Json(result1);
          
        }
        public IActionResult GetDesignInfo([FromBody] folderIdDto fid)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var result2 = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetDesignInfo?FolderId=" + fid.folderId, myComplexObject.AccessToken);
            return Json(result2);
        }
        public IActionResult LoadJson()
        {
            string json = "";
            using (StreamReader r = new StreamReader("jsonColor.json"))
            {
                json += r.ReadToEnd();

            }
            return Json(json);
        }
        public IActionResult SaveToBoardDetails([FromBody] SaveDesignToBoardDto saveDesignToBoardDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            //Added By Vijay Pansande, Added On : 28-12-2022, Purpose : Switch user
            if (saveDesignToBoardDto.boardDetailDto.Bd_Supplier_Id == 0)
            {
                saveDesignToBoardDto.boardDetailDto.Bd_Supplier_Id = myComplexObject.userid;
            }
            //saveDesignToBoardDto.boardDetailDto.Bd_Supplier_Id = myComplexObject.userid;
            var result2 = ApiHelper.PostData(baseAddress, "api/Configuration/SaveBoardDetails", saveDesignToBoardDto, myComplexObject.AccessToken);
            return Json(result2);
        }
        public IActionResult SaveTocollectionDetails([FromBody] SaveDesignToBoardDto saveDesignToBoardDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            saveDesignToBoardDto.collectionDetailDto.Coll_Supplier_Id = myComplexObject.userid;
            //saveDesignToBoardDto.BoardDetailDto.Bd_Supplier_Id = myComplexObject.userid;
            var result2 = ApiHelper.PostData(baseAddress, "api/Configuration/SavecollectionDetails", saveDesignToBoardDto, myComplexObject.AccessToken);
            return Json(result2);
        }
        public IActionResult SaveBoardDetail([FromBody] BoardDetailDto boarddetail)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var result2 = ApiHelper.PostData(baseAddress, "api/Configuration/GetDesignSearch", boarddetail, myComplexObject.AccessToken);
            return Json(result2);
        }
        /*Added By : Vijay Pansande, Add On : 13-03-2023, Purpose : Save Design After creating new collection or board*/
        public IActionResult CreateBoard([FromBody] SaveBoarddto saveBoarddto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            //Added By Vijay Pansande, Added On : 28-12-2022, Purpose : Switch user
            if (saveBoarddto.board_supplier_id == 0)
            {//Convert.ToInt64(result);
                saveBoarddto.board_supplier_id = myComplexObject.userid;
            }
            //saveBoarddto.board_supplier_id = myComplexObject.userid;
            var data = JsonConvert.SerializeObject(saveBoarddto);
            var result = ApiHelper.PostData(baseAddress, "api/Configuration/SaveBoard", saveBoarddto, myComplexObject.AccessToken);
            if (saveBoarddto.state == 0)
            {
                SaveDesignToBoardDto saveDesignToBoardDto = new SaveDesignToBoardDto();
                saveDesignToBoardDto.designDetailsDto = null;
                saveDesignToBoardDto.boardDetailDto = new BoardDetailDto();
                saveDesignToBoardDto.boardDetailDto.Board_id = Convert.ToInt64(result);
                saveDesignToBoardDto.boardDetailDto.bd_Dm_Id = saveBoarddto.bd_Dm_Id;
                saveDesignToBoardDto.boardDetailDto.Bd_Supplier_Id = saveBoarddto.board_supplier_id;
                saveDesignToBoardDto.boardDetailDto.State = 0;
                saveDesignToBoardDto.boardDetailDto.Bd_Created_By = saveBoarddto.board_created_by;
                saveDesignToBoardDto.boardDetailDto.Bd_Customer_id = saveBoarddto.board_customer_id;
                saveDesignToBoardDto.boardDetailDto.Bd_Customer_User_id = saveBoarddto.board_customer_user_id;

                var result2 = ApiHelper.PostData(baseAddress, "api/Configuration/SaveBoardDetails", saveDesignToBoardDto, myComplexObject.AccessToken);
            }
            return Json(result);
        }
        /*Added By : Vijay Pansande, Add On : 16-03-2023, Purpose : Save Design After creating new collection or board*/
        public IActionResult CreateCollection([FromBody] Savecollectiondto savecollectiondto)
        {

            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            savecollectiondto.collection_Supplier_Id = myComplexObject.userid;
            var result = ApiHelper.PostData(baseAddress, "api/Configuration/SaveCollection", savecollectiondto, myComplexObject.AccessToken);
            if (savecollectiondto.state == 0)
            {
                SaveDesignToBoardDto saveDesignToBoardDto = new SaveDesignToBoardDto();
                saveDesignToBoardDto.collectionDetailDto = new CollectionDetailDto();
                saveDesignToBoardDto.designDetailsDto = new DesignDetailsDto();
                saveDesignToBoardDto.collectionDetailDto.Coll_Supplier_Id = myComplexObject.userid;
                saveDesignToBoardDto.collectionDetailDto.Coll_Dm_Id = savecollectiondto.designDetailsDto.designId;
                saveDesignToBoardDto.collectionDetailDto.Collection_Id = Convert.ToInt64(result);
                saveDesignToBoardDto.collectionDetailDto.Coll_Supplier_Id = myComplexObject.userid;
                saveDesignToBoardDto.designDetailsDto = savecollectiondto.designDetailsDto;
                var result2 = ApiHelper.PostData(baseAddress, "api/Configuration/SavecollectionDetails", saveDesignToBoardDto, myComplexObject.AccessToken);
            }
            return Json(result);
        }

        public IActionResult GetBoardList([FromQuery] long id, long custBoardId, long suppcustid)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            ///api/Configuration/GetBoardList
            
            var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetBoardList?SupplierId=" + (id == 0 ? myComplexObject.userid : id) + "&OrgannisationId=" + myComplexObject.OrganisationId + "&CustomerId=" + suppcustid + "&Createdby=" + custBoardId, myComplexObject.AccessToken);
            return Json(result);
        }

        public IActionResult GetCollectionList([FromQuery] long id)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            ///api/Configuration/GetBoardList
            var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetCollectionList?SupplierId=" + (id == 0 ? myComplexObject.userid : id) + "&OrgannisationId=" + myComplexObject.OrganisationId, myComplexObject.AccessToken);
            return Json(result);
        }

        public IActionResult GetCollectionListByCollection([FromBody] GetListQueryDto getlistquerydto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetCollectionByCollection?SupplierId=" + (getlistquerydto.userid == 0 ? myComplexObject.userid : getlistquerydto.userid) + "&CollectionId=" + getlistquerydto.id + "&start=" + getlistquerydto.start + "&End=" + getlistquerydto.end, myComplexObject.AccessToken);
            return Json(result);
        }
        ///api/Configuration/GetBoardDetailsByBoard
        public IActionResult GetBoardDetailsByBoard([FromBody] GetListQueryDto getlistquerydto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetBoardDetailsByBoard?SupplierId=" + (getlistquerydto.userid == 0 ? myComplexObject.userid : getlistquerydto.userid) + "&BoardId=" + getlistquerydto.id + "&start=" + getlistquerydto.start + "&End=" + getlistquerydto.end, myComplexObject.AccessToken);
            return Json(result);
        }

        public IActionResult GetAllCollectionDetails([FromQuery] long id)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");

            var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetAllCollectionDetails?SupplierId=" + (id == 0 ? myComplexObject.userid : id), myComplexObject.AccessToken);
            return Json(result);
        }

        public IActionResult GetAllBoardDetails([FromQuery] long id)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");

            var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetAllBoardDetails?SupplierId=" + (id == 0 ? myComplexObject.userid : id), myComplexObject.AccessToken);
            return Json(result);
        }

        public IActionResult GetALLDesign([FromBody] GetDesignSearchRequestDto getDesignSearchRequestDto)
        {

            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");

            if (getDesignSearchRequestDto.IsBoard)
            {
                var result11 = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetBoardDetailsforPdf?SupplierId=" + (getDesignSearchRequestDto.userid == 0 ? myComplexObject.userid : getDesignSearchRequestDto.userid) + "&BoardId=" + getDesignSearchRequestDto.id, myComplexObject.AccessToken);
                return Json(result11);
            }
            else if (getDesignSearchRequestDto.IsCollection)
            {
                var result22 = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetCollectionforPdf?SupplierId=" + (getDesignSearchRequestDto.userid == 0 ? myComplexObject.userid : getDesignSearchRequestDto.userid) + "&CollectionId=" + getDesignSearchRequestDto.id, myComplexObject.AccessToken);
                return Json(result22);
            }
            string[] designTypeIdGroupId = getDesignSearchRequestDto.DesignTypeIdGroupId.Split('-');
            var result1 = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetFolderIdByDesTypeIdDesSupId?DesignTypeId=" + designTypeIdGroupId[0].ToString().Trim() + "&DesignGroupId=" + designTypeIdGroupId[1].ToString().Trim() + "&OrgId=" + myComplexObject.OrganisationId + "&DesignSupplierId=" + (getDesignSearchRequestDto.roleidtemp == 0 ? myComplexObject.org_type_id : getDesignSearchRequestDto.roleidtemp), myComplexObject.AccessToken);

            var result = JsonConvert.DeserializeObject<folderIdDto>(result1.ToString());
            getDesignSearchRequestDto.FilterSearchRequestDto.FolderId = result.folderId;
            getDesignSearchRequestDto.FolderId = result.folderId.ToString();

            var result2 = ApiHelper.PostData(baseAddress, "api/Configuration/GetDesignSearch", getDesignSearchRequestDto, myComplexObject.AccessToken);
            if (result2 == null)
            {
                result2 = new
                {
                    totalCount = 0,
                    designMaster = new List<Object>()
                };
            }
            return Json(result2);
        }

        public IActionResult getAllSeason([FromBody] GetClzSeasonMasterListBySupplierIdRequestDto getSeasonListObj)
        {
            GetClzCollectionMasterListBySeasonIdRequestDto getCollectionMaster = new GetClzCollectionMasterListBySeasonIdRequestDto();
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            getSeasonListObj.Organization_Id = myComplexObject.OrganisationId;
            if (getSeasonListObj.SupplierId == 0 && getSeasonListObj.customerId != 0)
            {
                getSeasonListObj.customerId = getSeasonListObj.customerId;
            }
            else if (getSeasonListObj.SupplierId != 0 && getSeasonListObj.customerId == 0)
            {
                getSeasonListObj.SupplierId = getSeasonListObj.SupplierId;

            }
            else if (getSeasonListObj.SupplierId == 0 && myComplexObject.org_type == 2)
            {
                getSeasonListObj.SupplierId = myComplexObject.org_type_id;
            }
            else if (getSeasonListObj.SupplierId == 0 && myComplexObject.org_type == 3)
            {
                getSeasonListObj.customerId = myComplexObject.org_type_id;
            }
            dynamic result1 = ApiHelper.PostData(baseAddress, "api/Configuration/CollezioniGetClzSeasonMasterListBySupplierId", getSeasonListObj, myComplexObject.AccessToken);
            GetClzSeasonMasterListBySupplierIdResponseDto data = JsonConvert.DeserializeObject<GetClzSeasonMasterListBySupplierIdResponseDto>(result1);
            if (data != null && data.SeasonNameIdDto.Count > 0)
            {
                if (getSeasonListObj.SupplierId == 0 && getSeasonListObj.customerId != 0)
                {
                    getCollectionMaster.customerId = getSeasonListObj.customerId;
                }
                else if (getSeasonListObj.SupplierId != 0 && getSeasonListObj.customerId == 0)
                {
                    getCollectionMaster.SupplierId = getSeasonListObj.SupplierId;

                }
                else if (getSeasonListObj.SupplierId == 0 && myComplexObject.org_type == 2)
                {
                    getCollectionMaster.SupplierId = myComplexObject.org_type_id;
                }
                else if (getSeasonListObj.SupplierId == 0 && myComplexObject.org_type == 3)
                {
                    getCollectionMaster.customerId = myComplexObject.org_type_id;
                }
                getCollectionMaster.SeasonId = data.SeasonNameIdDto[0].SeasonId;
                getCollectionMaster.Organization_Id = myComplexObject.OrganisationId;
                var result2 = ApiHelper.PostData(baseAddress, "api/Configuration/CollezioniGetClzCollectionMasterListBySeasonId	", getCollectionMaster, myComplexObject.AccessToken);
                return Json(new { result1, result2 });
            }
            else
            {
                GetClzSeasonMasterListBySupplierIdResponseDto obj = new GetClzSeasonMasterListBySupplierIdResponseDto();
                return Json(new { result1, result2 = obj });
            }
        }
        public IActionResult getSeasonWiseColListObj([FromBody] GetClzCollectionMasterListBySeasonIdRequestDto getSeasonWiseColListObj)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");

            if (getSeasonWiseColListObj.SupplierId == 0 && getSeasonWiseColListObj.customerId != 0)
            {
                getSeasonWiseColListObj.customerId = getSeasonWiseColListObj.customerId;

            }
            else if (getSeasonWiseColListObj.SupplierId != 0 && getSeasonWiseColListObj.customerId == 0)
            {
                getSeasonWiseColListObj.SupplierId = getSeasonWiseColListObj.SupplierId;

            }
            else if (getSeasonWiseColListObj.SupplierId == 0 && myComplexObject.org_type == 3)
            {
                getSeasonWiseColListObj.customerId = myComplexObject.org_type_id;

            }
            else if (getSeasonWiseColListObj.SupplierId == 0 && myComplexObject.org_type == 2)
            {
                getSeasonWiseColListObj.customerId = myComplexObject.org_type_id;
            }
            getSeasonWiseColListObj.Organization_Id = myComplexObject.OrganisationId;
            var result1 = ApiHelper.PostData(baseAddress, "api/Configuration/CollezioniGetClzCollectionMasterListBySeasonId	", getSeasonWiseColListObj, myComplexObject.AccessToken);
            return Json(result1);
        }

        public IActionResult getCatalougeNameByCollectionName([FromBody] GetClzCatalougeNameByCollectionNameRequestDto getCatalougeNameByCollectionName)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            GetCollectionCardsRequestDto getCollectionCards = new GetCollectionCardsRequestDto();
            if (getCatalougeNameByCollectionName.customerId != 0 && getCatalougeNameByCollectionName.SupplierId == 0)
            {
                getCatalougeNameByCollectionName.customerId = getCatalougeNameByCollectionName.customerId;

            }
            else if (getCatalougeNameByCollectionName.customerId == 0 && getCatalougeNameByCollectionName.SupplierId != 0)
            {
                getCatalougeNameByCollectionName.SupplierId = getCatalougeNameByCollectionName.SupplierId;

            }
            else if (getCatalougeNameByCollectionName.customerId == 0 && myComplexObject.org_type == 3)
            {
                getCatalougeNameByCollectionName.customerId = myComplexObject.org_type_id;

            }
            else if (getCatalougeNameByCollectionName.customerId == 0 && myComplexObject.org_type == 2)
            {
                getCatalougeNameByCollectionName.SupplierId = myComplexObject.org_type_id;

            }
            dynamic result1 = ApiHelper.PostData(baseAddress, "api/Configuration/CollezioniGetClzCatalougeNameByCollectionName	", getCatalougeNameByCollectionName, myComplexObject.AccessToken);
            GetClzCatalougeNameByCollectionNameResponseDto data = JsonConvert.DeserializeObject<GetClzCatalougeNameByCollectionNameResponseDto>(result1);
            if (data.CollectionNameCatalogueDto.Count > 0)
            {
                getCollectionCards.CollectionId = data.CollectionNameCatalogueDto[0].CollectionId;
                getCollectionCards.CollectionType = data.CollectionNameCatalogueDto[0].CollectionType;
                getCollectionCards.ProductTypeId = data.CollectionNameCatalogueDto[0].ProductTypeId;
                getCollectionCards.ProductGroupId = data.CollectionNameCatalogueDto[0].ProductGroupId;
                getCollectionCards.OrganizationId = myComplexObject.OrganisationId;
                var result2 = ApiHelper.PostData(baseAddress, "api/Configuration/CollezioniGetCollectionCards", getCollectionCards, myComplexObject.AccessToken);
                return Json(new { result1, result2 });
            }
            else
            {
                SeasonNameIdDto obj = new SeasonNameIdDto();
                return Json(new { result1, result2 = obj });
            }
        }

        public IActionResult getCollectionCards([FromBody] GetCollectionCardsRequestDto getCollectionCards)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            getCollectionCards.OrganizationId = myComplexObject.OrganisationId;
            var result1 = ApiHelper.PostData(baseAddress, "api/Configuration/CollezioniGetCollectionCards", getCollectionCards, myComplexObject.AccessToken);
            return Json(result1);
        }

        public IActionResult GetSupplierById([FromQuery] long id)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetSupplierById?supplierid=" + (id == 0 ? myComplexObject.org_type_id : id), myComplexObject.AccessToken);
            return Json(response);

        }

        public IActionResult GetCustomerById([FromQuery] long id)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetCustomerById?customerid=" + id, myComplexObject.AccessToken);
            return Json(response);

        }

        //Added By : Vijay Pansande, Add On : 20-03-2023, Purpose : Get design for thumb controller in seasonal 
        public IActionResult DesignThumbForSeasonal([FromBody] CollezioniGetDesignByCollectionIdRequestDto seasonalDesign)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            seasonalDesign.OrganisationId = myComplexObject.OrganisationId;
           var response = ApiHelper.PostData(baseAddress, "api/Configuration/CollezioniGetDesignByCollectionId", seasonalDesign, myComplexObject.AccessToken);
            return Json(response);
        }

        public IActionResult PdfBoard([FromBody] PdfBoardRequest pdfBoardRequest)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            if (myComplexObject.org_type == 2)
            {
                pdfBoardRequest.supplierid = myComplexObject.org_type_id;
                pdfBoardRequest.SupplierUserId = myComplexObject.userid;
            }
            if (myComplexObject.org_type == 3)
            {
                pdfBoardRequest.customerid = myComplexObject.org_type_id;
            }
            pdfBoardRequest.OrgannisationId = myComplexObject.OrganisationId;
            var result = ApiHelper.PostData(baseAddress, "api/Configuration/PdfBoard",pdfBoardRequest, myComplexObject.AccessToken);
            return Json(result);
        }

        public IActionResult PdfCollection([FromBody] PdfCollectionRequest pdfCollectionRequest)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            if(myComplexObject.org_type == 2)
            {
                pdfCollectionRequest.supplierid = myComplexObject.org_type_id;
                pdfCollectionRequest.SupplierUserId = myComplexObject.userid;
            }
            if(myComplexObject.org_type == 3)
            {
                pdfCollectionRequest.supplierid = pdfCollectionRequest.supplierid;
            }
           
            pdfCollectionRequest.OrgannisationId = myComplexObject.OrganisationId;
            var result = ApiHelper.PostData(baseAddress, "api/Configuration/PdfCollection",pdfCollectionRequest, myComplexObject.AccessToken);
            return Json(result);
        }
        //Added By : Abhishek, Add On : 18-04-2023, Purpose : Get design Colrways 
        public IActionResult GetDesignsColorways([FromQuery] string FolderId, string designname, string Article, string Design, string designstate)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetDesignsColorways?FolderId=" + FolderId + "&designname=" + designname + "&Article=" + Article + "&Design=" + Design+ "&designstate=" + designstate, myComplexObject.AccessToken);
            return Json(response);

        }
        public IActionResult Q3durl()
        {
            string url = configuration.GetSection("Q3dURL").GetSection("Url").Value;
            return Json(url);
        }

        public IActionResult GetCommonSupCustConfiguration([FromBody] GetSupCustConfigurationRequestDto getSupCustConfigurationRequestDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var result = ApiHelper.PostData(baseAddress, "api/Configuration/GetCommonSupCustConfiguration",getSupCustConfigurationRequestDto, myComplexObject.AccessToken);
            return Json(result);
        }

        public IActionResult GetCommonSupCustConfiguration_AI([FromBody] GetSupCustConfiguration_AIRequestDto getSupCustConfiguration_AIRequestDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var result = ApiHelper.PostData(baseAddress, "api/Configuration/GetCommonSupCustConfiguration_AI", getSupCustConfiguration_AIRequestDto, myComplexObject.AccessToken);
            return Json(result);
        }
    }
}
