import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../app/store';
import { useParams } from 'react-router-dom';
import { fetchAccessoriesCategory } from '../features/AccessoriesSlice';
import style from '../css/oneAcessori.module.css'
function OneCategory() {
    const dispatch = useDispatch<AppDispatch>();

  const accessories = useSelector((state) => state.accessoriesSlice.accessories)

const {id} = useParams()


useEffect(() => {
    dispatch(fetchAccessoriesCategory(id));
  }, [dispatch]);

  return (
    <div className={style.rod_rod}>
    <div  className={style.rod_block}>
        {accessories.map((item)=>{
            return(
                <div className={style.keys}>
                  <div className={style.image}><img src={item.image} alt="image" /> </div> 
                  <div className={style.title}> {item.title}</div> 
                  <div><button>Добавить в корзину</button></div>
                </div>
            )
        })}
        </div>
        </div>
  )
}

export default OneCategory