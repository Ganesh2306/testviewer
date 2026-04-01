using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Enum
{
    public enum DomainObjectState
    {
        /// <summary>
        /// Added
        /// </summary>
        Added,
        /// <summary>
        /// Unchanged
        /// </summary>
        Unchanged,

        /// <summary>
        /// Modified
        /// </summary>
        Modified,

        /// <summary>
        /// Deleted
        /// </summary>
        Deleted
    }
}
