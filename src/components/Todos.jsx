import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, fetchTodos } from "../features/todoSlice";
import { Link } from "react-router-dom";
import Todo from "./Todo";
import style from "./Styles.module.css";
import sendMessageIcon from "./icons/icons8-telegram-is-a-cloud-based-instant-messaging-and-voice-over-ip-service-24.png";

const Todos = () => {
  // Диспетчер
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos.todos);
  const token = useSelector((state) => state.application.token);
  const login = useSelector((state) => state.application.login);
  const loading = useSelector((state) => state.todos.loading);
  const error = useSelector((state) => state.error);

  // На кнопку. Для удаление токена из localStorage. Кнопка выхода
  const clearToken = () => {
    localStorage.clear(token);
    window.location.reload();
  };

  // Состояние
  const [text, setText] = React.useState("");

  // На кнопку. Для добавления текста
  const handleAddTodo = () => {
    dispatch(addTodo({ text }));
    setText("");
  };

  // На input
  const handleChange = (e) => {
    setText(e.target.value);
  };

  // Для остановки бесконечных запросов и чтобы сервер не банил
  React.useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  // Прелоадер
  if (loading) {
    return (
      <div style={{ color: "brown", fontSize: "50px", textAlign: "center" }}>
        Please wait...
      </div>
    );
  }

  // При ошибке
  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <div className={style.header}>
        <h1>
          <Link className={style.link} to="/users">
            Users
          </Link>
        </h1>
        <h1 className={style.title}>A I R W A Y C H A T</h1>
        <div>
          <span className={style.nickname}>{`Ваш ник: ${login}`}</span>
          <button className={style.todoExitBtn} onClick={clearToken}>
            Выйти
          </button>
        </div>
      </div>

      <div className={style.todoApp}>
        <input
          type="text"
          onChange={handleChange}
          value={text}
          className={style.todoInput}
        />
        <button
          disabled={!text}
          type="submit"
          onClick={handleAddTodo}
          className={style.addBtn}
        >
          <img src={sendMessageIcon} alt="Отправить" />
        </button>
      </div>
      <div className={style.todo}>
        {todos.map((todo) => {
          return (
            <Todo
              key={todo._id}
              id={todo._id}
              text={todo.text}
              user={todo.user}
              loading={todo.loading}
            />
          );
        })}
      </div>
    </>
  );
};

export default Todos;
