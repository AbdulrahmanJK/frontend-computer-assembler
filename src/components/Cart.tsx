import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import style from "./Header/header.module.css";
import { fetchCart, removeAllCartItem, removeCartItem } from "../features/CartSlice";

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.CartSlice.CartItem);


useEffect(()=>{
 dispatch(fetchCart())
},[dispatch])
  
const handleDelete = (id)=>{
  dispatch(removeCartItem(id))
}
const removeAll = ()=>{
  dispatch(removeAllCartItem())
}

  return (
    <div className={style.shopCart}>
      {cartItems.length ? <h2>Корзина</h2> : <h2>Корзина пустая</h2>}
      <div className={style.cartProd}>
        {cartItems.map((item) => (
          <div className={style.cart_price}>
            <div className={style.cartTitle}>{item.accessories.title}</div>
            <div className={style.price}> {item.accessories.price}₽</div>
           <div> <button onClick={()=> handleDelete(item._id)} >Убрать</button></div>
          </div>
        ))}
      </div>
      <p>ТОВАРЫ: {cartItems.length}</p>
      <button onClick={removeAll} className={style.clearCartBtn} >ОЧИСТИТЬ КОРЗИНУ</button>
    </div>
  );
};

export default Cart;
