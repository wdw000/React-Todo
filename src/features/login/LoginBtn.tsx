import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { isEqual } from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveLoginUser, selectLogin } from "./loginSlice";

function LoginBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectLogin);

  async function postLoginUser(res: any) {
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

      return response;
    }
  }

  async function handleCallbackResponse(res: any) {
    const response = await postLoginUser(res);

    if (response) {
      if (response.status === 201) {
        const user = await response.json();
        dispatch(saveLoginUser(user));
        sessionStorage.setItem("res", JSON.stringify(res));
      } else {
        console.log("login fail");
      }
    }
    console.log("onSuccesss");
  }

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

  useEffect(() => {
    async function checkLogin() {
      const res = sessionStorage.getItem("res");
      if (res) {
        const response = await postLoginUser(JSON.parse(res));

        if (response) {
          if (response.status === 201) {
            const user = await response.json();
            dispatch(saveLoginUser(user));
          } else {
            console.log("login fail");
          }
        }
      }
    }

    checkLogin();
  }, [dispatch]);

  return (
    <>
      {" "}
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH}>
        <GoogleLogin
          onSuccess={(res) => handleCallbackResponse(res)}
          onError={() => console.log("fail")}
          ux_mode="popup"
          size="large"
        />
      </GoogleOAuthProvider>
    </>
  );
}

export default LoginBtn;
