import { action, computed, makeAutoObservable } from "mobx";
import { clearPersistedStore, makePersistable } from "mobx-persist-store";
import { enableStaticRendering } from "mobx-react-lite";
import nookies from "nookies"; // nookies kutubxonasini import qilish

enableStaticRendering(typeof window === "undefined");

class Store {
  constructor() {
    makeAutoObservable(this, {
      setIsAuth: action,
      login: action,
      logout: action,
      setAuthData: action,
      setRemember: action,
      changeToken: action,
      getIsAuth: computed,
      getAuthData: computed,
    });

    makePersistable(this, {
      name: "authStore",
      properties: ["isAuth", "userData", "token", "authData", "remember"],
      storage: typeof window !== "undefined" ? window.localStorage : null,
      debugMode: process.env.NODE_ENV === 'development',
    }).then(() => {
      // Debug logging removed for production
    });
  }

  isAuth = false;
  userData = {};
  token = {};
  role = "";
  remember = false;
  authData = {
    phone: "",
    role: "",
    smsId: "",
    clientTypeId: "",
    isForgot: false,
    userId: "",
  };

  // Cookie'larni tozalash
  async clearStoredData(ctx) {
    await clearPersistedStore(this);
    nookies.destroy(ctx, "token");
    nookies.destroy(ctx, "userData");
    nookies.destroy(ctx, "role");

    // Clear saved login credentials
    if (typeof window !== "undefined") {
      localStorage.removeItem("loginData");
    }
  }

  setIsAuth(value) {
    this.isAuth = value;
  }

  // Foydalanuvchi ma'lumotlarini login qilish va cookie'ga yozish
  login(data, ctx) {
    this.isAuth = true;
    this.userData = data.user;
    this.role = data.role;
    this.token = data.token;

    // Cookie'ga ma'lumotlarni saqlash
    nookies.set(ctx, "token", JSON.stringify(data.token), { path: "/", maxAge: 30 * 24 * 60 * 60 });
    nookies.set(ctx, "userData", JSON.stringify(data.user), { path: "/", maxAge: 30 * 24 * 60 * 60 });
    nookies.set(ctx, "role", JSON.stringify(data.role), { path: "/", maxAge: 30 * 24 * 60 * 60 });

  }

  // Logout qilish va cookie'larni tozalash
  logout(ctx) {
    this.isAuth = false;
    this.userData = {};
    // this.authData = {};
    this.role = "";
    this.token = {};

    // Clear remember me state and saved credentials
    this.remember = false;
    if (typeof window !== "undefined") {
      localStorage.removeItem("loginData");
    }

    // Cookie'larni o'chirish
    nookies.destroy(ctx, "token");
    nookies.set(ctx, "userData",JSON.stringify({}), { path: "/", maxAge: 30 * 24 * 60 * 60 });
    nookies.destroy(ctx, "role");
  }

  setAuthData(key, value) {
    this.authData[key] = value;
  }

  setRemember(remember) {
    this.remember = remember;
  }

  changeToken(ctx) {
    this.token.access_token = this.token.refresh_token;
    nookies.set(ctx, "token", this.token, { path: "/", maxAge: 30 * 24 * 60 * 60 });
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
