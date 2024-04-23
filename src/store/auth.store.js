import { action, computed, makeAutoObservable } from "mobx";
import { clearPersistedStore, makePersistable } from "mobx-persist-store";
import { enableStaticRendering } from "mobx-react-lite";

enableStaticRendering(typeof window === "undefined");

function storage (store = "sessionStorage") {
  try {
    if(window) {
      return window[store];
    }
  } catch (e) {
    return null;
  }
}

class Store {
  constructor() {
    makeAutoObservable(this, {
      setIsAuth: action,
      login: action,
      logout: action,
      setAuthData: action,
      setRemember: action,
      getIsAuth: computed
    });

    makePersistable(this, {
      name: "authStore",
      properties: ["isAuth", "userData", "token", "authData", "remember"],
      storage: storage("localStorage")
    });

    // this.rememberDisposer = autorun(() => {
    //   this.clearStoredDate();
    //   if(this.remember) {
    //     makePersistable(this, {
    //       name: "authStore",
    //       properties: ["isAuth", "userData", "token", "authData", "remember"],
    //       storage: storage("localStorage")
    //     });
    //   } else {
    //     makePersistable(this, {
    //       name: "authStore",
    //       properties: ["isAuth", "userData", "token", "authData", "remember"],
    //       storage: storage("sessionStorage")
    //     });
    //   }
    // });

  }

  isAuth = false;
  userData = {};
  token = {};
  remember = false;
  authData = {
    phone: "",
    role: "",
    smsId: "",
    clientTypeId: "",
    isForgot: false,
    userId: "",
  }

  async clearStoredDate() {
    await clearPersistedStore(this);
  }

  // dispose() {
  //   this.rememberDisposer();
  // }

  setIsAuth(value) {
    this.isAuth = value;
  }

  login(data) {
    this.isAuth = true;
    this.userData = data.user;
    this.role = data.role;
    this.token = data.token;
    // this.dispose();
  }

  logout() {
    this.isAuth = false;
    this.userData = {};
    this.token = {};
  }

  setAuthData(key, value) {
    this.authData[key] = value;
  }

  setRemember(remember) {
    this.remember = remember;
  }

  get getAuthData() {
    return this.authData;
  }

  get getIsAuth() {
    return this.isAuth;
  }
}

const authStore = new Store();
export default authStore;
