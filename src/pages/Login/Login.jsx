import "./Login.styles.css";

import React, { useContext } from "react";
import Input from "../../components/Input/Input";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  let { loginErrors, loginUser } = useContext(AuthContext);

  console.log(loginErrors)

  return (
    <div className="login fc">
      <div className="login__left fc">
        <h2
          style={{ color: "var(--primary-text-color)", marginBottom: ".75em" }}
        >
          Login
        </h2>
        <form className="login__form fc" onSubmit={loginUser}>
          <Input
            heading="Email"
            type="email"
            name="email"
            placeholder="nietz@fettler.com"
            details={loginErrors?.email}
          />
          <Input
            heading="Password"
            type="password"
            placeholder="*********"
            name="password"
            details={loginErrors?.password}
          />
            {loginErrors?.detail && <span style={{marginBottom:'1em'}} className="errors-field">{loginErrors?.detail}</span>}
          <p style={{ fontSize: ".75em", marginTop: "-.6em" }}>
            Don’t have an account?
            <span
              style={{ color: "var(--secondary-bg-color)", fontWeight: "800" , marginLeft: ".5em"}}
            >
              <Link to="/register">Register</Link>
            </span>
          </p>

          <input
            style={{
              backgroundColor: "var(--primary-bg-color)",
              color: "var(--white-black-text-color)",
              marginTop: "1.25em",
            }}
            className="button"
            type="submit"
            value="Login"
          />
        </form>
      </div>
      <div className="login__company fc">
        <h2 style={{ color: "#F3F4F6" }}>AurumWave</h2>
        <h5 style={{ color: "#F3F4F6D0" }}>
          We want you to be the best{" "}
          <span style={{ color: "var(--secondary-bg-color)" }}>YOU</span>!
        </h5>
      </div>
    </div>
  );
};

export default Login;
