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

function getEmptyFormData() {
  return {
    cargo_type: {
      value: "",
      label: "",
    },
    weight_measurement: "",
    weight_unit: {
      value: "",
      label: "",
    },
    loadings: [{
      location: {
        value: "",
        label: "",
      },
      address: "",
      cor: [],
    }],
    unloading: [
      {
        location: {
          value: "",
          label: "",
        },
        address: "",
        cor: [],
      }
    ],
    volume_measurement: "",
    packaging: {
      value: "",
      label: "",
    },
    packagingSearch: "",
    packaging_quantity: "",
    gps_monitoring: "",
    car_type: {
      value: "",
      label: "",
    },
    transport_count: "",
    is_ftl: false,
    is_ltl: false,
    capacity: "",
    price: "",
    price_prepayment: "",
    price_after_order: 0,
    price_prepayment_unit: {
      label: "",
      value: "",
    },
    payment_deadline: "",
    contact: "",
    note: "",
    image: "",
    payment_type: {
      label: "",
      value: "",
    },
    bargain: "",
    length: "",
    width: "",
    height: "",
    diameter: "",
    hitch: "",
    pneumatic: "",
    bunks: false,
    tir: false,
    t1: false,
    cmr: false,
    medic_certificate: false,
    permission: [],
    straps_number: "",
  };
}

class Store {
  constructor() {
    makeAutoObservable(this, {
      updateLoadings: action,
      updateUnloading: action,
      clearFormData: action,
      setFormData: action,
      updateFormData: action,
      resetBooleanFields: action,
      clearStoredData: action
    });

    makePersistable(this, {
      name: "formStore",
      properties: [
        "formData",
        "startDate",
        "endDate",
        "isNotEmpty",
        "isPackagingAndQuantity",
        "isDimensionsAndDiameter",
        "isRequirementOpen",
        "isAccessOpen",
        "isBeltsOpen",
        "isLiftingCapacityOpen",
        "prepaymentFuelOpen",
        "directContractOpen",
      ],
      storage: storage("sessionStorage")
    });

  }

  isNotEmpty = false;
  formData = getEmptyFormData()
  startDate = ""
  endDate = ""
  isPackagingAndQuantity = false
  isDimensionsAndDiameter = false
  isRequirementOpen = false
  isAccessOpen = false
  isBeltsOpen = false
  isLiftingCapacityOpen = false
  prepaymentFuelOpen = false
  directContractOpen = false

  resetBooleanFields() {
    this.isPackagingAndQuantity = false;
    this.isDimensionsAndDiameter = false;
    this.isRequirementOpen = false;
    this.isAccessOpen = false;
    this.isBeltsOpen = false;
    this.isLiftingCapacityOpen = false;
    this.prepaymentFuelOpen = false;
    this.directContractOpen = false;
  }

  setFormData(data) {
    this.isNotEmpty = true;
    this.formData = data;
  }

  updateFormData(key, value) {
    this.isNotEmpty = true;
    this.formData[key] = value;
  }

  updateLoadings(index, value) {
    this.formData.loadings[index] = value;
  }

  updateUnloading(index, value) {
    this.isNotEmpty = true;
    this.formData.unloading[index] = value;
  }

  async clearStoredData() {
    await clearPersistedStore(this);
  }

  clearFormData() {
    this.isNotEmpty = false;
    this.formData = {
      cargo_type: {
        value: "",
        label: "",
      },
      weight_measurement: "",
      weight_unit: {
        value: "",
        label: "",
      },
      loadings: [{
        location: {
          value: "",
          label: "",
        },
        address: "",
        cor: [],
      }],
      unloading: [
        {
          location: {
            value: "",
            label: "",
          },
          address: "",
          cor: [],
        }
      ],
      volume_measurement: "",
      packaging: {
        value: "",
        label: "",
      },
      packagingSearch: "",
      packaging_quantity: "",
      gps_monitoring: "",
      car_type: {
        value: "",
        label: "",
      },
      transport_count: "",
      is_ftl: false,
      is_ltl: false,
      capacity: "",
      price: "",
      price_prepayment: "",
      price_after_order: 0,
      price_prepayment_unit: {
        label: "",
        value: "",
      },
      payment_deadline: "",
      contact: "",
      note: "",
      image: "",
      payment_type: {
        label: "",
        value: "",
      },
      bargain: "",
      length: "",
      width: "",
      height: "",
      diameter: "",
      hitch: "",
      pneumatic: "",
      bunks: false,
      tir: false,
      t1: false,
      cmr: false,
      medic_certificate: false,
      permission: [],
      straps_number: "",
    };
    this.startDate = "";
    this.endDate = "";
    this.resetBooleanFields();
  }
}

const formStore = new Store();
export default formStore;
