import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import { useParams } from "react-router-dom";
import { fetchAccessoriesCategory } from "../features/AccessoriesSlice";
import style from "../css/oneAcessori.module.css";
import { createCart, fetchCart } from "../features/CartSlice";
import { RootState } from "@react-three/fiber";
function OneCategory() {
  const dispatch = useDispatch<AppDispatch>();

  const loading = useSelector((state) => state.CartSlice.status)

  const accessories = useSelector(
    (state) => state.accessoriesSlice.accessories
  );
  const cartItems = useSelector((state: RootState) => state.CartSlice.CartItem);
  console.log(loading);
  


  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchAccessoriesCategory(id));
    dispatch(fetchCart());
  }, [dispatch, id]);

  if(loading){
    return 'loa'
  }

  const addCart = (id) => {
    dispatch(createCart({ accessories: id }));
  };
  return (
    <div className={style.rod_rod}>
      <div className={style.rod_block}>
        {accessories.map((item) => {
          
          return (
            <div className={style.keys}>
              <div className={style.image}>
                <img src={item.image} alt="image" />{" "}
              </div>
              <div className={style.title}> {item.title}</div>
              <div className={style.price}>
                <span>{item.price}₽</span>
              </div>
              <div>
              
                {cartItems.find((car) =>  car.accessories._id === item._id) ?  
                <button disabled> 
                Добавлено
                </button> :  
                <button  onClick={() => addCart(item._id)}>
                add
                </button>}
               
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OneCategory;
