using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActiveNetwork.Web.Mapper
{
    public partial class ANEventUserFavouriteModel
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? EventId { get; set; }
        public System.DateTime? CreatedDate { get; set; }
    }
}