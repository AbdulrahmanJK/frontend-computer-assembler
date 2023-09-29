import { useEffect, useState } from "react";
import { fetchOneAccessories } from "../features/AccessoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import style from "../css/one.module.css";

function OneAcces({ id, handleOpen }) {

  const accessories = useSelector((state) => state.accessoriesSlice.accessories);

  const dispatch = useDispatch<AppDispatch>();
  console.log(accessories)
  useEffect(() => {
    fetchOneAccessories(id);
  }, [dispatch]);
  return (
    <div>
      {accessories?.map((item) => {
        if (item._id === id) {
          return (
            <div className={style.oneProd}>
              <div className={style.but}>
                <button onClick={handleOpen}>✕</button>
              </div>
              <div className={style.span}>
                <span>{item.title}</span>
              </div>
              <div className={style.image}>
                <img src={item.image} alt="" />
              </div>
              <div className={style.desc}>
                <span>{item.attributes}</span>
              </div>
              <div className={style.price_but}>
                <div>
                  Стоимость: <span>{item.price}₽</span>
                </div>
                <div>
                  <div className={style.button}>
                    <button>Добавить</button>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default OneAcces;
