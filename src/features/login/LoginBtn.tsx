import { isEqual } from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveLoginUser, selectLogin } from "./loginSlice";

function LoginBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectLogin);

  async function handleCallbackResponse(res: any) {
    if (res) {
      const response = await fetch(
        `${process.env.REACT_APP_BACK_URL}/todo/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            jwt: res.credential,
          }),
        }
      );

      const user = await response.json();
      dispatch(saveLoginUser(user));
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
    const initialLoginUser = {
      uid: "",
      email: "",
      name: "",
      picture: "",
    };

    if (!isEqual(initialLoginUser, user)) {
      navigate("main", { replace: true });
    } else {
      navigate("/");
    }
  }, [user, navigate]);

  return <div id="google-login"></div>;
}

export default LoginBtn;
