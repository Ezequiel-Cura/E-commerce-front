import React from "react";
import { useAppSelector } from "../../redux/Hooks";

export default function userPage() {
  const {user} = useAppSelector(state => state.UserReducer)



  return (
    <div>
        <img src={user.img} alt="userImg" />
        <span>Name: {user.name}</span>
        <span>Mail: {user.email}</span>
    </div>
  )
}
