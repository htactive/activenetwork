import {userStore} from '../store/user-store';
import {UIBlocker} from '../components/ui-blocker';
import cookie from 'react-cookie';
export class ServiceBase {
  async executeFetch(url, shouldBlockUI) {
    try {
      if (shouldBlockUI) {
        UIBlocker.instance.block();
      }
      let result = await fetch(url, {
        method: 'GET',
        /**
         * make a fetch request with credentials such as cookies
         */
        credentials: 'include'
      });
      if (shouldBlockUI) {
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

  async executeFetchPost(url, data, shouldBlockUI = true) {
    try {
      if (shouldBlockUI) {
        UIBlocker.instance.block();
      }
      let result = await fetch(url,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(data)
        });

      if (shouldBlockUI) {
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

  async executeFetchPostImage(url, image, shouldBlockUI = true) {
    try {

      if (shouldBlockUI) {
        UIBlocker.instance.block();
      }
      const formData = new FormData();
      formData.append('file', image);
      let result = await fetch(url,
        {
          method: 'POST',
          credentials: 'include',
          body: formData
        });

      if (shouldBlockUI) {
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