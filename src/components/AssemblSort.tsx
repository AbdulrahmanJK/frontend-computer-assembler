import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAccessories } from "../features/AccessoriesSlice";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../app/store";
import style from '../css/assembling.module.css'


function AssemblSort() {
    const {id} = useParams()
    const accessories = useSelector((state) => state.accessoriesSlice.accessories.filter((assem)=>{
        if(!id) return true;
        return assem.category === id
    }));
    const dispatch = useDispatch<AppDispatch>()

    useEffect(()=>{
        dispatch(fetchAccessories())
    })



  return (
    
    <div className={style.twoRod}>
    {accessories.map((acces)=>{
      return(
        <div >
        <div className={style.two_block}>
          <div><img src={acces.image} alt="" /></div>
          <div className={style.title_acces}><span>{acces.title}</span></div>
          <div className={style.price}><span>{acces.price}</span></div>
          <div className={style.button}><button>Добавить</button></div>
        </div>
        </div>
      )
    })}
  </div>
  )
}

export default AssemblSort