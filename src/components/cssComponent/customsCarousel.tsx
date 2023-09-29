import { Carousel, CarouselItem } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import style from './Carousel.module.css'
import customPCs from '../img/customs/customPCs.png'
import customPCs1 from '../img/customs/customPCs1.png'
import customPCs2 from '../img/customs/customPCs2.png'
import img1 from '../img/photo1.jpg'
import img2 from '../img/photo2.jpg'
import img3 from '../img/photo3.jpg'
import img4 from '../img/photo4.png'
import img5 from '../img/photo6.jpg'
import { Link } from "react-router-dom";

 
export function CarouselCustom() {
  return (
    <div className={style.rodCarusel}>
      <div >
        <Carousel>
          <CarouselItem className={style.carusel}>
          <ul className={style.hoverEffectScale}>
  <li>
  <img
              className="d-block w-100"
              src={customPCs}
              alt="First slide"
            />
    <div>
      <h3></h3>
      <Link to="/category/650812559113012b9f747d0b">Перейти</Link>
      
    </div>
  </li>
</ul>




            

          </CarouselItem>
          <CarouselItem className={style.carusel}>
          <ul className={style.hoverEffectScale}>
  <li>
  <img
              className="d-block w-100"
              src={customPCs1}
              alt="First slide"
            />
    <div>
      <Link to="/category/650812629113012b9f747d0d">Перейти</Link>
    </div>
  </li>
</ul>
          </CarouselItem>
          <CarouselItem className={style.carusel}>
          <ul className={style.hoverEffectScale}>
  <li>
  <img
              className="d-block w-100"
              src={customPCs2}
              alt="First slide"
            />
    <div>
      <h3>Заголовок</h3>
      <p>Текст</p>
      <a href="">Подробнее</a>
    </div>
  </li>
</ul>
          </CarouselItem>
          <CarouselItem className={style.carusel}>
          <ul className={style.hoverEffectScale}>
  <li>
  <img
              className="d-block w-100"
              src={img4}
              alt="First slide"
            />
    <div>
      <h3>Заголовок</h3>
      <p>Текст</p>
      <a href="">Подробнее</a>
    </div>
  </li>
</ul>
          </CarouselItem>
          <CarouselItem className={style.carusel}>
          <ul className={style.hoverEffectScale}>
  <li>
  <img
              className="d-block w-100"
              src={img5}
              alt="First slide"
            />
    <div>
      <h3>Заголовок</h3>
      <p>Текст</p>
      <a href="">Подробнее</a>
    </div>
  </li>
</ul>
          </CarouselItem>
        </Carousel>
      </div>
    </div>
  );
}