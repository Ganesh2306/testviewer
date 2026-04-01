using ARCHIVE_DASHBOARD.CustomFilter;
using ARCHIVE_DASHBOARD.Helper;
using ARCHIVE_DASHBOARD.Model.Design;
using ARCHIVE_DASHBOARD.Session;
using Asp.netCoreReactDemo.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Controllers
{
    public class fileResponse
    {
        public int length { get; set; }
        public string name { get; set; }
    }

    public class SaveDesignResponse
    {
        public bool isSave { get; set; }
        public bool isOrganisationExisted { get; set; }
        public bool isUserExisted { get; set; }
        public string message { get; set; }
        public string designSize { get; set; }
        public string imageUrl { get; set; }
        public List<string> DesignList { get; set; }
    }

    public class ProductFeature
    {
        public string dd_feature_id { get; set; }
        public string feature_type_name { get; set; }
    }

    public class StorageDataDto
    {
        public string cdn_cdnpath { get; set; }
        public string cdn_cloud_name { get; set; }
        public string cdn_api_secret { get; set; }
        public string cdn_api_key { get; set; }
        public string cdn { get; set; }
        public string local { get; set; }
        public string drive_path { get; set; }
        public string ftp_store { get; set; }
        public string ftp_host { get; set; }
        public string ftp_url_acces_user_id { get; set; }
        public string ftp_url_access_password { get; set; }
    }
    public class FeatureTypeList
    {
        public object design_featuretype_id { get; set; }
        public string design_featuretype_name { get; set; }
    }

    public class Feature
    {
        public long design_feature_id { get; set; }
        public List<FeatureTypeList> featureTypeList { get; set; }
    }

    public class SaveDesignRequest
    {
        [JsonProperty("DESIGN CODE")]
        public string DESIGNCODE { get; set; }
        public string ARTICLE { get; set; }
        public string DESIGN { get; set; }
        public string VARIANT { get; set; }
        public string ProductType { get; set; }
        public string ProductGroup { get; set; }
        public string State { get; set; }
        public List<ProductFeature> ProductFeatures { get; set; }
    }
    public class SaveDesignMasterRequetDto
    {
        public DesignMasterDto designmasterDto { get; set; }
        public IFormFile File { get; set; }
        public List<IFormFile> combofiles { get; set; }
    }
    public class SaveBase64ImageDto
    {
        public string base64image { get; set; }
        public long SupplierId { get; set; }
        public string ThreedImageName { get; set; }
        public long ThreedImageId { get; set; }
        public string ProductName { get; set; }
        public string DesignName { get; set; }
        public long OrganisationId { get; set; }
        public bool IsOverrite { get; set; }
        public bool IsDelete { get; set; }
        public bool IsFirstImage { get; set; }
    }

    [DisableRequestSizeLimit]
    [TypeFilter(typeof(CheckExpiryTime))]
    public class DesignController : Controller
    {
        private IConfiguration configuration;
        private string baseAddress;

        public DesignController(IConfiguration iConfig)
        {
            configuration = iConfig;
            string host = configuration.GetSection("WebAPIConfiguration").GetSection("Host").Value;
            string path = configuration.GetSection("WebAPIConfiguration").GetSection("Path").Value;
            baseAddress = host + path;

        }

        public IActionResult GetStorageLocation()
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var isStorage = false;
            HttpContext.Session.SetObjectAsJson("storage", null);
            //var myComplexStorage = HttpContext.Session.GetObjectFromJson<StorageDataDto>("storage");

            var getStorageLocation = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetStorageLocation?OrganisationId=" + myComplexObject.OrganisationId, myComplexObject.AccessToken);
            var myDeserializedClass = JsonConvert.DeserializeObject<StorageDataDto>(getStorageLocation.ToString());
            if (myDeserializedClass != null)
            {
                HttpContext.Session.SetObjectAsJson("storage", myDeserializedClass);
                isStorage = true;
            }
            else
            {
                HttpContext.Session.SetObjectAsJson("storage", null);
                isStorage = false;
            }

            return Json(new { isStorage = isStorage });

        }

        public IActionResult GetCustomerList()
        {

            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            customerListRequest objD = new customerListRequest();
            long Supid = 0;
            if(myComplexObject.org_type == 2)
            {
                Supid = myComplexObject.org_type_id;
            }
            objD.organnisationId = myComplexObject.OrganisationId;
            objD.start = 0;
            objD.end = 0;
            var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetConfiguredCustomersList?OrganisationId=" + myComplexObject.OrganisationId+ "&SupplierId="+Supid, myComplexObject.AccessToken);
            var data = JsonConvert.DeserializeObject<customerList>(result.ToString());

            return Json(data);
        }

        public async Task<IActionResult> DeleteDesigns()
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var form = Request.Form;
            try
            {
                using (var _httpClient = new HttpClient())
                {
                    _httpClient.Timeout = TimeSpan.FromMinutes(10);
                    DesignMasterDto request = new DesignMasterDto();

                    if (form.TryGetValue("alldata", out var someData))
                    {
                        //var pTpg = someData;
                        request = JsonConvert.DeserializeObject<DesignMasterDto>(someData);

                    }
                    using var form1 = new MultipartFormDataContent();
                    form1.Add(new StringContent("true"), "designmasterDto.Dm_Is_Deleted");
                    form1.Add(new StringContent(myComplexObject.org_type_id.ToString()), "designmasterDto.Dm_Deleted_By");
                    form1.Add(new StringContent("2021-06-02 10:17:51.147"), "designmasterDto.Dm_Deleted_On");
                    form1.Add(new StringContent(request.Dm_Design_Id.ToString()), "designmasterDto.Dm_Id");

                    var requestUri = baseAddress + "api/Configuration/SaveDesign";
                    var response = await _httpClient.PostAsync(requestUri, form1);
                    // response.EnsureSuccessStatusCode();
                    var responseContent = response.Content.ReadAsStringAsync();
                    var result = JsonConvert.DeserializeObject<SaveDesignResponse>(responseContent.Result.ToString());

                    return Json(new { Issaved = result.isSave });
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return Json(new { Issaved = false });
            }
            return Json(new { Issaved = false });


        }

        #region UploadDesigns
        public async Task<IActionResult> UploadDesigns()
        {
            try
            {

                var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");

                var form = Request.Form;

                using (var _httpClient = new HttpClient())
                {
                    _httpClient.Timeout = TimeSpan.FromMinutes(10);
                    DesignMasterDto request = new DesignMasterDto();

                    if (form.TryGetValue("alldata", out var someData))
                    {
                        //var pTpg = someData;
                        request = JsonConvert.DeserializeObject<DesignMasterDto>(someData);

                    }

                      _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + myComplexObject.AccessToken);
                    using var form1 = new MultipartFormDataContent();
                    
                   Byte[] b = null;
                    if (request.designBase64 != null)
                    {

                        b = Convert.FromBase64String(request.designBase64);
                        form1.Add(new StringContent(".jpeg"), "designmasterDto.Dm_DesignType");
                    }
                    else
                    {

                        b = ReadFully(form.Files[0].OpenReadStream());
                        var extension = Path.GetExtension(form.Files[0].FileName);
                        //form1.Add(new StringContent(form.Files[0].FileName.Split('.')[1]), "designmasterDto.Dm_DesignType");
                        form1.Add(new StringContent(extension.TrimStart('.')), "designmasterDto.Dm_DesignType");
                    }
                    using var fileContent = new ByteArrayContent(b);
                    fileContent.Headers.ContentType = MediaTypeHeaderValue.Parse("multipart/form-data");
                    // form1.Add(fileContent, "file", Path.GetFileName(form.Files[0].FileName));

                    form1.Add(fileContent, "file", request.Dm_Design.ToString().Trim()); //Dm_Design send code 
                    var comboFiles = form.Files.Where(f => f.Name == "combofiles").ToList();
                    foreach (var comboFile in comboFiles)
                    {
                        using var stream = comboFile.OpenReadStream();
                        var fileBytes = ReadFully(stream);
                        var fileContent2 = new ByteArrayContent(fileBytes);
                        fileContent2.Headers.ContentType = MediaTypeHeaderValue.Parse(comboFile.ContentType);
                        form1.Add(fileContent2, "combofiles", comboFile.FileName);
                    }
                   
                    form1.Add(new StringContent(request.Dm_Design_Id.ToString()), "designmasterDto.Dm_Id");
             
                    if (request.Dm_Article == null)
                    {
                        request.Dm_Article = "";
                    }
                    if (request.Dm_Variant == null)
                    {
                        request.Dm_Variant = "";
                    }
                    var Article = request.Dm_Article.ToString().Trim();
                    var Design = request.Dm_Design.ToString().Trim();
                    var Varient = request.Dm_Variant.ToString().Trim();
                    if (request.State == 0)
                    {
                        var DesignADVName = string.Empty;
                        var a = string.Empty;
                        var v = string.Empty;
                        if (Article != "")
                        {
                            a = Article + "-";
                        }
                        if (Varient != "")
                        {
                            v = "-" + Varient;
                        }
                        DesignADVName = a + Design + v;

                        form1.Add(new StringContent(DesignADVName.Trim()), "designmasterDto.Dm_Design_Name");
                    }
                    else if(request.State==2||request.State==3)
                    {
                        if(request.State == 2)
                        { 
                         request.Dm_Design_Name = request.Dm_Design_Code.ToString().Trim();
                            form1.Add(new StringContent(request.Dm_Design_Name), "designmasterDto.Dm_Design_Name");
                        }
                        else
                        {
                            form1.Add(new StringContent(request.DesigIds.ToString()), "designmasterDto.DesigIds");
                            // form1.Add(new StringContent(request.Dm_Design_Name), "designmasterDto.Dm_Design_Name");
                            form1.Add(new StringContent("0"), "designmasterDto.Dm_Design_Id");
                            form1.Add(new StringContent("0"), "designmasterDto.Dm_Id");
                            form1.Add(new StringContent("0"), "designmasterDto.Dm_Design_Name");
                            form1.Add(new StringContent(request.Dm_Design_Code.ToString().Trim()), "designmasterDto.Dm_Design_Code");
                        }
                    }

                    form1.Add(new StringContent(request.Dm_Design_Code.ToString().Trim()), "designmasterDto.Dm_Design_Code");
                    form1.Add(new StringContent("0"), "designmasterDto.Dm_Design_Description");
                    
                    if (Article != "")
                    {
                        form1.Add(new StringContent("1"), "designmasterDto.Dm_Article_Id");
                    }
                    else
                    { form1.Add(new StringContent("0"), "designmasterDto.Dm_Article_Id"); }
                    
                    form1.Add(new StringContent(request.Dm_Article), "designmasterDto.Dm_Article");

                    form1.Add(new StringContent("1"), "designmasterDto.Dm_Design_Id");
                    form1.Add(new StringContent(String.IsNullOrEmpty(request.Dm_Design.ToString()) ? "" : request.Dm_Design.ToString().Trim()), "designmasterDto.Dm_Design");
                    
                    form1.Add(new StringContent("1"), "designmasterDto.Dm_Variant_Id");
                    form1.Add(new StringContent(request.Dm_Variant), "designmasterDto.Dm_Variant");

                    form1.Add(new StringContent("1"), "designmasterDto.Dm_Variant_Index");// count 
                    form1.Add(new StringContent("2"), "designmasterDto.Dm_Variant_Count");// count 
                    form1.Add(new StringContent("1"), "designmasterDto.Dm_Version");// count 
                    form1.Add(new StringContent("true"), "designmasterDto.Dm_Is_Latest");
                    if (myComplexObject.org_type != 1)
                    {
                        form1.Add(new StringContent(myComplexObject.org_type_id.ToString()), "designmasterDto.Dm_Supplier_Id");
                    } 
                    else
                    {
                        form1.Add(new StringContent(request.Dm_Supplier_Id.ToString()), "designmasterDto.Dm_Supplier_Id");
                    }
                    form1.Add(new StringContent(request.is_single_repeat.ToString()), "designmasterDto.is_single_repeat");
                    form1.Add(new StringContent(request.is_ai.ToString()), "designmasterDto.is_ai");
                    if(comboFiles.Count > 0)
                    {
                        form1.Add(new StringContent("true"), "designmasterDto.is_combo");
                    } else
                    {
                        form1.Add(new StringContent("false"), "designmasterDto.is_combo");
                    }
                    form1.Add(new StringContent(request.is_saasuser.ToString()), "designmasterDto.is_saasuser");
                    //form1.Add(new StringContent(myComplexObject.org_type_id.ToString()), "designmasterDto.Dm_Supplier_Id");
                    form1.Add(new StringContent(myComplexObject.Userid.ToString()),"designmasterDto.Dm_Created_By");
                    //  form1.Add(new StringContent(request.SaveInventoryDesignRequestDto.Di_Inventory_Id.ToString().Trim()), "SaveInventoryDesignRequestDto.Di_Inventory_Id");

                    //form1.Add(new StringContent("0"), "designmasterDto.Dm_Created_By");
                    if (request.State == 2)
                    {
                        form1.Add(new StringContent(request.Is_override.ToString()), "designmasterDto.Is_override");
                        form1.Add(new StringContent(request.IsImageUpdate.ToString()), "designmasterDto.IsImageUpdate");
                    }
                    if (request.State==0)
                        form1.Add(new StringContent(DateTime.Now.ToString("yyyy'-'MM'-'dd'T'HH':'mm':'ss.fffffffK")), "designmasterDto.Dm_Created_On");///4444
                    else if  (request.State==2)
                        form1.Add(new StringContent(request.Dm_Created_On.ToString()), "designmasterDto.Dm_Created_On");///4444
                    form1.Add(new StringContent("0"), "designmasterDto.Dm_Modified_By");
                    form1.Add(new StringContent("2021-06-02 10:17:51.147"), "designmasterDto.Dm_Modified_On");

                    form1.Add(new StringContent(request.Dm_Is_Deleted.ToString()), "designmasterDto.Dm_Is_Deleted");
                    //form1.Add(new StringContent(request.IsImageUpdate.ToString()));
                    if (request.designsize != null) {
                        form1.Add(new StringContent(request.designsize.ToString()), "designmasterDto.designsize");
                    }
                    form1.Add(new StringContent("0"), "designmasterDto.Dm_Deleted_By");
                    form1.Add(new StringContent("2021-06-02 10:17:51.147"), "designmasterDto.Dm_Deleted_On");
                    form1.Add(new StringContent("0"), "designmasterDto.Dm_Last_Reference_Dm_Id");
                    form1.Add(new StringContent("0"), "designmasterDto.Dm_Source_Id");

                    form1.Add(new StringContent("0"), "designmasterDto.Dm_Folder_Master_Id");

                    form1.Add(new StringContent(request.Dm_DesignType_Id.ToString()), "designmasterDto.Dm_DesignType_Id");
                    form1.Add(new StringContent(request.SeasonId.ToString()), "designmasterDto.SeasonId");
                    form1.Add(new StringContent(request.CollectionId.ToString()), "designmasterDto.CollectionId");
                    form1.Add(new StringContent(request.Dm_Design_Group_Id.ToString()), "designmasterDto.Dm_Design_Group_Id");
                    form1.Add(new StringContent(myComplexObject.OrganisationId.ToString()), "designmasterDto.Dm_Organisation_Id");
                    if (request.Dm_Article != "") {
                        form1.Add(new StringContent("1"), "designmasterDto.SaveArticleMaster.da_artical_id");
                    } else {
                        form1.Add(new StringContent("0"), "designmasterDto.SaveArticleMaster.da_artical_id");
                    }

                    form1.Add(new StringContent(request.Dm_Article), "designmasterDto.SaveArticleMaster.da_artical");
                    form1.Add(new StringContent("0"), "designmasterDto.SaveArticleMaster.da_description");
                    form1.Add(new StringContent(myComplexObject.org_type_id.ToString()), "designmasterDto.SaveArticleMaster.da_supplier_id");
                   

                    form1.Add(new StringContent("2021-06-02 10:17:51.147"), "designmasterDto.SaveArticleMaster.da_created_on");
                    form1.Add(new StringContent("0"), "designmasterDto.SaveArticleMaster.da_created_by");
                    //form1.Add(new StringContent(request.Dm_Design_Id.ToString()), "designmasterDto.SaveDesign.dd_design_id");
                    form1.Add(new StringContent("1"), "designmasterDto.SaveDesign.dd_design_id");
                    form1.Add(new StringContent(request.Dm_Design.ToString().Trim()), "designmasterDto.SaveDesign.dd_design");

                    form1.Add(new StringContent("1"), "designmasterDto.SaveDesign.dd_article_id");//1 for add table id  
                    form1.Add(new StringContent(request.Dm_Article), "designmasterDto.SaveDesign.dd_article");
                    form1.Add(new StringContent(myComplexObject.org_type_id.ToString()), "designmasterDto.SaveDesign.da_supplier_id");

                    //  form1.Add(new StringContent(request.ProductFeatures), "designmasterDto.SaveDesignDetail");
                    form1.Add(new StringContent(request.FeatureList), "designmasterDto.FeatureList");
                    //form1.Add(new StringContent("{\"dd_details_id\": 0,\"dd_dm_id\": 0,\"dd_feature_id\": 0,\"dd_feature_type_id\": 0,\"dd_design_configuration_id\": 0}"), "designmasterDto.SaveDesignDetail");

                    if(request.Dm_Variant != "") {
                        form1.Add(new StringContent("1"), "designmasterDto.SaveVarientMaster.dv_variant_id");
                    } else
                    {
                        form1.Add(new StringContent("0"), "designmasterDto.SaveVarientMaster.dv_variant_id");
                    }
                   
                    form1.Add(new StringContent(request.Dm_Variant), "designmasterDto.SaveVarientMaster.dv_variant");
                    form1.Add(new StringContent(request.Dm_Design_Id.ToString()), "designmasterDto.SaveVarientMaster.dv_design_id");
                    form1.Add(new StringContent("0"), "designmasterDto.SaveVarientMaster.dv_variant_index");
                    form1.Add(new StringContent(myComplexObject.org_type_id.ToString()), "designmasterDto.SaveVarientMaster.da_supplier_id");


                    form1.Add(new StringContent("0"), "designmasterDto.SaveSourceRequest.ds_source_id");
                    form1.Add(new StringContent("0"), "designmasterDto.SaveSourceRequest.ds_file_name");
                    form1.Add(new StringContent("0"), "designmasterDto.SaveSourceRequest.ds_mac_address");
                    form1.Add(new StringContent(myComplexObject.org_type_id.ToString()), "designmasterDto.SaveSourceRequest.da_supplier_id");
                    form1.Add(new StringContent(request.State.ToString()), "designmasterDto.State");


                    form1.Add(new StringContent("1"), "designmasterDto.SaveInventoryDesignRequestDto.Di_Inventory_Id");
                    form1.Add(new StringContent(request.Dm_Design_Id.ToString()), "designmasterDto.SaveInventoryDesignRequestDto.Di_Design_Id");
                    form1.Add(new StringContent(request.Dm_Design_Code.ToString().Trim()), "designmasterDto.SaveInventoryDesignRequestDto.Di_Design_Code");
                    form1.Add(new StringContent("2021-06-02 10:17:51.147"), "designmasterDto.SaveInventoryDesignRequestDto.Di_Design_Start_Date");// select date popup
                    form1.Add(new StringContent("false"), "designmasterDto.SaveInventoryDesignRequestDto.Di_Is_Hide");
                    if (request.SaveInventoryDesignRequestDto.Di_State != null)
                    {
                       form1.Add(new StringContent(request.Dm_IsSample.ToString()), "designmasterDto.Dm_IsSample");
                       
                        form1.Add(new StringContent(request.SaveInventoryDesignRequestDto.Di_State.ToString()), "designmasterDto.SaveInventoryDesignRequestDto.Di_State"); // cad,noon,stock
                    }
                    else
                    {
                        form1.Add(new StringContent("0"), "designmasterDto.SaveInventoryDesignRequestDto.Di_State"); // cad,noon,stock
                    }

                    form1.Add(new StringContent(request.SaveInventoryDesignRequestDto.Di_Stock.ToString()), "designmasterDto.SaveInventoryDesignRequestDto.Di_Stock");
                    //form1.Add(new StringContent("0"), "designmasterDto.SaveInventoryDesignRequestDto.Di_Price");
                    form1.Add(new StringContent(request.SaveInventoryDesignRequestDto.Di_Price.ToString()), "designmasterDto.SaveInventoryDesignRequestDto.Di_Price");
                    form1.Add(new StringContent(request.SaveInventoryDesignRequestDto.Di_Credit.ToString()), "designmasterDto.SaveInventoryDesignRequestDto.Di_Credit"); //numeric
                    ///Random random = new Random();
                    //int nrating = random.Next(1, 5);
                    form1.Add(new StringContent(request.SaveInventoryDesignRequestDto.Di_Rating.ToString()), "designmasterDto.SaveInventoryDesignRequestDto.Di_Rating"); // 1 to 5   -1
                    //if (request.State == 0 && request.State == 2)
                    if (request.State == 0)
                    {
                        form1.Add(new StringContent(request.SaveInventoryDesignRequestDto.Di_Tailori_Type.ToString()), "designmasterDto.SaveInventoryDesignRequestDto.Di_Tailori_Type");
                    }
                    else
                    {
                        form1.Add(new StringContent(request.SaveInventoryDesignRequestDto.Di_Tailori_Type = ""), "designmasterDto.SaveInventoryDesignRequestDto.Di_Tailori_Type");
                    }
                    form1.Add(new StringContent(request.Features_Dic), "designmasterDto.Features_Dic");

                    //(request.Features_Dic.ToString());
                    if (request.SaveInventoryDesignRequestDto.Di_Product == "" || request.SaveInventoryDesignRequestDto.Di_Product == " " || request.SaveInventoryDesignRequestDto.Di_Product == null)
                        form1.Add(new StringContent(""), "designmasterDto.SaveInventoryDesignRequestDto.Di_Product"); // shirt ,suit
                    else
                        form1.Add(new StringContent(request.SaveInventoryDesignRequestDto.Di_Product), "designmasterDto.SaveInventoryDesignRequestDto.Di_Product");

                    form1.Add(new StringContent("2021-06-02 10:17:51.147"), "designmasterDto.SaveInventoryDesignRequestDto.Di_Modified_On");
                    form1.Add(new StringContent("0"), "designmasterDto.SaveInventoryDesignRequestDto.Di_Modified_By");

                    if (request.saveExclusiveDesignRequestDto.De_Exclusive_Id != null)
                    {
                        form1.Add(new StringContent(request.saveExclusiveDesignRequestDto.De_Exclusive_Id.ToString()), "designmasterDto.SaveExclusiveDesignRequestDto.De_Exclusive_Id");  // select cutomer is 1 if true 1 other 0 non exclisive
                    }
                    else
                    {
                        form1.Add(new StringContent("0"), "designmasterDto.SaveExclusiveDesignRequestDto.De_Exclusive_Id");  // select cutomer is 1 if true 1 other 0 non exclisive
                    }
                    form1.Add(new StringContent(request.Dm_Design_Id.ToString()), "designmasterDto.SaveExclusiveDesignRequestDto.De_Design_Id");

                    if (request.saveExclusiveDesignRequestDto.De_Customer_Id != null)
                    {
                        form1.Add(new StringContent(request.saveExclusiveDesignRequestDto.De_Customer_Id.ToString()), "designmasterDto.SaveExclusiveDesignRequestDto.De_Customer_Id"); //customer id
                    }
                    else
                    {
                        form1.Add(new StringContent("0"), "designmasterDto.SaveExclusiveDesignRequestDto.De_Customer_Id"); //customer id
                    }
                    form1.Add(new StringContent("false"), "designmasterDto.SaveExclusiveDesignRequestDto.De_Is_Removed");
                    form1.Add(new StringContent("0"), "designmasterDto.SaveExclusiveDesignRequestDto.De_Removed_By");
                    form1.Add(new StringContent("2021-06-02 10:17:51.147"), "designmasterDto.SaveExclusiveDesignRequestDto.De_Removed_On");
                    

                    //////////////

                    //////storage///TODO send proper message whene storage data is null or not configered


                    var myComplexStorage = HttpContext.Session.GetObjectFromJson<StorageDataDto>("storage");

                    if (myComplexStorage == null)
                        return Json(new { Issaved = false });

                    if (myComplexStorage.cdn == null)
                        form1.Add(new StringContent("false"), "StoragePathDto.cdn");
                    else
                        form1.Add(new StringContent(myComplexStorage.cdn), "StoragePathDto.cdn");

                    if (myComplexStorage.cdn_cdnpath == null)
                        form1.Add(new StringContent("0"), "StoragePathDto.cdn_cdnpath");
                    else
                        form1.Add(new StringContent(myComplexStorage.cdn_cdnpath), "StoragePathDto.cdn_cdnpath");

                    if (myComplexStorage.cdn_cloud_name == null)
                        form1.Add(new StringContent("0"), "StoragePathDto.cdn_cloud_name");
                    else
                        form1.Add(new StringContent(myComplexStorage.cdn_cloud_name), "StoragePathDto.cdn_cloud_name");

                    if (myComplexStorage.cdn_api_secret == null)
                        form1.Add(new StringContent("0"), "StoragePathDto.cdn_api_secret");
                    else
                        form1.Add(new StringContent(myComplexStorage.cdn_api_secret), "StoragePathDto.cdn_api_secret");

                    if (myComplexStorage.cdn_api_key == null)
                        form1.Add(new StringContent("0"), "StoragePathDto.cdn_api_key");
                    else
                        form1.Add(new StringContent(myComplexStorage.cdn_api_key), "StoragePathDto.cdn_api_key");

                    if (myComplexStorage.local == null)
                        form1.Add(new StringContent("false"), "StoragePathDto.local");
                    else
                        form1.Add(new StringContent(myComplexStorage.local), "StoragePathDto.local");

                    if (myComplexStorage.drive_path == null)
                        form1.Add(new StringContent("0"), "StoragePathDto.drive_path");
                    else
                        form1.Add(new StringContent(myComplexStorage.drive_path), "StoragePathDto.drive_path");

                    if (myComplexStorage.ftp_store == null)
                        form1.Add(new StringContent("false"), "StoragePathDto.ftp_store");
                    else
                        form1.Add(new StringContent(myComplexStorage.ftp_store), "StoragePathDto.ftp_store");

                    if (myComplexStorage.ftp_host == null)
                        form1.Add(new StringContent("0"), "StoragePathDto.ftp_host");
                    else
                        form1.Add(new StringContent(myComplexStorage.ftp_host), "StoragePathDto.ftp_host");

                    if (myComplexStorage.ftp_url_acces_user_id == null)
                        form1.Add(new StringContent("0"), "StoragePathDto.ftp_url_acces_user_id");
                    else
                        form1.Add(new StringContent(myComplexStorage.ftp_url_acces_user_id), "StoragePathDto.ftp_url_acces_user_id");

                    if (myComplexStorage.ftp_url_access_password == null)
                        form1.Add(new StringContent("0"), "StoragePathDto.ftp_url_access_password");
                    else
                        form1.Add(new StringContent(myComplexStorage.ftp_url_access_password), "StoragePathDto.ftp_url_access_password");

                    //////storage End///
                    //if (request.Dm_Design.ToString() == "jeno" || request.Dm_Design.ToString() == "kapil")
                    //    return Json(new { Issaved = false });
                    var requestUri = baseAddress + "api/Configuration/SaveDesign";
                    var response = await _httpClient.PostAsync(requestUri, form1);
                    // response.EnsureSuccessStatusCode();
                    var responseContent = response.Content.ReadAsStringAsync();
                    var result = JsonConvert.DeserializeObject<SaveDesignResponse>(responseContent.Result.ToString());

                    return Json(new { Issaved = result.isSave, Message = result.message, designSize = result.designSize, imageUrl = result.imageUrl, DesignList = result.DesignList });
                }

                //return Json(new { Issaved = "true" });

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return Json(new { Issaved = false });
            }
            return Json(new { Issaved = false });
        }
        #endregion UploadDesigns
        public IActionResult GetFeatureTypeList([FromQuery] string PTPG)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            //var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetFeatureTypeList", myComplexObject.AccessToken);
            //var result = JsonConvert.DeserializeObject<List<Feature>>(response.ToString());
            //return Json(result);

            string[] designTypeIdGroupId = PTPG.Split('-');
            var id = (myComplexObject.org_type == 2) ? Convert.ToInt64(designTypeIdGroupId[designTypeIdGroupId.Length - 1]) : myComplexObject.org_type_id;
            var supid = (myComplexObject.org_type == 3 || myComplexObject.org_type == 1) ? Convert.ToInt64(designTypeIdGroupId[designTypeIdGroupId.Length - 1]) : myComplexObject.org_type_id;
            // : myComplexObject.org_type_id; 
            var result1 = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetFolderIdByDesTypeIdDesSupId?DesignTypeId=" + designTypeIdGroupId[0].ToString().Trim() + "&DesignGroupId=" + designTypeIdGroupId[1].ToString().Trim() + "&OrgId=" + myComplexObject.OrganisationId + "&DesignSupplierId=" + supid, myComplexObject.AccessToken);
            // getDesignSearchRequestDto                       api/Configuration/GetFolderIdByDesTypeIdDesSupId
            var result2 = JsonConvert.DeserializeObject<folderIdDto>(result1.ToString());

            //var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetFeatureTypeList?FolderId=" + result2.folderId, myComplexObject.AccessToken);
            var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetFeatureTypeList?FolderId=" + result2.folderId + "&RoleId=" + myComplexObject.RoleId, myComplexObject.AccessToken);

            var result = JsonConvert.DeserializeObject<List<Feature>>(response.ToString());
            return Json(result);
        }
        public IActionResult GetFeatureTypeList_save()
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetFeatureTypeList_save", myComplexObject.AccessToken);
            var result = JsonConvert.DeserializeObject<List<Feature>>(response.ToString());
            return Json(result);
        }
        public IActionResult GetFeatureTypeListBySupplierFolderId([FromBody] GetDesignMasterExcelRequestDto tpgpid)
        {
            if (tpgpid.designTypeId == 0)
            {
                return Json(null);
            }
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");

            var response1 = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetFolderIdByDesTypeIdDesSupId?DesignTypeId=" + tpgpid.designTypeId.ToString().Trim() + "&DesignGroupId=" + tpgpid.designGroupId.ToString().Trim() + "&OrgId=" + myComplexObject.OrganisationId + "&DesignSupplierId=" + myComplexObject.org_type_id, myComplexObject.AccessToken);

            var result = JsonConvert.DeserializeObject<folderIdDto>(response1.ToString());
            var response = ApiHelper.GetDataNewQS(baseAddress, "/api/Configuration/GetFeatureTypeListBySupplierFolderId?FolderId=" + result.folderId.ToString(), myComplexObject.AccessToken);
            var result1 = JsonConvert.DeserializeObject<List<Feature>>(response.ToString());

            return Json(result1);
        }
        public IActionResult IsDesignExist([FromBody] string[] designNameList)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var result = ApiHelper.PostData(baseAddress, "api/Configuration/IsDesignExist?SupplierId=" + myComplexObject.org_type_id, designNameList.ToArray(), myComplexObject.AccessToken);

            return Json(result);
        }
        public IActionResult GetDesignSearchByfolderId([FromBody] GetDesignSearchRequestDto getDesignSearchRequestDto)
        {
            string[] designTypeIdGroupId = getDesignSearchRequestDto.DesignTypeIdGroupId.Split('-');
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var supplierid = Convert.ToInt64(0);
            if (myComplexObject.org_type == 2)
            {
                //getDesignSearchRequestDto.SupplierId = myComplexObject.org_type_id;
                supplierid= myComplexObject.org_type_id;
            }
            else if(myComplexObject.org_type == 3)
            {
                supplierid = getDesignSearchRequestDto.SupplierId;
            } else
            {
                supplierid = getDesignSearchRequestDto.SupplierId;
            }
            var result1 = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetFolderIdByDesTypeIdDesSupId?DesignTypeId=" + designTypeIdGroupId[0].ToString().Trim() + "&DesignGroupId=" + designTypeIdGroupId[1].ToString().Trim() + "&OrgId=" + myComplexObject.OrganisationId + "&DesignSupplierId=" + supplierid, myComplexObject.AccessToken);
            // getDesignSearchRequestDto
            var result = JsonConvert.DeserializeObject<folderIdDto>(result1.ToString());
            getDesignSearchRequestDto.FolderId = result.folderId.ToString();
            getDesignSearchRequestDto.FilterSearchRequestDto.FolderId = result.folderId;
            var result2 = ApiHelper.PostData(baseAddress, "api/Configuration/GetDesignSearch", getDesignSearchRequestDto, myComplexObject.AccessToken);

            return Json(result2);
        }
        public IActionResult GetRoleDesignConfigurationByRole([FromQuery] long RoleId)
        {
                var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            if (myComplexObject.org_type == 3)
            {
                //var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetSupCustConfiguration?supRoleId=" + myComplexObject.org_type_id  + "&custRoleId=" + myComplexObject.RoleId + "&organisationId=" + myComplexObject.OrganisationId + "&supplierId=" + myComplexObject.org_type_id+ "&customerId=" + myComplexObject.org_type_id, myComplexObject.AccessToken);
                var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetRoleDesignConfigurationByRole?RoleId=" + myComplexObject.RoleId, myComplexObject.AccessToken);
                var result = JsonConvert.DeserializeObject<Model.Management.ConfigureRoot>(response.ToString());
                return Json(result); 

            } else
            {
                var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetRoleDesignConfigurationByRole?RoleId=" + myComplexObject.RoleId, myComplexObject.AccessToken);
                var result = JsonConvert.DeserializeObject<Model.Management.ConfigureRoot>(response.ToString());
                return Json(result);
            }
           
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
        public IActionResult GetDesignMasterExcel([FromBody] GetDesignMasterExcelRequest r)
        {
            GetStorageLocation();
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var myComplexstorage = HttpContext.Session.GetObjectFromJson<StorageDataDto>("storage");
            var result1 = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetFolderIdByDesTypeIdDesSupId?DesignTypeId=" + r.designTypeId.ToString().Trim() + "&DesignGroupId=" + r.designGroupId.ToString().Trim() + "&OrgId=" + myComplexObject.OrganisationId + "&DesignSupplierId=" + myComplexObject.org_type_id, myComplexObject.AccessToken);
            // getDesignSearchRequestDto
            var result = JsonConvert.DeserializeObject<folderIdDto>(result1.ToString());
            r.folderId = result.folderId;
            r.organisationId = myComplexObject.OrganisationId;
            r.drivePath = myComplexstorage.drive_path;

            var response = ApiHelper.PostData(baseAddress, "api/Configuration/GetDesignMasterExcel", r, myComplexObject.AccessToken);
            //var result = JsonConvert.DeserializeObject<RootEmail>(response.ToString());
            return Json(response);
        }
        public async Task<IActionResult> SaveDesignMasterExcel()
        {
            ///TO DO api/Configuration/GetStorageLocation use this for storage path
            try
            {
                var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");

                var form = Request.Form;

                using (var _httpClient = new HttpClient())
                {
                    _httpClient.Timeout = TimeSpan.FromMinutes(30);
                    GetDesignMasterExcelRequestDto request = new GetDesignMasterExcelRequestDto();

                    if (form.TryGetValue("alldata", out var someData))
                    {
                        request = JsonConvert.DeserializeObject<GetDesignMasterExcelRequestDto>(someData);
                    }
                    request.organisationId = myComplexObject.OrganisationId;
                    request.roleId = myComplexObject.RoleId;
                    var result1 = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetFolderIdByDesTypeIdDesSupId?DesignTypeId=" + request.designTypeId.ToString().Trim() + "&DesignGroupId=" + request.designGroupId.ToString().Trim() + "&OrgId=" + myComplexObject.OrganisationId + "&DesignSupplierId=" + myComplexObject.org_type_id, myComplexObject.AccessToken);
                    // getDesignSearchRequestDto
                    var result2 = JsonConvert.DeserializeObject<folderIdDto>(result1.ToString());
                    request.folderId = result2.folderId;
                    _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + myComplexObject.AccessToken);
                    using var form1 = new MultipartFormDataContent();
                    Byte[] b = null;

                    b = ReadFully(form.Files[0].OpenReadStream());
                    //form1.Add(new StringContent(form.Files[0].FileName.Split('.')[1]), "designmasterDto.Dm_DesignType");

                    using var fileContent = new ByteArrayContent(b);
                    fileContent.Headers.ContentType = MediaTypeHeaderValue.Parse("multipart/form-data");
                    // form1.Add(fileContent, "file", Path.GetFileName(form.Files[0].FileName));

                    form1.Add(fileContent, "DesignMastersExcelFile", form.Files[0].FileName.Split('.')[0]); //Dm_Design send code 

                    form1.Add(new StringContent(request.folderId.ToString()), "FolderId");


                    form1.Add(new StringContent(request.designTypeId.ToString()), "DesignTypeId");
                    form1.Add(new StringContent(request.designGroupId.ToString()), "DesignGroupId");
                    form1.Add(new StringContent(request.organisationId.ToString()), "OrganisationId");
                    form1.Add(new StringContent(request.roleId.ToString()), "RoleId");

                    var requestUri = baseAddress + "api/Configuration/SaveDesignMasterExcel";
                    var response = await _httpClient.PostAsync(requestUri, form1);
                    // response.EnsureSuccessStatusCode();
                    var responseContent = response.Content.ReadAsStringAsync();
                    //  var result = JsonConvert.DeserializeObject<SaveDesignResponse>(responseContent.Result.ToString());

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
        public IActionResult GetSupplierList()
        {

            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");

            customerListRequest objD = new customerListRequest();
            long Custid = 0;
            if (myComplexObject.org_type == 3)
            {
                Custid = myComplexObject.org_type_id;
            }
            objD.organnisationId = myComplexObject.OrganisationId;
            objD.start = 0;
            objD.end = 0;
            var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetConfiguredSuppliersList?OrganisationId=" + myComplexObject.OrganisationId + "&CustomerId="+Custid, myComplexObject.AccessToken);
            var data = JsonConvert.DeserializeObject<Supplier>(result.ToString());

            return Json(data);
        }
        public IActionResult GetProductList()
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");

            var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetProductList?OrganisationId=" + myComplexObject.OrganisationId, myComplexObject.AccessToken);
            //var result = JsonConvert.DeserializeObject<List<Feature>>(response.ToString());
            return Json(response);
        }
        public IActionResult GetRenderCount([FromBody] GetRenderCount getRenderCount)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            getRenderCount.OrganisationId = myComplexObject.OrganisationId;
            var response = ApiHelper.PostData(baseAddress, "api/Configuration/GetRenderCount", getRenderCount, myComplexObject.AccessToken);
            return Json(response);
        }
        public IActionResult GetOrgRenderCount([FromBody] GetorgRenderCount getorgRenderCount)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var response = ApiHelper.PostData(baseAddress, "api/LicenseManager/GetOrgRenderCount", getorgRenderCount, myComplexObject.AccessToken);
            return Json(response);
        }
        public IActionResult SaveBase64Image([FromBody] SaveBase64ImageDto saveBase64ImageDto)
        {

            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            saveBase64ImageDto.OrganisationId = myComplexObject.OrganisationId;
            saveBase64ImageDto.SupplierId = myComplexObject.org_type_id;
            var result = ApiHelper.PostData(baseAddress, "api/Configuration/SaveBase64Image", saveBase64ImageDto, myComplexObject.AccessToken);
            return Json(result);
        }
        public IActionResult GetConfiguredProducts()
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetConfiguredProducts?OrganisationId=" + myComplexObject.OrganisationId, myComplexObject.AccessToken);
            return Json(result);
        }
        public IActionResult GetDesignCountMasterExcelRequest([FromBody] GetDesignCountMasterExcelRequestD r) 
        {
            GetStorageLocation();
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var myComplexstorage = HttpContext.Session.GetObjectFromJson<StorageDataDto>("storage");
            r.organisationId = myComplexObject.OrganisationId;
            //r.SupplierId = myComplexObject.org_type_id;
            var response = ApiHelper.PostData(baseAddress, "api/Configuration/UploadDesignsPerMonth", r, myComplexObject.AccessToken);
            return Json(response);
        }
        public IActionResult GetProductCountMasterExcelRequest([FromBody] GetProductCountMasterExcelRequestD r) 
        {
            GetStorageLocation();
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var myComplexStorage = HttpContext.Session.GetObjectFromJson<StorageDataDto>("storage");
            r.organisationId = myComplexObject.OrganisationId;
            //r.SupplierId = myComplexObject.org_type_id;
            var response = ApiHelper.PostData(baseAddress, "api/Configuration/UploadDesignsPerMonth_Product", r, myComplexObject.AccessToken);
            return Json(response);
        }
        public IActionResult DeleteFeatureTypes([FromQuery] long FeatureId, long FeatureTypeId, string PTPG)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var roleid = myComplexObject.RoleId;
            string[] designTypeIdGroupId = PTPG.Split('-');
            var id = (myComplexObject.org_type == 2) ? Convert.ToInt64(designTypeIdGroupId[designTypeIdGroupId.Length - 1]) : myComplexObject.org_type_id;
            var supid = (myComplexObject.org_type == 3) ? Convert.ToInt64(designTypeIdGroupId[designTypeIdGroupId.Length - 1]) : myComplexObject.org_type_id;
            var result1 = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetFolderIdByDesTypeIdDesSupId?DesignTypeId=" + designTypeIdGroupId[0].ToString().Trim() + "&DesignGroupId=" + designTypeIdGroupId[1].ToString().Trim() + "&OrgId=" + myComplexObject.OrganisationId + "&DesignSupplierId=" + supid, myComplexObject.AccessToken);
            var result2 = JsonConvert.DeserializeObject<folderIdDto>(result1.ToString());
            var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/DeleteFeatureTypes?FeatureId="+ FeatureId +"&FeatureTypeId="+ FeatureTypeId + "&FolderId="+result2.folderId+ "&RoleId="+roleid, myComplexObject.AccessToken);
            return Json(response);
        }
        public IActionResult RoleAccessToElement([FromQuery] long RoleId)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var result1 = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetRoleTaskByRoleID?RoleId=" + (RoleId == 0 ? myComplexObject.RoleId : RoleId), myComplexObject.AccessToken);
            return Json(result1);

        }
        public IActionResult GetAiResponce([FromBody] AiImageRequestDto aiImageRequestDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var result = ApiHelper.PostData(baseAddress, "api/Configuration/GetAiResponce", aiImageRequestDto, myComplexObject.AccessToken);
            return Json(result.ToString());
        }
    }
} 