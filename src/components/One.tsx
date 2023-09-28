import React from 'react'
import style from '../css/assembling.module.css'
import OneAcces from './OneAcces';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { deleteOneAccessories } from '../features/AccessoriesSlice';
import { SideBar } from '../components/SideBar'

function One({acces,handleOpenClick,setSideItems,sideItems,setSideCost,sideCost}) {
  const dispatch = useDispatch<AppDispatch>()
    const [open, setOpen] = React.useState(false)
    const [active, setActive] = React.useState(true)

    
  
  


    const handleButton = () => {
      if (active) {
        handleOpenClick(acces._id, acces)
      } else {
        dispatch(deleteOneAccessories(acces._id))
      }
      setActive(!active)
      
    }
    const handleOpen = () => {
        setOpen(!open)
        
    }
    return (
      <div>
       
        <div className={style.two_block}>
          <div>
            <img src={acces.image} alt="" />
          </div>
          <div className={style.title_acces}>
            <span onClick={handleOpen} className={style.tit_span}>{acces.title}</span>
            <span  onClick={handleOpen} className={style.oneSpan}>
              Подробнее
              
            </span>
          {acces.linkModel ? <div className='text-'>3D</div>:null}

            {open ? <OneAcces  handleOpen={handleOpen} id={acces._id} /> : null}
          </div>
  
          <div className={style.price}>
            <span>{acces.price}₽</span>
          </div>
          <div className={style.button}>
            <button  onClick={()=>handleButton()}>{active ? 'Добавить' : 'Удалить'}</button>

          </div>
        </div>
        
      </div>
      
    );
}

export default One