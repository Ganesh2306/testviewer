using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.ThreeD
{
    public class TdImageConfigurationByFullViewAndShowroom
    {
        public class ConfigureTdImageSearchByOrgIdRequestDto
        {
            public long OrganisationId { get; set; }
            public string Application { get; set; }
            public  ModelState ModelState { get; set; }
            public string Product { get; set; }
            public int Start { get; set; }
            public int End { get; set; }
            public bool Textsearch { get; set; }
            public string DesignName { get; set; }
        }
        public enum ModelState
        {
            All,
            Used,
            NotUsed,
            Exclusive,
            Tryon
        }
        public class ConfigureTdImageSearchByOrgIdResponseDto
        {
            public int TotalRecords { get; set; }
            public int CreditLimit { get; set; }
            public int TotalCredit { get; set; }
            public List<FullViewImageConfigurationDto> FullViewImageConfigurationDtoList { get; set; }

            public List<QVImageConfigurationsDto> QVImageConfigurationsDtoList { get; set; }
        }

        public class FullViewImageConfigurationDto
        {
            public long td_showroom_configuration_id { get; set; }
            public List<TdImages> TdImages { get; set; }
        }

        public class QVImageConfigurationsDto
        {
            public long Td_Qv_Image_Configurations_Id { get; set; }
            public List<TdImages> TdImages { get; set; }
        }


        public class TdImages
        {
            public string imageUrl { get; set; }
            public long td_threed_image_id { get; set; }
            public string td_threed_image_name { get; set; }
            public bool is_exclusive { get; set; }
            public int td_credit { get; set; }
            public bool IsTryon { get; set; }
            public bool IsCombo { get; set; }
            public string ProductName { get; set; }
            public bool IsCreditMinus { get; set; }
            public List<TdImageConfiguration> td_Image_Configuration { get; set; }
        }



    }
}
