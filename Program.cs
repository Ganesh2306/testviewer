using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace ARCHIVE_VIEWER
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
                    //webBuilder.UseUrls("http://localhost:8004", "http://localhost:8003");
                    // webBuilder.UseUrls("http://0.0.0.0:8005", "http://0.0.0.0:8006"); //(archive.dam3d.in)
                   webBuilder.UseUrls("http://0.0.0.0:9003", "http://0.0.0.0:9004"); //(tarchive.dam3d.in)
                });
    }
}
