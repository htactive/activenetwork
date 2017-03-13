import {userStore} from '../store/user-store';
import cookie from 'react-cookie';
export class ServiceBase {
  async executeFetch(url){
    try {
      let result = await fetch(url, {
        method: 'GET',
        /**
         * make a fetch request with credentials such as cookies
         */
        credentials: 'include'
      });
      if (result.ok) {
        return await result.json();
      }
      if(result.status == 403){
        let currentUser = userStore.getState().currentUser;
        if (currentUser == undefined || currentUser == null) {
          window.location.href = '/login';
          return null;
        }
        var cookieValue = cookie.load('ANLOGINCOOKIE');
        if(cookieValue==undefined || cookieValue == null){
          window.location.href = '/login';
          return null;
        }
      }
      return null;
    }
    catch (e) {
      console.log(e);
    }
  }

  async executeFetchPost(url, data) {
    try {

      let result = await await fetch(url,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(data)
        });

      if (result.ok) {
        return await result.json();
      }
      return null;
    }
    catch (e) {
      console.log(e);
    }
  }
}