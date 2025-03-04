import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDtS4te4OQKyl1Nr5u04EOfQ-vGtThcJwo",
    authDomain: "sarbon-39a38.firebaseapp.com",
    projectId: "sarbon-39a38",
    storageBucket: "sarbon-39a38.firebasestorage.app",
    messagingSenderId: "56247822777",
    appId: "1:56247822777:web:d76f006a7333f52563ee68",
    measurementId: "G-5ZEJBXCTJR"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
};

export const signInWithApple = async () => {
  const provider = new OAuthProvider("apple.com");
  const result = await signInWithPopup(auth, provider);
  return result.user;
};
