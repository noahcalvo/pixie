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
        console.log(result);
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = googleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        // const user = result.user;
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
      });
  };

  const signOut = () => {
    auth.signOut();
  };

  return { user, signInWithGoogle, signOut };
}

export default useAuth;
