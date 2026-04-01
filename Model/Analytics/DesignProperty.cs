using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace ARCHIVE_DASHBOARD.Model.Analytics {
// This will be serialized into a JSON Address object
public class DesignProperty
{
    public string Date_Time { get; set; }
    public string CompanyName { get; set; }
    public string UserId { get; set; }
    public string Region  { get; set; } 
    public string Action  { get; set; } 
    public string Pattern { get; set; } 
    public string Color { get; set; } 
    public string DesignSize { get; set; } 
    public string Category { get; set; } 
    public string Material { get; set; } 
    public string Washcare { get; set; } 
    public string Width  { get; set; } 
    public string GSM { get; set; } 
    public string Price { get; set; } 
    public string YarnCount { get; set; }    
    public string Weave { get; set; }     
    public string Records { get; set; } 
}  

}