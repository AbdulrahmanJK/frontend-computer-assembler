import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { clearCart, removeItem } from '../features/CartSlice'
import style from "./Header/header.module.css";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.CartSlice.items);

  const handleRemoveItem = (itemId: number) => {
    dispatch(removeItem(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className={style.shopCart}>
      <h2>КОРЗИНА</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} ({item.quantity}x)
            <button onClick={() => handleRemoveItem(item.id)}>Х</button>
          </li>
        ))}
      </ul>
      <p>ТОВАРЫ: {cartItems.length}</p>
      <button className={style.clearCartBtn} onClick={handleClearCart}>ОЧИСТИТЬ КОРЗИНУ</button>
    </div>
  );
};

export default Cart;
