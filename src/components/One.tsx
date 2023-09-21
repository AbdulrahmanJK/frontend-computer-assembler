import React from 'react'
import style from '../css/assembling.module.css'
import OneAcces from './OneAcces';

function One({acces}) {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => {
        setOpen(!open)
        console.log(open);
        
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
            {open ? <OneAcces  handleOpen={handleOpen} id={acces._id} /> : null}
          </div>
  
          <div className={style.price}>
            <span>{acces.price}₽</span>
          </div>
          <div className={style.button}>
            <button>Добавить</button>
          </div>
        </div>
      </div>
    );
}

export default One