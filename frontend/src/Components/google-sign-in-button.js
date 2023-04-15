import React from "react";
import "firebase/auth";

function GoogleSignInButton(props) {
  if (props.user) {
    return (
      <div>
        <p>Hello, {props.user.displayName}</p>
        <button onClick={props.signOut}>Sign out</button>
      </div>
    );
  }
  return <button onClick={props.signIn}>Sign in with Google</button>;
}

export default GoogleSignInButton;
