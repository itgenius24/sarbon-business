import { action, makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { enableStaticRendering } from "mobx-react-lite";

enableStaticRendering(typeof window === "undefined");

function storage () {
  try {
    if(window) {
      return window.localStorage;
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
    });

    makePersistable(this, {
      name: "authStore",
      properties: ["isAuth", "userData", "token", "authData"],
      storage: storage()
    });
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

  get getAuthData() {
    return this.authData;
  }
}

const authStore = new Store();
export default authStore;
