import React, { useState, useEffect } from "react";
import useForm from "../CustomHooks/useForm";
import Input from "../common/Input";
import Button from "../common/Button";
import { login } from "../../services/authServices";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Login - Readnow";
  });

  const doSubmit = async () => {
    try {
      const data = await login(inputs.username, inputs.password);

      if (data.user) {
        setError("");
        props.history.push("/projects/readnow/dashboard");
      }
    } catch (e) {
      setError("Invalid username or password.");
    }
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(doSubmit);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="login-container">
          <h1>Dashboard Login</h1>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <Input
            type="text"
            label="Username"
            name="username"
            value={inputs.username || ""}
            onChange={handleInputChange}
            required="required"
          />

          <Input
            type="password"
            label="Password"
            name="password"
            value={inputs.password || ""}
            onChange={handleInputChange}
            required="required"
          />

          <Link to="/login/problem">Forgot Username?</Link>
          <Link to="/login/problem">Forgot Password?</Link>

          <Button
            type="submit"
            label="Login"
            className="btn-primary btn-login"
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
