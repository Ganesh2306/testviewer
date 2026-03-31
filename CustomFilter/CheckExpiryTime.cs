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
    public class RefreshToken
    {
        public string refreshToken { get; set; }
    }
    public class CheckExpiryTime : Attribute, IActionFilter
    {
        private IConfiguration configuration;
        private string baseAddress;
        public CheckExpiryTime(IConfiguration iConfig)
        {
            configuration = iConfig;
            string host = configuration.GetSection("WebAPIConfiguration").GetSection("Host").Value;
            string path = configuration.GetSection("WebAPIConfiguration").GetSection("Path").Value;
            baseAddress = host + path ;
        }
        public void OnActionExecuting(ActionExecutingContext context)
        {
            LoggedUserData myComplexObject = context.HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            //var time = myComplexObject.AccessExpiryTime;
            //var expiryTime = time - new TimeSpan(0, 0, 29, 0);
             
            
            if (DateTime.Now.AddMinutes(10) > myComplexObject.AccessExpiryTime)
            {
                RefreshToken refreshToken = new RefreshToken();
                refreshToken.refreshToken = myComplexObject.RefreshToken;
                var response = ApiHelper.PostData(baseAddress, "api/Configuration/RefreshToken", refreshToken, myComplexObject.AccessToken);
                if (response != null)
                {
                    LoggedUserData _LoggedUserData = JsonConvert.DeserializeObject<LoggedUserData>((string)response);
                    myComplexObject.AccessExpiryTime = _LoggedUserData.AccessExpiryTime;
                    myComplexObject.AccessToken = _LoggedUserData.AccessToken;
                    myComplexObject.RefreshExpiryTime = _LoggedUserData.RefreshExpiryTime;
                    myComplexObject.RefreshToken = _LoggedUserData.RefreshToken;
                    context.HttpContext.Session.SetObjectAsJson("Auth", myComplexObject);
                }

            }
        }
        public void OnActionExecuted(ActionExecutedContext context)
        {
            // our code after action executes
        }
    }
}
