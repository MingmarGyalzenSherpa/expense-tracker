import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
export default function Signup() {
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm();
  const Navigate = useNavigate();


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [pwError, setpwError] = useState(false);
  const [err, setErr] = useState("");

  const token = JSON.parse(window.localStorage.getItem("auth"));
  console.log(token);
  useEffect(() => {
    if (token) return Navigate("/dashboard");
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        password,
        email,
      }),
    });

    if (response?.status === 200) {
      Navigate("/login");
    } else {
      console.log("failed");
    }
  }
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className=" border" method="POST">
        <legend>Sign Up</legend>
        <div className="row mb-3 ">
          <div className=" col-md-6">
            <label htmlFor="first_name" className="form-label">
              First Name
            </label>
            <input
              type="text"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className="form-control"
              name="first_name"
              id="first_name"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="last_name" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className="form-control"
              name="last_name"
              id="last_name"
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
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
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="form-control"
            id="password"
            name="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            onChange={(e) => {
              if (password != e.target.value) {
                setpwError(true);
              } else {
                setpwError(false);
              }
            }}
          />
          <p className="text-danger">
            {pwError && password && "Password doesn't match"}
          </p>
        </div>
        <div className="mb-3 p-0 form-check">
          <span>
            Already have an account? <a href="/login">Login</a>
          </span>
        </div>
        <button type="submit" className="btn btn-success">
          Sign up
        </button>
      </form>
    </>
  );
}
