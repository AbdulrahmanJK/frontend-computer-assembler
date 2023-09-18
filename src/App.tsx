import { Route, Routes } from "react-router";
import "./App.css";
import Register from "./components/authorization/Register";
import Login from "./components/authorization/Login";
import Profile from "./components/Profile";
import Header from "./components/Header";

function App() {
  return (
    <>
      <h1>Мы должны оставаться мыми, а они оними</h1>
      <Header />
      <Routes>
        <Route path="/logRoom" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
