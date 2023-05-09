import React from "react";
import "firebase/auth";

function GoogleSignInButton(props) {
  if (props.user) {
    return (
      <div className="sign-in-display">
        <p className="display-name nav-link">Hello {props.user.displayName}</p>
        <button onClick={props.signOut}>Sign out</button>
      </div>
    );
  }
  return <button onClick={props.signIn}>Sign in with Google</button>;
}

export default GoogleSignInButton;
