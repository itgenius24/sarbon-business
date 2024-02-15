import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

class Store {
  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: "authStore",
      properties: ["isAuth", "userData", "token"],
      storage: undefined,
    });
  }

  isAuth = false;
  userData = {};
  token = {};

  setIsAuth(value) {
    this.isAuth = value;
  }

  login(data) {
    this.isAuth = true;
    this.userData = data.user;
    this.clintType = data.client_type;
    this.role = data.role;
    this.token = data.token;
  }

  logout() {
    this.isAuth = false;
    this.userData = {};
    this.token = {};
  }
}

const authStore = new Store();
export default authStore;
