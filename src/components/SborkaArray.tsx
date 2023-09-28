import React, { useEffect, useState } from 'react'
import style from '../css/sborka.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../app/store'
import { deleteOneAssembling, fetchAssembling } from '../features/AssemblingSlice'
import { Link } from 'react-router-dom'
import img from './img/delete.svg'

function SborkaArray() {
const assembling = useSelector((state) => state.assemblingSlice.assembling)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(fetchAssembling())
    
      }, [dispatch]);

const handleDelete= (id)=>{
dispatch(deleteOneAssembling(id))



}

  return (
    <div className={style.rod_sborki}>
        {assembling.map((item)=>{
            return(
              <div className={style.dell}> <Link to={`sborka/${item._id}`}> <div className={style.sborki}> <div className={style.ssb}><span>{item.title}</span> </div></div></Link><div className={style.del_but}><img src={img} onClick={()=>handleDelete(item._id)} alt="" /></div></div>
            )
        })}
    </div>
  )
}

export default SborkaArray