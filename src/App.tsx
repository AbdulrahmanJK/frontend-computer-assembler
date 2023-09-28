import { Route, Routes } from "react-router";
import "./App.css";
import Register from "./components/authorization/Register";
import Login from "./components/authorization/Login";
import Test from "./components/threeJsComponents/test";
import WebcamCapture from "./components/authorization/cameraComponent";
import Profile from "./components/Profile";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Assembling from "./components/Assembling";
import { CarouselHome } from "./components/cssComponent/Carousel";
import Assortiment from "./components/Assortiment";
import OneCategory from "./components/OneCategory";
import Sborka from "./components/Sborka";
import SborkaArray from "./components/SborkaArray";


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
        <Route path="/category/:id" element={<OneCategory/>} />
        <Route path="/assort" element={<Assortiment/>} />
        <Route path="/sborki" element={<SborkaArray/>}/>
        <Route path="sborki/sborka/:id" element={<Sborka/>}/>

      </Routes>
    </>
  );
}

export default App;
