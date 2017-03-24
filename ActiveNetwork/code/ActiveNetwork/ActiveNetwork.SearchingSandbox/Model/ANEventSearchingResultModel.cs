using ActiveNetwork.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ActiveNetwork.SearchingSandbox.Model
{
    public class ANEventSearchingResultModel
    {
        public double Score { get; set; }
        public ANEvent ANEvent { get; set; }
    }
}
