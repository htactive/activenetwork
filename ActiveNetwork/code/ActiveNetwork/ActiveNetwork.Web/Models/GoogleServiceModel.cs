using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActiveNetwork.Web.Models
{

    public class GoogleGetPlaceResultJson
    {
        public List<GooglePlaceJson> results { get; set; }
    }
    public class GooglePlaceJson
    {
        public string formatted_address { get; set; }
        public GoogleGeometryJson geometry { get; set; }
        public string icon { get; set; }
        public string id { get; set; }
        public string name { get; set; }
        public string place_id { get; set; }
        public string reference { get; set; }

    }
    public class GoogleGeometryJson
    {
        public GoogleLocationJson location { get; set; }
    }

    public class GoogleLocationJson
    {
        public float lat { get; set; }
        public float lng { get; set; }
    }

    public class GoogleLocationModel
    {
        public float lat { get; set; }
        public float lng { get; set; }
    }
    public class GooglePlaceModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public GoogleLocationModel location { get; set; }
    }
}