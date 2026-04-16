using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace ARCHIVE_VIEWER.Controllers
{
    [ApiController]
    [Route("api/image-proxy")]
    public class ImageProxyController : ControllerBase
    {
        private static readonly string[] AllowedHosts = { "s3.ap-south-1.amazonaws.com" };
        private const string AllowedPathPrefix = "/aws.tds/";
        private readonly IHttpClientFactory httpClientFactory;

        public ImageProxyController(IHttpClientFactory httpClientFactory)
        {
            this.httpClientFactory = httpClientFactory;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string url)
        {
            if (string.IsNullOrWhiteSpace(url))
            {
                return BadRequest("url is required");
            }

            if (!Uri.TryCreate(url, UriKind.Absolute, out var uri))
            {
                return BadRequest("invalid url");
            }

            if (!AllowedHosts.Contains(uri.Host, StringComparer.OrdinalIgnoreCase))
            {
                return BadRequest("host not allowed");
            }

            if (!uri.AbsolutePath.StartsWith(AllowedPathPrefix, StringComparison.OrdinalIgnoreCase))
            {
                return BadRequest("path not allowed");
            }

            var client = httpClientFactory.CreateClient();
            var response = await client.SendAsync(new HttpRequestMessage(HttpMethod.Get, uri), HttpCompletionOption.ResponseHeadersRead);

            if (!response.IsSuccessStatusCode)
            {
                response.Dispose();
                return StatusCode((int)response.StatusCode);
            }

            HttpContext.Response.RegisterForDispose(response);

            var contentType = response.Content.Headers.ContentType?.ToString() ?? "application/octet-stream";
            var stream = await response.Content.ReadAsStreamAsync();
            return File(stream, contentType);
        }
    }
}
