import React from "react";
import LoginBtn from "./LoginBtn";
import "./Login.css";
import todo from "../../img/todo.svg";

function Login() {
  return (
    <div className="login-wrap">
      <div className="Login">
        <img src={todo} alt="logo" />
        <p>구글로 시작하기</p>
        <LoginBtn />
      </div>
    </div>
  );
}

export default Login;
