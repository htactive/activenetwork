using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActiveNetwork.Web.Models
{
    public partial class ANEventUserFavouriteModel
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? ANEventId { get; set; }
        public System.DateTime? CreatedDate { get; set; }

        public ANEventModel ANEvent { get; set; }
        public UserModel User { get; set; }
    }
}