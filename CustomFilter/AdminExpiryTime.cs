using ARCHIVE_DASHBOARD.Helper;
using ARCHIVE_DASHBOARD.Session;
using Asp.netCoreReactDemo.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace ARCHIVE_DASHBOARD.CustomFilter
{
    public class RefreshTokenadmin
    {
        public string refreshToken { get; set; }
    }
    public class AdminExpiryTime : Attribute, IActionFilter
    {
        private IConfiguration configuration;
        private string baseAddress;
        public AdminExpiryTime(IConfiguration iConfig)
        {
            configuration = iConfig;
            string host = configuration.GetSection("WebAPIConfiguration").GetSection("Host").Value;
            string path = configuration.GetSection("WebAPIConfiguration").GetSection("Path").Value;
            baseAddress = host + path;
        }
        public void OnActionExecuting(ActionExecutingContext context)

        {

            var myComplexObject = context.HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");

            if (DateTime.Now.AddMinutes(10) > myComplexObject.AccessExpiryTime)
            {
                RefreshTokenadmin refreshToken = new RefreshTokenadmin();
                refreshToken.refreshToken = myComplexObject.RefreshToken;
                var response = ApiHelper.PostData(baseAddress, "api/LicenseManager/RefreshToken", refreshToken, myComplexObject.AccessToken);
                if (response != null)
                {
                    var _LoggedUserData = JsonConvert.DeserializeObject<LoggedUserData>((string)response);
                    context.HttpContext.Session.SetObjectAsJson("Auth", _LoggedUserData);
                }

            }
        }
        public void OnActionExecuted(ActionExecutedContext context)
        {
            // our code after action executes
        }
    }
}
