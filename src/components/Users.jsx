import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/usersSlice";
import { Link } from "react-router-dom";

import style from "./Styles.module.css";

const Users = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users.users);
  const token = useSelector((state) => state.application.token);

  const clearToken = () => {
    window.location.reload();
    localStorage.clear(token);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <div className={style.users}>
      <div className={style.header}>
        <h1>
          <Link className={style.link} to="/todos">
            TODO
          </Link>
        </h1>
        <h1 className={style.title}>Список пользователей</h1>
        <button className={style.todoExitBtn} onClick={clearToken}>
          Выйти
        </button>
      </div>
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
