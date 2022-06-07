import { isEqual } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ component: Component }) {
  const intitialUser = {
    uid: "",
    name: "",
    email: "",
    picture: "",
  };

  const user = useSelector((state) => state.login);

  return !isEqual(user, intitialUser) ? (
    Component
  ) : (
    <Navigate to="/" {...alert("로그인이 필요합니다.")} />
  );
}

export default PrivateRoute;
