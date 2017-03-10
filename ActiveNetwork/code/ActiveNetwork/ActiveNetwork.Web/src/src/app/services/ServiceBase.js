export class ServiceBase {
  async  executeFetch(url){
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