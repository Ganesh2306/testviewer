using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Analytics
{
  // This will be serialized into a JSON Address object
    public class ActivityLog
    {
        public string Date_Time { get; set; }
        public string CompanyName { get; set; }
        public string UserId { get; set; }
        public string TimePeriod  { get; set; } 
        public string Region  { get; set; } 
        public string Location  { get; set; } 
        public string IP { get; set; } 
        public string ViewRecords { get; set; } 
        public string FavoriteRecords { get; set; } 
        public string CartRecords { get; set; } 
        public string OrderRecords { get; set; } 
        public string OrderQuantity { get; set; } 
    }
}