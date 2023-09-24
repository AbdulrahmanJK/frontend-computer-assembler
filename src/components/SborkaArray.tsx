import React, { useEffect, useState } from 'react'
import style from '../css/sborka.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../app/store'
import { fetchAssembling } from '../features/AssemblingSlice'
import { Link } from 'react-router-dom'

function SborkaArray() {
const assembling = useSelector((state) => state.assemblingSlice.assembling)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(fetchAssembling())
    
      }, [dispatch]);
  return (
    <div className={style.rod_sborki}>
        {assembling.map((item)=>{
            return(
              <Link to={`sborka/${item._id}`}>  <div className={style.sborki}><span>{item.title}</span></div></Link>
            )
        })}
    </div>
  )
}

export default SborkaArray