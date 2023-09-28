import React, { useEffect } from "react";
import style from "../css/oneAcessori.module.css";
import { useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import { Spinner } from "react-bootstrap";

function OneLoading({ item, cartItems, addCart }) {
  const loading = useSelector((state) => state.CartSlice.status);
  const [load, setload] = React.useState(false)
  useEffect(() => {
        if (item._id === loading) {
          setload(() => true)
        } else {
          setload(() => false)
        }
  }, [loading])

  return (
    <>
    <div className={style.kkk}>
      <div className={style.keys}>
        <div className={style.image}>
          <img src={item.image} alt="image" />{" "}
        </div>
        <div className={style.title}> {item.title}</div>
        <div className={style.price}>
          <span>{item.price}₽</span>
        </div>
        <div>
            {load ? <div className={style.but_load}><span><Spinner className={style.Spinner} animation="border" variant="primary" /></span> </div> : <>
          {cartItems.find((car) => car.accessories._id === item._id) ? (
            <button disabled>Добавлено</button>
          ) : (
            <button onClick={() => addCart(item._id, item)}>
              Добавить в корзину
            </button>
          )}</>}
        </div>
      
      </div>
      </div>
    </>
  );
}

export default OneLoading;
