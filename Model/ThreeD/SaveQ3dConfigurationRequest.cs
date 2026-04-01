using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.ThreeD
{
    public class SaveQ3dConfigurationRequest
    {
        public int state { get; set; }
        public long Q3d_configuration_id { get; set; }
        public long Q3d_Organisation_id { get; set; }
        public long Q3d_supplier_id { get; set; }
        public long Q3d_customer_id { get; set; }
        public string Q3d_user_id { get; set; }
        public string Q3d_password { get; set; }
        public string Q3d_domain_name { get; set; }
        public string Q3d_ip { get; set; }
        public string Q3d_fullview_image { get; set; }
        public string Q3d_show_fabrics { get; set; }
        public string Q3d_draping_file { get; set; }
        public bool Q3d_rotation_with_pan { get; set; }
        public bool Q3d_download_option { get; set; }
        public bool Q3d_share_option { get; set; }
        public bool Q3d_drape_option { get; set; }
        public bool Q3d_double_click_zoom { get; set; }
        public bool Q3d_display_groups { get; set; }
        public bool Q3d_second_group_selection { get; set; }
        public bool Q3d_model_to_fabric { get; set; }
        public bool Q3d_fabric_to_model { get; set; }
        public bool Q3d_drape_first_fabric { get; set; }
        public string Q3d_drape_count { get; set; }
        public string Q3d_tryon_trial_count { get; set; }
        public string Q3d_user_multi_logins { get; set; }
        public string Q3d_Product_Name { get; set; }
        public DateTime startDate { get; set; }
        public int q3d_product_order_no { get; set; }
        public DateTime Q3d_created_on { get; set; }
        public DateTime? Q3d_modified_on { get; set; }
        public int Q3d_IdealTime { get; set; }
        public int Q3d_CookieStore { get; set; }
        public string Q3d_ProfileImgSize { get; set; }
        public bool Q3d_Upload_Fabrics { get; set; }
        public bool Q3d_Background_Image { get; set; }
        public bool Q3d_Tryon_Visible { get; set; }
        public bool Q3d_is_Show_Product { get; set; }
        public bool Q3d_is_Show_Info { get; set; }
        public bool q3d_is_q3d_lite { get; set; }
        public bool q3d_is_custom_download { get; set; }
        public string q3d_Feature_name { get; set; }
        public bool q3d_qr_render_download { get; set; }
    }

    public class GetQ3dConfigurationRequest
    {
        public long OrganisationId { get; set; }
    }
}
