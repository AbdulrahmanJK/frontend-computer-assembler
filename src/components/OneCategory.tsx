import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import { useParams } from "react-router-dom";
import { fetchAccessoriesCategory } from "../features/AccessoriesSlice";
import style from "../css/oneAcessori.module.css";
import { createCart, fetchCart } from "../features/CartSlice";
import { RootState } from "@react-three/fiber";
import OneLoading from "./OneLoading";
function OneCategory() {
  const dispatch = useDispatch<AppDispatch>();

  const loading = useSelector((state) => state.CartSlice.status)
  

  const accessories = useSelector(
    (state) => state.accessoriesSlice.accessories
  );
  const cartItems = useSelector((state: RootState) => state.CartSlice.CartItem);
  const[price,setPrice] = useState(0)
  

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchAccessoriesCategory(id));
    dispatch(fetchCart());
  }, [dispatch, id]);

  const addCart = (id,item) => {
    dispatch(createCart({ accessories: id }));
    setPrice(item.price + price)
  
  };
  
  
  return (
    <div className={style.rod_rod}>
      <div className={style.rod_block}>
        {accessories.map((item) => <OneLoading addCart={addCart} item={item} cartItems={cartItems} loading={loading}/>)}
      </div>
    </div>
  );
}

export default OneCategory;
