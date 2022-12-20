import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSignIn } from "../features/applicationSlice";
import style from "./Styles.module.css";
import { Link } from "react-router-dom";

const SignIn = () => {
  const error = useSelector((state) => state.application.error);
  const signingIn = useSelector((state) => state.application.signingIn);

  // Состояния
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  // Диспетчер
  const dispatch = useDispatch();

  // На input. Для логина
  const handleSetName = (e) => {
    setLogin(e.target.value);
  };

  // На input. Для пароля
  const handleSetPass = (e) => {
    setPassword(e.target.value);
  };

  // Форма отправки данных
  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(authSignIn({ login, password }));
  };

  // При ошибке
  if (error) {
    return <div>{error}</div>;
  }

  // Прелоадер
  if (signingIn) {
    return (
      <div style={{ color: "brown", fontSize: "50px", textAlign: "center" }}>
        Login in progress. Wait...
      </div>
    );
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
