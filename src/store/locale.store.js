import { action, computed, makeAutoObservable } from "mobx";
import { clearPersistedStore, makePersistable } from "mobx-persist-store";
import { enableStaticRendering } from "mobx-react-lite";

enableStaticRendering(typeof window === "undefined");

class Store {
  constructor() {
    makeAutoObservable(this, { setLocale: action, });

    makePersistable(this, {
      name: "localeStore",
      properties: ["locale"],
      storage: "localStorage"
    });
  }

  locale = "ru";

  setLocale = (locale) => {
    this.locale = locale;
  }

}

const localeStore = new Store();
export default localeStore;
