using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_VIEWER.Models.login
{
    public class SaveFingurePrintDetailsRequestDto
    {
        public long Device_Fingure_Print_Id { get; set; }

        public long User_Id { get; set; }
        public string Device_Login_Id { get; set; }


        public string Device_Type { get; set; }


        public string Device_Description { get; set; }

        public string Device_Browser { get; set; }

        public string Device_Ip { get; set; }

        public string Device_Location { get; set; }

        public bool Is_Device_Active { get; set; }

    }
}
