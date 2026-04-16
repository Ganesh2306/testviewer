using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_VIEWER.Models.DesignSearch
{
    public class FeatureTypeList
    {
        public object design_featuretype_id { get; set; }
        public string design_featuretype_name { get; set; }
    }

    public class Feature
    {
        public long design_feature_id { get; set; }
        public List<FeatureTypeList> featureTypeList { get; set; }
    }
}
