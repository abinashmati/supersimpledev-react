import { useState } from "react";
import "./loginForm.css";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  function showButtonClick() {
    setShowPassword(!showPassword);
  }

  return (
    <div>
      <div>
        <input className="login-input " type="text" placeholder="Email" />
      </div>

      <div>
        <input
          className="login-input "
          type={showPassword === false ? "password" : "text"}
          placeholder="Password"
        />
        <button
          className={showPassword ? "show-button-red" : "show-button-green"}
          onClick={showButtonClick}
        >
          {showPassword === false ? "Show Password" : "Hide Password"}
        </button>
      </div>
      <button className="login-button">Login</button>
      <button className="login-button">Login</button>
    </div>
  );
}
export default LoginForm;
