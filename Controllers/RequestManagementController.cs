using ARCHIVE_VIEWER.Models.RequestManagement;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace ARCHIVE_VIEWER.Controllers
{
    public class RequestManagementController : Controller
    {
        private IConfiguration configuration;
        private string baseAddress;
        public RequestManagementController(IConfiguration iConfig)
        {
            configuration = iConfig;
            string host = configuration.GetSection("WebAPIConfiguration").GetSection("Host").Value;
            string path = configuration.GetSection("WebAPIConfiguration").GetSection("Path").Value;
            baseAddress = host + path;
        }
        public IActionResult SaveRequest([FromBody] Request request)
        {
            string url = "api/LicenseManager/SaveRequest";

            try
            {
                using (WebClient webClient = new WebClient())
                {
                    webClient.BaseAddress = baseAddress;
                    //webClient.Headers[HttpRequestHeader.ContentType] = "application/json-patch+json";
                    webClient.Headers[HttpRequestHeader.ContentType] = "application/json";
                   // if (_accessToken != "")
                    {
                        webClient.Headers[HttpRequestHeader.ContentType] = "application/json";
                        //webClient.Headers["Authorization"] = "Bearer " + _accessToken;
                    }
                    string data = JsonConvert.SerializeObject(request);
                    var response = webClient.UploadString(url, data.ToString());
                    // var result = JsonConvert.DeserializeObject<Object>(response);
                    return Json(true);
                }
            }

            catch (Exception ex)
            {
                return Json(false); 
            }

         
        }
    }
}
