import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: "AIzaSyC3Ec92ZoIvuEThGv-b3mN5LAYN8wwgoPg",
  authDomain: "miniblog-7b718.firebaseapp.com",
  projectId: "miniblog-7b718",
  storageBucket: "miniblog-7b718.appspot.com",
  messagingSenderId: "908845042418",
  appId: "1:908845042418:web:015c3c0d8440b4616a9e6b"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6LeMLQMhAAAAAHlPWljR1vioKlevpcRduLbtqwPg"),

  // Optional argument. If true, the SDK automatically refreshes App Check
  isTokenAutoRefreshEnabled: true,
});

export { db };