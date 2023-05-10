/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";
import "../assets/creativeTim.css";
import AuthNav from "../components/AuthNav";
import Footer from "../components/Footer";


export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    name: "",
    about: "",
    username: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/match");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      setLoading(false);
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      setLoading(false);
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      setLoading(false);
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      setLoading(false);
      return false;
    }

    else if (values.age === "") {
      toast.error("Age is required.", toastOptions);
      setLoading(false);
      return false;
    } else if (values.age < 18) {
      toast.error("Age should be greater than 18.", toastOptions);
      setLoading(false);
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (handleValidation()) {
      const { email, username, password, name, about, age } = values;
      const { data } = await axios.post(registerRoute, {
        name,
        about,
        username,
        age,
        email,
        password,
      });

      if (!data) {
        setLoading(false);
        toast.error('Error, please try again', toastOptions);
        
      }
      if (data._id) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data)
        );

        toast.success('User registration successful', toastOptions);
        setLoading(false);
        setTimeout(() => {
        navigate("/match");
        }, 1000);
      }
      console.log(data);
      toast.error(data.message, toastOptions);
    }
  };

  return (
    <>
  <AuthNav/>
  <div style={{ height: '100vh'}}>
    <h1 className="title">Register</h1>
      <div className="container card-auth " style={{marginTop: '20px'}}>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputEmail4">Name</label>
            <input type="name" class="form-control" placeholder="Name"
            name="name"
            onChange={(e) => handleChange(e)} id="inputEmail4"/>
          </div>

          <div class="form-group col-md-6">
            <label for="inputEmail4">Email</label>
            <input type="email" class="form-control"
            name="email"
            onChange={(e) => handleChange(e)} id="inputEmail4" placeholder="Email"/>
          </div>

          <div class="form-group col-md-6">
            <label for="inputEmail4">Username</label>
            <input type="username" class="form-control"
            name="username"
            onChange={(e) => handleChange(e)} id="inputEmail4" placeholder="sexy_20"/>
          </div>

          <div class="form-group col-md-6">
            <label for="inputEmail4">Looking For?</label>
            <select placeholder="Select" className="form-control" name="looking_for"  onChange={(e) => handleChange(e)}>
            <option value="Woman">Woman</option>
            <option value="Man">Man</option>
          </select>
          </div>

          <div class="form-group col-md-6">
          <label for="inputEmail4">Birth Day</label>
          <input className="form-control" type="date" name="birthday" onChange={(e) => handleChange(e)} />
          </div>

          <div class="form-group col-md-6">
          <label for="inputEmail4">Age</label>
          <input
            type="number"
            className="form-control"
            name="age"
            onChange={(e) => handleChange(e)}
          />
          </div>

          <div class="form-group col-md-12">
            <label for="inputPassword4">About You</label>
            <textarea
            type="about"
            className="form-control"
            name="about"
            onChange={(e) => handleChange(e)}
          />
          </div>
        </div>
        <div class="form-group">
          <label for="inputAddress">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          
        </div>
        <div class="form-group">
          <label for="inputAddress2">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button onClick={() => handleSubmit()} className="btn btn-primary">{loading ? 'Loading...' : 'Register'}</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>

      </div>
      <ToastContainer />
      <Footer />
      </div>
    </>
  );
}
