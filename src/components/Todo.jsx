import { useDispatch } from "react-redux";
import { removeTodo } from "../features/todoSlice";
import style from "./Styles.module.css";

const Todo = ({ id, text, user }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    window.location.reload();
    dispatch(removeTodo({ id }));
  };

  return (
    <div className={style.todos}>
      <div>{`${user.login} написал:`}</div>
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
