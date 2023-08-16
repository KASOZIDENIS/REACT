// Register.js
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  auth,
} from "../firebase";
import "./Register.css";
import Dashboard from "./Dashboard";
import todoStore from "../zustandStore";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");// eslint-disable-next-line
  const [user, loading, error] = useAuthState(auth);
  var loginWithGoogle = todoStore((state) => state.signInWithGoogle);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("THE REGISTER PAGE HAS BEEN VISITED")
    if (loading) return;
    if (user) navigate("/dashboard");

  }, [user, loading, navigate]);

  if (user) {
    return <Dashboard />
  }

  const register = () => {
    if (!name) {
      alert("Please enter name");
      return;
    }
    register(name, email, password);

  };

  return (
    <div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="register__btn" onClick={register}>
          Register
        </button>
        <button
          className="register__btn register__google"
          onClick={loginWithGoogle}
        >
          Register with Google
        </button>
        <div>
          Already have an account? <Link to="/Login">Login</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Register;
