using ARCHIVE_DASHBOARD.CustomFilter;
using ARCHIVE_DASHBOARD.Helper;
using ARCHIVE_DASHBOARD.Session;
using ARCHIVE_VIEWER.Models.DesignSearch;
using ARCHIVE_VIEWER.Models.login;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Asp.netCoreReactDemo.Controllers
{

    public class Ability
    {
        public string action { get; set; }
        public string subject { get; set; }
    }
    public class LoginUsersDto
    {
        public string userName { get; set; }
        public string password { get; set; }
        public string GoogleToken { get; set; }
        public string product { get; set; }
        public SaveFingurePrintDetailsRequestDto fingureprint { get; set; }
        public SaveDeviceDetailsRequestDto saveDeviceDetailsRequestDto { get; set; }
    }

    public class SaveDeviceDetailsRequestDto 
    {
        public long device_detail_id { get; set; }
        public long System_User_Id { get; set; }
        public string Device_Fingure_Print_Id { get; set; }
        public string Mac_Address { get; set; }

        public double Screen_X_Resolution { get; set; }

        public double Screen_Y_Resolution { get; set; }


        public double Screen_X_DPI { get; set; }


        public double Screen_Y_DPI { get; set; }


        public bool Dpi_Unit { get; set; }


        public bool Is_Active { get; set; }
        public string password_hash { get; set; }

        public bool Is_Color_Profile { get; set; }

        public string Color_Profile_Name { get; set; }

    }

    public class Device_DetailsDto
    {
        
        public int state { get; set; }
        public long device_detail_id { get; set; }
        public long System_User_Id { get; set; }
        public string Device_Fingure_Print_Id { get; set; }
        public string Mac_Address { get; set; }
        public double Screen_X_Resolution { get; set; }
        public double Screen_Y_Resolution { get; set; }
        public double Screen_X_DPI { get; set; }
        public double Screen_Y_DPI { get; set; }
        public bool Dpi_Unit { get; set; }
        public bool Is_Active { get; set; }
        public bool Is_Color_Profile { get; set; }
        public string password { get; set; }
        public string Color_Profile_Name { get; set; }
    }

    public class LogoutUsersDto
    {
        public string role { get; set; }
        public string token { get; set; }
    }
    public class EmailDto
    {
        public string EmailTo { get; set; }
        public string Username { get; set; }
        public long OrgId { get; set; }

    }

    public class OTP
    {
        public string otp { get; set; }
        public string EmailTo { get; set; }
        public string Username { get; set; }

        public object Message { get; set; }

    }
    public class UpdatePasswordDto
    {
        public string email { get; set; }
        public string login_id { get; set; }
        public string password_hash { get; set; }
    }

    public class LoggedUserData
    {
        public ConfiguredCustomersDto configuredCustomersDto { get; set; }
        public ConfiguredSuppliersDto configuredSuppliersDto { get; set; }
        public Supplier supplier { get; set; }
        public customerList customerList { get; set; }
        public string OrganisationName { get; set; }
        public string LoginMessage { get; set; }
        public string UserName { get; set; }
        public string Role { get; set; }
        public long RoleId { get; set; }
        public long FolderId { get; set; }
        public string message { get; set; }
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public long OrganisationId { get; set; }
        public int org_type { get; set; }
        public long userid { get; set; }
        public long org_type_id { get; set; }
        public bool is_administrator { get; set; }
        public bool is_otherlogin { get; set; }
        public bool IsAI { get; set; }
        public DateTime AccessExpiryTime { get; set; }
        public DateTime RefreshExpiryTime { get; set; }
        public List<Ability> ability { get; set; }
        public string org_userImg_url { get; set; }
        public byte[] org_userimg_byte { get; set; }
        public bool IsFingurePrintsave { get; set; }
        public Device_DetailsDto dd { get; set; }
        public string Password { get; set; }
        public string oldpassword { get; set; } 
        public string newpassword { get; set; }
    }

    public class LoginController : Controller
    {
        private IConfiguration configuration;
        private string baseAddress;
        public LoginController(IConfiguration iConfig)
        {
            configuration = iConfig;
            string host = configuration.GetSection("WebAPIConfiguration").GetSection("Host").Value;
            string path = configuration.GetSection("WebAPIConfiguration").GetSection("Path").Value;
            baseAddress = host + path;
        }      
        
        public IActionResult ValidateUser([FromBody] LoginUsersDto _LoginUsersDto)
        {
            var response = ApiHelper.PostData(baseAddress, "api/Configuration/LoginOrgUser",
                _LoginUsersDto, "");
            LoggedUserData _LoggedUserData = null;
            if (response != null)
            {
                _LoggedUserData = JsonConvert.DeserializeObject<LoggedUserData>((string)response);
                _LoggedUserData.ability = GetAbilityByRoleType(_LoggedUserData.org_type, _LoggedUserData.is_administrator);
                _LoggedUserData.Password = _LoginUsersDto.password;
                HttpContext.Session.SetObjectAsJson("Auth", _LoggedUserData);
                if (_LoggedUserData.org_type == 2)
                {
                    _LoggedUserData.customerList = GetConfiguredCustomersList();
                }
                else if (_LoggedUserData.org_type == 3)
                {
                    _LoggedUserData.supplier = GetConfiguredSuppliersList();
                }
                else
                {
                    _LoggedUserData.is_otherlogin = true;
                }
            } 
           
            return Json(_LoggedUserData);
        }

        public IActionResult SaveDeviceDetails([FromBody] Device_DetailsDto DeviceDetailsDto)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var response = ApiHelper.PostData(baseAddress, "api/Configuration/SaveDeviceDetails",
                DeviceDetailsDto, myComplexObject.AccessToken);
          
            return Json(response);
        }
        public IActionResult LogOutOtherUser()
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            logout logout = new logout();
            logout.UserId = myComplexObject.userid;
            var response = ApiHelper.PostData(baseAddress, "api/Configuration/ForceLogoutOrgUser",
                logout, myComplexObject.AccessToken);
            if (response != null)
            {
                HttpContext.Session.Remove("Auth");
            }

            return Json(response);
        }


        public List<Ability> GetAbilityByRoleType(int org_type, bool is_administrator)
        {
            List<Ability> abilities = new List<Ability>() {
            new Ability
            {
                action = "read",
                subject= "Auth"
            },
            new Ability
            {
                action = "display",
                subject= "Common"
            }
            };

            List<Ability> organisationAbilities = new List<Ability>() {
            new Ability {
                        action = "list",
                        subject = "Organisation"
                    },
                    new Ability {
                        action = "create",
                        subject = "Organisation"
                    },
                    new Ability {
                        action = "update",
                        subject = "Organisation"
                    },
                    new Ability {
                        action = "delete",
                        subject = "Organisation"
                    }
            };
            List<Ability> threedAbilities = new List<Ability>() {
            new Ability {
                        action = "list",
                        subject = "threed"
                    },
                    new Ability {
                        action = "create",
                        subject = "threed"
                    },
                    new Ability {
                        action = "update",
                        subject = "threed"
                    },
                    new Ability {
                        action = "delete",
                        subject = "threed"
                    }
            };


            List<Ability> supplierAbilities = new List<Ability>() {
            new Ability {
                        action = "list",
                        subject = "Supplier"
                    },
                    new Ability {
                        action = "create",
                        subject = "Supplier"
                    },
                    new Ability {
                        action = "update",
                        subject = "Supplier"
                    },
                    new Ability {
                        action = "delete",
                        subject = "Supplier"
                    }
            };

            List<Ability> organisationUserAbilities = new List<Ability>() {
            new Ability {
                        action = "list",
                        subject = "OrganisationUser"
                    },
                    new Ability {
                        action = "create",
                        subject = "OrganisationUser"
                    },
                    new Ability {
                        action = "update",
                        subject = "OrganisationUser"
                    },
                    new Ability {
                        action = "delete",
                        subject = "OrganisationUser"
                    }
            };

            List<Ability> organisationReqAbilities = new List<Ability>() {
            new Ability {
                        action = "list",
                        subject = "OrganisationRequest"
                    },
                    new Ability {
                        action = "create",
                        subject = "OrganisationRequest"
                    },
                    new Ability {
                        action = "update",
                        subject = "OrganisationRequest"
                    },
                    new Ability {
                        action = "delete",
                        subject = "OrganisationRequest"
                    }
            };

            List<Ability> supplierUserAbilities = new List<Ability>() {
            new Ability {
                        action = "list",
                        subject = "SupplierUser"
                    },
                    new Ability {
                        action = "create",
                        subject = "SupplierUser"
                    },
                    new Ability {
                        action = "update",
                        subject = "SupplierUser"
                    },
                    new Ability {
                        action = "delete",
                        subject = "SupplierUser"
                    }
            };

            List<Ability> customerAbilities = new List<Ability>() {
            new Ability {
                        action = "list",
                        subject = "Customer"
                    },
                    new Ability {
                        action = "create",
                        subject = "Customer"
                    },
                    new Ability {
                        action = "update",
                        subject = "Customer"
                    },
                    new Ability {
                        action = "delete",
                        subject = "Customer"
                    }
            };

            List<Ability> agentAbilities = new List<Ability>() {
            new Ability {
                        action = "list",
                        subject = "Agent"
                    },
                    new Ability {
                        action = "create",
                        subject = "Agent"
                    },
                    new Ability {
                        action = "update",
                        subject = "Agent"
                    },
                    new Ability {
                        action = "delete",
                        subject = "Agent"
                    }
            };

            List<Ability> customerUserAbilities = new List<Ability>() {
            new Ability {
                        action = "list",
                        subject = "CustomerUser"
                    },
                    new Ability {
                        action = "create",
                        subject = "CustomerUser"
                    },
                    new Ability {
                        action = "update",
                        subject = "CustomerUser"
                    },
                    new Ability {
                        action = "delete",
                        subject = "CustomerUser"
                    }
            };

            List<Ability> agentUserAbilities = new List<Ability>() {
            new Ability {
                        action = "list",
                        subject = "AgentUser"
                    },
                    new Ability {
                        action = "create",
                        subject = "AgentUser"
                    },
                    new Ability {
                        action = "update",
                        subject = "AgentUser"
                    },
                    new Ability {
                        action = "delete",
                        subject = "AgentUser"
                    }
            };

            List<Ability> designAbilities = new List<Ability>() {
            new Ability {
                        action = "list",
                        subject = "Design"
                    },
                    new Ability {
                        action = "create",
                        subject = "Design"
                    },
                    new Ability {
                        action = "update",
                        subject = "Design"
                    },
                    new Ability {
                        action = "delete",
                        subject = "Design"
                    }
            };

            List<Ability> analyticsAbilities = new List<Ability>() {
            new Ability {
                        action = "list",
                        subject = "ActivityLogs"
                    },
                    new Ability {
                        action = "list",
                        subject = "DesignProperty"
                    },
                    new Ability {
                        action = "list",
                        subject = "DesignStatastic"
                    },
                    new Ability {
                        action = "create",
                        subject = "Analytics"
                    },
                    new Ability {
                        action = "update",
                        subject = "Analytics"
                    },
                    new Ability {
                        action = "delete",
                        subject = "Analytics"
                    }
            };

            List<Ability> reportAbilities = new List<Ability>() {
            new Ability {
                        action = "list",
                        subject = "Favourite"
                    },
                    new Ability {
                        action = "list",
                        subject = "Cart"
                    },
                    new Ability {
                        action = "list",
                        subject = "Order"
                    },
                    new Ability {
                        action = "Print",
                        subject = "Reports"
                    }
            };

            List<Ability> roleAbilities = new List<Ability>() {
            new Ability {
                        action = "list",
                        subject = "Role"
                    },
                    new Ability {
                        action = "create",
                        subject = "Role"
                    },
                    new Ability {
                        action = "update",
                        subject = "Role"
                    },
                    new Ability {
                        action = "delete",
                        subject = "Role"
                    }
            };

            List<Ability> roleConfigAbilities = new List<Ability>() {
            new Ability {
                        action = "list",
                        subject = "RoleConfiguration"
                    },
                    new Ability {
                        action = "create",
                        subject = "RoleConfiguration"
                    },
                    new Ability {
                        action = "update",
                        subject = "RoleConfiguration"
                    },
                    new Ability {
                        action = "delete",
                        subject = "RoleConfiguration"
                    }
            };

            List<Ability> roleAccessAbilities = new List<Ability>() {
            new Ability {
                        action = "list",
                        subject = "RoleDesignAccess"
                    },
                    new Ability {
                        action = "create",
                        subject = "RoleDesignAccess"
                    },
                    new Ability {
                        action = "update",
                        subject = "RoleDesignAccess"
                    },
                    new Ability {
                        action = "delete",
                        subject = "RoleDesignAccess"
                    }
            };

            List<Ability> managementAbilities = new List<Ability>() {
            new Ability {
                        action = "list",
                        subject = "DesignType"
                    },
                    new Ability {
                        action = "create",
                        subject = "DesignType"
                    },
                    new Ability {
                        action = "update",
                        subject = "DesignType"
                    },
                    new Ability {
                        action = "delete",
                        subject = "DesignType"
                    },
                      new Ability {
                        action = "list",
                        subject = "DesignGroup"
                    },
                    new Ability {
                        action = "create",
                        subject = "DesignGroup"
                    },
                    new Ability {
                        action = "update",
                        subject = "DesignGroup"
                    },
                    new Ability {
                        action = "delete",
                        subject = "DesignGroup"
                    },
                      new Ability {
                        action = "list",
                        subject = "DesignFeature"
                    },
                    new Ability {
                        action = "create",
                        subject = "DesignFeature"
                    },
                    new Ability {
                        action = "update",
                        subject = "DesignFeature"
                    },
                    new Ability {
                        action = "delete",
                        subject = "DesignFeature"
                    },
                      new Ability {
                        action = "list",
                        subject = "DesignConfiguration"
                    },
                    new Ability {
                        action = "create",
                        subject = "DesignConfiguration"
                    },
                    new Ability {
                        action = "update",
                        subject = "DesignConfiguration"
                    },
                    new Ability {
                        action = "delete",
                        subject = "DesignConfiguration"
                    }
            };
            switch (org_type)
            {

                case 0: //Platform Admin
                    abilities.AddRange(organisationAbilities);
                    abilities.AddRange(organisationReqAbilities);
                    //roleType = "Enterprise";
                    break;
                case 1: //Organisation
                    if (is_administrator)
                    {
                        abilities.AddRange(organisationUserAbilities);
                        abilities.AddRange(managementAbilities);
                        abilities.AddRange(roleAbilities);
                        abilities.AddRange(roleConfigAbilities);
                        abilities.AddRange(roleAccessAbilities);
                    }
                    abilities.AddRange(supplierAbilities);
                    abilities.AddRange(supplierUserAbilities);
                    abilities.AddRange(customerAbilities);
                    abilities.AddRange(customerUserAbilities);
                    abilities.AddRange(threedAbilities);
                    abilities.AddRange(agentAbilities);
                    abilities.AddRange(agentUserAbilities);
                    //abilities.AddRange(designAbilities);
                    abilities.AddRange(analyticsAbilities);
                    abilities.AddRange(reportAbilities);
                   
                    //roleType = "Organisation";
                    break;
                case 2: //Supplier
                    if (is_administrator)
                    {
                        abilities.AddRange(customerAbilities);
                        abilities.AddRange(agentAbilities);
                        abilities.AddRange(supplierUserAbilities);
                    }
                    abilities.Add(new Ability { action = "list", subject = "Design" });
                    abilities.Add(new Ability { action = "display", subject = "Design" });
                    abilities.Add(new Ability { action = "show", subject = "Design" });
                    //abilities.AddRange(designAbilities);
                    abilities.AddRange(analyticsAbilities);
                    abilities.AddRange(reportAbilities);
                    break;
                case 3: //Customer
                    if (is_administrator)
                    abilities.AddRange(customerUserAbilities);
                    abilities.AddRange(threedAbilities);
                   // abilities.AddRange(designAbilities);
                    abilities.AddRange(analyticsAbilities);
                    abilities.AddRange(reportAbilities);
                    abilities.Add(new Ability { action = "show", subject = "Design" });
                    break;
                case 4: //Agent
                    if (is_administrator)
                        abilities.AddRange(agentUserAbilities);
                    abilities.AddRange(customerAbilities);
                  //  abilities.AddRange(designAbilities);
                    abilities.AddRange(analyticsAbilities);
                    abilities.AddRange(reportAbilities);
                    break;
                default:
                    break;
            }
            return abilities;
        }
        
        public IActionResult Logout([FromBody] LogoutUsersDto _LogoutUsersDto)
        {
            string logouturl = "api/Configuration/LogoutOrgUser";
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            if (_LogoutUsersDto.role != "Organization")
            {
                logouturl = "api/LicenseManager/Logout";
            }
            string accessToken = "";
            if (myComplexObject == null)
                accessToken = _LogoutUsersDto.token;
            else
                accessToken = myComplexObject.AccessToken;
                            var response = ApiHelper.PostData(baseAddress, logouturl,
                "",  accessToken);
            if (response != null)
            {
                HttpContext.Session.Remove("Auth");
            }
            return Json(response);
        }
        [NonAction]
        public Supplier GetConfiguredSuppliersList()
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var org_id = myComplexObject.OrganisationId;
            var customer_id = myComplexObject.org_type_id;
            var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetConfiguredSuppliersList?OrganisationId=" + org_id + "&CustomerId=" + customer_id, myComplexObject.AccessToken);

            var result = JsonConvert.DeserializeObject<Supplier>(response.ToString());
            return result;
        }

        [NonAction]
        public customerList GetConfiguredCustomersList()
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var org_id = myComplexObject.OrganisationId;
            var Supplier_id = myComplexObject.org_type_id;
            var response = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetConfiguredCustomersList?OrganisationId= " + org_id + "&SupplierId=" + Supplier_id, myComplexObject.AccessToken);
            var result = JsonConvert.DeserializeObject<customerList>(response.ToString());
            return result;

        }


        [TypeFilter(typeof(AdminExpiryTime))]
        public IActionResult GetEditOrgUser()
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var userid = myComplexObject.userid;
            var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetOrganisationUserById?id=" + userid, myComplexObject.AccessToken);
            var data = JsonConvert.DeserializeObject<OrganisationUserListDto>(result.ToString());
            return Json(data);
        }

        [TypeFilter(typeof(AdminExpiryTime))]
        public IActionResult SaveProfile([FromBody] OrganisationUserListDto _Organisation)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            _Organisation.org_id = myComplexObject.OrganisationId;
            if (_Organisation.agt_imagebytebase != null)
            {
                _Organisation.org_user_imagebyte = Convert.FromBase64String(_Organisation.agt_imagebytebase);
            }
            var result = ApiHelper.PostData(baseAddress, "api/Configuration/UpdateUserProfile", _Organisation, myComplexObject.AccessToken);
            return Json(result);
        }
        [TypeFilter(typeof(AdminExpiryTime))]
        public IActionResult Getpassword()
        {
            var data = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var result = data.Password;
            return Json(result);
        }

        [TypeFilter(typeof(AdminExpiryTime))]
        public IActionResult ChangePassword([FromBody] OrganisationUserListDto _Organisation)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var data = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var IsaveNotMAth = false;
            _Organisation.org_id = myComplexObject.OrganisationId;
             if (data.Password == _Organisation.oldpassword)
            {
                IsaveNotMAth = true;
            }
            if(IsaveNotMAth)
            {
                _Organisation.password_hash = _Organisation.newpassword;
                _Organisation.user_id = myComplexObject.userid;
                var result = ApiHelper.PostData(baseAddress, "api/Configuration/UpdateUserPassword", _Organisation, myComplexObject.AccessToken);
                return Json(new { IsaveNotMAth, result });
            }
            return Json(new { IsaveNotMAth });
        }

       // [TypeFilter(typeof(AdminExpiryTime))]
        public IActionResult SendEmail([FromBody] EmailDto emaildto)
        {
            var response = ApiHelper.PostData(baseAddress, "api/Configuration/Sendemail", emaildto, "");
            OTP tP = new OTP();
            if (response.ToString() == "Organisation is not configured")
            {
                tP.Message = new
                {
                    flag = false,
                    Msg = "Organisation is not configured"
                };
                return Ok(tP.Message);
            }
            else if (response.ToString() == "Enter Valid Email")
            {
                tP.Message = new
                {
                    flag = false,
                    Msg = "Enter Valid Email Address"
                };
                return Ok(tP.Message);
            }

            tP.otp = response.ToString();
            tP.EmailTo = emaildto.EmailTo;
            tP.Username = emaildto.Username;
            HttpContext.Session.SetObjectAsJson("otp", tP);

            tP.Message = new
            {
                flag = true,
                Msg = "OTP"
            };
            return Ok(tP.Message);
        }
        public IActionResult VarifyOTP([FromBody] OTP otp)
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<OTP>("otp");
            var ot = myComplexObject.otp;
            if (otp.otp == ot)
                return Ok(true);
            else
                return Ok(false);
        }

        public IActionResult ChangeUserPassword([FromBody] UpdatePasswordDto UpdatePasswordDto)
        {

            var myComplexObject = HttpContext.Session.GetObjectFromJson<OTP>("otp");
            UpdatePasswordDto.email = myComplexObject.EmailTo;
            UpdatePasswordDto.login_id = myComplexObject.Username;
            var response = ApiHelper.PostData(baseAddress, "api/Configuration/UpdatePassword", UpdatePasswordDto, "");
            return Ok(response);

        }
        public IActionResult UpdateUserPassword([FromBody] UpdatePasswordDto UpdatePasswordDto)
        {

            var myComplexObject = HttpContext.Session.GetObjectFromJson<OTP>("otp");
            UpdatePasswordDto.email = myComplexObject.EmailTo;
            UpdatePasswordDto.login_id = myComplexObject.Username;
            var response = ApiHelper.PostData(baseAddress, "api/Configuration/UpdatePassword", UpdatePasswordDto, "");
            return Ok(response);

        }
        public IActionResult Q3durl()
        {
            string url = configuration.GetSection("Q3dURL").GetSection("Url").Value;
            return Json(url);
        }

    }
}