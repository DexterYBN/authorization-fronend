import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/usersSlice";
import style from "./Styles.module.css";

const Users = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <div className={style.users}>
      <h1>Список пользователей</h1>
      {users.map((item) => {
        return (
          <div key={item._id}>
            <div className={style.names}>{item.login}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
