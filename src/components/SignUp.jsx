import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSignUp } from "../features/applicationSlice";
import style from "./Styles.module.css";
import { Link } from "react-router-dom";

const SignUp = () => {
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

  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(authSignUp({ login, password }));
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={style.signUp}>
      <form onSubmit={handleSignUp}>
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
        <button type="submit">Зарегистрироваться</button>
        <h3>
          Уже есть аккаунт?
          <Link className={style.link} to="/login">
            Войти
          </Link>
        </h3>
      </form>
    </div>
  );
};

export default SignUp;
