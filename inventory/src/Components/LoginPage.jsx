import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../Styles/LoginPage.css";
import { useDispatch } from "react-redux";
import {setUsername} from "../Redux/store";
const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const dispatch=useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:2999/api/v1/auth/authenticate",
        {
          email: email,
          password: password,
        }
      );
     
      const jwtToken = response.data.token;
      const name=response.data.name;
      dispatch(setUsername(response.data.name));
      console.log(name);
      localStorage.setItem("jwtToken", jwtToken);
     localStorage.setItem("name",name);
      navigate("/order", { state: { signupSuccess: true } });
    } catch (error) {
      toast.error("Invalid email or password!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  
  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit" className="butlogin">
            Login
          </button>
        </form>
        <p>
          Doesn't have an account?
          <Link className="route" to="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
