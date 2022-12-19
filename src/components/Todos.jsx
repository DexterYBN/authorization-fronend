import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, fetchTodos } from "../features/todoSlice";
import { Link } from "react-router-dom";
import Todo from "./Todo";
import style from "./Styles.module.css";

const Todos = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const token = useSelector((state) => state.application.token);
  const login = useSelector((state) => state.application.login);

  const clearToken = () => {
    window.location.reload();
    localStorage.clear(token);
  };

  const [text, setText] = useState("");

  const handleAddTodo = () => {
    dispatch(addTodo({ text }));
    setText("");
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

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
        <button type="submit" onClick={handleAddTodo} className={style.addBtn}>
          Добавить
        </button>
      </div>
      <div className={style.todo}>
        {todos
          .map((todo) => {
            return (
              <Todo
                key={todo._id}
                id={todo._id}
                text={todo.text}
                user={todo.user}
              />
            );
          })
          .reverse()}
      </div>
    </>
  );
};

export default Todos;
