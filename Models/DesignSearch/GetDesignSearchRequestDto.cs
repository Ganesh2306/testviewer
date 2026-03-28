using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_VIEWER.Models.DesignSearch
{
    public class DesignMaster
    {
        public string DesignCode { get; set; }
        public string DesignName { get; set; }
        public string Article { get; set; }
        public string Design { get; set; }
        public long FolderId { get; set; }
        public long DesignId { get; set; }
        public long Createdby { get; set; }

        public Dictionary<string, string> features { get; set; }

        public Dictionary<string, string> prod { get; set; }

        public DateTime Created_On { get; set; }

        public string ImageUrl { get; set; }

        public string State { get; set; }

        public double? Price { get; set; }

        public double? Stock { get; set; }
        public Int16? Rating { get; set; }

        public string Design_Desc { get; set; }
        public string DesignSize { get; set; }
    }

    public class FilterSearchRequestDto
    {
        public long FolderId { get; set; }
        public Dictionary<string, string> features { get; set; }

        public bool IsAnd { get; set; }
    }

    public class GetDesignSearchRequestDto
    {
        public string DesignTypeIdGroupId { get; set; }
        public string FolderId { get; set; }
        public string DesignName { get; set; }
        public bool IsText { get; set; }
        public int Difference { get; set; }
        public bool IsUserAdmin { get; set; }
        public long roleidtemp { get; set; }
        public string CreatedBy { get; set; }

        public bool isSmart { get; set; }

        public FilterSearchRequestDto FilterSearchRequestDto { get; set; }

        public int Start { get; set; }

        public long id {get; set;}
        
        //Added By Vijay Pansande, Added On 15-12-2022, Purpose : New searching working
        public long collectionId{ get; set; }
        public long boardId { get; set; }
        public int End { get; set; }

        public long userid {get; set;}

        public bool IsName { get; set; }

        public bool IsRating { get; set; }

        public bool IsLatest { get; set; }

        public bool Iswearhouse { get; set; }

        public string designstate { get; set; }
        public Dictionary<string, string> Range { get; set; }
        public List<DesignMaster> ColorwayDesigns { get; set; }

        public bool IsBoard { get; set; }
        public bool IsCollection { get; set; }
        public string BoardName { get; set; }
        public long SupplierId { get; set; }
        public long CustomerId { get; set; }
        public string Ai_Design { get; set; }
        public bool Is_AISearch { get; set; }
        public string Base64Image { get; set; }
        public string hsv1 { get; set; }
        public string hsv2 { get; set; }
        public string pattern { get; set; }
        public string w1 { get; set; }
        public string w2 { get; set; }
        public bool ispattern { get; set; }
        public bool iscolor { get; set; }
    }
    public class folderIdDto
    {
        public long folderId { get; set; }
        public long organisation_id { get; set; }

    }

    public class pdfhtmlDto
    {
    public string pdfhtml { get; set; }
    }

}
