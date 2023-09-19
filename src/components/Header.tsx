import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect} from "react";  
import img from './img/user.svg'
import img1 from './img/logo.jpg'
import img2 from './img/user.svg'
import style from './Header/header.module.css'
import { RootState } from "../app/store";
function Header() {
  const getTok = useSelector((state: RootState) => state.authReducer.token);

  useEffect(() => {
    getTok;
  }, [getTok]);
  return (
    <div className={style.header} >
        <div className={style.logo}>
     <img src={img1} alt="" />
        </div>
        <div className={style.three_span}>
          <span>Компьютеры</span>
         <Link to="assem"> <span>Конфигуратор ПК</span></Link>
          <span>Комплектующие</span>
         <Link to="/"> <span>Главная</span></Link>
        </div>
        <div>
          {getTok ? (<Link to="logroom"><img src={img2} alt="" /></Link>) : (<Link to="auth"><img src={img2} alt="" /></Link>)}
          <span></span>
          <span></span>
        </div>
        
    </div>
  );
}

export default Header;


