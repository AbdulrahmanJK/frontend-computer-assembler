import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";  

function Header() {
  const getTok = useSelector((state: RootState) => state.authReducer.token);

//   useEffect(() => {
//     getTok;
//   }, [getTok]);
  return (
    <div >
      
      <div>
        <div>
          <Link to="/">
            <span>Главная</span>
          </Link>
          <span>Публикации</span>
          {!getTok ? (
            <>
              <Link to="/auth">
                <p>
                  <span>Вход </span>
                </p>
              </Link>
              <Link to="/register">
                <p>
                  <span>регистрация</span>
                </p>
              </Link>
            </>
          ) : (
            <Link to="/logRoom">
              <span>личный кабнет</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
