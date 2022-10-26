import "./LoginPage.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/actions/index";
import { useNavigate } from "react-router-dom";
import loginBg from "../../Assets/Images/login.png";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Login = (e) => {
    e.preventDefault();
    const data = {
      USERNAME: userName,
      EMAIL: "tutku@tutku.com",
      USERID: 1,
      AUTHORITY: "uye",
      NAME: "",
      INFORMATION: "",
      LOCATION: "",
      WEBSITE: "",
      BIRTHDAY: "",
    };
    dispatch(signIn(data));
    navigate("/home");
  };

  return (
    <div className="LoginPage">
      <div className="loginLeftContainer">
        <i className="bi bi-twitter twitterBg"></i>
        <img className="loginBg" src={loginBg} alt="loginBg" />
      </div>

      <div className="loginRightContainer">
        <i className="bi bi-twitter loginHeader"></i>
        <label className="loginLabel">Şu anda olup bitenler</label>
        <span className="loginSpan">Twitter'a bugün katıl.</span>

        <div className="form-floating userNameForm">
          <input
            type="email"
            className="form-control loginInput"
            id="floatingInput"
            placeholder="name@example.com"
            autoComplete="off"
            onChange={(e) => setUserName(e.target.value)}
          />
          <label htmlFor="floatingInput" className="loginforLabel">
            Kullanıcı adı
          </label>
        </div>
        <div className="form-floating passwordForm">
          <input
            type="password"
            className="form-control loginInput"
            id="floatingPassword"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword" className="loginforLabel">
            Şifre
          </label>
        </div>
        <div className="loginButtonContainer">
          <button className="loginBtn" onClick={Login}>
            Giriş yap
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
