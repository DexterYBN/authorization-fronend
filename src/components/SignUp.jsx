import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSignUp } from "../features/applicationSlice";
import { Link } from "react-router-dom";
import style from "./Styles.module.css";

const SignUp = () => {
  const error = useSelector((state) => state.application.error);
  const signingUp = useSelector((state) => state.application.signingUp);

  // Состояния
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");

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
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000)
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
        <button disabled={!login || !password} type="submit">
          Зарегистрироваться
        </button>
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
