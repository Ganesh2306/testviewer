using ARCHIVE_DASHBOARD.Helper;
using ARCHIVE_DASHBOARD.Model.ThreeD;
using ARCHIVE_DASHBOARD.Model.ThreeD.Query;
using ARCHIVE_DASHBOARD.Session;
using Asp.netCoreReactDemo.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using static ARCHIVE_DASHBOARD.Model.ThreeD.TdImageConfigurationByFullViewAndShowroom;

namespace ARCHIVE_DASHBOARD.Controllers
{
    public class ThreeDController : Controller
    {
        private IConfiguration configuration;
        private string baseAddress;
        public ThreeDController(IConfiguration iConfig)
        {
            configuration = iConfig;
            string host = configuration.GetSection("WebAPIConfiguration").GetSection("Host").Value;
            string path = configuration.GetSection("WebAPIConfiguration").GetSection("Path").Value;
            baseAddress = host + path;
        }
        #region ThreeDImage
        public async Task<IActionResult> Upload3DImages([FromQuery] Boolean IsModified, string NewFileName)
        {  
            try
            {
                var form = Request.Form;

                var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
                using (var _httpClient = new HttpClient())
                {
                    _httpClient.Timeout = TimeSpan.FromMinutes(30);
                    _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + myComplexObject.AccessToken);
                    using var form1 = new MultipartFormDataContent();
                    Byte[] b = ReadFully(form.Files[0].OpenReadStream());
                    using var fileContent = new ByteArrayContent(b);
                    fileContent.Headers.ContentType = MediaTypeHeaderValue.Parse("multipart/form-data");
                    form1.Add(fileContent, "threedpfile", form.Files[0].FileName);
                    //var requestUri = baseAddress + "api/Configuration/UploadTdImages?IsModified=" + IsModified;
                    var requestUri = baseAddress + "api/Configuration/UploadTdImages?IsModified=" + IsModified + "&NewFileName="+NewFileName;
                    var response = await _httpClient.PostAsync(requestUri, form1);
                    var responseContent = response.Content.ReadAsStringAsync(); if (!string.IsNullOrEmpty(responseContent.Result))
                    {
                        return Json(responseContent.Result);
                        var result = JsonConvert.DeserializeObject<Value>(responseContent.Result);
                        Console.WriteLine(result);

                        return Json(new { _RootThreeDImageConfig = result });
                    }
                    return Json(new { Issaved = false });
                }
                return Json(new { Issaved = false });
            }catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An unexpected error occurred.", Details = ex.Message });
            }
           }
    
        public IActionResult CheckTdImagePresent([FromQuery] string file_name)
        {
            //var form = Request.Form;
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            //using var form1 = new MultipartFormDataContent();
            //Byte[] b = ReadFully(form.Files[0].OpenReadStream());
            //using var fileContent = new ByteArrayContent(b);
            //fileContent.Headers.ContentType = MediaTypeHeaderValue.Parse("multipart/form-data");
            //form1.Add(fileContent, "threedpfile", form.Files[0].FileName);
            //TdImageName = form.Files[0].FileName;
            var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/CheckTdImagePresent?TdImageName=" + file_name , myComplexObject.AccessToken);

            return Json(result.ToString());

        }

        public IActionResult SaveTdImages([FromBody] RootThreeDImage _RootThreeDImage)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            // _TaskOperation.RoleTasks.ForEach(x => x.organisation_Id = myComplexObject.OrganisationId);
            var result = _RootThreeDImage == null ? null : ApiHelper.PostData(baseAddress, "api/Configuration/SaveTdImages", _RootThreeDImage, myComplexObject.AccessToken);
            return Json(result.ToString());
        }

        public IActionResult GetTdImages([FromQuery] long TdImageId)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetAllConfiguredRoleTaskByRoleID?RoleId=" + TdImageId + "&OrganisationId=" + myComplexObject.OrganisationId, myComplexObject.AccessToken);
            var result = JsonConvert.DeserializeObject<Model.Role.RoleTask>(response.ToString());
            return Json(result);
        }
        #endregion

        #region TdImageConfigurations
        public IActionResult SaveTdImageConfigurations([FromBody] RootThreedImageConfiguration _RootThreedImageConfiguration)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");

            var result = _RootThreedImageConfiguration == null ? null : ApiHelper.PostData(baseAddress, "api/Configuration/SaveTdImageConfigurations", _RootThreedImageConfiguration, myComplexObject.AccessToken);
            return Json(result.ToString());
        }
        #endregion

        #region TdSaveImageConfigurations 
        public IActionResult TdSaveImageConfigurations([FromBody] List<SaveTdImagesRequestDto> saveTdImagesRequestDtos)//[FromBody] SaveTdImageConfigurationsListRequestDto saveTdImageConfigurationsListRequestDto
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");

            var result = saveTdImagesRequestDtos == null ? null : ApiHelper.PostData(baseAddress, "api/Configuration/SaveTdImageConfigurations", saveTdImagesRequestDtos, myComplexObject.AccessToken);
            return Json(result.ToString());
        }
        #endregion
        
        #region TdQvImageConfiguration
        public IActionResult SaveTdQvImageConfiguration([FromBody] RootTdQvImageConfiguration _RootTdQvImageConfiguration)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            _RootTdQvImageConfiguration.td_Qv_Image_Configurations.ForEach(x => x.td_Organisation_Id = myComplexObject.OrganisationId);
            var result = _RootTdQvImageConfiguration == null ? null : ApiHelper.PostData(baseAddress, "api/Configuration/SaveTdQvImageConfiguration", _RootTdQvImageConfiguration.td_Qv_Image_Configurations, myComplexObject.AccessToken);
            return Json(result.ToString());
        }
        public IActionResult SaveFullViewImageConfiguration([FromBody] RootTdQvImageConfiguration _RootTdQvImageConfiguration)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            _RootTdQvImageConfiguration.td_Qv_Image_Configurations.ForEach(x => x.td_Organisation_Id = myComplexObject.OrganisationId);
            var result = _RootTdQvImageConfiguration == null ? null : ApiHelper.PostData(baseAddress, "api/Configuration/SaveTdQvImageConfiguration", _RootTdQvImageConfiguration.td_Qv_Image_Configurations, myComplexObject.AccessToken);
            return Json(result.ToString());
        }

        public IActionResult GetTdQvImageConfiguration([FromQuery] long TdImageId)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");

            int Start = 0;
            int End = 25;

            var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetQVImageConfiguration?OrganisationId=" + myComplexObject.OrganisationId+ "&Start="+Start+"&End="+End, myComplexObject.AccessToken);
            //var result = JsonConvert.DeserializeObject<Model.Role.RoleTask>(response.ToString());
            //return Json(result);
            return Json(response);
        }
        #endregion

        #region TdShowroomConfiguration
        public IActionResult SaveTdShowroomConfiguration([FromBody] RootTdShowroomConfiguration _RootTdShowroomConfiguration)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            _RootTdShowroomConfiguration.td_Showroom_Configurations.ForEach(x => x.td_Organisation_Id = myComplexObject.OrganisationId);
            var result = _RootTdShowroomConfiguration == null ? null : ApiHelper.PostData(baseAddress, "api/Configuration/SaveTdShowroomConfiguration", _RootTdShowroomConfiguration.td_Showroom_Configurations, myComplexObject.AccessToken);
            return Json(result.ToString());
        }

        public IActionResult GetTdShowroomConfiguration([FromQuery] long TdImageId)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            int Start = 0;
            int End = 25;
            var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetFullViewImageConfigurations?OrganisationId=" + myComplexObject.OrganisationId + "&Start=" + Start + "&End=" + End, myComplexObject.AccessToken);
            // var result = JsonConvert.DeserializeObject<Model.Role.RoleTask>(response.ToString());
            return Json(response);
        }

        #endregion
        public IActionResult GetTdImageConfigurations([FromQuery] long TdImageId)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetAllConfiguredRoleTaskByRoleID?RoleId=" + TdImageId + "&OrganisationId=" + myComplexObject.OrganisationId, myComplexObject.AccessToken);
            var result = JsonConvert.DeserializeObject<Model.Role.RoleTask>(response.ToString());
            return Json(result);
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
        public IActionResult GetProductList()
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");

            var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetAllProductList", myComplexObject.AccessToken);
            //var result = JsonConvert.DeserializeObject<List<Feature>>(response.ToString());
            return Json(response);
         } 
        public IActionResult GetOrganisationList(OrganisationRequestListDto organisationRequestListDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");

            organisationRequestListDto.Start = 0;
            organisationRequestListDto.End = 0;

            var response = ApiHelper.PostData(baseAddress, "api/LicenseManager/GetOrgList", organisationRequestListDto, myComplexObject.AccessToken);
           // var result = JsonConvert.DeserializeObject<List<Feature>>(response.ToString());Abhi
            return 

       Json(response);
        }
        public IActionResult ConfigureTdImageSearchByOrgId([FromBody] ConfigureTdImageSearchByOrgIdRequestDto configureTdImageSearchByOrgIdRequestDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");

            configureTdImageSearchByOrgIdRequestDto.OrganisationId = configureTdImageSearchByOrgIdRequestDto.OrganisationId == 0 ?  myComplexObject.OrganisationId : configureTdImageSearchByOrgIdRequestDto.OrganisationId;

            var response = ApiHelper.PostData(baseAddress, "api/Configuration/ConfigureTdImageSearchByOrgId", configureTdImageSearchByOrgIdRequestDto, myComplexObject.AccessToken);
            // var result = JsonConvert.DeserializeObject<List<Feature>>(response.ToString());
            return Json(response);
        }
        public IActionResult SavehowroomImageConfiguration([FromBody] RootTdShowroomConfiguration _RootTdShowroomConfiguration)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            _RootTdShowroomConfiguration.td_Showroom_Configurations.ForEach(x => x.td_Organisation_Id = myComplexObject.OrganisationId);
            var result = _RootTdShowroomConfiguration == null ? null : ApiHelper.PostData(baseAddress, "api/Configuration/SaveTdShowroomConfiguration", _RootTdShowroomConfiguration.td_Showroom_Configurations, myComplexObject.AccessToken);
            return Json(result.ToString());
        }
        public IActionResult RemoveTdImage([FromQuery] string TdImageName)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/RemoveTdImage?TdImageName=" + TdImageName, myComplexObject.AccessToken);
            return Json(result.ToString());
        }
        public IActionResult GetTdImageConfigurationsByTdimageId([FromBody] Tdimgid tdimgid)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetTdImageConfigurationsByTdimageId?TdImageId=" + tdimgid.TdImageId , myComplexObject.AccessToken);
            return Json(response);
        }
        public IActionResult GetConfiguredOrganisations(OrganisationRequestListDto OrganisationRequestListDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var response = ApiHelper.PostData(baseAddress, "api/LicenseManager/GetConfiguredOrganisations", OrganisationRequestListDto, myComplexObject.AccessToken);
            return Json(response);
        }
        public IActionResult GetQ3DProducts([FromQuery] GetQ3DProducts getQ3DProducts)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var response = ApiHelper.PostData(baseAddress, "api/LicenseManager/GetQ3DProducts?OrganisationId=" + getQ3DProducts.organisationId, getQ3DProducts, myComplexObject.AccessToken);
            return Json(response);
        }
        public IActionResult SaveQ3dProductConfiguration([FromBody] List<SaveProductConfig> saveQ3dProductConfiguration)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var response = ApiHelper.PostData(baseAddress, "api/LicenseManager/SaveQ3dProductConfiguration", saveQ3dProductConfiguration, myComplexObject.AccessToken);
            return Json(response);
        }
        public IActionResult SaveQ3dConfiguration([FromBody] SaveQ3dConfigurationRequest saveQ3dConfigurationRequest)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var response = ApiHelper.PostData(baseAddress, "api/LicenseManager/SaveQ3dConfiguration", saveQ3dConfigurationRequest, myComplexObject.AccessToken);
            return Json(response);
        }
        public IActionResult GetQ3dConfiguration([FromQuery] GetQ3dConfigurationRequest getQ3dConfigurationRequest)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var response = ApiHelper.PostData(baseAddress, "api/LicenseManager/GetQ3dConfiguration?OrganisationId=" + getQ3dConfigurationRequest.OrganisationId, getQ3dConfigurationRequest, myComplexObject.AccessToken);
            return Json(response);
        }
        public IActionResult GetOrgProducts([FromBody] OrderProducts orderproducts)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var response = ApiHelper.PostData(baseAddress, "api/Configuration/GetOrgProducts", orderproducts, myComplexObject.AccessToken);
            return Json(response);
        }
    }
}