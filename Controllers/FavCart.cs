using ARCHIVE_DASHBOARD.Helper;
using ARCHIVE_DASHBOARD.Session;
using ARCHIVE_VIEWER.Models.FavCart;
using Asp.netCoreReactDemo.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_VIEWER.Controllers
{
    public class FavCart : Controller
    {
        private IConfiguration configuration;
        private string baseAddress;
        public FavCart(IConfiguration iConfig)
        {
            configuration = iConfig;
            string host = configuration.GetSection("WebAPIConfiguration").GetSection("Host").Value;
            string path = configuration.GetSection("WebAPIConfiguration").GetSection("Path").Value;
            baseAddress = host + path;
        }

        public IActionResult SaveFavList([FromQuery] SaveFavoriteRequestDto saveFavoriteRequestDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var response = ApiHelper.PostData(baseAddress, "api/Configuration/SaveFavorite", saveFavoriteRequestDto, myComplexObject.AccessToken);
         
            return Json(response);
        }
        public IActionResult GetFavoriteList([FromQuery] long CustomerID)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetFavoriteList?CustomerId"+ CustomerID, myComplexObject.AccessToken);

            return Json(response);
        }
    }
}
