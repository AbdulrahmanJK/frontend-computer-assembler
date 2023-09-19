import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategory } from "../features/CategorySlice";
import { Carousel } from "react-bootstrap";
import { CarouselHome } from "./cssComponent/Carousel";
import style from '../css/assembling.module.css'

function Assembling() {
const dispatch = useDispatch<AppDispatch>()
    const category = useSelector((state) => state.categorySlice.category);

    console.log(category);
    
useEffect(()=>{
dispatch(fetchCategory())

},[dispatch])

  return (
    <div className={style.rodblock_assem}>
      <div><CarouselHome/></div>
      <div className={style.compl}><span>Комплектация</span></div>

      {category.map((item)=>{
        return(
           
        <div className={style.title}><span>{item.title}</span>
        </div>
      )})}
    </div>
  )
}

export default Assembling