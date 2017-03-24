import {createStore} from "redux";


export const UserStoreActions = {
  LoggedIn: "LoggedIn",
  LoggedOut: "LoggedOut"
};

function userReducer(state = {}, action) {
  let newState = {};
  Object.assign(newState, state);

  switch (action.type) {
    case UserStoreActions.LoggedIn:
      const user = action["user"];
      newState = {
        currentUser: user
      };
      break;
    case UserStoreActions.LoggedOut:
      newState = {};
      localStorage.removeItem("user");
      break;
    case "@@redux/INIT":
      if (localStorage.getItem("user")) {
        newState = {
          currentUser: JSON.parse(localStorage.getItem("user")),
        }
      }
      break;
  }

  return newState;
}

export function loginAction(loginResult) {
  return {
    type: UserStoreActions.LoggedIn,
    user: loginResult
  }
}

export function logoutAction() {
  return {
    type: UserStoreActions.LoggedOut
  }
}

export const userStore = createStore(userReducer);