import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSignIn } from "../features/applicationSlice";
import style from "./Styles.module.css";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const error = useSelector((state) => state.application.error);

  const handleSetName = (e) => {
    setLogin(e.target.value);
  };

  const handleSetPass = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(authSignIn({ login, password }));
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={style.signIn}>
      <form onSubmit={handleSignIn}>
        <input
          type="text"
          value={login}
          placeholder="name"
          onChange={handleSetName}
        />
        <br />
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={handleSetPass}
        />
        <br />
        <button type="submit">Войти</button>
        <h3>
          Нет аккаунта?
          <Link className={style.link} to="/auth">
            Зарегистрироваться
          </Link>
        </h3>
      </form>
    </div>
  );
};

export default SignIn;
