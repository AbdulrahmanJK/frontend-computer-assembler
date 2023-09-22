import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import Cart from "./Cart";
import img1 from "./img/logo.jpg";
import img2 from "./img/user.svg";
import cart2 from './img/cart2.png'
import style from "./Header/header.module.css";
import { RootState } from "../app/store";
function Header() {
  const getTok = useSelector((state: RootState) => state.authReducer.token);
  const [isCartVisible, setCartVisible] = useState(false);
  const cartItemsCount = useSelector(
    (state: RootState) => state.CartSlice.items.length
  );
  console.log(cartItemsCount);

  const toggleCart = () => {
    setCartVisible(!isCartVisible);
  };

  useEffect(() => {
    getTok;
  }, [getTok]);
  return (
    <div className={style.header}>
      <div className={style.logo}>
        <img src={img1} alt="" />
      </div>
      <div className={style.three_span}>
        <span>Компьютеры</span>
        <Link to="assem">
          {" "}
          <span>Конфигуратор ПК</span>
        </Link>
        <Link to="assort"> <span>Комплектующие</span></Link>
        <Link to="/">
          {" "}
          <span>Главная</span>
        </Link>
      </div>

      
        <div className={style.cartIcon} >
          <div onClick={toggleCart}>

          <button className={style.cart}
            onClick={() => { <div >{isCartVisible && <Cart />}</div> }
          }>
            <img src={cart2} /></button>
          
              </div>
        
        {isCartVisible && <Cart />}
        {getTok ? (
          <Link to="logroom">
            <img src={img2} alt="" />
          </Link>
        ) : (
          <Link to="auth">
            <img src={img2} alt="" />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
