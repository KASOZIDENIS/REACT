import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import todoStore from "../zustandStore";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import { LogoInSuccessToast } from "./Helper";

function Login() {

  
// Getting functions from the store
const logInWithEmailAndPassword = todoStore((state) => state.login);
 const signInWithGoogle = todoStore((state) => state.signInWithGoogle);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("login clicked");
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading, navigate]);

  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <button
          className="login__btn"
          onClick={() => {
            // Call the logInWithEmailAndPassword function from the store
            logInWithEmailAndPassword(email, password)
              .then((response) => {
                if (response) {
                  console.log("Successfully logged in");
                  navigate("/dashboard");
                  LogoInSuccessToast();
                } else {
                  // displayErrorToast("dfdf");
                }
              })
              .catch((error) => {
                console.log("Error logging in:", error);
                // Handle the error here or display an error message to the user
              });
          }}
        >
          Login
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/Register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Login;
