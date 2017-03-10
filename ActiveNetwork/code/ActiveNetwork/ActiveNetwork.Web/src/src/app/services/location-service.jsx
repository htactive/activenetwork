import {ServiceBase} from './ServiceBase';

let googleURL = 'https://maps.googleapis.com/maps/api/',
  key = 'AIzaSyCywwRaPWRhT1xRYsOk-Dw4PfC2uvbsaKQ';
class GoogleAPIService extends ServiceBase {

  async searchPlaces(address) {
    let url = googleURL + 'place/textsearch/json?query=' + address + '&key=' + key;
    let f = await fetch(url,{});
    console.log(f);
  }
}

let GoogleAPIServiceInstance = new GoogleAPIService();
export {GoogleAPIServiceInstance};