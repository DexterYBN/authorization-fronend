import { useDispatch } from "react-redux";
import { removeTodo } from "../features/todoSlice";
import style from "./Styles.module.css";

const Todo = ({ id, text, user, loading }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    window.location.reload();
    dispatch(removeTodo({ id }));
  };

  if (loading) {
    return <div style={{ color: "red" }}>Удаляется...</div>;
  }

  return (
    <div className={style.todos}>
      <div>{`${user.login}:`}</div>
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
