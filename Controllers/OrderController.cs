using ARCHIVE_DASHBOARD.Helper;
using ARCHIVE_DASHBOARD.Session;
using ARCHIVE_VIEWER.Models.Order;
using Asp.netCoreReactDemo.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_VIEWER.Controllers
{
    public class OrderController : Controller
    {
        private IConfiguration configuration;
        private string baseAddress;

        public OrderController(IConfiguration iConfig)
        {
            configuration = iConfig;
            string host = configuration.GetSection("WebAPIConfiguration").GetSection("Host").Value;
            string path = configuration.GetSection("WebAPIConfiguration").GetSection("Path").Value;
            baseAddress = host + path;
        }
        public IActionResult SaveOrderDetails([FromBody] SaveOrderRequestDto saveOrderRequestDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            saveOrderRequestDto.Organization_id = myComplexObject.OrganisationId;
            saveOrderRequestDto.Created_By = myComplexObject.userid;
            if (myComplexObject.org_type == 3)
            {
                saveOrderRequestDto.Customer_Id = myComplexObject.org_type_id;
            }
            if (myComplexObject.org_type == 2)
            {
                saveOrderRequestDto.Supplier_id = myComplexObject.org_type_id;
            }
            var result1 = ApiHelper.PostData(baseAddress, "api/Configuration/SaveOrder", saveOrderRequestDto, myComplexObject.AccessToken);
            return Json(result1);
        }

        public IActionResult updateOrderStatus([FromBody] SaveOrderRequestDto saveOrderRequestDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var result1 = ApiHelper.PostData(baseAddress, "api/Configuration/SaveOrder", saveOrderRequestDto, myComplexObject.AccessToken);
            return Json(result1);
        }
        public IActionResult GetMyOrder([FromQuery] int OrderNo)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetMyOrderRequest?OrderNo=" + OrderNo, myComplexObject.AccessToken);
            return Json(response);
        }

        public IActionResult GetCustomerOrderList([FromBody] GetMyOrderListRequest getMyOrderListRequest)
        
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            getMyOrderListRequest.organisationId = myComplexObject.OrganisationId;
            if (myComplexObject.org_type == 3)
            {
                getMyOrderListRequest.CustomerId = myComplexObject.org_type_id;
                var result1 = ApiHelper.PostData(baseAddress, "api/Configuration/GetCustomerOrderList", getMyOrderListRequest, myComplexObject.AccessToken);
                return Json(result1); 
            }
            if (myComplexObject.org_type == 2)
            {
                getMyOrderListRequest.SupplierId = myComplexObject.org_type_id;
                var result1 = ApiHelper.PostData(baseAddress, "api/Configuration/GetCustomerOrderList", getMyOrderListRequest, myComplexObject.AccessToken);
                return Json(result1);

            }
            return null;
            
        }
        public IActionResult GenerateOrder_Report([FromQuery] int OrderNo)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GenerateOrder_Report?OrderNo=" + OrderNo, myComplexObject.AccessToken);
            return Json(response);

        }
        public IActionResult  CustomersList()
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var org_id = myComplexObject.OrganisationId;
            var Supplier_id = myComplexObject.org_type_id;
            var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetConfiguredCustomersList?OrganisationId= " + org_id + "&SupplierId=" + Supplier_id, myComplexObject.AccessToken);
            return Json(response);
        }
        public IActionResult GetOrderNotification([FromBody] GetOrderNotificationRequest getOrderNotificationRequest)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            getOrderNotificationRequest.organisationId = myComplexObject.OrganisationId;
            if (myComplexObject.org_type == 3)
            {
                getOrderNotificationRequest.customerId = myComplexObject.org_type_id;
                var result1 = ApiHelper.PostData(baseAddress, "api/Configuration/GetOrderNotification", getOrderNotificationRequest, myComplexObject.AccessToken);
                return Json(result1);
            }
            if (myComplexObject.org_type == 2)
            {
                getOrderNotificationRequest.supplierId = myComplexObject.org_type_id;
                var result1 = ApiHelper.PostData(baseAddress, "api/Configuration/GetOrderNotification", getOrderNotificationRequest, myComplexObject.AccessToken);
                return Json(result1);
            }
            return null;
        }

        public IActionResult GetAllBoardDesigns([FromQuery] long BoardId)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var org_id = myComplexObject.OrganisationId;
            var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetAllBoardDesigns?OrgId=" + org_id + "&BoardId=" + BoardId, myComplexObject.AccessToken);
            return Json(response);

        }

        public IActionResult SearchCustomerOrderList([FromBody] SearchOrderListRequest searchOrderListRequest)

        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            searchOrderListRequest.organisationId = myComplexObject.OrganisationId;
            if (myComplexObject.org_type == 3)
            {
                searchOrderListRequest.CustomerId = myComplexObject.org_type_id;
                var result1 = ApiHelper.PostData(baseAddress, "api/Configuration/SearchCustomerOrderList", searchOrderListRequest, myComplexObject.AccessToken);
                return Json(result1);
            }
            if (myComplexObject.org_type == 2)
            {
                searchOrderListRequest.SupplierId = myComplexObject.org_type_id;
                var result1 = ApiHelper.PostData(baseAddress, "api/Configuration/SearchCustomerOrderList", searchOrderListRequest, myComplexObject.AccessToken);
                return Json(result1);

            }
            return null;

        }
    }
} 
