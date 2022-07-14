import { isEqual } from "lodash";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveLoginUser, selectLogin } from "./loginSlice";

function LoginBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectLogin);
  const loginBtn = useRef<HTMLDivElement>(null);

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

    window.google.accounts.id.renderButton(loginBtn.current, {
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

  return <div id="google-login" ref={loginBtn}></div>;
}

export default LoginBtn;
