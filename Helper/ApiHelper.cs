using ARCHIVE_DASHBOARD.CustomFilter;
using Asp.netCoreReactDemo.Controllers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Helper
{

    public static class ApiHelper
    {
        public static async Task<Object> GetData(string BaseAddress, string url)
        {
            var requrl = BaseAddress + url;


            var result = new Object();
            using (var client = new HttpClient())
            {

                using (var response = client.GetAsync(requrl).Result)
                {
                    if (response.IsSuccessStatusCode)
                    {
                        var keyData = response.Content.ReadAsStringAsync();
                        result = keyData.Result;
                    }
                }
            }
            return result;
        }
        public static object GetDataNewQS(string BaseAddress, string url, string _accessToken)
        {
           
            var result = new Object();
            try
            {
                using (WebClient webClient = new WebClient())
                {
                    webClient.BaseAddress = BaseAddress;
                    webClient.Headers["Authorization"] = "Bearer " + _accessToken;

                    var response = webClient.DownloadString(url);
                    result = response;
                }
            } 
            catch (Exception ex)
            {

                throw;
            }
            

            return result;
        }
        public static Object GetDataNew(string BaseAddress, string url, string _accessToken)
        {

            var requrl = BaseAddress + url + "?AccessToken=" + _accessToken;


            var result = new Object();
            using (var client = new HttpClient())
            {

                using (var response = client.GetAsync(requrl).Result)
                {
                    if (response.IsSuccessStatusCode)
                    {
                        var keyData = response.Content.ReadAsStringAsync();
                        result = keyData.Result;
                    }
                }
            }
            return result;
        }
        public static Object PostData(string BaseAddress, string url, Object root, string _accessToken)
        {
            try
            {
                using (WebClient webClient = new WebClient())
                {
                    webClient.BaseAddress = BaseAddress;
                    //webClient.Headers[HttpRequestHeader.ContentType] = "application/json-patch+json";
                    webClient.Headers[HttpRequestHeader.ContentType] = "application/json";
                    if (_accessToken != "")
                    {
                        webClient.Headers[HttpRequestHeader.ContentType] = "application/json";
                        webClient.Headers["Authorization"] = "Bearer " + _accessToken;
                    }
                    
                    string data = JsonConvert.SerializeObject(root);

                    
                    var response = webClient.UploadString(url, data.ToString());
                    // var result = JsonConvert.DeserializeObject<Object>(response);
                    return response;
                }
            }
            
            catch (Exception ex)
            {
                return null;
            }
                                                                                                                           }
        public static Object PostDataWait(string BaseAddress, string url, Object root, string _accessToken,int MilliSeconds)
        {
            try
            {
               

                using (WebClient webClient = new WebClient())
                {
                    webClient.BaseAddress = BaseAddress;
                    //webClient.Headers[HttpRequestHeader.ContentType] = "application/json-patch+json";
                    webClient.Headers[HttpRequestHeader.ContentType] = "application/json";
                    if (_accessToken != "")
                    {
                        webClient.Headers[HttpRequestHeader.ContentType] = "application/json";
                        webClient.Headers["Authorization"] = "Bearer " + _accessToken;
                    }
                    string data = JsonConvert.SerializeObject(root);

                    var response = webClient.UploadString(url, data.ToString());

                    Task.Delay(MilliSeconds);

                    return response;
                }
            }

            catch (Exception ex)
            {
                return null;
            }
        }
    }
}