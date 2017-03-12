using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActiveNetwork.Web.Models
{
    public class ANEventImageModel
    {
        public int Id { get; set; }
        public ANEventModel ANEvent { get; set; }
        public ImageModel Image { get; set; }
    }
}