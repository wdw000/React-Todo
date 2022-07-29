import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUid } from "../login/loginSlice";
import "./TodoSetting.css";
import { logout } from "../login/loginSlice";
import { setIdelFetchTodos } from "../todo/todoSlice";

export default function TodoSetting() {
  const uid = useSelector(selectUid);
  const dispatch = useDispatch();

  async function handleRemoveUser() {
    const isRemove = window.confirm("회원 탈퇴하겠습니까?");

    if (isRemove) {
      const res = await deleteUser();

      if (res.status === 200) {
        sessionStorage.removeItem("res");
        dispatch(logout());
        console.log("회원 탈퇴");
      } else {
        console.log("회원 탈퇴 실패");
      }
    }
  }

  async function handleRemoveAllTodo() {
    const isRemove = window.confirm("모든 할 일을 삭제하겠습니까?");

    if (isRemove) {
      const res = await RemoveAllTodo();

      if (res.status === 200) {
        dispatch(setIdelFetchTodos());
        console.log("모든 할 일 삭제");
      } else {
        console.log("모든 할 일 삭제 실패");
      }
    }
  }

  async function RemoveAllTodo() {
    const response = await fetch(
      `${process.env.REACT_APP_BACK_URL}/todo/user/${uid}`,
      {
        method: "DELETE",
      }
    );

    return response;
  }

  async function deleteUser() {
    const response = await fetch(
      `${process.env.REACT_APP_BACK_URL}/todo/login/${uid}`,
      {
        method: "DELETE",
      }
    );

    return response;
  }

  return (
    <div className="TodoSetting">
      <div>
        <p>할 일 설정</p>
        <ul>
          <li onClick={() => handleRemoveAllTodo()}>모든 할 일 삭제</li>
        </ul>
      </div>

      <div>
        <p>회원 정보 관리</p>
        <ul>
          <li onClick={() => handleRemoveUser()}>회원 탈퇴</li>
        </ul>
      </div>
    </div>
  );
}
