import {ServiceBase} from './ServiceBase';

class UserService extends ServiceBase {
  async login(username, password, remember) {
    let url = '/user/login';
    return await super.executeFetchPost(url, {Username: username, Password: password, IsRememberMe: remember});
  }
}

let UserServiceInstance = new UserService();
export {UserServiceInstance};