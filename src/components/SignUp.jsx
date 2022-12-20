import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSignUp } from "../features/applicationSlice";
import style from "./Styles.module.css";
import { Link } from "react-router-dom";

const SignUp = () => {
  const error = useSelector((state) => state.application.error);
  const signingUp = useSelector((state) => state.application.signingUp);

  // Состояния
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  // Дисппетчер
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
  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(authSignUp({ login, password }));
  };

  // При ошибке
  if (error) {
    return <div>{error}</div>;
  }

  // Прелоадер
  if (signingUp) {
    return (
      <div style={{ color: "brown", fontSize: "50px", textAlign: "center" }}>
        Registration in progress. Wait...
      </div>
    );
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
