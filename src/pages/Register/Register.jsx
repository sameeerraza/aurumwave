import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// import AuthContext from "../../context/AuthContext";
// import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import "./Register.styles.css";

import Input from "../../components/Input/Input";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";

const Register = () => {
  const navigate = useNavigate();

  const [formsData, setFormsData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    country: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormsData((prevFormsData) => ({
      ...prevFormsData,
      [name]: value,
    }));
  };

  const handleClick = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const formData = new FormData();

      formData.append("username", formsData.username);
      formData.append("email", formsData.email);
      formData.append("password", formsData.password);
      formData.append("country", formsData.country);
      formData.append("phone", formsData.phone);

      axios
        .post(`${process.env.REACT_APP_API_DOMAIN_URL}/register`, formData)
        .then((response) => {
          navigate("/login");
        })
        .catch((error) => {
          setErrors(error.response.data.errors.error);
        });
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };


  return (
    <div className="login fc">
      <div className="login__company fc">
        <h2 style={{ color: "#F3F4F6" }}>AurumWave</h2>
        <h5 style={{ color: "#F3F4F6D0" }}>
          We want you to be the best{" "}
          <span style={{ color: "var(--secondary-bg-color)" }}>YOU</span>!
        </h5>
      </div>
      <div className="login__left fc">
        <h2
          style={{ color: "var(--primary-text-color)", marginBottom: ".75em" }}
        >
          Register
        </h2>
        <div className="login__form fc">
          <Input
            heading="Username"
            type="text"
            name="username"
            placeholder="nietz"
            value={formsData.username}
            onChange={handleChange}
            details={errors?.username}
          />
          <Input
            heading="Email"
            type="email"
            name="email"
            placeholder="nietz@fettler.com"
            value={formsData.email}
            onChange={handleChange}
            details={errors?.email}
          />
          <Input
            heading="Password"
            type="password"
            placeholder="*********"
            name="password"
            value={formsData.password}
            onChange={handleChange}
            details={errors?.password}
          />
          <Input
            heading="Country"
            type="text"
            placeholder="Norway"
            name="country"
            value={formsData.country}
            onChange={handleChange}
            details={errors?.country}
          />
          <Input
            heading="Phone number"
            type="text"
            placeholder="+4781632900"
            name="phone"
            value={formsData.phone}
            onChange={handleChange}
            details={errors?.phone}
          />
          <p style={{ fontSize: ".75em", marginTop: "-.6em" }}>
            Already have an account?
            <span
              style={{ color: "var(--secondary-bg-color)", fontWeight: "800", marginLeft: ".25em" }}
            >
              <Link to="/login">  Login</Link>
            </span>
          </p>
          <Button
            text="Register"
            style={{
              backgroundColor: "var(--primary-bg-color)",
              color: "var(--white-black-text-color)",
              marginTop: "1.25em",
            }}
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
