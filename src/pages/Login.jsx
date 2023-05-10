/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../services/user";
import "../assets/creativeTim.css";
import AuthNav from "../components/AuthNav";
import Logo from "../assets/logo.svg";
import Footer from "../components/Footer";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/match");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {

    setLoading(true);
    if (validateForm()) {
      const { username, password } = values;

      const response = await loginUser({username,password});

      if (response.status === false) {
        
        toast.error(response.msg, toastOptions);
        setLoading(false);
      }
      if (response.status === true) {
        // setLoading(false);
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(response.user)
        );

        navigate("/meet");
      }
    }
    setLoading(false);
  };

  // if(loading) return (
  // <Container>
  //   <img src={loader} alt="loader" className="loader" />
  // </Container>
  // )

  return (
    <>
    <AuthNav/>
    <div style={{marginTop: '150px'}}>
    <h1 className="title">Sign In</h1>
      <div className="container card-auth col-md-4" style={{ padding: '20px'}}>
      <div style={{padding: '10px'}}>
        <div class="form-row">
          <div class="form-group col-md-12">
            <label for="inputEmail4">Username</label>
            <input type="username" class="form-control"
            name="username"
            onChange={(e) => handleChange(e)} id="inputEmail4" placeholder="sexy_20"/>
          </div>

        <div class="form-group col-md-12">
          <label for="inputAddress">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            name="password"
            onChange={(e) => handleChange(e)}
          />
        </div>
        </div>
        <button onClick={()=> handleSubmit()} className="btn btn-primary">Sign in</button>
          <span>
            Don't have an account ? <Link to="/register">Sign Up.</Link>
          </span>

        </div>
      </div>
      <ToastContainer />
      <Footer />
      </div>
    </>
  );
}
