import { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Set up Firebase auth listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setUser(user);
        console.log(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // Clean up listener on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = googleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = googleAuthProvider.credentialFromError(error);
      });
  };

  const signOut = () => {
    auth.signOut();
  };

  return { user, signInWithGoogle, signOut };
}

export default useAuth;
