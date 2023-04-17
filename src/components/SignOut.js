// src/components/SignOut.js
import React from "react";
import { auth } from "../firebase";

const SignOut = () => {
  const signOut = () => {
    auth.signOut();
  };

  return (
    <div>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};

export default SignOut;
