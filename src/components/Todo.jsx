import { useDispatch } from "react-redux";
import { removeTodo } from "../features/todoSlice";
import style from "./Styles.module.css";
import deleteIcon from "./icons/icons8-24.png";

const Todo = ({ id, text, user, loading }) => {
  // Диспетчер
  const dispatch = useDispatch();

  // Кнопка удаления текста
  const handleRemove = () => {
    window.location.reload();
    dispatch(removeTodo({ id }));
  };

  // Прелоадер
  if (loading) {
    return <div style={{ color: "red" }}>Удаляется...</div>;
  }

  return (
    <div className={style.todos}>
      <div>{`${user.login} :`}</div>
      <div>{text}</div>
      <div>
        <button onClick={handleRemove} className={style.dltBtn}>
          <img src={deleteIcon} alt="Удалить" />
        </button>
      </div>
    </div>
  );
};

export default Todo;
