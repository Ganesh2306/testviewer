using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_VIEWER.Models.FavCart
{
    public class SaveFavoriteRequestDto
    {
        public long Favorite_Id { get; set; }
        public string Favorite_Name { get; set; }
        public string Favorite_Comments { get; set; }
        public long Customer_Id { get; set; }
        public long Created_By { get; set; }
        public DateTime Created_On { get; set; }
    }
}
