using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ActiveNetwork.SearchingSandbox.Rules
{
    public class CreatedDateRule : ISearchingRule
    {
        public bool IsMatched(Entities.User user, Entities.ANEvent anEvent)
        {
            return true;
        }

        public double GetMatchingPriority(Entities.User user, Entities.ANEvent anEvent)
        {
            return anEvent.CreatedDate.Subtract(new DateTime(2010, 1, 1)).TotalSeconds;
        }
    }
}
