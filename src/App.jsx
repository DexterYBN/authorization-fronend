import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { Routes, Route, Navigate } from "react-router-dom";
import Users from "./components/Users";
import Todos from "./components/Todos";
import { useSelector } from "react-redux";

function App() {
  const token = useSelector((state) => state.application.token);
  // console.log(token);
  if (!token) {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/auth" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/todos" element={<SignUp />} />
        <Route path="/users" element={<SignUp />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/login" element={<Navigate to="/" />} />
      <Route path="/todos" element={<Todos />} />
      <Route path="/users" element={<Users />} />
      <Route path="/" element={<Todos />} />
    </Routes>
  );
}

export default App;
