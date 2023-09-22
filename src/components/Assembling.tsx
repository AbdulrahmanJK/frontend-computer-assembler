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
  const oneAcces =  useSelector((state)=> state.accessoriesSlice.oneAccessori)
  const [text,setText]= useState(null)



  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchAccessories());
    dispatch(fetchOneAccessories)

  }, [dispatch]);

  const handleClick = (id)=>{
    dispatch(fetchAccessoriesCategory(id))

  }
  const handleOpenClick = (id)=>{
   dispatch(fetchOneAccessories(id))
    setText(id)
  }
  console.log(oneAcces);
  
  
  
  return (
       <> <CarouselHome/>
    <div className={style.rodblock_assem}>

      <div>
        <div className={style.compl}>
          <span>Комплектация</span>
          
        </div>

        {category.map((item) => {
          return (
            <div onClick={()=>handleClick(item._id)} className={style.title}>
               <div> <span>{item.title}</span></div>
              {oneAcces.map((ac)=>{
                if(item._id === ac.category){
                  return(
                    <div className={style.tit_img}>
                      <div className={style.image_acces}><img src={ac.image} alt="" /></div>
                      <div className={style.title_acces}>{ac.title}</div>
                    </div>
                  )
                }
              })}
            </div>
          );
        })}
      </div>
      <div className={style.twoRod}>
        {accessories.map((acces)=> <One handleOpenClick={handleOpenClick} acces={acces}/>)}
      </div>
    </div>
    </>
  );
}

export default Assembling;
