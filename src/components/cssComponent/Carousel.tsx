import { Carousel, CarouselItem } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import style from './Carousel.module.css'
import img1 from '../img/photo1.jpg'
import img2 from '../img/photo2.jpg'
import img3 from '../img/photo3.jpg'

 
export function CarouselHome() {
  return (
    <div className={style.rodCarusel}>
      <div className={style.carusel}>
        <Carousel>
          <CarouselItem>
            <img
              className="d-block w-100"
              src={img1}
              alt="First slide"
            />
          </CarouselItem>
          <CarouselItem className={style.carusel}>
            <img
              className="d-block w-100"
              src={img2}
              alt="Second slide"
            />
          </CarouselItem>
          <CarouselItem className={style.carusel}>
            <img
              className="d-block w-100"
              src={img3}
              alt="Second slide"
            />
          </CarouselItem>
        </Carousel>
      </div>
    </div>
  );
}