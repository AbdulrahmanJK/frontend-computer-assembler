import { CarouselHome } from "./cssComponent/Carousel";
import MB from './img/mb.svg'
import GPU from './img/vd1svg.svg'
import style from '../css/home.module.css'

function HomePage() {
  return (
    <div>
      <CarouselHome/>
      <div className={style.assembling}>
      <div className={style.mb}><img src={MB} alt="" /></div>
      <div className={style.gpu}><img src={GPU} alt="" /></div>
      </div>
    </div>
  );
}

export default HomePage;
