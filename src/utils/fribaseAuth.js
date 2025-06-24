import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import { getRemoteConfig } from "firebase/remote-config";

const firebaseConfig = {
  apiKey: "AIzaSyDtS4te4OQKyl1Nr5u04EOfQ-vGtThcJwo",
  authDomain: "sarbon-39a38.firebaseapp.com",
  projectId: "sarbon-39a38",
  storageBucket: "sarbon-39a38.firebasestorage.app",
  messagingSenderId: "56247822777",
  appId: "1:56247822777:web:d76f006a7333f52563ee68",
  measurementId: "G-5ZEJBXCTJR",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const remoteConfig = getRemoteConfig(app);


remoteConfig.settings = {
  minimumFetchIntervalMillis: 3600000 * 12 , // 12 hours
};


export default remoteConfig;

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  const result = await signInWithPopup(auth, provider);
  return result.user;
};

export const signInWithApple = async () => {
  const provider = new OAuthProvider("apple.com");
  provider.setCustomParameters({ prompt: "select_account" }); // Apple-da ham har safar hisob tanlash

  const result = await signInWithPopup(auth, provider);
  return result.user;
};
