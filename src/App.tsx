import { Route, Routes } from "react-router";
import "./App.css";
import Register from "./components/authorization/Register";
import Login from "./components/authorization/Login";
import Test from "./components/threeJsComponents/test";

import Profile from "./components/Profile";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Assembling from "./components/Assembling";

function App() {
  
  return (
    <>
      <Header />
      <Routes>

        <Route path="/sborshik" element={<Test />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/logRoom" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/assem" element={<Assembling />} />
      </Routes>
    </>
  );
}

export default App;
