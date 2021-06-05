import { Button } from "@material-ui/core";
import { RestoreOutlined } from "@material-ui/icons";
import React from "react";
import db, { auth, provider } from "./firebase";
import "./Login.css";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
function Login() {
  const [{}, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        db.collection("Users").doc(result.user.uid).set({
          name: result.user.displayName,
          photoUrl: result.user.photoURL,
          email: result.user.email,
          uId: result.user.uid,
        });
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://play-lh.googleusercontent.com/cF_oWC9Io_I9smEBhjhUHkOO6vX5wMbZJgFpGny4MkMMtz25iIJEh2wASdbbEN7jseAx"
          alt=""
        />
        <div className="login_text">
          <h1>Sign In to Chit Chat</h1>
        </div>

        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </div>
  );
}

export default Login;
