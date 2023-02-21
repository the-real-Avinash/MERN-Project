import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    //if user is already logged in then no need to sign up for that we store user in localstorage and check for a auth
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  //integrate signup API
  const collectData = async (e) => {
    e.preventDefault();
    console.log(name, email, password);
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    //save our data in localstorage
    localStorage.setItem("user", JSON.stringify(result));
    if (result) {
      navigate("/");
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <form action="">
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Enter Name"
          className="input-box"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Enter Email"
          className="input-box"
        />
        <input
          type="text"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Enter Password"
          className="input-box"
        />
        <button className="signup-button" onClick={collectData}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
