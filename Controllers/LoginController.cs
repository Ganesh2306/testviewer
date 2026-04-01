using ARCHIVE_DASHBOARD.CustomFilter;
using ARCHIVE_DASHBOARD.Helper;
using ARCHIVE_DASHBOARD.Model.Organization;
using ARCHIVE_DASHBOARD.Session;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

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
        public bool IsLogin { get; set; }
        public SaveFingurePrintDetailsRequestDto fingureprint { get; set; }
        public SaveDeviceDetailsRequestDto saveDeviceDetailsRequestDto { get; set; }
    }

    public class LogoutUsersDto
    {
        public string role { get; set; }
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
    public class SaveFingurePrintDetailsRequestDto
    {
        public long Device_Fingure_Print_Id { get; set; }
        public string Device_Login_Id { get; set; }

        public long User_id { get; set; }


        public string Device_Type { get; set; }


        public string Device_Description { get; set; }

        public string Device_Browser { get; set; }

        public string Device_Ip { get; set; }

        public string Device_Location { get; set; }


        public bool Is_Device_Active { get; set; }

        public SaveFingurePrintDetailsRequestDto fingureprint { get; set; }
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

    public class LoggedUserData
    {
        //public long userid { get; set; }
        public bool IsLogin { get; set; }
        public string LoginMessage { get; set; }
        public string UserName { get; set; }
        public string organisationName { get; set; }
        public string otp { get; set; }
        public string Role { get; set; }
        public string message { get; set; }
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public long RoleId { get; set; }
        public long Userid { get; set; }
        public long OrganisationId { get; set; }
        public int org_type { get; set; }
        public long org_type_id { get; set; }
        public bool is_administrator { get; set; }
        public DateTime AccessExpiryTime { get; set; }
        public DateTime RefreshExpiryTime { get; set; }
        public List<Ability> ability { get; set; }
        public byte[] org_userimg_byte { get; set; }
        public string org_userImg_url { get; set; }
        public bool IsFingurePrintSave { get; set; }
        public string Password { get; set; }

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
    public class logout
    {
        public long UserId { get; set; }
    }

    public class EmailResponse
    {
        public string Message { get; set; }
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
        public IActionResult LoginAdmin([FromBody] LoginUsersDto _LoginUsersDto)
        {
            var response = ApiHelper.PostData(baseAddress, "api/LicenseManager/LoginUser",
                _LoginUsersDto, "");
            LoggedUserData _LoggedUserData = null;
            if (response != null)
            {
                _LoggedUserData = JsonConvert.DeserializeObject<LoggedUserData>((string)response);
                _LoggedUserData.ability = GetAbilityByRoleType(0, true);
                HttpContext.Session.SetObjectAsJson("Auth", _LoggedUserData);
            }
            return Json(_LoggedUserData);
        }
        public IActionResult ValidateUser([FromBody] LoginUsersDto _LoginUsersDto)
        {
            var response = ApiHelper.PostData(baseAddress, "api/Configuration/LoginOrgUser",
                _LoginUsersDto, "");
            LoggedUserData _LoggedUserData = null;
            if (response != null)
            {
                _LoggedUserData = JsonConvert.DeserializeObject<LoggedUserData>((string)response);
                var seasonalAccess = false;
                if (_LoggedUserData.org_type == 2)
                {
                    seasonalAccess = IsSeasonalAccess(_LoggedUserData.RoleId, _LoggedUserData.AccessToken);
                    // var n = ;
                    //  var newdata = ;
                }
                _LoggedUserData.ability = GetAbilityByRoleType(_LoggedUserData.org_type, _LoggedUserData.is_administrator, seasonalAccess);
                _LoggedUserData.Password = _LoginUsersDto.password;
                HttpContext.Session.SetObjectAsJson("Auth", _LoggedUserData);
            }
            return Json(_LoggedUserData);
        }
        public IActionResult Q3durl([FromQuery] string Url)
        {
            string url = configuration.GetSection("Q3dURL").GetSection(Url).Value;
            return Json(url);
        }
        public IActionResult Q3drenderpluginURL()
        {
            string url = configuration.GetSection("Q3drenderpluginURL").GetSection("Url").Value;
            return Json(url);
        }
        public IActionResult Getsaasapi()
        {
            string url = configuration.GetSection("saasapi").GetSection("saasurl").Value;
            return Json(url);
        }
        public IActionResult LogOutOtherUser()
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            logout logout = new logout();
            logout.UserId = myComplexObject.Userid;
            var response = ApiHelper.PostData(baseAddress, "api/Configuration/ForceLogoutOrgUser",
                logout, myComplexObject.AccessToken);
            if (response != null)
            {
                HttpContext.Session.Remove("Auth");
            }

            return Json(response);
        }
        public IActionResult LogOutOtherUserAdmin()
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            logout logout = new logout();
            logout.UserId = myComplexObject.Userid;
            var response = ApiHelper.PostData(baseAddress, "api/LicenseManager/ForceLogout",
                logout, myComplexObject.AccessToken);
            if (response != null)
            {
                HttpContext.Session.Remove("Auth");
            }

            return Json(response);
        }
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
        public IActionResult UpdateUserPassword([FromBody] UpdatePasswordDto UpdatePasswordDto)
        {

            var myComplexObject = HttpContext.Session.GetObjectFromJson<OTP>("otp");
            UpdatePasswordDto.email = myComplexObject.EmailTo;
            UpdatePasswordDto.login_id = myComplexObject.Username;
            var response = ApiHelper.PostData(baseAddress, "api/Configuration/UpdatePassword", UpdatePasswordDto, "");
            return Ok(response);

        }
        public List<Ability> GetAbilityByRoleType(int org_type, bool is_administrator, bool seasonalAccess = false)
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
            List<Ability> threedAbilitiesSingle = new List<Ability>() {
            new Ability {
                        action = "list",
                        subject = "threed1"
                    },
                    new Ability {
                        action = "create",
                        subject = "threed1"
                    },
                    new Ability {
                        action = "update",
                        subject = "threed1"
                    },
                    new Ability {
                        action = "delete",
                        subject = "threed1"
                    }
            };
            List<Ability> threedOperations = new List<Ability>() {
            new Ability {
                        action = "list",
                        subject = "threedOperation"
                    },
                    new Ability {
                        action = "create",
                        subject = "threedOperation"
                    },
                    new Ability {
                        action = "update",
                        subject = "threedOperation"
                    },
                    new Ability {
                        action = "delete",
                        subject = "threedOperation"
                    }
            };
            List<Ability> threedProducts = new List<Ability>() {
            new Ability {
                        action = "list",
                        subject = "threedProduct"
                    },
                    new Ability {
                        action = "create",
                        subject = "threedProduct"
                    },
                    new Ability {
                        action = "update",
                        subject = "threedProduct"
                    },
                    new Ability {
                        action = "delete",
                        subject = "threedProduct"
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
            List<Ability> seasonal = new List<Ability>() {
            new Ability {
                        action = "list",
                        subject = "seasonal"
                    },
                    new Ability {
                        action = "create",
                        subject = "seasonal"
                    },
                    new Ability {
                        action = "update",
                        subject = "seasonal"
                    },
                    new Ability {
                        action = "delete",
                        subject = "seasonal"
                    }
            };
            List<Ability> collection = new List<Ability>() {
            new Ability {
                        action = "list",
                        subject = "collection"
                    },
                    new Ability {
                        action = "create",
                        subject = "collection"
                    },
                    new Ability {
                        action = "update",
                        subject = "collection"
                    },
                    new Ability {
                        action = "delete",
                        subject = "collection"
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
                    abilities.Add(new Ability { action = "add", subject = "3DImages" });
                    abilities.Add(new Ability { action = "Display", subject = "3DImages" });
                    abilities.AddRange(threedAbilities);
                    abilities.AddRange(threedOperations);
                    abilities.AddRange(threedProducts);
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
                        abilities.AddRange(threedAbilities);
                        abilities.AddRange(supplierAbilities);
                        abilities.AddRange(supplierUserAbilities);
                        abilities.AddRange(customerAbilities);
                        abilities.AddRange(customerUserAbilities);
                        abilities.AddRange(agentAbilities);
                        abilities.AddRange(agentUserAbilities);
                        abilities.Add(new Ability { action = "add", subject = "3DImages" });
                        abilities.Add(new Ability { action = "configure", subject = "3DImages" });
                        abilities.Add(new Ability { action = "show", subject = "Button" });
                        abilities.AddRange(analyticsAbilities);
                        abilities.AddRange(reportAbilities);
                    }
                    else
                    {
                        //Show Design,Supplier,Customer,3D images to Organisation user
                        abilities.Add(new Ability { action = "list", subject = "Design" });
                        abilities.Add(new Ability { action = "add", subject = "Design" });
                        abilities.Add(new Ability { action = "show", subject = "Design" });
                        //abilities.Add(new Ability { action = "display", subject = "Design" });
                        // abilities.Add(new Ability { action = "add", subject = "3DImages" });
                        //abilities.Add(new Ability { action = "configure", subject = "3DImages" });
                        abilities.AddRange(supplierAbilities);
                        abilities.AddRange(supplierUserAbilities);
                        abilities.AddRange(customerAbilities);
                        abilities.AddRange(customerUserAbilities);
                        //abilities.AddRange(threedAbilities);
                        //abilities.AddRange(agentAbilities);
                        //abilities.AddRange(agentUserAbilities);
                        abilities.AddRange(designAbilities);
                        abilities.AddRange(analyticsAbilities);
                        abilities.AddRange(reportAbilities);
                        //roleType = "Organisation";
                    }

                    break;
                case 2: //Supplier
                    if (is_administrator)
                    {
                        //abilities.AddRange(customerAbilities);
                        // abilities.AddRange(agentAbilities);
                        //abilities.AddRange(supplierUserAbilities);
                        //abilities.AddRange(seasonal);
                        //abilities.AddRange(collection);
                        //abilities.AddRange(threedAbilitiesSingle);
                        //abilities.AddRange(threedAbilities);
                        //abilities.Add(new Ability { action = "configure", subject = "3DImages" });
                        abilities.Add(new Ability { action = "btn", subject = "Design" });
                        abilities.AddRange(threedAbilities);
                        abilities.Add(new Ability { action = "add", subject = "3DImages" });
                        abilities.Add(new Ability { action = "configure", subject = "3DImages" });
                        abilities.Add(new Ability { action = "show", subject = "Button" });
                    }
                    if (seasonalAccess)
                    {
                        abilities.AddRange(seasonal);
                    }
                    abilities.Add(new Ability { action = "list", subject = "Design" });
                    abilities.Add(new Ability { action = "display", subject = "Design" });
                    //abilities.AddRange(designAbilities);
                    abilities.AddRange(analyticsAbilities);
                    abilities.AddRange(reportAbilities);
                    abilities.AddRange(collection);
                    break;
                case 3: //Customer
                    if (is_administrator)
                    {
                        //abilities.AddRange(customerUserAbilities);
                        //abilities.AddRange(threedAbilities);
                        abilities.AddRange(designAbilities);
                    }
                    abilities.Add(new Ability { action = "list", subject = "Design" });
                    abilities.Add(new Ability { action = "add", subject = "Design" });
                    //abilities.AddRange(threedAbilities);
                    abilities.AddRange(analyticsAbilities);
                    abilities.AddRange(reportAbilities);
                    break;
                case 4: //Agent
                    if (is_administrator)
                        abilities.AddRange(agentUserAbilities);
                    abilities.AddRange(customerAbilities);
                    //abilities.AddRange(designAbilities);
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
            var response = ApiHelper.PostData(baseAddress, logouturl, "", myComplexObject == null ? "" : myComplexObject.AccessToken);
            if (response != null)
            {
                HttpContext.Session.Remove("Auth");
            }
            return Json(response);
        }

        [TypeFilter(typeof(CheckExpiryTime))]
        public IActionResult demo()
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");

            return Json("");
        }

        [TypeFilter(typeof(CheckExpiryTime))]
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
            if (IsaveNotMAth)
            {
                _Organisation.password_hash = _Organisation.newpassword;
                _Organisation.user_id = myComplexObject.Userid;
                var result = ApiHelper.PostData(baseAddress, "api/Configuration/UpdateUserPassword", _Organisation, myComplexObject.AccessToken);
                return Json(new { IsaveNotMAth, result });
            }
            return Json(new { IsaveNotMAth });
        }

        [TypeFilter(typeof(AdminExpiryTime))]
        public IActionResult GetEditOrgUser()
        {
            var myComplexObject = HttpContext.Session.GetObjectFromJson<LoggedUserData>("Auth");
            var userid = myComplexObject.Userid;
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
        public bool IsSeasonalAccess(long roleId, string AccessToken)
        {
            var isHadAccess = false;
            var result = ApiHelper.GetDataNewQS(baseAddress, "api/Configuration/GetRoleTaskByRoleID?RoleId=" + roleId + "", AccessToken);
            var jsonObject = JsonConvert.DeserializeObject<RootObject>(result.ToString());
            foreach (var detail in jsonObject.allDetails)
            {
                foreach (var operation in detail.getOperationIdOperationNameRoleTaskIdResponseDtos)
                {
                    if (operation.operation_Name == "Seasonal Collection")
                    {
                        isHadAccess = true;
                    }
                }
            }
            return isHadAccess;
        }
    }
}
