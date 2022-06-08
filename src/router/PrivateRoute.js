import { isEqual } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLogin } from "../features/login/loginSlice";

function PrivateRoute({ component: Component }) {
  const user = useSelector(selectLogin);
  const initialLoginUser = {
    uid: "",
    email: "",
    name: "",
    picture: "",
  };

  return !isEqual(user, initialLoginUser) ? (
    Component
  ) : (
    <Navigate to="/" {...alert("로그인이 필요합니다.")} />
  );
}

export default PrivateRoute;
