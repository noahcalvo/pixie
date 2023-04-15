import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDTJdEl376IRBPUXiyUmmMKJvMYyLUTL8s",
  authDomain: "piixie.firebaseapp.com",
  projectId: "piixie",
  storageBucket: "piixie.appspot.com",
  messagingSenderId: "1060797868708",
  appId: "1:1060797868708:web:8837e9a3a19a972a9b1431",
  measurementId: "G-E4EPPHR3KZ",
};

const app = initializeApp(firebaseConfig);

// Export Firebase authentication methods
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export { signInWithPopup };
