import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";
export default function Login({ checkLoggedIn }) {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = JSON.parse(window.localStorage.getItem("auth"));
  console.log(token);
  useEffect(() => {
    if (token) return Navigate("/dashboard");
  }, []);
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      if (!data) {
        throw new Error("Unable to login");
      }
      const token = data.token;
      const user = data.user;
      console.log(token);
      window.localStorage.setItem(
        "auth",
        JSON.stringify({ token: token, user: user })
      );

      Navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <form onSubmit={(e) => handleLogin(e)} className=" border" method="POST">
        <legend>Login</legend>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3 p-0 form-check">
          <span>
            Don't have an account? <a href="/signup">Create account</a>
          </span>
        </div>
        <button type="submit" className="pl-3 pr-3 btn btn-success">
          Login
        </button>
      </form>
    </>
  );
}
