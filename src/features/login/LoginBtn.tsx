import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveLoginUser } from "./loginSlice";
import { isEqual } from "lodash";

function LoginBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user: User = useSelector((state: State) => state.login);

  function handleCallbackResponse(res: any) {
    if (res) {
      fetch(`${process.env.REACT_APP_BACK_URL}/todo/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          jwt: res.credential,
        }),
      })
        .then((response) => response.json())
        .then((data: User) => {
          dispatch(saveLoginUser(data));
        });
    }
  }

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_OAUTH,
      callback: handleCallbackResponse,
    });

    const loginBtn = document.getElementById("google-login");

    window.google.accounts.id.renderButton(loginBtn, {
      type: "standard",
      theme: "outline",
      size: "large",
    });
  });

  useEffect(() => {
    const intitialUser: User = {
      uid: "",
      name: "",
      email: "",
      picture: "",
    };

    if (!isEqual(user, intitialUser)) {
      navigate("main", { replace: true });
    } else {
      navigate("/");
    }
  }, [user, navigate]);

  return <div id="google-login"></div>;
}

export default LoginBtn;
