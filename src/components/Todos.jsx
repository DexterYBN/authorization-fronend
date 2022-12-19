import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, fetchTodos } from "../features/todoSlice";
import Todo from "./Todo";
import style from "./Styles.module.css";

const Todos = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);

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
      <h1 className={style.title}>T O D O L I S T</h1>
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
            return <Todo key={todo._id} id={todo._id} text={todo.text} />;
          })
          .reverse()}
      </div>
    </>
  );
};

export default Todos;
