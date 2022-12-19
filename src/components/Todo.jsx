import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo } from "../features/todoSlice";
import style from "./Styles.module.css";

const Todo = ({ id, text }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeTodo({ id }));
  };

  return (
    <div className={style.todos}>
      <div>{text}</div>
      <div>
        <button onClick={handleRemove} className={style.dltBtn}>
          Удалить
        </button>
      </div>
    </div>
  );
};

export default Todo;
