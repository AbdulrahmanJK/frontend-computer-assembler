import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import style from "./Header/header.module.css";
import { fetchCart, removeAllCartItem, removeCartItem } from "../features/CartSlice";
import { accordion } from "@material-tailwind/react";

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.CartSlice.CartItem);
   console.log(cartItems);
   
  console.log(cartItems, 'efewfewf');
  
  const a = cartItems.reduce((acc, num) => {
    return acc + num.accessories.price
  }, 0)

  
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
        {cartItems.map((item) => {
          
          
          return(
          <div className={style.cart_price}>
            <div className={style.cartTitle}>{item.accessories.title}</div>
            <div className={style.price}> {item.accessories.price}₽</div>

            
           <div> <button onClick={()=> handleDelete(item._id)} >Убрать</button></div>
          </div>
        )})}
     
      </div>
      {cartItems.length ? <p>ТОВАРЫ: {cartItems.length}</p> : null}
      {cartItems.length ? <p>Итого: {a}<span className={style.rouble}>₽</span></p> : <div><img src="https://i.ytimg.com/vi/4jLAMmxsKyE/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGUgXihTMA8=&rs=AOn4CLBT3PgEFyXFDK_0ZIuRrDFnnNIZBw" alt="" /></div>}
      
      
      
     
      {cartItems.length ?   <button onClick={removeAll} className={style.clearCartBtn} >ОЧИСТИТЬ КОРЗИНУ</button> : null }
    
    </div>
  );
};

export default Cart;
