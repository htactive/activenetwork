using ActiveNetwork.Web.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace ActiveNetwork.Web.Controllers
{
    public class GoogleServiceController : BaseApiController
    {
        const string baseGoogleUrl = "https://maps.googleapis.com/maps/api/";
        const string googleApiKey = "AIzaSyCr5V_j_ANWtFzckOOb31L3PZKo8pdikqg";
        
        [HttpGet,Route("google-api/search-places"), AllowAnonymous]
        public async Task<List<GooglePlaceModel>> SearchPlaces(string search)
        {
            var url = "place/textsearch/json?query=" + search + "&key=" + googleApiKey;
            var chanel = new ChanelRockFactory();
            var searchResult = await chanel.Fetch<GoogleGetPlaceResultJson>(url);
            if (searchResult == null || searchResult.results == null) return new List<GooglePlaceModel>();

            return searchResult.results.Select(x => new GooglePlaceModel()
            {
                Address = x.formatted_address,
                Id = x.id,
                Name = x.name,
                location =  new GoogleLocationModel()
                {
                    lat = x.geometry.location.lat,
                    lng = x.geometry.location.lng
                }
            }).ToList();
        }
    }
    public class ChanelRockFactory
    {
        private const string BaseAddress = "https://maps.googleapis.com/maps/api/";
        private static HttpClient httpClient;
        private static HttpClientHandler httpClientHandler;
        public ChanelRockFactory()
        {
            if (httpClient == null)
            {
                httpClientHandler = new HttpClientHandler()
                {
                    UseCookies = true,
                    AllowAutoRedirect = true,
                    AutomaticDecompression = System.Net.DecompressionMethods.GZip | System.Net.DecompressionMethods.Deflate
                };

                httpClient = new HttpClient(httpClientHandler);
                httpClient.BaseAddress = new Uri(BaseAddress);
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                httpClient.MaxResponseContentBufferSize = Int32.MaxValue;

            }
        }
        public async Task<T> Fetch<T>(string getUri) where T : new()
        {
            var json = string.Empty;
            HttpResponseMessage response = await httpClient.GetAsync(getUri);
            if (response.IsSuccessStatusCode)
            {
                json = await response.Content.ReadAsStringAsync();
            }
            if (!string.IsNullOrEmpty(json))
            {
                return JsonConvert.DeserializeObject<T>(json);
            }
            return new T();
        }
    }
}