import React, { useEffect } from "react";
import useForm from "../CustomHooks/useForm";
import Input from "../common/Input";
import Button from "../common/Button";
import { login } from "../../services/authServices";

const Login = (props) => {
  useEffect(() => {
    document.title = "Login - Readnow";
  });

  const doSubmit = async () => {
    try {
      const data = await login(inputs.email, inputs.password);

      if (data) {
        props.history.push("/dashboard");
      }
    } catch (e) {
      return null;
    }
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(doSubmit);

  return (
    <form onSubmit={handleSubmit}>
      <div className="login-container">
        <div className="container">
          <Input
            type="text"
            label="Email address"
            name="email"
            value={inputs.email || ""}
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

          <Button type="submit" label="Login" className="btn-primary" />
        </div>
      </div>
    </form>
  );
};

export default Login;
