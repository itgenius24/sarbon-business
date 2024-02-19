import { action, makeAutoObservable } from "mobx";
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
      setRemember: action
    });

    this.storePersist = makePersistable;
    this.setRemember(false);

    // makePersistable(this, {
    //   name: "authStore",
    //   properties: ["isAuth", "userData", "token", "authData"],
    //   storage: storage()
    // });
  }

  isAuth = false;
  userData = {};
  token = {};
  authData = {
    phone: "",
    role: "",
    smsId: "",
    clientTypeId: "",
  }

  setIsAuth(value) {
    this.isAuth = value;
  }

  login(data) {
    this.isAuth = true;
    this.userData = data.user;
    this.role = data.role;
    this.token = data.token;
  }

  logout() {
    this.isAuth = false;
    this.userData = {};
    this.token = {};
  }

  setAuthData(key, value) {
    this.authData[key] = value;
  }

  setRemember(remember = false) {
    clearPersistedStore(this);
    if(remember) {
      this.storePersist(this, {
        name: "authStore",
        properties: ["isAuth", "userData", "token", "authData"],
        storage: storage("localStorage")
      });
    } else {
      this.storePersist(this, {
        name: "authStore",
        properties: ["isAuth", "userData", "token", "authData"],
        storage: storage("sessionStorage")
      });
    }
  }

  get getAuthData() {
    return this.authData;
  }
}

const authStore = new Store();
export default authStore;
