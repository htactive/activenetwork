using ActiveNetwork.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ActiveNetwork.SearchingSandbox
{
    public interface ISearchingRule
    {
        bool IsMatched(User user, ANEvent anEvent);
        double GetMatchingPriority(User user, ANEvent anEvent);
    }
}
