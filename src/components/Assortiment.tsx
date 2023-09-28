import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../features/CategorySlice";
import { AppDispatch } from "../app/store";
import style from '../css/assortiment.module.css'
import { Link } from "react-router-dom";

function Assortiment() {
    const category = useSelector((state) => state.categorySlice.category);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchCategory());;
      }, [dispatch]);



  return (
    <div className={style.rod_rod}>
    <div className={style.rod_assort}>
    {category?.map((item) => {
      return (
       <Link to={`/category/${item._id}`}> <div   className={style.assort_block}>
        <div className={style.title}>
              <div> <img src={item.image} alt="" /></div>

           <div><span>{item.title}</span></div> 
          
        </div>
        </div></Link>
      );
    })}
  </div>
  </div>
  )
}

export default Assortiment