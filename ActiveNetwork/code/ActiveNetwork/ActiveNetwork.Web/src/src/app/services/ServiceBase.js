import {userStore} from '../store/user-store';
import {UIBlocker} from '../components/ui-blocker';
import cookie from 'react-cookie';
export class ServiceBase {
  async executeFetch(url, ignoreBlockUI) {
    try {
      if (!ignoreBlockUI) {
        UIBlocker.instance.block();
      }
      let result = await fetch(url, {
        method: 'GET',
        /**
         * make a fetch request with credentials such as cookies
         */
        credentials: 'include'
      });
      if (!ignoreBlockUI) {
        UIBlocker.instance.unblock();
      }
      if (result.ok) {
        return await result.json();
      }
      if (result.status == 403) {
        let currentUser = userStore.getState().currentUser;
        if (currentUser == undefined || currentUser == null) {
          window.location.href = '/login';
          return null;
        }
        let cookieValue = cookie.load('ANLOGINCOOKIE');
        if (cookieValue == undefined || cookieValue == null) {
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

  async executeFetchPost(url, data, ignoreBlockUI) {
    try {

      if (!ignoreBlockUI) {
        UIBlocker.instance.block();
      }
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

      if (!ignoreBlockUI) {
        UIBlocker.instance.unblock();
      }
      if (result.ok) {
        return await result.json();
      }
      if (result.status == 403) {
        let currentUser = userStore.getState().currentUser;
        if (currentUser == undefined || currentUser == null) {
          window.location.href = '/login';
          return null;
        }
        let cookieValue = cookie.load('ANLOGINCOOKIE');
        if (cookieValue == undefined || cookieValue == null) {
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
}