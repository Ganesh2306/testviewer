using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ARCHIVE_DASHBOARD.Model.Analytics;

namespace ARCHIVE_DASHBOARD.Controllers
{
    public class AnalyticsController : Controller
    {
        private IConfiguration configuration;
        private string baseAddress;
        public AnalyticsController(IConfiguration iConfig)
        {
            configuration = iConfig;
            string host = configuration.GetSection("WebAPIConfiguration").GetSection("Host").Value;
            string path = configuration.GetSection("WebAPIConfiguration").GetSection("Path").Value;
            baseAddress = host + path;
        }
        public IActionResult ActivityLogs()
        {
            var ActivityLogsData = new List<ActivityLog>
                {
                    new ActivityLog
                    {
                        Date_Time= "Dec 14, 2017, 5:17 AM",
                        CompanyName= "oswald",
                        UserId= "All",
                        TimePeriod= "8.00 AM",
                        Region= "Maharashtra",
                        Location= "Mumbai",
                        IP= "172.16.10.114",
                        ViewRecords= "1000000",
                        FavoriteRecords= "500",
                        CartRecords= "400",
                        OrderRecords= "300",
                        OrderQuantity= "200"
                    },
                    new ActivityLog
                    {
                        Date_Time= "Dec 20, 2020, 4:45 AM",
                        CompanyName= "VishalW",
                        UserId= "All",
                        TimePeriod= "8.00 AM",
                        Region= "Maharashtra",
                        Location= "Pune",
                        IP= "172.16.10.114",
                        ViewRecords= "1000000",
                        FavoriteRecords= "4000",
                        CartRecords= "500",
                        OrderRecords= "100",
                        OrderQuantity= "100"
                    }
                };
            return Json(ActivityLogsData);
        }
        public IActionResult DesignProperty()
        {
            var DesignPropertyData = new List<DesignProperty>
                {
                    new DesignProperty
                    {
                    Date_Time= "Dec 14, 2017, 5:17 AM",
                    CompanyName= "TDS",
                    Region= "Maharashtra",
                    UserId= "Vishal",
                    Action= "Edit",
                    Pattern= "Checks",
                    Color= "Red",
                    DesignSize= "5in x 5in",
                    Category= "Formal",
                    Material= "Solid",
                    Washcare= "Normal Wash",
                    Width= "150",
                    GSM= "122",
                    Price= "1500",
                    YarnCount= "1/40 x 2/80",
                    Weave= "Self Dobby",
                    Records= "1500"
                    },
                    new DesignProperty
                    {
                    Date_Time= "Dec 14, 2017, 5:17 AM",
                    CompanyName= "TDS",
                    Region= "Maharashtra",
                    UserId= "Kapil Tds",
                    Action= "Edit",
                    Pattern= "Dobby",
                    Color= "Green",
                    DesignSize= "5.4in x 5.4in",
                    Category= "Casual",
                    Material= "Solid",
                    Washcare= "Normal Wash",
                    Width= "150",
                    GSM= "122",
                    Price= "1500",
                    YarnCount= "1/40 x 2/80",
                    Weave= "Self Dobby",
                    Records= "1500"
                    }
                };
            return Json(DesignPropertyData);
        }
        public IActionResult DesignStatastic()
        {
            var DesignStatasticData = new List<DesignStatastic>
                {
                    new DesignStatastic
                    {
                      Design_Code = "9999/002/03",
                      Created_By = "RAYMOND",
                      View_Records = "2000",
                      Favourite_Records = "800",
                      Cart_Records = "500",
                      Order_Records = "200",
                       Order_Quantity = "150"
                    },
                    new DesignStatastic
                    {
                      Design_Code ="0555/001/01",
                      Created_By ="TDS",
                      View_Records ="2000",
                      Favourite_Records ="800",
                      Cart_Records ="500",
                      Order_Records ="200",
                       Order_Quantity ="150"
                    }
                };
            return Json(DesignStatasticData);
        }
    

    }
}
