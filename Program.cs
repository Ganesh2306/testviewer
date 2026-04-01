using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        } 

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                    //webBuilder.UseUrls("http://0.0.0.0:2003"); //dkt
                    //webBuilder.UseUrls("http://0.0.0.0:9005"); //Getzner
                    //webBuilder.UseUrls("http://0.0.0.0:8001", "http://0.0.0.0:8002"); //rojerthat
                    //webBuilder.UseUrls("http://0.0.0.0:8003", "http://0.0.0.0:8004"); //Jindal
                    //webBuilder.UseUrls("http://0.0.0.0:7001", "http://0.0.0.0:7002"); //Ramraj
                    //webBuilder.UseUrls("http://0.0.0.0:7003", "http://0.0.0.0:7004"); //Nil
                    //webBuilder.UseUrls("http://0.0.0.0:7005", "http://0.0.0.0:7006"); //Raymond
                    //webBuilder.UseUrls("http://0.0.0.0:8008", "http://0.0.0.0:8009"); //(admin.dam3d.in)
                    webBuilder.UseUrls("http://0.0.0.0:7007", "http://0.0.0.0:7008");//q3dlite(tadmin.dam3d.in)
                    //webBuilder.UseUrls("http://0.0.0.0:8000");
                    //webBuilder.UseUrls("http://0.0.0.0:3016");   //sass(sadmin.dam3d.in)
                    //webBuilder.UseUrls("http://0.0.0.0:8013"); //(cadmin.dam3d.in)
                }); 
    }
}
