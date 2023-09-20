import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCategory } from "../features/CategorySlice";
import { Carousel } from "react-bootstrap";
import { CarouselHome } from "./cssComponent/Carousel";
import style from "../css/assembling.module.css";
import { fetchAccessories, fetchAccessoriesCategory, fetchOneAccessories } from "../features/AccessoriesSlice";
import { Link, Route, Routes } from "react-router-dom";
import AssemblSort from "./AssemblSort";
import { AppDispatch } from "../app/store";
import OneAcces from "./OneAcces";
import One from "./One";

function Assembling() {
  const dispatch = useDispatch<AppDispatch>();
  const category = useSelector((state) => state.categorySlice.category);
  const accessories = useSelector((state) => state.accessoriesSlice.accessories)


  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchAccessories());
  }, [dispatch]);

  const handleClick = (id)=>{
    dispatch(fetchAccessoriesCategory(id))
    console.log(id);
  }
  
  console.log(accessories);
  
  return (
    <div className={style.rodblock_assem}>
      <div>
        <div className={style.compl}>
          <span>Комплектация</span>
        </div>

        {category.map((item) => {
          return (
            <div onClick={()=>handleClick(item._id)} className={style.title}>
                <span>{item.title}</span>
              
            </div>
          );
        })}
      </div>
      <div className={style.twoRod}>
        {accessories.map((acces)=> <One acces={acces}/>)}
      </div>
    </div>
  );
}

export default Assembling;
