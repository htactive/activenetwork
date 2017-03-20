using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ActiveNetwork.Common
{
    public enum ANEventImageType
    {
        None = 0,
        ANEventCoverImage = 1,
    }

    public enum ANRequestToJoinStatus
    {
        Waiting = 0,
        Approved = 1,
        Denied = 2,
    }

    public enum GenderType
    {
        Unknown = 0,
        Male = 1,
        Female = 2,
    }
}
