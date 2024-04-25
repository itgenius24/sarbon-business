import { action, makeAutoObservable } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";

enableStaticRendering(typeof window === "undefined");

class Store {
  constructor() {
    makeAutoObservable(this, {
      addLocation: action,
      removeLocation: action,
      clearLocations: action
    });

  }

  locations = [];

  addLocation(value) {
    this.locations.push(value);
  }

  removeLocation(index) {
    this.locations.splice(index, 1);
  }

  clearLocations() {
    this.locations = [];
  }

}

const mapStore = new Store();
export default mapStore;
