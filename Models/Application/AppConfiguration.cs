using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Application
{

    // AppConfiguration myDeserializedClass = JsonConvert.DeserializeObject<AppConfiguration>(myJsonResponse); 
    public class LogLevel
    {
        public string Default { get; set; }
        public string Microsoft { get; set; }

        public string MicrosoftHostingLifetime { get; set; }
    }

    public class Logging
    {
        public LogLevel LogLevel { get; set; }
    }

    public class WebAPIConfiguration
    {
        public string Host { get; set; }
        public string Path { get; set; }
    }

    public class AppConfiguration
    {
        public Logging Logging { get; set; }
        public string AllowedHosts { get; set; }
        public WebAPIConfiguration WebAPIConfiguration { get; set; }
    }


}
